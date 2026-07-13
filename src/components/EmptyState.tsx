import type { CSSProperties } from 'react';
import { modelMeta, providers } from '../data/models';
import { ModelIcon } from './Brand';

export function EmptyState() {
  return (
    <div className="empty-state">
      <div className="empty-kicker"><span>Independent review</span><i /><span>Four sources / one synthesis</span></div>
      <h2>Ask once. Get the<br /><span>strongest answer.</span></h2>
      <p>ChatGPT, Grok, Gemini, and GLM explore your question independently. Claude reviews every response and delivers one refined result.</p>
      <section className="workflow-preview" aria-label="How the AI council creates a synthesized answer">
        <span className="sr-only">Four independent model responses flow through Claude synthesis to create one final answer.</span>
        <div className="workflow-source-grid">
          {providers.map((provider, index) => (
            <article className="workflow-source" style={{ '--source-order': index } as CSSProperties} key={provider}>
              <header><ModelIcon provider={provider} size="sm" /><strong>{modelMeta[provider].name}</strong></header>
            </article>
          ))}
        </div>

        <div className="workflow-merge" aria-hidden="true">
          <svg viewBox="0 0 700 72" preserveAspectRatio="none">
            <defs>
              <marker id="workflow-arrowhead" markerWidth="7" markerHeight="7" refX="6" refY="3.5" orient="auto" markerUnits="userSpaceOnUse">
                <path d="M0,0 L7,3.5 L0,7 Z" />
              </marker>
            </defs>
            <path className="workflow-merge-path path-1" pathLength="1" d="M87.5 0 C87.5 27 210 36 292 68" />
            <path className="workflow-merge-path path-2" pathLength="1" d="M262.5 0 C262.5 31 301 39 330 68" />
            <path className="workflow-merge-path path-3" pathLength="1" d="M437.5 0 C437.5 31 399 39 370 68" />
            <path className="workflow-merge-path path-4" pathLength="1" d="M612.5 0 C612.5 27 490 36 408 68" />
          </svg>
          <span>Responses converge</span>
        </div>

        <div className="workflow-outcome">
          <article className="workflow-synthesis-card">
            <ModelIcon provider="claude" />
            <div className="workflow-synthesis-copy">
              <span><small>Final review</small><strong>Claude synthesis</strong></span>
              <p><span>Compare</span><i /><span>Resolve</span><i /><span>Refine</span></p>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
