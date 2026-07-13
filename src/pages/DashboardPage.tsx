import { Check, RotateCcw } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Composer } from '../components/Composer';
import { EmptyState } from '../components/EmptyState';
import { FinalAnswer } from '../components/FinalAnswer';
import { ProcessingPanel, SynthesisPanel } from '../components/ProcessingPanel';
import { providers } from '../data/models';
import { getMockScenario, getProviderDelay, shouldProviderFail, wait } from '../services/mockChatService';
import type { ModelResponse, Scenario, SimulationMode } from '../types';

type Stage = 'empty' | 'processing' | 'synthesizing' | 'synthesis-failed' | 'complete';

type Props = {
  mode: SimulationMode;
  resetKey: number;
  preloadedConversation: { prompt: string; key: number } | null;
  onNotify: (message: string) => void;
  onTitle: (title: string) => void;
  onOpenSettings: () => void;
};

export function DashboardPage({ mode, resetKey, preloadedConversation, onNotify, onTitle, onOpenSettings }: Props) {
  const [stage, setStage] = useState<Stage>('empty');
  const [prompt, setPrompt] = useState('');
  const [prefill, setPrefill] = useState('');
  const [scenario, setScenario] = useState<Scenario | null>(null);
  const [responses, setResponses] = useState<ModelResponse[]>([]);
  const [synthesisStep, setSynthesisStep] = useState(0);
  const requestId = useRef(0);

  const reset = useCallback(() => {
    requestId.current += 1;
    setStage('empty');
    setPrompt('');
    setPrefill('');
    setScenario(null);
    setResponses([]);
    setSynthesisStep(0);
    onTitle('New council');
  }, [onTitle]);

  useEffect(() => reset(), [resetKey, reset]);

  useEffect(() => {
    if (!preloadedConversation) return;
    const selectedScenario = getMockScenario(preloadedConversation.prompt);
    const id = requestId.current + 1;
    requestId.current = id;
    setScenario(selectedScenario);
    setPrompt(preloadedConversation.prompt);
    setPrefill('');
    setResponses(providers.map((provider) => ({
      id: `${id}-${provider}`,
      provider,
      content: selectedScenario.sources[provider],
      status: 'completed',
      responseTime: selectedScenario.timings[provider],
    })));
    setSynthesisStep(4);
    setStage('complete');
    onTitle(selectedScenario.title);
  }, [preloadedConversation, onTitle]);

  const updateResponse = (provider: string, changes: Partial<ModelResponse>) => {
    setResponses((current) => current.map((response) => response.provider === provider ? { ...response, ...changes } : response));
  };

  const runSynthesis = async (id: number, selectedMode: SimulationMode) => {
    setStage('synthesizing');
    setSynthesisStep(0);
    for (let step = 0; step < 5; step += 1) {
      if (requestId.current !== id) return;
      setSynthesisStep(step);
      await wait(selectedMode === 'slow' ? 500 : 310);
    }
    if (requestId.current !== id) return;
    if (selectedMode === 'claude-failure') {
      setStage('synthesis-failed');
      return;
    }
    setStage('complete');
  };

  const submit = async (submittedPrompt: string, overrideMode?: SimulationMode) => {
    const selectedMode = overrideMode ?? mode;
    const selectedScenario = getMockScenario(submittedPrompt);
    const id = requestId.current + 1;
    requestId.current = id;
    setScenario(selectedScenario);
    setPrompt(submittedPrompt);
    setPrefill('');
    onTitle(selectedScenario.title);
    setStage('processing');
    setResponses(providers.map((provider) => ({ id: `${id}-${provider}`, provider, content: selectedScenario.sources[provider], status: 'waiting' })));

    const runs = providers.map(async (provider, index) => {
      await wait(index * 110);
      if (requestId.current !== id) return;
      updateResponse(provider, { status: 'thinking' });
      const delay = getProviderDelay(provider, selectedMode);
      await wait(delay * 0.42);
      if (requestId.current !== id) return;
      updateResponse(provider, { status: 'streaming' });
      await wait(delay * 0.58);
      if (requestId.current !== id) return;
      const willFail = shouldProviderFail(provider, selectedMode);
      updateResponse(provider, willFail
        ? { status: 'failed', error: 'This model could not complete the simulated request.', responseTime: selectedScenario.timings[provider] }
        : { status: 'completed', responseTime: selectedScenario.timings[provider] });
    });

    await Promise.all(runs);
    if (requestId.current !== id || selectedMode === 'all-failure') return;
    await wait(240);
    await runSynthesis(id, selectedMode);
  };

  const retrySynthesis = async () => {
    const id = requestId.current + 1;
    requestId.current = id;
    await runSynthesis(id, 'success');
  };

  const working = stage === 'processing' || stage === 'synthesizing';
  const partialFailure = responses.some((response) => response.status === 'failed');

  return (
    <div className={`dashboard-page stage-${stage}`}>
      <div className="conversation-scroll">
        {stage === 'empty' ? (
          <EmptyState />
        ) : (
          <div className="conversation-content">
            <div className="user-message">
              <div className="message-label"><span>You</span><time>Just now</time></div>
              <p>{prompt}</p>
            </div>

            {stage === 'processing' && (
              <ProcessingPanel responses={responses} onRetry={() => submit(prompt, 'success')} />
            )}

            {(stage === 'synthesizing' || stage === 'synthesis-failed') && (
              <>
                <div className="sources-complete-line"><span><Check size={14} /> {partialFailure ? '3 source responses ready' : 'All four source responses ready'}</span><i /></div>
                <SynthesisPanel
                  step={synthesisStep}
                  failed={stage === 'synthesis-failed'}
                  availableSources={responses.filter((response) => response.status === 'completed').length}
                  onRetry={retrySynthesis}
                />
              </>
            )}

            {stage === 'complete' && scenario && (
              <FinalAnswer
                scenario={scenario}
                responses={responses}
                partialFailure={partialFailure}
                onNotify={onNotify}
                onRegenerate={() => submit(prompt, 'success')}
              />
            )}
          </div>
        )}
      </div>

      <Composer initialValue={prefill} disabled={working} onSubmit={submit} onNotify={onNotify} />

      {stage === 'empty' && (
        <button className="demo-scenario-shortcut" onClick={onOpenSettings}>
          <span>Demo controls</span><small>Success, failure & slow modes</small><i />
        </button>
      )}
      {stage === 'processing' && responses.every((response) => response.status === 'failed') && (
        <button className="floating-retry" onClick={() => submit(prompt, 'success')}><RotateCcw size={16} /> Reset to success mode</button>
      )}
    </div>
  );
}
