// AI Settings — provider configuration accessor
// Reads from settings-store, provides defaults and validation

import { useSettingsStore } from '../../store/settings-store';

const PROVIDER_DEFAULTS = {
  openrouter: {
    baseUrl: 'https://openrouter.ai/api/v1',
    defaultModel: 'anthropic/claude-sonnet-4',
    format: 'openai', // OpenAI-compatible chat/completions
  },
  anthropic: {
    baseUrl: 'https://api.anthropic.com/v1',
    defaultModel: 'claude-sonnet-4-20250514',
    format: 'anthropic', // Anthropic Messages API
  },
  custom: {
    baseUrl: '',
    defaultModel: '',
    format: 'openai', // assume OpenAI-compatible by default
  },
};

export const AI_PROVIDERS = [
  { value: 'openrouter', label: 'OpenRouter (recommended)' },
  { value: 'anthropic', label: 'Anthropic (requires proxy)' },
  { value: 'custom', label: 'Custom (OpenAI-compatible)' },
];

export function getAiConfig() {
  const state = useSettingsStore.getState();
  const provider = state.aiProvider || 'openrouter';
  const defaults = PROVIDER_DEFAULTS[provider] || PROVIDER_DEFAULTS.openrouter;

  return {
    provider,
    apiKey: state.aiApiKey || '',
    model: state.aiModel || defaults.defaultModel,
    baseUrl: state.aiBaseUrl || defaults.baseUrl,
    format: defaults.format,
  };
}

export function hasAiConfig() {
  const { apiKey } = getAiConfig();
  return Boolean(apiKey && apiKey.length > 8);
}
