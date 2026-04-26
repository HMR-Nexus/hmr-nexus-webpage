/**
 * NEXUS.OS — Tabs
 * Mono uppercase tabs with accent underline on active. Controlled component.
 */
interface TabItem {
  value: string;
  label: string;
}

interface TabsProps {
  value: string;
  onChange: (value: string) => void;
  items: TabItem[];
  className?: string;
}

const Tabs = ({ value, onChange, items, className = '' }: TabsProps) => (
  <div className={`nx-tabs ${className}`}>
    {items.map((item) => (
      <button
        key={item.value}
        type="button"
        onClick={() => onChange(item.value)}
        className={`nx-tab ${value === item.value ? 'active' : ''}`}
      >
        {item.label}
      </button>
    ))}
  </div>
);

export default Tabs;
