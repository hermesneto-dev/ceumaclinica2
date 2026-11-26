import {
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
  type ReactNode,
} from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  CircleHelp,
  Clock3,
  Info,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
  Stethoscope,
  UserRound,
  X,
} from "lucide-react";
import { CareIcon } from "./CareIcon";
import { Button, PageIntro, Progress, SummaryRow } from "./ClinicUI";
import {
  specialties,
  availableDatesInMonth,
  availableDates,
  dateParts,
  formatDate,
  selectSpecialty,
  unavailableTime,
  validSelection,
  validatePatient,
  localDate,
  monthLabel,
  parseDate,
  demoPatient,
  type Booking,
  type Patient,
  type Appointment,
} from "../lib/booking";

type Go = (path: string) => void;
type DraftProps = {
  booking: Booking;
  setBooking: Dispatch<SetStateAction<Booking>>;
  go: Go;
};

export function DemoNotice({ children }: { children?: ReactNode }) {
  return (
    <div className="privacy-callout demo-callout" role="note">
      <Info size={18} />
      <p>
        {children ??
          "Esta é uma simulação acadêmica. Use apenas dados fictícios. Nenhum horário é reservado e nenhuma mensagem é enviada à clínica."}
      </p>
    </div>
  );
}

export function BookingPage({ booking, setBooking, go }: DraftProps) {
  const specialty =
    specialties.find((item) => item.id === booking.specialtyId) ??
    specialties[0];
  const firstDate = availableDates(specialty.id)[0];
  const [monthOffset, setMonthOffset] = useState(() => {
    if (!firstDate) return 0;
    const target = parseDate(firstDate);
    const today = new Date();
    return (target.getFullYear() - today.getFullYear()) * 12 + target.getMonth() - today.getMonth();
  });
  useEffect(() => {
    if (!firstDate) return;
    const target = parseDate(firstDate);
    const today = new Date();
    setMonthOffset((target.getFullYear() - today.getFullYear()) * 12 + target.getMonth() - today.getMonth());
  }, [specialty.id, firstDate]);
  const dates = availableDatesInMonth(specialty.id, monthOffset);
  const canGoBack = monthOffset > 0;
  return (
    <main className="content-page booking-page">
      <PageIntro
        eyebrow="Agendamento demonstrativo"
        title="Escolha o melhor momento para você"
        description="Escolha um horário de exemplo. Você pode revisar tudo antes de concluir a simulação."
        go={go}
      />
      <Progress current={1} />
      <section className="container booking-layout">
        <div className="booking-main">
          <DemoNotice />
          <div className="form-section">
            <div className="section-title-row">
              <div>
                <span className="eyebrow">01 · Atendimento</span>
                <h2>O que você precisa?</h2>
              </div>
              <span className="form-hint">Agenda fictícia</span>
            </div>
            <div
              className="select-grid"
              role="group"
              aria-label="Especialidade"
            >
              {specialties.map((item) => (
                <button
                  key={item.id}
                  className={`select-card ${booking.specialtyId === item.id ? "selected" : ""}`}
                  aria-pressed={booking.specialtyId === item.id}
                  onClick={() =>
                    setBooking((prev) => selectSpecialty(prev, item.id))
                  }
                >
                  <span className={`small-specialty-icon ${item.tone}`}>
                    <CareIcon name={item.icon} size={21} />
                  </span>
                  <span>
                    <strong>{item.name}</strong>
                    <small>{item.eyebrow}</small>
                  </span>
                  {booking.specialtyId === item.id && (
                    <CheckCircle2 className="selected-check" size={19} />
                  )}
                </button>
              ))}
            </div>
          </div>
          <div className="form-section">
            <div className="section-title-row">
              <div>
                <span className="eyebrow">02 · Profissional</span>
                <h2>Quem aparece nesta agenda?</h2>
              </div>
            </div>
            <div className="professional-select">
              <div className="profile-avatar">
                {specialty.professional
                  .split(" ")
                  .slice(1, 3)
                  .map((name) => name[0])
                  .join("")}
              </div>
              <div>
                <strong>{specialty.professional}</strong>
                <span>{specialty.name} · profissional fictício</span>
              </div>
              <CheckCircle2 size={19} />
            </div>
          </div>
          <div className="form-section">
            <div className="section-title-row">
              <div>
                <span className="eyebrow">03 · Data e horário</span>
                <h2>Quando fica melhor?</h2>
              </div>
              <div className="calendar-controls" aria-label="Navegação do calendário">
                <button
                  type="button"
                  className="calendar-nav"
                  onClick={() => setMonthOffset((value) => Math.max(0, value - 1))}
                  disabled={!canGoBack}
                  aria-label="Mês anterior"
                >
                  <ArrowLeft size={14} />
                </button>
                <span className="calendar-month">
                  <CalendarDays size={16} /> Próximas datas · {monthLabel(monthOffset)}
                </span>
                <button
                  type="button"
                  className="calendar-nav"
                  onClick={() => setMonthOffset((value) => Math.min(3, value + 1))}
                  disabled={monthOffset >= 3}
                  aria-label="Próximo mês"
                >
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
            <p className="schedule-explanation">
              Agenda demonstrativa: {specialty.days.toLowerCase()}.
            </p>
            <div
              className="date-picker"
              role="group"
              aria-label="Data do atendimento"
            >
              {dates.slice(0, 6).map((date) => {
                const part = dateParts(date);
                return (
                  <button
                    key={date}
                    className={booking.date === date ? "selected" : ""}
                    aria-pressed={booking.date === date}
                    aria-label={formatDate(date)}
                    onClick={() => setBooking((prev) => ({ ...prev, date }))}
                  >
                    <small>{part.weekday}</small>
                    <strong>{part.day}</strong>
                    <span>{part.month}</span>
                  </button>
                );
              })}
            </div>
            {dates.length === 0 && (
              <p className="schedule-empty" role="status">
                Não há horários de exemplo neste mês. Avance para o próximo mês.
              </p>
            )}
            <div
              className="time-grid"
              role="group"
              aria-label="Horário do atendimento"
            >
              {specialty.times.map((time) => (
                <button
                  key={time}
                  className={booking.time === time ? "selected" : ""}
                  aria-pressed={booking.time === time}
                  disabled={unavailableTime(specialty.id, time)}
                  onClick={() => setBooking((prev) => ({ ...prev, time }))}
                >
                  {time}
                  {unavailableTime(specialty.id, time) && (
                    <small>indisponível</small>
                  )}
                </button>
              ))}
            </div>
            <div className="availability-note">
              <span className="status-dot" /> Escolha um horário disponível na
              simulação.
            </div>
          </div>
          <Button
            disabled={!validSelection(booking)}
            onClick={() => go("/cadastro")}
            className="continue-btn"
          >
            Continuar para cadastro <ArrowRight size={18} />
          </Button>
        </div>
        <aside className="booking-summary" aria-live="polite">
          <span className="eyebrow">Seu resumo</span>
          <h3>Um passo de cada vez.</h3>
          <div className="summary-divider" />
          <SummaryRow
            icon={<CareIcon name="care" size={18} />}
            label="Especialidade"
            value={specialty.name}
          />
          <SummaryRow
            icon={<UserRound size={16} />}
            label="Profissional fictício"
            value={specialty.professional}
          />
          <SummaryRow
            icon={<CalendarDays size={16} />}
            label="Data e horário"
            value={`${formatDate(booking.date)} · ${booking.time}`}
          />
          <div className="privacy-mini">
            <ShieldCheck size={16} />
            <span>
              Dados fictícios mantidos somente neste navegador, sem envio à clínica.
            </span>
          </div>
        </aside>
      </section>
    </main>
  );
}

function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required = false,
  maxLength,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  maxLength?: number;
}) {
  return (
    <label className="field">
      <span>
        {label}
        {required && <b aria-hidden="true">*</b>}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        maxLength={maxLength}
        max={type === "date" ? localDate(new Date()) : undefined}
      />
    </label>
  );
}

export function PatientFormPage({ booking, setBooking, go }: DraftProps) {
  const [patient, setPatient] = useState({ ...booking.patient });
  const [error, setError] = useState("");
  const update = (key: keyof Patient) => (value: string) =>
    setPatient((prev) => ({ ...prev, [key]: value }));
  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const error = validatePatient(patient);
    if (error) {
      setError(error);
      return;
    }
    if (!validSelection(booking)) {
      setError(
        "Volte ao agendamento e escolha uma combinação de data e horário disponível.",
      );
      return;
    }
    setError("");
    setBooking((prev) => ({
      ...prev,
      patient: { ...patient, name: patient.name.trim() },
    }));
    go("/confirmacao");
  };
  return (
    <main className="content-page booking-page">
      <PageIntro
        eyebrow="Agendamento demonstrativo"
        title="Vamos preparar seu atendimento"
        description="Preencha somente informações fictícias para experimentar a proposta."
        go={go}
      />
      <Progress current={2} />
      <section className="container form-layout">
        <form
          className="patient-form"
          onSubmit={submit}
          aria-describedby="demo-form-note"
        >
          <div className="section-title-row">
            <div>
              <span className="eyebrow">Dados do paciente de exemplo</span>
              <h2>Vamos testar o cadastro?</h2>
            </div>
            <span className="required-note">* obrigatório</span>
          </div>
          <div id="demo-form-note">
            <DemoNotice>
              Não insira dados pessoais reais. Os campos já trazem um perfil de
              exemplo e nada será enviado ou gravado em um sistema da clínica.
            </DemoNotice>
          </div>
          <button
            type="button"
            className="edit-link demo-fill"
            onClick={() => {
              setPatient({ ...demoPatient });
              setError("");
            }}
          >
            Repor dados fictícios de exemplo <ArrowRight size={14} />
          </button>
          <div className="field-grid">
            <InputField
              label="Nome completo fictício"
              value={patient.name}
              onChange={update("name")}
              placeholder="Nome e sobrenome de exemplo"
              maxLength={100}
              required
            />
            <InputField
              label="Telefone fictício"
              value={patient.phone}
              onChange={update("phone")}
              placeholder="(00) 00000-0000"
              type="tel"
              maxLength={20}
              required
            />
            <InputField
              label="CPF fictício (opcional)"
              value={patient.cpf}
              onChange={update("cpf")}
              placeholder="000.000.000-00"
              maxLength={14}
            />
            <InputField
              label="Nascimento fictício (opcional)"
              value={patient.birth}
              onChange={update("birth")}
              type="date"
            />
            <InputField
              label="E-mail fictício (opcional)"
              value={patient.email}
              onChange={update("email")}
              placeholder="pessoa@example.com"
              type="email"
              maxLength={120}
            />
            <InputField
              label="Endereço fictício (opcional)"
              value={patient.address}
              onChange={update("address")}
              placeholder="Rua de exemplo, número e bairro"
              maxLength={180}
            />
          </div>
          <label className="field">
            <span>Tipo de atendimento de exemplo (opcional)</span>
            <select
              value={patient.purpose}
              onChange={(event) => update("purpose")(event.target.value)}
              aria-describedby="purpose-note"
            >
              <option value="">Não informado</option>
              <option value="Consulta inicial">Consulta inicial</option>
              <option value="Retorno">Retorno</option>
              <option value="Orientação sobre serviços">
                Orientação sobre serviços
              </option>
            </select>
          </label>
          <p className="schedule-explanation" id="purpose-note">
            Escolha somente uma opção de exemplo. Não informe sintomas,
            diagnósticos ou outros dados reais de saúde.
          </p>
          {error && (
            <p className="form-error" role="alert">
              <CircleHelp size={16} /> {error}
            </p>
          )}
          <div className="form-actions">
            <Button
              variant="ghost"
              onClick={() => {
                setBooking((prev) => ({ ...prev, patient }));
                go("/agendamento");
              }}
            >
              <ArrowLeft size={16} /> Voltar
            </Button>
            <Button type="submit">
              Revisar agendamento <ArrowRight size={17} />
            </Button>
          </div>
        </form>
        <aside className="booking-summary sticky-summary">
          <span className="eyebrow">Escolha demonstrativa</span>
          <h3>Confira o que você escolheu.</h3>
          <div className="summary-divider" />
          <SummaryRow
            icon={<Stethoscope size={16} />}
            label="Especialidade"
            value={
              specialties.find((item) => item.id === booking.specialtyId)
                ?.name ?? "Clínica médica"
            }
          />
          <SummaryRow
            icon={<CalendarDays size={16} />}
            label="Data e horário"
            value={`${formatDate(booking.date)} · ${booking.time}`}
          />
          <button
            className="edit-link"
            onClick={() => {
              setBooking((prev) => ({ ...prev, patient }));
              go("/agendamento");
            }}
          >
            Editar escolha <ArrowRight size={14} />
          </button>
          <button className="edit-link" onClick={() => go("/privacidade")}>
            Privacidade e uso de dados <ShieldCheck size={14} />
          </button>
        </aside>
      </section>
    </main>
  );
}

export function ReviewPage({
  booking,
  go,
  confirm,
}: {
  booking: Booking;
  go: Go;
  confirm: () => void;
}) {
  const specialty =
    specialties.find((item) => item.id === booking.specialtyId) ??
    specialties[0];
  const valid = validSelection(booking) && !validatePatient(booking.patient);
  return (
    <main className="content-page booking-page">
      <PageIntro
        eyebrow="Agendamento demonstrativo"
        title="Está tudo certo?"
        description="Confira seus dados antes de confirmar."
        go={go}
      />
      <Progress current={3} />
      <section className="container review-layout">
        <div className="review-card">
          <div className="review-card-head">
            <div className="success-small">
              <Check size={18} />
            </div>
            <div>
              <span className="eyebrow">Resumo do atendimento</span>
              <h2>Confira seus dados antes de confirmar.</h2>
            </div>
          </div>
          <div className="review-block">
            <SummaryRow
              icon={<Stethoscope size={16} />}
              label="Especialidade"
              value={specialty.name}
            />
            <SummaryRow
              icon={<UserRound size={16} />}
              label="Profissional fictício"
              value={booking.professional}
            />
            <SummaryRow
              icon={<CalendarDays size={16} />}
              label="Data e horário"
              value={`${formatDate(booking.date)} · ${booking.time}`}
            />
            <SummaryRow
              icon={<UserRound size={16} />}
              label="Paciente de exemplo"
              value={booking.patient.name}
            />
            <SummaryRow
              icon={<Phone size={16} />}
              label="Telefone fictício"
              value={booking.patient.phone}
            />
            <SummaryRow
              icon={<Info size={16} />}
              label="Tipo de atendimento de exemplo"
              value={booking.patient.purpose || "Não informado"}
            />
          </div>
          <DemoNotice>
            Confirmar adiciona este exemplo à lista local da demonstração. Não
            há reserva real, envio à clínica ou mensagem por WhatsApp.
          </DemoNotice>
          {!valid && (
            <p className="form-error" role="alert">
              Revise o horário e o cadastro antes de confirmar.
            </p>
          )}
          <div className="review-actions">
            <Button variant="ghost" onClick={() => go("/cadastro")}>
              <ArrowLeft size={16} /> Voltar e editar
            </Button>
            <Button disabled={!valid} onClick={confirm}>
              Confirmar agendamento <Check size={17} />
            </Button>
          </div>
        </div>
        <aside className="confirmation-side">
          <div className="whatsapp-badge">
            <MessageCircle size={19} />
          </div>
          <span className="eyebrow">Comunicação proposta</span>
          <h3>Informação por perto.</h3>
          <p>
            Uma solução futura poderia enviar confirmação e lembrete. Aqui você
            pode ver somente um exemplo visual, sem integração ativa.
          </p>
          <button onClick={() => go("/whatsapp")}>
            Ver exemplo da mensagem <ArrowRight size={15} />
          </button>
        </aside>
      </section>
    </main>
  );
}

export function SuccessPage({
  appointment,
  go,
  showMessage,
}: {
  appointment: Appointment;
  go: Go;
  showMessage: () => void;
}) {
  const specialty =
    specialties.find((item) => item.id === appointment.specialtyId) ??
    specialties[0];
  return (
    <main className="content-page success-page">
      <div className="container success-wrap">
        <div className="success-icon">
          <Check size={34} />
        </div>
        <span className="eyebrow">Simulação concluída</span>
        <h1>
          Agendamento realizado
          <br />
          <em>com sucesso!</em>
        </h1>
        <p className="success-lead">
          Seu exemplo foi adicionado à demonstração. Nenhum horário real foi
          reservado.
        </p>
        <div className="success-booking-card">
          <div className="protocol">
            <span>PROTOCOLO DEMONSTRATIVO</span>
            <strong>{appointment.protocol}</strong>
          </div>
          <div className="success-details">
            <div>
              <small>Especialidade</small>
              <strong>{specialty.name}</strong>
            </div>
            <div>
              <small>Data e horário</small>
              <strong>
                {formatDate(appointment.date)} · {appointment.time}
              </strong>
            </div>
            <div>
              <small>Local ilustrativo</small>
              <strong>Unidade Renascença</strong>
            </div>
          </div>
          <div className="success-whatsapp">
            <MessageCircle size={17} />
            <span>
              Proposta de confirmação e lembrete por WhatsApp, sem envio real.
            </span>
          </div>
        </div>
        <div className="success-actions">
          <Button onClick={() => go("/agendamentos")}>
            Ver meu agendamento <ArrowRight size={17} />
          </Button>
          <Button variant="ghost" onClick={() => go("/")}>
            Voltar para o início
          </Button>
        </div>
        <button className="success-detail-link" onClick={showMessage}>
          Visualizar simulação do WhatsApp <ArrowRight size={15} />
        </button>
      </div>
    </main>
  );
}

export function AppointmentsPage({
  appointments,
  go,
  newBooking,
  showMessage,
  editBooking,
  cancelAppointment,
}: {
  appointments: Appointment[];
  go: Go;
  newBooking: () => void;
  showMessage: (appointment: Appointment) => void;
  editBooking: (appointment: Appointment) => void;
  cancelAppointment: (protocol: string) => void;
}) {
  const [tab, setTab] = useState<"upcoming" | "history">("upcoming");
  const [expanded, setExpanded] = useState<string | null>(null);
  const today = localDate(new Date());
  const upcoming = appointments.filter((item) => item.date >= today);
  const history = appointments.filter((item) => item.date < today);
  const visible = tab === "upcoming" ? upcoming : history;
  return (
    <main className="content-page">
      <PageIntro
        eyebrow="Área demonstrativa do paciente"
        title="Meus agendamentos"
        description="Os exemplos confirmados aparecem aqui e ficam salvos somente neste navegador para facilitar a apresentação."
        go={go}
      />
      <section className="container appointments-layout">
        <div>
          <div
            className="appointments-tabs"
            role="tablist"
            aria-label="Agendamentos"
          >
            <button
              role="tab"
              id="tab-upcoming"
              aria-selected={tab === "upcoming"}
              aria-controls="appointments-panel"
              className={tab === "upcoming" ? "active" : ""}
              onClick={() => setTab("upcoming")}
            >
              Próximos <span>{upcoming.length}</span>
            </button>
            <button
              role="tab"
              id="tab-history"
              aria-selected={tab === "history"}
              aria-controls="appointments-panel"
              className={tab === "history" ? "active" : ""}
              onClick={() => setTab("history")}
            >
              Histórico <span>{history.length}</span>
            </button>
          </div>
          <div
            id="appointments-panel"
            role="tabpanel"
            aria-labelledby={
              tab === "upcoming" ? "tab-upcoming" : "tab-history"
            }
          >
            {visible.length === 0 ? (
              <div className="empty-state">
                <CalendarDays size={28} />
                <h2>
                  {tab === "upcoming"
                    ? "Nenhum exemplo confirmado ainda"
                    : "Nenhum atendimento no histórico"}
                </h2>
                <p>
                  {tab === "upcoming"
                    ? "Experimente o fluxo de agendamento. A confirmação será exibida nesta lista, sem reserva real."
                    : "Atendimentos demonstrativos com datas passadas apareceriam aqui."}
                </p>
                <Button onClick={newBooking}>
                  Novo agendamento <ArrowRight size={16} />
                </Button>
              </div>
            ) : (
              visible.map((item) => {
                const specialty =
                  specialties.find(
                    (specialty) => specialty.id === item.specialtyId,
                  ) ?? specialties[0];
                const parts = dateParts(item.date);
                return (
                  <article className="appointment-card" key={item.protocol}>
                    <div className="appointment-card-head">
                      <span className="confirmed-pill">
                        <Check size={13} />{" "}
                        {tab === "upcoming"
                          ? "Confirmado · simulação"
                          : "Data passada · simulação"}
                      </span>
                      <button
                        className="detail-toggle"
                        aria-expanded={expanded === item.protocol}
                        aria-controls={`details-${item.protocol}`}
                        onClick={() =>
                          setExpanded(
                            expanded === item.protocol ? null : item.protocol,
                          )
                        }
                      >
                        {expanded === item.protocol
                          ? "Ocultar detalhes"
                          : "Ver detalhes"}
                      </button>
                    </div>
                    <div className="appointment-card-body">
                      <div className="big-date">
                        <strong>{parts.day}</strong>
                        <span>
                          {parts.month.toUpperCase()}
                          <br />
                          {parts.year}
                        </span>
                      </div>
                      <div>
                        <span className="eyebrow">{specialty.eyebrow}</span>
                        <h2>{specialty.name}</h2>
                        <p>
                          <UserRound size={15} /> {item.professional} · fictício
                        </p>
                        <p>
                          <Clock3 size={15} /> {item.time}
                        </p>
                        <p>
                          <MapPin size={15} /> Unidade Renascença · local
                          ilustrativo
                        </p>
                      </div>
                    </div>
                    {expanded === item.protocol && (
                      <div
                        className="appointment-details"
                        id={`details-${item.protocol}`}
                      >
                        <p>
                          <strong>Protocolo:</strong> {item.protocol}
                        </p>
                        <p>
                          <strong>Paciente de exemplo:</strong>{" "}
                          {item.patient.name}
                        </p>
                        <p>
                          <strong>Data:</strong> {formatDate(item.date)}
                        </p>
                        <p>
                          Registro somente na memória desta página. Sem envio à
                          clínica.
                        </p>
                      </div>
                    )}
                    <div className="appointment-card-actions">
                      <button onClick={() => editBooking(item)}>
                        <CalendarDays size={15} /> Alterar data ou horário
                      </button>
                      <button onClick={() => cancelAppointment(item.protocol)}>
                        <X size={15} /> Cancelar exemplo
                      </button>
                      <button onClick={() => showMessage(item)}>
                        <MessageCircle size={15} /> Ver lembrete simulado
                      </button>
                      <button onClick={() => go("/informacoes")}>
                        <MapPin size={15} /> Informações do local
                      </button>
                      <button onClick={() => go("/ajuda")}>
                        <CircleHelp size={15} /> Preciso de ajuda
                      </button>
                    </div>
                  </article>
                );
              })
            )}
          </div>
        </div>
        <aside className="next-step-card">
          <div className="next-step-icon">
            <Info size={21} />
          </div>
          <span className="eyebrow">Experimente a proposta</span>
          <h3>Um cuidado mais simples.</h3>
          <p>
            Esta lista é temporária e demonstrativa. Para um atendimento real,
            confirme os canais oficiais da clínica.
          </p>
          <Button variant="soft" onClick={newBooking}>
            Novo agendamento <ArrowRight size={15} />
          </Button>
          <button className="edit-link" onClick={() => go("/ajuda")}>
            Ver canais de apoio <ArrowRight size={15} />
          </button>
        </aside>
      </section>
    </main>
  );
}

export function WhatsAppPage({ booking, go }: { booking: Booking; go: Go }) {
  const specialty =
    specialties.find((item) => item.id === booking.specialtyId) ??
    specialties[0];
  return (
    <main className="content-page whatsapp-page">
      <PageIntro
        eyebrow="Comunicação proposta"
        title="Assim pode ser o seu WhatsApp"
        description="Uma simulação de como confirmações e lembretes poderiam chegar. Não há integração ativa nem envio de mensagens."
        go={go}
      />
      <section className="container whatsapp-layout">
        <div
          className="phone-frame"
          aria-label="Exemplo visual de mensagens por WhatsApp"
        >
          <div className="phone-notch" />
          <div className="wa-header">
            <button
              onClick={() => go("/agendamentos")}
              aria-label="Voltar aos agendamentos"
            >
              <ArrowLeft size={17} />
            </button>
            <div className="wa-avatar">
              <img
                src="/brand/clinic-escola-mark.svg"
                width={27}
                height={27}
                alt=""
                aria-hidden="true"
              />
            </div>
            <div>
              <strong>Clínica-Escola Integrada</strong>
              <span>Ana Lúcia Chaves Fecury · simulação</span>
            </div>
          </div>
          <div className="chat-area">
            <div className="chat-date">EXEMPLO FICTÍCIO</div>
            <div className="message received">
              <p>
                Olá, {booking.patient.name.split(" ")[0]}! Este seria um exemplo
                de confirmação da Clínica-Escola Integrada Ana Lúcia Chaves
                Fecury.
              </p>
              <div className="message-detail">
                <span>Especialidade</span>
                <strong>{specialty.name}</strong>
                <span>Data</span>
                <strong>
                  {formatDate(booking.date)} · {booking.time}
                </strong>
              </div>
              <small>
                Exemplo de confirmação{" "}
                <span className="checks" aria-hidden="true">
                  ✓✓
                </span>
              </small>
            </div>
            <div className="message received reminder">
              <div className="reminder-title">
                <Clock3 size={15} /> Lembrete proposto
              </div>
              <p>
                Lembrete para o atendimento de {formatDate(booking.date)}, às{" "}
                {booking.time}. Caso precise de ajuda, procure os canais
                oficiais da clínica.
              </p>
              <small>
                Exemplo de lembrete{" "}
                <span className="checks" aria-hidden="true">
                  ✓✓
                </span>
              </small>
            </div>
          </div>
          <div className="wa-input">
            <span>Representação visual, sem envio</span>
            <Send size={17} />
          </div>
        </div>
        <div className="whatsapp-explain">
          <div className="whatsapp-badge">
            <MessageCircle size={21} />
          </div>
          <span className="eyebrow">Para a apresentação</span>
          <h2>Mais clareza, menos preocupação.</h2>
          <p>
            O WhatsApp aparece como possibilidade futura. Uma solução real
            dependeria de validação com a clínica, consentimento e integração
            apropriada.
          </p>
          <div className="concept-list">
            <span>
              <CheckCircle2 size={16} /> Confirmação proposta
            </span>
            <span>
              <CheckCircle2 size={16} /> Lembrete proposto
            </span>
            <span>
              <CheckCircle2 size={16} /> Sem mensagens enviadas
            </span>
          </div>
          <Button variant="soft" onClick={() => go("/agendamentos")}>
            Voltar aos meus agendamentos <ArrowRight size={15} />
          </Button>
        </div>
      </section>
    </main>
  );
}

export function PrivacyPage({
  go,
  resetDemo,
}: {
  go: Go;
  resetDemo: () => void;
}) {
  return (
    <main className="content-page">
      <PageIntro
        eyebrow="Privacidade na demonstração"
        title="Use somente dados fictícios"
        description="Este protótipo não é um canal de atendimento nem um sistema real da clínica."
        go={go}
      />
      <section className="container privacy-content">
        <div className="patient-form">
          <h2>O que acontece com os dados?</h2>
          <p>
            As informações digitadas e os agendamentos simulados ficam somente
            na memória da página enquanto ela está aberta. Não são enviados à
            clínica, a um banco de dados ou ao WhatsApp. Recarregar a página ou
            reiniciar a demonstração remove esses exemplos.
          </p>
          <h2>O que usar na apresentação?</h2>
          <p>
            Use o perfil fictício já preenchido ou invente dados de exemplo. Não
            insira CPF, telefone, endereço, e-mail ou outras informações reais.
            Esta orientação descreve a demonstração, não substitui uma política
            de privacidade de um serviço real.
          </p>
          <h2>Como seria uma solução real?</h2>
          <p>
            A finalidade proposta seria organizar atendimento e agendamento.
            Qualquer implementação real dependeria de validação institucional,
            regras de acesso, proteção dos dados e informação clara ao paciente.
          </p>
          <div className="form-actions">
            <Button onClick={resetDemo}>Reiniciar demonstração</Button>
            <Button variant="ghost" onClick={() => go("/ajuda")}>
              Ver opções de ajuda <ArrowRight size={16} />
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

export function MissingConfirmationPage({ go }: { go: Go }) {
  return (
    <main className="content-page">
      <section className="container empty-state">
        <CalendarDays size={32} />
        <h1>Ainda não há confirmação nesta visita</h1>
        <p>
          Conclua a revisão para gerar um exemplo de agendamento. Nenhum horário
          real será reservado.
        </p>
        <Button onClick={() => go("/agendamento")}>
          Experimentar agendamento <ArrowRight size={16} />
        </Button>
      </section>
    </main>
  );
}
