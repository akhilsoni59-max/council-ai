import { SlidersHorizontal, X } from 'lucide-react';
import type { SimulationMode } from '../types';

const modes: Array<{ value: SimulationMode; label: string; description: string }> = [
  { value: 'success', label: 'Successful request', description: 'All models complete and Claude synthesizes the result.' },
  { value: 'one-failure', label: 'One model failure', description: 'Grok fails; Claude continues with three responses.' },
  { value: 'slow', label: 'Slow response', description: 'The parallel model stage takes noticeably longer.' },
  { value: 'claude-failure', label: 'Synthesis failure', description: 'Source answers complete, but synthesis needs a retry.' },
  { value: 'all-failure', label: 'All unavailable', description: 'Every source response fails with a recoverable state.' },
];

export function DemoSettings({ open, mode, onMode, onClose }: { open: boolean; mode: SimulationMode; onMode: (mode: SimulationMode) => void; onClose: () => void }) {
  if (!open) return null;
  return (
    <div className="dialog-layer" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="demo-dialog" role="dialog" aria-modal="true" aria-labelledby="demo-settings-heading">
        <div className="dialog-head">
          <span className="dialog-icon"><SlidersHorizontal size={18} /></span>
          <div><p className="eyebrow">Frontend controls</p><h2 id="demo-settings-heading">Demo scenarios</h2></div>
          <button className="icon-button" onClick={onClose} aria-label="Close settings"><X size={18} /></button>
        </div>
        <p className="dialog-copy">Choose the state the next council request should simulate. No network request or AI API will be used.</p>
        <div className="mode-list">
          {modes.map((item) => (
            <label key={item.value} className={mode === item.value ? 'selected' : ''}>
              <input type="radio" name="simulation" value={item.value} checked={mode === item.value} onChange={() => onMode(item.value)} />
              <span className="radio-dot" />
              <span><strong>{item.label}</strong><small>{item.description}</small></span>
            </label>
          ))}
        </div>
        <button className="button primary full" onClick={onClose}>Use this scenario</button>
      </section>
    </div>
  );
}
