import type * as React from "react";
import { ArrowRight, CalendarDays, Check } from "lucide-react";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={`brand ${compact ? "brand-compact" : ""}`}
      aria-label="Clínica-Escola Integrada Ana Lúcia Chaves Fecury"
    >
      <div className="brand-mark">
        <img src="/brand/clinic-escola-mark.svg" alt="" aria-hidden="true" />
      </div>
      <div>
        <strong>Clínica-Escola Integrada</strong>
        {!compact && <span>Ana Lúcia Chaves Fecury</span>}
      </div>
    </div>
  );
}

export function Button({
  children,
  variant = "primary",
  onClick,
  type = "button",
  className = "",
  disabled = false,
}: {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "soft" | "dark";
  onClick?: () => void;
  type?: "button" | "submit";
  className?: string;
  disabled?: boolean;
}) {
  return (
    <button
      type={type}
      className={`btn btn-${variant} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export function PageIntro({
  eyebrow,
  title,
  description,
  action,
  go,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: string;
  go: (path: string) => void;
}) {
  return (
    <div className="page-intro container">
      <div>
        <span className="eyebrow">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {action && (
        <Button onClick={() => go("/agendamento")}>
          <CalendarDays size={18} /> {action}
        </Button>
      )}
    </div>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
  onAction,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: string;
  onAction?: () => void;
}) {
  return (
    <div className="section-heading">
      <div>
        {eyebrow && <span className="eyebrow">{eyebrow}</span>}
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {action && (
        <Button variant="ghost" onClick={onAction}>
          {action}
          <ArrowRight size={16} />
        </Button>
      )}
    </div>
  );
}

export function Progress({ current }: { current: number }) {
  const items = ["Horário", "Cadastro", "Revisão", "Concluído"];
  return (
    <div className="progress-wrap container">
      <div className="progress-line">
        <span style={{ width: `${Math.max(8, ((current - 1) / 3) * 100)}%` }} />
      </div>
      <div className="progress-steps">
        {items.map((item, index) => (
          <div key={item} className={index + 1 <= current ? "active" : ""}>
            <span>{index + 1 < current ? <Check size={13} /> : index + 1}</span>
            <small>{item}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SummaryRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="summary-row">
      <span className="summary-icon">{icon}</span>
      <div>
        <small>{label}</small>
        <strong>{value}</strong>
      </div>
    </div>
  );
}
