import {
  Bookmark,
  Check,
  ChevronDown,
  ChevronUp,
  Clipboard,
  Columns2,
  FileDown,
  Grid2X2,
  GitMerge,
  ListChecks,
  RefreshCcw,
  Share2,
} from 'lucide-react';
import { useState } from 'react';
import { modelMeta, providers } from '../data/models';
import type { ModelResponse, Provider, Scenario } from '../types';
import { ModelIcon } from './Brand';

function ActionButton({ icon: Icon, label, onClick }: { icon: React.ElementType; label: string; onClick: () => void }) {
  return <button className="answer-action" aria-label={label} onClick={onClick}><Icon size={15} /><span>{label}</span></button>;
}

export function FinalAnswer({ scenario, responses, partialFailure, onNotify, onRegenerate }: { scenario: Scenario; responses: ModelResponse[]; partialFailure: boolean; onNotify: (message: string) => void; onRegenerate: () => void }) {
  const [formedOpen, setFormedOpen] = useState(false);
  const [sourcesOpen, setSourcesOpen] = useState(false);
  const [sourceView, setSourceView] = useState<'tabs' | 'grid'>('tabs');
  const [activeProvider, setActiveProvider] = useState<Provider>('chatgpt');

  const copy = async () => {
    const text = [scenario.finalIntro, ...scenario.finalSections.map((section) => `${section.heading}\n${Array.isArray(section.body) ? section.body.join('\n') : section.body}`)].join('\n\n');
    await navigator.clipboard?.writeText(text);
    onNotify('Final answer copied');
  };

  return (
    <div className="result-stack">
      {partialFailure && <div className="result-notice"><span>3/4 source responses available</span> Claude completed this synthesis without the unavailable Grok response.</div>}
      <article className="final-card">
        <div className="final-glow" />
        <header className="final-header">
          <div className="final-title">
            <ModelIcon provider="claude" size="lg" />
            <div><p>Claude</p><h2>Final Answer</h2><span>Synthesized from {partialFailure ? 'three available' : 'four'} AI models</span></div>
          </div>
          <span className="completed-pill"><Check size={14} /> Completed</span>
        </header>

        <div className="final-body">
          <p className="answer-lede">{scenario.finalIntro}</p>
          {scenario.finalSections.map((section, index) => (
            <section key={section.heading} className="answer-section">
              <div className="answer-section-heading"><span>{String(index + 1).padStart(2, '0')}</span><h3>{section.heading}</h3></div>
              {Array.isArray(section.body) ? (
                <ul>{section.body.map((item) => <li key={item}>{item}</li>)}</ul>
              ) : <p>{section.body}</p>}
            </section>
          ))}
        </div>

        <button className="formed-toggle" onClick={() => setFormedOpen(!formedOpen)} aria-expanded={formedOpen}>
          <span><GitMerge size={17} /><strong>How this answer was formed</strong><small>A safe summary of the synthesis process</small></span>
          {formedOpen ? <ChevronUp size={17} /> : <ChevronDown size={17} />}
        </button>
        {formedOpen && (
          <div className="formed-content">
            <div><strong>Strong areas of agreement</strong><p>{scenario.agreement.mainAgreement}</p></div>
            <div><strong>Useful unique suggestions</strong><p>{scenario.agreement.uniqueInsights} distinct, practical insights were retained across the source answers.</p></div>
            <div><strong>Conflicts resolved</strong><p>{scenario.agreement.conflicts.join(' ')}</p></div>
            <div><strong>Unsupported ideas excluded</strong><p>Claims without enough context or a clear path to action were not included.</p></div>
            <div><strong>Important uncertainty retained</strong><p>{scenario.agreement.uncertainty}</p></div>
          </div>
        )}

        <footer className="final-footer">
          <div className="primary-actions">
            <ActionButton icon={Clipboard} label="Copy" onClick={copy} />
            <ActionButton icon={Bookmark} label="Save" onClick={() => onNotify('Answer saved to the demo library')} />
            <ActionButton icon={Share2} label="Share" onClick={() => onNotify('Demo share link copied')} />
            <ActionButton icon={FileDown} label="Export" onClick={() => onNotify('Export preview prepared')} />
          </div>
          <div className="refine-actions">
            <ActionButton icon={RefreshCcw} label="Regenerate" onClick={onRegenerate} />
            <button onClick={() => onNotify('A shorter demo variation is ready')}><span>Make shorter</span></button>
            <button onClick={() => onNotify('A more detailed demo variation is ready')}><span>More detailed</span></button>
          </div>
        </footer>
      </article>

      <section className="agreement-strip">
        <div className="agreement-main"><span className="agreement-icon"><ListChecks size={19} /></span><div><p>Model agreement</p><h3>{scenario.agreement.headline}</h3></div></div>
        <div className="agreement-stats">
          <div><span>Main agreement</span><strong>{scenario.agreement.mainAgreement}</strong></div>
          <div><span>Unique insights</span><strong>{scenario.agreement.uniqueInsights}</strong></div>
          <div><span>Remaining uncertainty</span><strong>{scenario.agreement.uncertainty}</strong></div>
        </div>
      </section>

      <section className={`sources-section ${sourcesOpen ? 'is-open' : ''}`}>
        <button className="sources-toggle" onClick={() => setSourcesOpen(!sourcesOpen)} aria-expanded={sourcesOpen}>
          <span className="source-model-stack">{providers.map((provider) => <ModelIcon key={provider} provider={provider} size="sm" />)}</span>
          <span><strong>View the 4 source responses</strong><small>Inspect each model’s independent perspective</small></span>
          {sourcesOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>
        {sourcesOpen && (
          <div className="sources-content">
            <div className="source-controls">
              <div className="source-tabs" role="tablist">
                {providers.map((provider) => (
                  <button key={provider} className={activeProvider === provider ? 'active' : ''} onClick={() => { setActiveProvider(provider); setSourceView('tabs'); }} role="tab">
                    <ModelIcon provider={provider} size="sm" /><span>{modelMeta[provider].name}</span>
                  </button>
                ))}
              </div>
              <div className="view-switcher">
                <button className={sourceView === 'tabs' ? 'active' : ''} onClick={() => setSourceView('tabs')} aria-label="Tab view"><Columns2 size={16} /></button>
                <button className={sourceView === 'grid' ? 'active' : ''} onClick={() => setSourceView('grid')} aria-label="Grid view"><Grid2X2 size={16} /></button>
              </div>
            </div>
            <div className={`source-cards ${sourceView}`}>
              {providers.filter((provider) => sourceView === 'grid' || provider === activeProvider).map((provider) => {
                const response = responses.find((item) => item.provider === provider);
                return (
                  <article className={`source-card ${response?.status === 'failed' ? 'failed' : ''}`} key={provider}>
                    <header>
                      <ModelIcon provider={provider} />
                      <div><h3>{modelMeta[provider].name}</h3><span>Demo model · {response?.responseTime?.toFixed(1) ?? '—'}s</span></div>
                      <span className={`source-status ${response?.status}`}>{response?.status === 'failed' ? 'Unavailable' : 'Complete'}</span>
                    </header>
                    {response?.status === 'failed' ? (
                      <div className="source-error"><strong>This model could not complete the request.</strong><p>No technical details are exposed. Retry the individual model or continue with the available answers.</p></div>
                    ) : <p>{scenario.sources[provider]}</p>}
                    <footer>
                      <button onClick={() => { navigator.clipboard?.writeText(scenario.sources[provider]); onNotify(`${modelMeta[provider].name} response copied`); }}><Clipboard size={14} /> Copy</button>
                      <button onClick={() => onNotify(`${modelMeta[provider].name} retry simulated`)}><RefreshCcw size={14} /> Retry</button>
                      <button onClick={() => onNotify(`${modelMeta[provider].name} response saved`)}><Bookmark size={14} /> Save</button>
                    </footer>
                  </article>
                );
              })}
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
