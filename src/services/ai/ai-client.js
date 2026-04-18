// AI Client — multi-provider streaming completion
// Supports OpenRouter (OpenAI-compatible), Anthropic Messages API, and custom endpoints

/**
 * Stream a chat completion from the configured AI provider.
 * @param {object} config - from getAiConfig()
 * @param {string} config.provider - 'openrouter' | 'anthropic' | 'custom'
 * @param {string} config.apiKey
 * @param {string} config.model
 * @param {string} config.baseUrl
 * @param {string} config.format - 'openai' | 'anthropic'
 * @param {string} system - system prompt text
 * @param {Array<{role: string, content: string}>} messages - conversation messages
 * @param {AbortSignal} [signal] - optional abort signal
 * @returns {AsyncGenerator<string>} yields text chunks
 */
export async function* streamCompletion(config, system, messages, signal) {
  if (config.format === 'anthropic') {
    yield* streamAnthropic(config, system, messages, signal);
  } else {
    yield* streamOpenAI(config, system, messages, signal);
  }
}

/**
 * Non-streaming completion (collects full response).
 */
export async function complete(config, system, messages, signal) {
  let full = '';
  for await (const chunk of streamCompletion(config, system, messages, signal)) {
    full += chunk;
  }
  return full;
}

// ── OpenAI-compatible (OpenRouter, custom) ──

async function* streamOpenAI(config, system, messages, signal) {
  const url = `${config.baseUrl.replace(/\/$/, '')}/chat/completions`;

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${config.apiKey}`,
  };

  // OpenRouter-specific headers
  if (config.provider === 'openrouter') {
    headers['HTTP-Referer'] = window.location.origin;
    headers['X-Title'] = 'MILOS';
  }

  const body = {
    model: config.model,
    stream: true,
    messages: [
      { role: 'system', content: system },
      ...messages,
    ],
  };

  const res = await fetch(url, {
    method: 'POST',
    headers,
    body: JSON.stringify(body),
    signal,
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    throw new AiClientError(res.status, errText, config.provider);
  }

  yield* parseSSEStream(res.body, 'openai');
}

// ── Anthropic Messages API ──

async function* streamAnthropic(config, system, messages, signal) {
  const url = `${config.baseUrl.replace(/\/$/, '')}/messages`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': config.apiKey,
      'anthropic-version': '2023-06-01',
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify({
      model: config.model,
      max_tokens: 4096,
      stream: true,
      system,
      messages,
    }),
    signal,
  });

  if (!res.ok) {
    const errText = await res.text().catch(() => '');
    throw new AiClientError(res.status, errText, config.provider);
  }

  yield* parseSSEStream(res.body, 'anthropic');
}

// ── SSE Stream Parser ──

async function* parseSSEStream(body, format) {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';

  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      // Handle both \r\n and \n line endings
      const lines = buffer.split(/\r?\n/);
      buffer = lines.pop() || '';

      for (const line of lines) {
        const trimmed = line.trim();
        if (!trimmed.startsWith('data:')) continue;
        // Handle both "data: ..." and "data:..." (with/without space)
        const data = trimmed.startsWith('data: ') ? trimmed.slice(6) : trimmed.slice(5);
        if (!data || data === '[DONE]') continue;

        try {
          const parsed = JSON.parse(data);
          const text = format === 'anthropic'
            ? extractAnthropicDelta(parsed)
            : extractOpenAIDelta(parsed);
          if (text) yield text;
        } catch {
          // skip unparseable SSE lines
        }
      }
    }
  } finally {
    reader.releaseLock();
  }
}

function extractOpenAIDelta(parsed) {
  return parsed.choices?.[0]?.delta?.content || '';
}

function extractAnthropicDelta(parsed) {
  if (parsed.type === 'content_block_delta') {
    return parsed.delta?.text || '';
  }
  return '';
}

// ── Error class ──

export class AiClientError extends Error {
  constructor(status, body, provider) {
    let message;
    if (status === 401) {
      message = 'Invalid API key. Check your AI settings.';
    } else if (status === 429) {
      message = 'Rate limited. Please try again in a moment.';
    } else if (status === 0 || !status) {
      message = 'Could not reach AI provider. Check your connection and settings.';
    } else {
      message = `AI provider error (${status}): ${body.slice(0, 200)}`;
    }
    super(message);
    this.name = 'AiClientError';
    this.status = status;
    this.provider = provider;
  }
}
