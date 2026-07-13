import ClaudeColor from '@lobehub/icons/es/Claude/components/Color';
import GeminiColor from '@lobehub/icons/es/Gemini/components/Color';
import GrokMono from '@lobehub/icons/es/Grok/components/Mono';
import OpenAIMono from '@lobehub/icons/es/OpenAI/components/Mono';
import ZAIMono from '@lobehub/icons/es/ZAI/components/Mono';
import { modelMeta } from '../data/models';
import type { Provider } from '../types';

export function CouncilMark({ size = 34 }: { size?: number }) {
  return (
    <span className="council-mark" style={{ width: size, height: size }} aria-hidden="true">
      <img src="/assets/council-mark-v2.png" alt="" />
    </span>
  );
}

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`brand ${compact ? 'brand-compact' : ''}`}>
      <CouncilMark />
      {!compact && <span className="brand-name">Council <em>AI</em></span>}
    </span>
  );
}

export function ModelIcon({ provider, size = 'md' }: { provider: Provider | 'claude'; size?: 'sm' | 'md' | 'lg' }) {
  const meta = modelMeta[provider];
  const iconSize = size === 'lg' ? 25 : size === 'sm' ? 16 : 21;
  const logos = {
    chatgpt: <OpenAIMono size={iconSize} />,
    grok: <GrokMono size={iconSize} />,
    gemini: <GeminiColor size={iconSize} />,
    glm: <ZAIMono size={iconSize} />,
    claude: <ClaudeColor size={iconSize} />,
  };

  return (
    <span className={`model-icon model-${provider} model-icon-${size}`} title={`${meta.name} logo`} aria-hidden="true">
      {logos[provider]}
    </span>
  );
}
