import { create } from 'zustand';
import { safeGet, safeSet } from '../services/storage';

export const useSettingsStore = create((set) => ({
  theme: safeGet('theme', 'light'),
  valuesLayer: safeGet('values_layer', 'islamic'),
  attrLang: safeGet('attr_lang', 'en'),

  setTheme: (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    safeSet('theme', theme);
    set({ theme });
  },

  setValuesLayer: (valuesLayer) => {
    safeSet('values_layer', valuesLayer);
    set({ valuesLayer });
  },

  setAttrLang: (attrLang) => {
    safeSet('attr_lang', attrLang);
    set({ attrLang });
  },

  tooltipsEnabled: safeGet('tooltips_enabled', 'true') === 'true',
  setTooltipsEnabled: (val) => {
    safeSet('tooltips_enabled', String(val));
    set({ tooltipsEnabled: val });
  },

  disableL1ThresholdGate: safeGet('disable_l1_threshold_gate', 'true') === 'true',
  setDisableL1ThresholdGate: (val) => {
    safeSet('disable_l1_threshold_gate', String(val));
    set({ disableL1ThresholdGate: val });
  },

  disableL23ThresholdGate: safeGet('disable_l23_threshold_gate', 'false') === 'true',
  setDisableL23ThresholdGate: (val) => {
    safeSet('disable_l23_threshold_gate', String(val));
    set({ disableL23ThresholdGate: val });
  },

  // ── AI Provider Settings ──
  aiProvider: safeGet('ai_provider', 'openrouter'),
  aiApiKey: safeGet('ai_api_key', ''),
  aiModel: safeGet('ai_model', 'anthropic/claude-sonnet-4'),
  aiBaseUrl: safeGet('ai_base_url', ''),

  setAiProvider: (provider) => {
    safeSet('ai_provider', provider);
    set({ aiProvider: provider });
  },
  setAiApiKey: (key) => {
    safeSet('ai_api_key', key);
    set({ aiApiKey: key });
  },
  setAiModel: (model) => {
    safeSet('ai_model', model);
    set({ aiModel: model });
  },
  setAiBaseUrl: (url) => {
    safeSet('ai_base_url', url);
    set({ aiBaseUrl: url });
  },
}));
