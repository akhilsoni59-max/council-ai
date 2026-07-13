import { AlertCircle, Check, RotateCcw } from 'lucide-react';
import type { CSSProperties } from 'react';
import { modelMeta, providers } from '../data/models';
import type { ModelResponse, Provider } from '../types';
import { ModelIcon } from './Brand';

const statusCopy = {
  waiting: 'Queued',
  thinking: 'Setting approach',
  streaming: 'Writing brief',
  completed: 'Brief ready',
  failed: 'Unavailable',
};

const sourceRoles: Record<Provider, string> = {
  chatgpt: 'Structure',
  grok: 'Challenge',
  gemini: 'Research',
  glm: 'Execution',
};

function responsePreview(content: string) {
  const clean = content.replace(/[#*_`>-]/g, ' ').replace(/\s+/g, ' ').trim();
  return clean.length > 112 ? `${clean.slice(0, 109).trimEnd()}…` : clean;
}

export function ProcessingPanel({ responses, onRetry }: { responses: ModelResponse[]; onRetry: () => void }) {
  const completed = responses.filter((response) => response.status === 'completed').length;
  const failed = responses.filter((response) => response.status === 'failed').length;
  const registered = completed + failed;
  return (
    <section className="processing-panel processing-board" aria-live="polite">
      <div className="processing-head">
        <div><p className="eyebrow">Parallel analysis</p><h2>Building four independent briefs</h2><span>Each model works separately before Claude sees the responses.</span></div>
        <span className="progress-count">{registered}<small>/ 4 briefs</small></span>
      </div>
      <div className="response-register">
        <span style={{ width: `${(registered / 4) * 100}%` }} />
      </div>
      <div className="response-register-label"><span>Response register</span><small>{String(registered).padStart(2, '0')} / 04 collected</small></div>

      <div className="processing-source-grid">
        {providers.map((provider, index) => {
          const response = responses.find((item) => item.provider === provider)!;
          const active = response.status === 'thinking' || response.status === 'streaming';
          const detail = response.status === 'failed'
            ? 'This source could not return a brief. The remaining responses stay available.'
            : response.status === 'waiting'
              ? 'Waiting for an independent review slot.'
              : response.status === 'thinking'
                ? 'Defining a distinct angle and evaluation criteria.'
                : responsePreview(response.content);
          return (
            <article
              key={provider}
              className={`processing-source status-${response.status}`}
              style={{ '--source-order': index } as CSSProperties}
            >
              <header>
                <div className="processing-provider"><ModelIcon provider={provider} size="sm" /><span><strong>{modelMeta[provider].name}</strong><small>{sourceRoles[provider]}</small></span></div>
                <span className="source-state-label"><i />{statusCopy[response.status]}</span>
              </header>
              <div className="response-slip"><p>{detail}</p></div>
              <footer>
                <span>{String(index + 1).padStart(2, '0')} / 04</span>
                {response.status === 'completed' && <small><Check size={12} /> {response.responseTime?.toFixed(1)}s</small>}
                {response.status === 'failed' && <small className="source-failed"><AlertCircle size={12} /> skipped</small>}
                {active && <small>working</small>}
              </footer>
            </article>
          );
        })}
      </div>
      {failed === 4 && (
        <div className="all-failed-callout">
          <AlertCircle size={20} />
          <div><strong>All responses are temporarily unavailable</strong><p>This demo state shows how the interface handles a recoverable council failure.</p></div>
          <button className="button secondary" onClick={onRetry}><RotateCcw size={15} /> Retry council</button>
        </div>
      )}
      {failed > 0 && failed < 4 && (
        <div className="partial-failure-note"><AlertCircle size={16} /><span>Grok could not complete this request. Claude will create the final answer using the other three available responses.</span></div>
      )}
    </section>
  );
}

export function SynthesisPanel({ step, failed, availableSources, onRetry }: { step: number; failed: boolean; availableSources: number; onRetry: () => void }) {
  const steps = ['Register source briefs', 'Map shared claims', 'Review disagreements', 'Check evidence gaps', 'Draft the final answer'];
  const currentStep = Math.min(step, steps.length - 1);
  const reviewProgress = ((currentStep + 1) / steps.length) * 100;
  const agreementValue = availableSources === 4 ? '3 / 4' : `${Math.max(availableSources - 1, 1)} / ${availableSources}`;
  return (
    <section className={`synthesis-panel synthesis-ledger ${failed ? 'is-failed' : ''}`} aria-live="polite">
      <header className="synthesis-ledger-head">
        <div className="claude-review-title"><ModelIcon provider="claude" /><span><small>Claude review</small><strong>{failed ? 'Synthesis interrupted' : 'Comparing source claims'}</strong></span></div>
        <span className="review-counter">{String(currentStep + 1).padStart(2, '0')}<small>/ 05</small></span>
      </header>

      {failed ? (
        <div className="synthesis-ledger-failure">
          <AlertCircle size={20} />
          <div><strong>Claude synthesis needs another try</strong><p>The source briefs are safe. Retry to continue the simulated review.</p></div>
          <button className="button primary" onClick={onRetry}><RotateCcw size={16} /> Retry synthesis</button>
        </div>
      ) : (
        <div className="synthesis-ledger-body">
          <ol className="review-stage-list" aria-label="Synthesis stages">
            {steps.map((item, index) => (
              <li key={item} className={index < currentStep ? 'is-done' : index === currentStep ? 'is-current' : ''} aria-current={index === currentStep ? 'step' : undefined}>
                <span>{String(index + 1).padStart(2, '0')}</span>
                <strong>{item}</strong>
                {index < currentStep && <Check size={13} />}
              </li>
            ))}
          </ol>

          <div className="review-findings-panel">
            <div className="review-findings-head"><span>Findings register</span><small>{availableSources} source briefs</small></div>
            <div className="review-metrics">
              <article className={currentStep >= 1 ? 'is-confirmed' : ''}><small>Agreement</small><strong>{agreementValue}</strong><span>Shared direction</span></article>
              <article className={currentStep >= 2 ? 'is-confirmed' : ''}><small>Dissent</small><strong>1</strong><span>Timing trade-off</span></article>
              <article className={currentStep >= 3 ? 'is-confirmed' : ''}><small>Evidence gap</small><strong>1</strong><span>Validation needed</span></article>
            </div>
            <div className="review-operation"><small>Current operation</small><strong>{steps[currentStep]}</strong></div>
            <div className="review-progress-rail" aria-label={`${Math.round(reviewProgress)}% complete`}><span style={{ width: `${reviewProgress}%` }} /></div>
          </div>
        </div>
      )}
    </section>
  );
}
