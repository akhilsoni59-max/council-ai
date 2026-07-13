import { Check, Info, X } from 'lucide-react';

export function Toast({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div className="toast" role="status">
      <span className="toast-icon">{message.toLowerCase().includes('copied') ? <Check size={15} /> : <Info size={15} />}</span>
      <span>{message}</span>
      <button onClick={onClose} aria-label="Dismiss notification"><X size={15} /></button>
    </div>
  );
}
