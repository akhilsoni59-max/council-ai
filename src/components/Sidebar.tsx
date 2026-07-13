import {
  BarChart3,
  Bookmark,
  ChevronLeft,
  FolderClosed,
  Plus,
  Search,
  Settings,
  X,
} from 'lucide-react';
import { NavLink, useNavigate } from 'react-router-dom';
import { recentConversations } from '../services/mockConversationService';
import { mockUser } from '../services/mockUserService';
import { Brand } from './Brand';

type Props = {
  collapsed: boolean;
  drawerOpen: boolean;
  onCollapse: () => void;
  onCloseDrawer: () => void;
  onNewChat: () => void;
  onSelectConversation: (prompt: string) => void;
};

const navItems = [
  { to: '/projects', label: 'Projects', icon: FolderClosed },
  { to: '/saved', label: 'Saved answers', icon: Bookmark },
  { to: '/usage', label: 'Usage', icon: BarChart3 },
];

const recentItems = recentConversations.flatMap(({ items }) => items);

export function Sidebar({ collapsed, drawerOpen, onCollapse, onCloseDrawer, onNewChat, onSelectConversation }: Props) {
  const navigate = useNavigate();
  return (
    <>
      <button className={`drawer-scrim ${drawerOpen ? 'is-open' : ''}`} onClick={onCloseDrawer} aria-label="Close navigation" />
      <aside className={`sidebar ${collapsed ? 'is-collapsed' : ''} ${drawerOpen ? 'is-drawer-open' : ''}`}>
        <div className="sidebar-topline">
          <button className="brand-button" onClick={() => navigate('/')} aria-label="Council AI home"><Brand compact={collapsed} /></button>
          <button className="mobile-only icon-button quiet" onClick={onCloseDrawer} aria-label="Close sidebar"><X size={19} /></button>
        </div>

        <button className="new-chat" onClick={onNewChat}>
          <Plus size={18} />
          {!collapsed && <span>New council</span>}
          {!collapsed && <kbd>⌘ K</kbd>}
        </button>

        <button className="sidebar-search">
          <Search size={17} />
          {!collapsed && <span>Search conversations</span>}
        </button>

        <nav className="sidebar-nav" aria-label="Workspace navigation">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink key={to} to={to} onClick={onCloseDrawer} className={({ isActive }) => isActive ? 'active' : ''}>
              <Icon size={17} aria-hidden="true" />
              {!collapsed && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>

        {!collapsed && (
          <section className="sidebar-recents" aria-labelledby="sidebar-recents-title">
            <h2 id="sidebar-recents-title">Recents</h2>
            <div className="sidebar-recents-list">
              {recentItems.map((item) => (
                <button key={item.id} onClick={() => { onSelectConversation(item.prompt); onCloseDrawer(); }}>
                  <span>{item.title}</span>
                </button>
              ))}
            </div>
          </section>
        )}

        <div className="sidebar-bottom">
          <NavLink to="/settings" className={({ isActive }) => `sidebar-settings ${isActive ? 'active' : ''}`} onClick={onCloseDrawer}>
            <Settings size={17} aria-hidden="true" />
            {!collapsed && <span>Settings</span>}
          </NavLink>
          <div className="user-card">
            <span className="user-avatar">AS</span>
            {!collapsed && <span className="user-meta"><strong>{mockUser.name}</strong><small>Demo workspace</small></span>}
          </div>
          <button className="collapse-button desktop-only" onClick={onCollapse} aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}>
            <ChevronLeft size={17} />
            {!collapsed && <span>Collapse sidebar</span>}
          </button>
        </div>
      </aside>
    </>
  );
}
