import { ArrowUp, ChevronDown, Globe2, Image, Paperclip } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

type Props = {
  initialValue?: string;
  disabled?: boolean;
  onSubmit: (prompt: string) => void;
  onNotify: (message: string) => void;
};

const styles = ['Balanced', 'Concise', 'Detailed', 'Technical', 'Creative'];

export function Composer({ initialValue = '', disabled, onSubmit, onNotify }: Props) {
  const [value, setValue] = useState(initialValue);
  const [responseStyle, setResponseStyle] = useState('Balanced');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setValue(initialValue);
    if (initialValue) window.setTimeout(() => textareaRef.current?.focus(), 10);
  }, [initialValue]);

  const submit = () => {
    const prompt = value.trim();
    if (!prompt || disabled) return;
    onSubmit(prompt);
    setValue('');
  };

  return (
    <div className="composer-wrap">
      <div className={`composer ${disabled ? 'is-disabled' : ''}`}>
        <textarea
          ref={textareaRef}
          value={value}
          disabled={disabled}
          rows={1}
          placeholder={disabled ? 'The council is working…' : 'Ask the AI council anything…'}
          aria-label="Prompt"
          onChange={(event) => {
            setValue(event.target.value);
            event.currentTarget.style.height = 'auto';
            event.currentTarget.style.height = `${Math.min(event.currentTarget.scrollHeight, 160)}px`;
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey) {
              event.preventDefault();
              submit();
            }
          }}
        />
        <div className="composer-toolbar">
          <div className="composer-tools">
            <button onClick={() => onNotify('Demo feature — backend integration will be added later.')} aria-label="Attach file"><Paperclip size={18} /></button>
            <button onClick={() => onNotify('Demo feature — image uploads will be added later.')} aria-label="Attach image"><Image size={18} /></button>
            <button className="tool-with-label" aria-label="Web research" onClick={() => onNotify('Demo feature — web research will be added later.')}><Globe2 size={17} /><span>Research</span></button>
            <label className="style-select">
              <span className="sr-only">Response style</span>
              <select value={responseStyle} onChange={(event) => setResponseStyle(event.target.value)}>
                {styles.map((style) => <option key={style}>{style}</option>)}
              </select>
              <ChevronDown size={14} />
            </label>
          </div>
          <div className="send-group">
            <span className="shortcut-hint">Enter to send</span>
            <button className="send-button" disabled={!value.trim() || disabled} onClick={submit} aria-label="Send prompt"><ArrowUp size={19} /></button>
          </div>
        </div>
      </div>
      <p className="composer-disclaimer">Council AI can make mistakes. This is a simulated frontend experience.</p>
    </div>
  );
}
