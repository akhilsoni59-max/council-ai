import type { Provider } from '../types';

export const modelMeta: Record<Provider | 'claude', { name: string; initials: string; tone: string }> = {
  chatgpt: { name: 'ChatGPT', initials: 'C', tone: '#89e6c0' },
  grok: { name: 'Grok', initials: 'G', tone: '#f2f2f2' },
  gemini: { name: 'Gemini', initials: 'G', tone: '#8fb7ff' },
  glm: { name: 'GLM', initials: 'GL', tone: '#b3a0ff' },
  claude: { name: 'Claude', initials: 'Cl', tone: '#e7a986' },
};

export const providers: Provider[] = ['chatgpt', 'grok', 'gemini', 'glm'];
