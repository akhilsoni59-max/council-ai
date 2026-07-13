import { findScenario } from '../data/scenarios';
import type { Provider, Scenario, SimulationMode } from '../types';

export const wait = (milliseconds: number) => new Promise<void>((resolve) => window.setTimeout(resolve, milliseconds));

export function getMockScenario(prompt: string): Scenario {
  return findScenario(prompt);
}

export function getProviderDelay(provider: Provider, mode: SimulationMode) {
  const base: Record<Provider, number> = { chatgpt: 850, gemini: 1050, glm: 1225, grok: 1450 };
  return mode === 'slow' ? base[provider] * 2.25 : base[provider];
}

export function shouldProviderFail(provider: Provider, mode: SimulationMode) {
  return mode === 'all-failure' || (mode === 'one-failure' && provider === 'grok');
}
