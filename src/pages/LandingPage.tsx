import {
  ArrowRight,
  Bookmark,
  Check,
  ChevronDown,
  CircleCheck,
  Combine,
  Copy,
  FileDown,
  FileCheck2,
  GitCompareArrows,
  GitMerge,
  Menu,
  RefreshCcw,
  SearchCheck,
  ShieldCheck,
  Users,
  X,
  Zap,
} from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { modelMeta, providers } from '../data/models';
import { Brand, ModelIcon } from '../components/Brand';

const faqs = [
  ['Does Council AI send real AI requests?', 'Not in this demo. Every response, processing state, and timing is simulated in the browser with realistic mock data.'],
  ['Why use several models for one question?', 'Independent answers expose different assumptions and useful angles. The synthesis layer then resolves overlap and presents one clearer response.'],
  ['Can I inspect the original answers?', 'Yes. Every completed result includes expandable source responses with both tab and grid comparison views.'],
  ['Is the pricing active?', 'No. Pricing is a product preview only; billing will be added after backend integration.'],
  ['Which integrations are planned?', 'The frontend architecture is prepared for replaceable conversation, user, and model services. No provider integration is active today.'],
];

export function LandingPage() {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [faq, setFaq] = useState(0);

  const goDemo = () => navigate('/app');
  return (
    <div className="landing">
      <nav className="landing-nav">
        <button className="brand-button" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}><Brand /></button>
        <div className={`landing-links ${mobileOpen ? 'open' : ''}`}>
          <a href="#how" onClick={() => setMobileOpen(false)}>How it works</a>
          <a href="#features" onClick={() => setMobileOpen(false)}>Features</a>
          <a href="#use-cases" onClick={() => setMobileOpen(false)}>Use cases</a>
          <a href="#pricing" onClick={() => setMobileOpen(false)}>Pricing</a>
          <button className="button primary mobile-only" onClick={goDemo}>Try the Demo <ArrowRight size={16} /></button>
        </div>
        <div className="landing-nav-actions">
          <span className="demo-badge"><i /> Frontend demo</span>
          <button className="button primary desktop-only" onClick={goDemo}>Try the Demo <ArrowRight size={16} /></button>
          <button className="nav-menu mobile-only" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">{mobileOpen ? <X /> : <Menu />}</button>
        </div>
      </nav>

      <main>
        <section className="hero">
          <div className="hero-noise" />
          <div className="hero-copy">
            <div className="hero-kicker"><span>Introducing Council AI</span><i /><span>Interactive product preview</span></div>
            <h1>Four perspectives.<br /><em>One definitive answer.</em></h1>
            <p>Send one question to ChatGPT, Grok, Gemini, and GLM. Claude compares every response, resolves conflicts, and delivers one refined final answer.</p>
            <div className="hero-actions">
              <button className="button primary large" onClick={goDemo}>Try the interactive demo <ArrowRight size={18} /></button>
              <a className="button ghost large" href="#how">See how it works <ChevronDown size={18} /></a>
            </div>
            <div className="hero-proof"><span><Check size={14} /> No sign-up</span><span><Check size={14} /> No API keys</span><span><Check size={14} /> Frontend-only demo</span></div>
          </div>

          <div className="hero-visual" aria-label="Council AI product flow preview">
            <div className="visual-chrome">
              <span className="visual-brand"><Brand /><small>New council</small></span>
              <span className="visual-status"><i /> Simulated</span>
            </div>
            <div className="hero-prompt"><span>How should we launch our AI startup?</span><i><ArrowRight size={16} /></i></div>
            <div className="hero-model-grid">
              {providers.map((provider, index) => (
                <div className="hero-model-card" key={provider} style={{ '--delay': `${index * 110}ms` } as React.CSSProperties}>
                  <header><ModelIcon provider={provider} size="sm" /><strong>{modelMeta[provider].name}</strong><CircleCheck size={14} /></header>
                  <span className="mock-line long" /><span className="mock-line" /><span className="mock-line short" />
                </div>
              ))}
            </div>
            <div className="hero-converge"><i /><i /><span><GitMerge size={13} /> Comparing 4 perspectives</span></div>
            <div className="hero-final-card">
              <div className="hero-final-head"><ModelIcon provider="claude" /><span><small>Claude synthesis</small><strong>A focused 30-day launch plan</strong></span><span className="mini-complete"><Check size={12} /> Final</span></div>
              <p>Start with one urgent workflow and 10–15 design partners. Turn their measurable outcomes into a focused launch story.</p>
              <div className="mini-plan"><span>01 <b>Validate position</b></span><span>02 <b>Recruit design partners</b></span><span>03 <b>Launch with proof</b></span></div>
            </div>
            <div className="visual-foot"><span>4/4 sources reviewed</span><span>2 conflicts resolved</span></div>
          </div>
        </section>

        <section className="model-strip">
          <p>Independent perspectives from leading AI models</p>
          <div>{providers.map((provider) => <span key={provider}><ModelIcon provider={provider} size="sm" />{modelMeta[provider].name}</span>)}<i /><span><ModelIcon provider="claude" size="sm" />Claude synthesis</span></div>
        </section>

        <section className="landing-section how-section" id="how">
          <div className="section-intro">
            <p className="eyebrow">How it works</p>
            <h2>One question.<br />A complete council.</h2>
            <p>Move from uncertainty to a well-considered answer without managing four separate chats.</p>
          </div>
          <div className="steps-grid">
            <article><span className="step-number">01</span><div className="step-icon"><Zap size={21} /></div><h3>Ask one question</h3><p>Submit your prompt once. Add the context and detail every model should consider.</p><div className="step-art prompt-art"><span>Ask anything…</span><i><ArrowRight size={13} /></i></div></article>
            <article><span className="step-number">02</span><div className="step-icon"><Users size={21} /></div><h3>Four models respond</h3><p>ChatGPT, Grok, Gemini, and GLM independently explore the request in parallel.</p><div className="step-art model-art">{providers.map((provider) => <ModelIcon key={provider} provider={provider} size="sm" />)}</div></article>
            <article className="featured"><span className="step-number">03</span><div className="step-icon"><Combine size={21} /></div><h3>Claude creates the final</h3><p>Claude compares the responses, resolves differences, and produces one polished result.</p><div className="step-art final-art"><ModelIcon provider="claude" size="sm" /><span><i /><i /><i /></span><Check size={15} /></div></article>
          </div>
        </section>

        <section className="preview-section">
          <div className="preview-copy">
            <p className="eyebrow">A considered answer, not a collage</p>
            <h2>See where the models agree — and where they don’t.</h2>
            <p>Council AI preserves valuable differences while removing repetition. The result reads as one coherent answer, with the original sources always available.</p>
            <ul>
              <li><SearchCheck size={18} /><span><strong>Consensus, made legible</strong>See the strongest area of agreement at a glance.</span></li>
              <li><GitCompareArrows size={18} /><span><strong>Conflicts, resolved carefully</strong>Understand which competing suggestions were reconciled.</span></li>
              <li><ShieldCheck size={18} /><span><strong>Uncertainty, kept honest</strong>Important unknowns remain visible instead of being averaged away.</span></li>
            </ul>
            <button className="text-link" onClick={goDemo}>Explore the full product demo <ArrowRight size={17} /></button>
          </div>
          <div className="answer-preview">
            <div className="answer-preview-glow" />
            <header><ModelIcon provider="claude" size="lg" /><span><small>Claude</small><strong>Final Answer</strong><em>Synthesized from four AI models</em></span><i><Check size={13} /> Complete</i></header>
            <div className="preview-answer-body">
              <h3>Build traction before you build reach.</h3>
              <p>The models strongly agree on a narrow initial audience, proof-driven positioning, and founder-led validation before paid acquisition.</p>
              <div><span>01</span><p><strong>Start with design partners</strong>Recruit 10–15 teams with one urgent, repeated workflow.</p></div>
              <div><span>02</span><p><strong>Define a proof metric</strong>Measure activation, repeat use, and time-to-value.</p></div>
              <div><span>03</span><p><strong>Launch around evidence</strong>Turn early outcomes into stories your market can verify.</p></div>
            </div>
            <footer><button><Copy size={14} /> Copy</button><button><Bookmark size={14} /> Save</button><button><FileDown size={14} /> Export</button><button><RefreshCcw size={14} /> Regenerate</button></footer>
          </div>
        </section>

        <section className="landing-section features-section" id="features">
          <div className="section-intro centered"><p className="eyebrow">Built for better decisions</p><h2>Multiple views. One clean conclusion.</h2><p>Everything needed to compare, understand, and act — without the clutter of a conventional AI dashboard.</p></div>
          <div className="feature-grid">
            {[
              [Users, 'Four independent perspectives', 'Give every model the same context and compare genuinely separate responses.'],
              [Zap, 'Parallel response experience', 'See safe progress states as all four models work at the same time.'],
              [Combine, 'Claude-powered synthesis', 'One refined answer keeps the best ideas while removing repetition.'],
              [GitCompareArrows, 'Conflict detection', 'Make trade-offs visible without inventing scientific confidence scores.'],
              [FileCheck2, 'One clean final answer', 'A dominant long-form reading surface designed for useful, polished output.'],
              [SearchCheck, 'Full source access', 'Expand the original responses in tab or grid view whenever you need detail.'],
              [RefreshCcw, 'Retry individual models', 'Recover from partial failures without discarding every completed response.'],
              [Bookmark, 'Save and export', 'Working demo actions preview how answers will fit into future workflows.'],
              [ShieldCheck, 'Backend-ready architecture', 'Mock services stay separate so real infrastructure can replace them later.'],
            ].map(([Icon, title, copy]) => <article key={String(title)}><span><Icon size={19} /></span><h3>{String(title)}</h3><p>{String(copy)}</p></article>)}
          </div>
        </section>

        <section className="use-section" id="use-cases">
          <div className="use-head"><div><p className="eyebrow">Example councils</p><h2>Useful whenever one answer isn’t enough.</h2></div><p>Strategy, research, planning, and critique benefit from seeing the problem through more than one lens.</p></div>
          <div className="use-grid">
            {[
              ['01', 'Launch strategy', 'Build a launch strategy for my AI startup', 'Positioning · Distribution · Metrics'],
              ['02', 'Technical decisions', 'Which frontend framework should I choose?', 'Trade-offs · Architecture · Hiring'],
              ['03', 'Travel planning', 'Create a seven-day Japan itinerary', 'Pace · Logistics · Experiences'],
              ['04', 'Critical review', 'Identify the biggest risks in this business idea', 'Demand · Economics · Execution'],
            ].map(([n, title, prompt, tags]) => <button key={n} onClick={goDemo}><span>{n}</span><div><small>{title}</small><strong>“{prompt}”</strong><em>{tags}</em></div><ArrowRight size={18} /></button>)}
          </div>
        </section>

        <section className="comparison-section">
          <div className="section-intro centered"><p className="eyebrow">A different kind of AI workspace</p><h2>Less tab switching. More synthesis.</h2></div>
          <div className="comparison-table" role="table">
            <div className="table-row table-head" role="row"><span>Experience</span><span>Single AI chat</span><span className="council-column"><Brand /></span></div>
            {[
              ['Independent perspectives', 'One', 'Four'],
              ['Cross-model comparison', 'Manual', 'Automatic'],
              ['Conflict summary', 'Not available', 'Included'],
              ['One polished conclusion', 'Single-model answer', 'Claude synthesis'],
              ['Original source access', 'Single response', 'All four responses'],
              ['Partial failure handling', 'Start over', 'Continue with available models'],
            ].map((row) => <div className="table-row" role="row" key={row[0]}>{row.map((cell, i) => <span className={i === 2 ? 'council-column' : ''} key={cell}>{i === 2 && <Check size={14} />}{cell}</span>)}</div>)}
          </div>
        </section>

        <section className="landing-section pricing-section" id="pricing">
          <div className="section-intro centered"><p className="eyebrow">Preview pricing — not yet active</p><h2>Start with a council. Scale when ready.</h2><p>These plans demonstrate the future product structure. Billing is not connected in this frontend demo.</p></div>
          <div className="pricing-grid">
            {[
              ['Free', '$0', 'Explore the core council experience.', ['Limited demo queries', 'Four source responses', 'Claude final synthesis', 'Basic chat history']],
              ['Pro', '$24', 'For deeper individual work.', ['Higher future limits', 'Projects', 'File analysis', 'Advanced synthesis controls', 'Priority processing']],
              ['Team', '$49', 'For teams making decisions together.', ['Shared workspaces', 'Team projects', 'Admin controls', 'Usage reporting', 'Shared answer library']],
            ].map(([name, price, desc, features], index) => (
              <article className={index === 1 ? 'recommended' : ''} key={String(name)}>
                {index === 1 && <span className="recommended-label">Most popular preview</span>}
                <h3>{String(name)}</h3><p>{String(desc)}</p><div className="price"><strong>{String(price)}</strong>{price !== '$0' && <span>/ user<br />/ month</span>}</div>
                <button className={`button ${index === 1 ? 'primary' : 'secondary'} full`} onClick={() => window.alert('Billing will be available after backend integration.')}>{index === 0 ? 'Try the demo' : `Preview ${name}`}</button>
                <ul>{(features as string[]).map((feature) => <li key={feature}><Check size={15} />{feature}</li>)}</ul>
              </article>
            ))}
          </div>
        </section>

        <section className="faq-section">
          <div className="faq-intro"><p className="eyebrow">Questions, answered</p><h2>Good things to know.</h2><p>This is a transparent frontend preview. No hidden integrations, keys, payments, or claims of live model access.</p></div>
          <div className="faq-list">{faqs.map(([question, answer], index) => <article className={faq === index ? 'open' : ''} key={question}><button onClick={() => setFaq(faq === index ? -1 : index)}><span>{question}</span><ChevronDown size={18} /></button>{faq === index && <p>{answer}</p>}</article>)}</div>
        </section>

        <section className="final-cta">
          <div className="cta-mark"><Brand compact /></div><p className="eyebrow">Convene your council</p><h2>Stop choosing which AI to ask.</h2><p>Ask once. Compare four independent perspectives. Leave with one answer you can actually use.</p><button className="button primary large" onClick={goDemo}>Try the interactive demo <ArrowRight size={18} /></button>
          <div className="cta-models">{providers.map((provider) => <ModelIcon key={provider} provider={provider} size="sm" />)}<i /><ModelIcon provider="claude" size="sm" /></div>
        </section>
      </main>

      <footer className="landing-footer">
        <div className="footer-main"><div><Brand /><p>Four perspectives. One definitive answer.</p></div><div><strong>Product</strong><a href="#how">How it works</a><a href="#features">Features</a><a href="#pricing">Pricing preview</a><button onClick={goDemo}>Interactive demo</button></div><div><strong>Resources</strong><a href="#use-cases">Use cases</a><button onClick={() => window.alert('Documentation will be available with the connected product.')}>Documentation</button><button onClick={() => window.alert('Changelog preview coming soon.')}>Changelog</button></div><div><strong>Company</strong><button onClick={() => window.alert('Council AI is currently an independent product concept.')}>About</button><button onClick={() => window.alert('Contact features are not connected in this demo.')}>Contact</button><button onClick={() => window.alert('Privacy policy preview coming soon.')}>Privacy</button></div></div>
        <div className="footer-bottom"><p>Council AI is an independent product and is not affiliated with or endorsed by OpenAI, Google, Anthropic, xAI, or Z.ai. Product names and logos belong to their respective owners.</p><span>© 2026 Council AI · Interactive frontend demo</span></div>
      </footer>
    </div>
  );
}
