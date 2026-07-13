import { Ellipsis, Menu, Moon, Share2, SlidersHorizontal, Upload, Sun } from 'lucide-react';

type Props = {
  title: string;
  light: boolean;
  onMenu: () => void;
  onTheme: () => void;
  onNotify: (message: string) => void;
  onSettings: () => void;
};

export function AppHeader({ title, light, onMenu, onTheme, onNotify, onSettings }: Props) {
  return (
    <header className="app-header">
      <div className="header-identity">
        <button className="icon-button mobile-only" onClick={onMenu} aria-label="Open navigation"><Menu size={20} /></button>
        <div>
          <h1>{title}</h1>
          <p><span className="live-dot" /> 4 models + Claude synthesis</p>
        </div>
      </div>
      <div className="header-actions">
        <span className="demo-badge"><i /> Interactive Frontend Demo</span>
        <button className="header-button" aria-label="Share conversation" onClick={() => onNotify('Share link created for this demo')}><Share2 size={16} /><span>Share</span></button>
        <button className="header-button desktop-only" aria-label="Export conversation" onClick={() => onNotify('Export preview prepared')}><Upload size={16} /><span>Export</span></button>
        <button className="icon-button" onClick={onSettings} aria-label="Open demo settings"><SlidersHorizontal size={18} /></button>
        <button className="icon-button" onClick={onTheme} aria-label="Toggle theme">{light ? <Moon size={18} /> : <Sun size={18} />}</button>
        <button className="icon-button desktop-only" onClick={() => onNotify('More actions are available in the connected product')} aria-label="More options"><Ellipsis size={18} /></button>
      </div>
    </header>
  );
}
