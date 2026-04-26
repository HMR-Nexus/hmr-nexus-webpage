/**
 * NEXUS.OS — Toggle
 * Controlled switch. Off = surface raised + neutral knob, On = accent + ink knob.
 */
interface ToggleProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

const Toggle = ({ checked, onChange, label, disabled = false, className = '' }: ToggleProps) => (
  <label
    className={`inline-flex items-center gap-3 cursor-pointer ${
      disabled ? 'opacity-50 cursor-not-allowed' : ''
    } ${className}`}
  >
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`nx-toggle ${checked ? 'on' : ''}`}
    />
    {label && <span className="text-[13px] text-[var(--paper)]">{label}</span>}
  </label>
);

export default Toggle;
