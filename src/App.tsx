import { useCallback, useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { AppHeader } from './components/AppHeader';
import { DemoSettings } from './components/DemoSettings';
import { Sidebar } from './components/Sidebar';
import { Toast } from './components/Toast';
import { DashboardPage } from './pages/DashboardPage';
import { LandingPage } from './pages/LandingPage';
import { PricingPage, ProjectsPage, SavedPage, SettingsPage, UsagePage } from './pages/SecondaryPages';
import type { SimulationMode } from './types';

function AppWorkspace() {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [light, setLight] = useState(false);
  const [mode, setMode] = useState<SimulationMode>('success');
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [toast, setToast] = useState('');
  const [conversationTitle, setConversationTitle] = useState('New council');
  const [resetKey, setResetKey] = useState(0);
  const [preloadedConversation, setPreloadedConversation] = useState<{ prompt: string; key: number } | null>(null);

  const notify = useCallback((message: string) => setToast(message), []);
  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(''), 3200);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const pageTitle: Record<string, string> = {
    '/app/projects': 'Projects',
    '/app/saved': 'Saved answers',
    '/app/usage': 'Usage',
    '/app/settings': 'Settings',
  };
  const title = location.pathname === '/app' ? conversationTitle : pageTitle[location.pathname] ?? 'Council AI';

  const newChat = () => {
    navigate('/app');
    setPreloadedConversation(null);
    setResetKey((key) => key + 1);
    setDrawerOpen(false);
  };

  const openPreloadedConversation = (prompt: string) => {
    navigate('/app');
    setPreloadedConversation((current) => ({ prompt, key: (current?.key ?? 0) + 1 }));
    setDrawerOpen(false);
  };

  return (
    <div className={`app-shell ${light ? 'theme-light' : ''}`}>
      <Sidebar collapsed={collapsed} drawerOpen={drawerOpen} onCollapse={() => setCollapsed(!collapsed)} onCloseDrawer={() => setDrawerOpen(false)} onNewChat={newChat} onSelectConversation={openPreloadedConversation} />
      <div className="app-main">
        <AppHeader title={title} light={light} onMenu={() => setDrawerOpen(true)} onTheme={() => setLight(!light)} onNotify={notify} onSettings={() => setSettingsOpen(true)} />
        <Routes>
          <Route index element={<DashboardPage mode={mode} resetKey={resetKey} preloadedConversation={preloadedConversation} onNotify={notify} onTitle={setConversationTitle} onOpenSettings={() => setSettingsOpen(true)} />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="saved" element={<SavedPage />} />
          <Route path="usage" element={<UsagePage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Routes>
      </div>
      <DemoSettings open={settingsOpen} mode={mode} onMode={(newMode) => { setMode(newMode); notify(`Next request: ${newMode.replace('-', ' ')}`); }} onClose={() => setSettingsOpen(false)} />
      {toast && <Toast message={toast} onClose={() => setToast('')} />}
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/app/*" element={<AppWorkspace />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
