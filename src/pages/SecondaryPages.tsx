import { ArrowRight, BarChart3, Bell, Bookmark, Check, CreditCard, FileText, FolderKanban, Lock, Plus, Settings, SlidersHorizontal, UserRound } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { projects } from '../services/mockConversationService';
import { mockUsage, mockUser } from '../services/mockUserService';

export function ProjectsPage() {
  return (
    <PageFrame eyebrow="Workspace" title="Projects" copy="Organize related council conversations into focused decision spaces.">
      <div className="project-grid">
        <button className="new-project-card"><span><Plus size={21} /></span><strong>New project</strong><small>Available after backend integration</small></button>
        {projects.map((project, index) => <article className="project-card" key={project.id}><span className={`project-symbol p${index}`}><FolderKanban size={19} /></span><div><h3>{project.name}</h3><p>{project.description}</p></div><footer><span>{project.conversationCount} conversations</span><time>{project.updatedAt}</time></footer></article>)}
      </div>
    </PageFrame>
  );
}

export function SavedPage() {
  const saved = [
    ['AI startup launch strategy', 'Strategy', 'Start with one urgent workflow and turn early user outcomes into your distribution engine.', 'Today'],
    ['Frontend framework decision', 'Engineering', 'Choose the stack your team can maintain for the next 24 months, then validate it with a hard screen.', 'Yesterday'],
    ['Cloud platform comparison', 'Infrastructure', 'Treat operational fit and team capability as first-class decision criteria.', 'Jun 28'],
  ];
  return (
    <PageFrame eyebrow="Library" title="Saved answers" copy="Your best synthesized answers, ready to revisit and reuse.">
      <div className="saved-list">{saved.map(([title, tag, copy, date]) => <article key={title}><span className="saved-icon"><Bookmark size={17} /></span><div><span className="saved-tag">{tag}</span><h3>{title}</h3><p>{copy}</p></div><time>{date}</time><button aria-label={`Open ${title}`}><ArrowRight size={17} /></button></article>)}</div>
    </PageFrame>
  );
}

export function UsagePage() {
  const percent = Math.round((mockUsage.demoQueriesUsed / mockUsage.demoQueriesLimit) * 100);
  return (
    <PageFrame eyebrow="Preview account" title="Usage" copy="A frontend preview of future limits and workspace activity.">
      <div className="usage-overview">
        <article className="usage-primary"><header><span><BarChart3 size={19} /></span><div><p>Demo queries</p><h3>{mockUsage.demoQueriesUsed} <small>of {mockUsage.demoQueriesLimit}</small></h3></div></header><div className="usage-bar"><span style={{ width: `${percent}%` }} /></div><footer><span>{percent}% used</span><span>Resets in 18 days</span></footer></article>
        <article><p>Source responses</p><strong>{mockUsage.sourceResponses}</strong><small>Across all demo councils</small></article>
        <article><p>Synthesized answers</p><strong>{mockUsage.synthesizedAnswers}</strong><small>Claude final responses</small></article>
      </div>
      <div className="usage-table"><header><h3>Recent activity</h3><span>Demo data</span></header>{['AI startup launch strategy', 'Frontend framework decision', 'Japan itinerary'].map((name, i) => <div key={name}><span><FileText size={16} />{name}</span><span>4 source responses</span><span>1 synthesis</span><time>{i === 0 ? 'Today' : `${i + 1} days ago`}</time></div>)}</div>
    </PageFrame>
  );
}

export function SettingsPage() {
  return (
    <PageFrame eyebrow="Demo workspace" title="Settings" copy="Preview how workspace preferences and future integrations will be organized.">
      <div className="settings-layout">
        <aside>{[[UserRound, 'Profile'], [SlidersHorizontal, 'Council preferences'], [Bell, 'Notifications'], [Lock, 'Privacy'], [CreditCard, 'Billing preview']].map(([Icon, label], i) => <button className={i === 0 ? 'active' : ''} key={String(label)}><Icon size={16} />{String(label)}</button>)}</aside>
        <section className="settings-card"><div className="settings-card-head"><span className="settings-avatar">AS</span><div><h3>{mockUser.name}</h3><p>Frontend demo profile</p></div><button className="button secondary">Change photo</button></div><label><span>Full name</span><input value={mockUser.name} readOnly /></label><label><span>Email address</span><input value={mockUser.email} readOnly /></label><div className="setting-row"><div><strong>Default response style</strong><p>Choose how the final synthesis should be presented.</p></div><select defaultValue="Balanced"><option>Balanced</option><option>Concise</option><option>Detailed</option><option>Technical</option></select></div><div className="setting-row"><div><strong>Save source responses</strong><p>Keep all independent answers alongside the final synthesis.</p></div><button className="toggle active" aria-label="Save source responses"><i /></button></div><div className="settings-actions"><button className="button primary">Save demo preferences</button><span><Settings size={14} /> Stored locally for this preview</span></div></section>
      </div>
    </PageFrame>
  );
}

export function PricingPage() {
  const navigate = useNavigate();
  return (
    <div className="standalone-pricing">
      <div className="pricing-page-head"><p className="eyebrow">Preview pricing — not yet active</p><h1>Choose how your council grows.</h1><p>Billing is not connected. These cards preview the plans planned for future backend integration.</p></div>
      <div className="pricing-grid compact">
        {[
          ['Free', '$0', ['Limited demo queries', 'Four source responses', 'Claude final synthesis', 'Basic chat history']],
          ['Pro', '$24', ['Higher future limits', 'Projects', 'File analysis', 'Advanced synthesis controls', 'Priority processing']],
          ['Team', '$49', ['Shared workspaces', 'Team projects', 'Admin controls', 'Usage reporting']],
        ].map(([name, price, features], index) => <article className={index === 1 ? 'recommended' : ''} key={String(name)}>{index === 1 && <span className="recommended-label">Recommended preview</span>}<h3>{String(name)}</h3><div className="price"><strong>{String(price)}</strong>{price !== '$0' && <span>/ user / month</span>}</div><button className={`button ${index === 1 ? 'primary' : 'secondary'} full`} onClick={() => window.alert('Billing will be available after backend integration.')}>Preview {String(name)}</button><ul>{(features as string[]).map((feature) => <li key={feature}><Check size={15} />{feature}</li>)}</ul></article>)}
      </div>
      <button className="text-link pricing-back" onClick={() => navigate('/app')}>Return to interactive demo <ArrowRight size={16} /></button>
    </div>
  );
}

function PageFrame({ eyebrow, title, copy, children }: { eyebrow: string; title: string; copy: string; children: React.ReactNode }) {
  return <div className="secondary-page"><div className="secondary-head"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2><p>{copy}</p></div>{children}</div>;
}
