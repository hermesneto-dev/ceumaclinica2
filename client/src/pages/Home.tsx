import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Accessibility,
  CalendarDays,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleHelp,
  Clock3,
  ChevronDown,
  Contrast,
  GraduationCap,
  House,
  Info,
  Landmark,
  LifeBuoy,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Search,
  ShieldCheck,
  Sparkles,
  Type,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { CareIcon, type CareIconName } from "../components/CareIcon";

import {
  specialties,
  availableDates,
  dateParts,
  createDraft,
  selectSpecialty,
  unavailableTime,
  validSelection,
  validatePatient,
  createProtocol,
  type Specialty,
  type Booking,
  type Appointment,
} from "../lib/booking";

import {
  Brand,
  Button,
  PageIntro,
  SectionHeading,
} from "../components/ClinicUI";
import {
  BookingPage,
  PatientFormPage,
  ReviewPage,
  SuccessPage,
  AppointmentsPage,
  WhatsAppPage,
  PrivacyPage,
  MissingConfirmationPage,
} from "../components/BookingJourney";

const navItems = [
  ["Início", "/"],
  ["Especialidades", "/especialidades"],
  ["Exames e serviços", "/servicos"],
  ["Agendamento", "/agendamento"],
  ["Meus agendamentos", "/agendamentos"],
  ["Informações", "/informacoes"],
  ["Ajuda", "/ajuda"],
  ["Sobre a proposta", "/sobre-proposta"],
] as const;

function Header({
  go,
  location,
}: {
  go: (path: string) => void;
  location: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="header-inner">
        <button
          className="brand-button"
          onClick={() => go("/")}
          aria-label="Voltar ao início"
        >
          <Brand />
        </button>
        <nav
          id="main-navigation"
          className={`main-nav ${open ? "is-open" : ""}`}
          aria-label="Navegação principal"
        >
          {navItems.map(([label, path]) => (
            <button
              key={path}
              className={`nav-link ${location === path || (path === "/especialidades" && location.startsWith(path + "/")) ? "is-current" : ""}`}
              aria-current={location === path ? "page" : undefined}
              onClick={() => {
                go(path);
                setOpen(false);
              }}
            >
              {label}
            </button>
          ))}
          <Button
            onClick={() => {
              go("/agendamento");
              setOpen(false);
            }}
            className="nav-cta"
          >
            Agendar atendimento <ArrowRight size={16} />
          </Button>
        </nav>
        <button
          className="menu-toggle"
          aria-controls="main-navigation"
          aria-expanded={open}
          onClick={() => setOpen(!open)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}

function Footer({ go, onShowAccessibility }: { go: (path: string) => void; onShowAccessibility?: () => void }) {
  return (
    <footer className="site-footer">
      <div className="footer-main container">
        <div>
          <Brand />
          <p className="footer-note">
            Uma proposta digital para deixar o cuidado mais acessível, sem
            substituir os canais tradicionais.
          </p>
        </div>
        <div className="footer-links">
          <strong>Atalhos</strong>
          <button onClick={() => go("/agendamento")}>
            Agendar atendimento
          </button>
          <button onClick={() => go("/especialidades")}>Especialidades</button>
          <button onClick={() => go("/ajuda")}>Precisa de ajuda?</button>
          {onShowAccessibility && (
            <button onClick={onShowAccessibility}>Mostrar acessibilidade</button>
          )}
        </div>
        <div className="footer-contact">
          <strong>Fale com a clínica</strong>
          <span>
            <Phone size={15} /> (98) 3214-0000
          </span>
          <span>
            <MapPin size={15} /> Campus Renascença, São Luís — MA
          </span>
          <span>
            <Clock3 size={15} /> Seg a sex · 07h às 18h
          </span>
        </div>
      </div>
      <div className="footer-bottom">
        <span>
          © 2026 Clínica-Escola Integrada Ana Lúcia Chaves Fecury · MVP
          acadêmico
        </span>
        <button onClick={() => go("/privacidade")}>
          Privacidade e uso de dados
        </button>
      </div>
    </footer>
  );
}

function HomePage({ go }: { go: (path: string) => void }) {
  return (
    <>
      <main>
        <section className="hero-section">
          <div className="hero-orb orb-one" />
          <div className="hero-orb orb-two" />
          <div className="container hero-grid">
            <div className="hero-copy">
              <span className="eyebrow eyebrow-light">
                <Sparkles size={14} /> atendimento mais simples
              </span>
              <h1>
                Cuide da sua saúde de forma <em>mais simples.</em>
              </h1>
              <p>
                Consulte informações, escolha um horário e organize seu
                atendimento online. Do seu jeito, no seu tempo.
              </p>
              <div className="hero-actions">
                <Button
                  onClick={() => go("/agendamento")}
                  className="btn-light"
                >
                  Agendar atendimento <ArrowRight size={18} />
                </Button>
                <Button
                  variant="ghost"
                  onClick={() => go("/especialidades")}
                  className="btn-hero-ghost"
                >
                  Consultar especialidades
                </Button>
              </div>
              <div className="hero-support">
                <div className="avatar-stack">
                  <span>MC</span>
                  <span>LR</span>
                  <span>AS</span>
                </div>
                <span>Mais autonomia para o seu cuidado</span>
              </div>
            </div>
            <div className="hero-card-wrap">
              <div className="hero-card">
                <div className="hero-card-top">
                  <span className="status-dot" />{" "}
                  <span>Atendimento disponível</span>
                  <button
                    onClick={() => go("/agendamentos")}
                    aria-label="Ver agendamentos"
                  >
                    <ArrowRight size={17} />
                  </button>
                </div>
                <div className="hero-appointment">
                  <div className="date-tile">
                    <strong>
                      {dateParts(availableDates("clinica-medica")[0]).day}
                    </strong>
                    <span>
                      {dateParts(
                        availableDates("clinica-medica")[0],
                      ).month.toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <span className="appointment-label">Clínica médica</span>
                    <h3>Consulta de rotina</h3>
                    <p>
                      <Clock3 size={14} /> Horário disponível · 09:30
                    </p>
                  </div>
                </div>
                <div className="hero-card-divider" />
                <div className="hero-card-bottom">
                  <span>
                    <MapPin size={14} /> Unidade Renascença
                  </span>
                  <span className="confirmed-pill">
                    <Check size={13} /> Confirmado
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="quick-actions container">
          <button
            className="quick-card quick-teal"
            onClick={() => go("/agendamento")}
          >
            <span className="quick-icon">
              <CareIcon name="calendar" />
            </span>
            <span>
              <strong>Agendar atendimento</strong>
              <small>Escolha especialidade, data e horário</small>
            </span>
            <ChevronRight />
          </button>
          <button
            className="quick-card quick-blue"
            onClick={() => go("/especialidades")}
          >
            <span className="quick-icon">
              <CareIcon name="specialties" />
            </span>
            <span>
              <strong>Conhecer especialidades</strong>
              <small>Veja como podemos ajudar</small>
            </span>
            <ChevronRight />
          </button>
          <button
            className="quick-card quick-yellow"
            onClick={() => go("/servicos")}
          >
            <span className="quick-icon">
              <CareIcon name="services" />
            </span>
            <span>
              <strong>Exames e serviços</strong>
              <small>Orientações para o seu atendimento</small>
            </span>
            <ChevronRight />
          </button>
        </section>
        <section
          className="container home-contact-strip"
          aria-label="Informações e canais disponíveis"
        >
          <span>
            <Clock3 size={16} /> Seg a sex · 07h às 18h
          </span>
          <span>
            <MapPin size={16} /> Campus Renascença · São Luís
          </span>
          <button onClick={() => go("/informacoes")}>
            <Phone size={16} /> Telefone de atendimento
          </button>
          <button onClick={() => go("/whatsapp")}>
            <MessageCircle size={16} /> WhatsApp
          </button>
        </section>
        <section className="container how-it-works" aria-labelledby="how-title">
          <div>
            <span className="eyebrow">Jornada do MVP</span>
            <h2 id="how-title">Como funciona a proposta</h2>
            <p>Uma experiência guiada para reduzir dúvidas antes do atendimento.</p>
          </div>
          <div className="how-steps">
            {[
              ["01", "Escolha uma especialidade", "Veja áreas e horários de atendimento."],
              ["02", "Selecione data e horário", "Navegue pelo calendário disponível."],
              ["03", "Preencha seus dados", "Informe apenas o necessário para continuar."],
              ["04", "Revise e confirme", "Confira tudo antes de finalizar."],
            ].map(([number, title, text]) => (
              <div className="how-step" key={number}>
                <span>{number}</span>
                <strong>{title}</strong>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>
        <section className="home-section container">
          <SectionHeading
            eyebrow="Para você"
            title="Informação que vira cuidado"
            description="Tudo que você precisa para chegar mais tranquilo ao seu atendimento."
            action="Ver todas"
            onAction={() => go("/especialidades")}
          />
          <div className="feature-grid">
            <article className="feature-card feature-main">
              <div className="feature-visual">
                <div className="visual-circle">
                  <CareIcon name="care" size={42} />
                </div>
                <span className="visual-label">Cuidado em cada etapa</span>
                <div className="visual-line line-a" />
                <div className="visual-line line-b" />
              </div>
              <div className="feature-content">
                <span className="eyebrow">Experiência do paciente</span>
                <h3>Você escolhe como quer ser atendido.</h3>
                <p>
                  O site é uma alternativa para facilitar sua jornada. Se
                  preferir, nosso telefone e atendimento presencial continuam
                  disponíveis.
                </p>
                <Button variant="soft" onClick={() => go("/ajuda")}>
                  Entender como funciona <ArrowRight size={16} />
                </Button>
              </div>
            </article>
            <div className="feature-side">
              <article className="mini-card">
                <div className="mini-icon blue-bg">
                  <CareIcon name="location" />
                </div>
                <div>
                  <h3>Onde estamos</h3>
                  <p>Campus Renascença, em São Luís.</p>
                  <button onClick={() => go("/informacoes")}>
                    Ver informações <ArrowRight size={14} />
                  </button>
                </div>
              </article>
              <article className="mini-card">
                <div className="mini-icon teal-bg">
                  <CareIcon name="phone" />
                </div>
                <div>
                  <h3>Fale com a equipe</h3>
                  <p>Seg a sex, das 07h às 18h.</p>
                  <button onClick={() => go("/ajuda")}>
                    Encontrar canais <ArrowRight size={14} />
                  </button>
                </div>
              </article>
            </div>
          </div>
        </section>
        <section className="trust-strip">
          <div className="container trust-grid">
            <div className="trust-title">
              <ShieldCheck size={22} />
              <div>
                <strong>Uma proposta pensada para incluir</strong>
                <span>
                  Digital para quem quer praticidade. Presencial e telefone para
                  quem preferir.
                </span>
              </div>
            </div>
            <div className="trust-point">
              <CheckCircle2 size={18} />
              <span>Linguagem simples</span>
            </div>
            <div className="trust-point">
              <CheckCircle2 size={18} />
          <span>Privacidade em cada etapa</span>
            </div>
            <div className="trust-point">
              <CheckCircle2 size={18} />
              <span>Acessível no celular</span>
            </div>
          </div>
        </section>
        <section className="home-section container">
          <SectionHeading
            eyebrow="Ajuda quando precisar"
            title="Ainda ficou com alguma dúvida?"
            description="Você não precisa resolver tudo sozinho."
          />
          <div className="help-banner">
            <div className="help-banner-icon">
              <LifeBuoy size={25} />
            </div>
            <div>
              <h3>Precisa de ajuda para agendar?</h3>
              <p>
                Conte com a equipe por telefone ou venha conversar
                presencialmente. O digital é uma opção, nunca uma obrigação.
              </p>
            </div>
            <Button variant="dark" onClick={() => go("/ajuda")}>
              Ver formas de atendimento <ArrowRight size={16} />
            </Button>
          </div>
        </section>
      </main>
    </>
  );
}

function SpecialtyCard({
  specialty,
  go,
}: {
  specialty: Specialty;
  go: (path: string) => void;
}) {
  return (
    <article className={`specialty-card ${specialty.tone}`}>
      <div className="specialty-card-top">
        <div className="specialty-icon">
          <CareIcon name={specialty.icon} size={25} />
        </div>
        <span className="card-arrow">
          <ArrowUpRight />
        </span>
      </div>
      <span className="eyebrow">{specialty.eyebrow}</span>
      <h3>{specialty.name}</h3>
      <p>{specialty.description}</p>
      <span className="data-badge">Agenda do MVP</span>
      <small className="specialty-days">{specialty.days} · horários de atendimento</small>
      <button onClick={() => go(`/especialidades/${specialty.id}`)}>
        Ver horários <ArrowRight size={15} />
      </button>
    </article>
  );
}

function SpecialtiesPage({ go }: { go: (path: string) => void }) {
  const [search, setSearch] = useState("");
  const relatedTerms: Record<string, string> = {
    cardiologia: "coração cardiovascular pressão",
    "clinica-medica": "clínico geral consulta rotina prevenção",
    ginecologia: "mulher feminino prevenção",
    pediatria: "criança adolescente infantil",
    dermatologia: "pele cabelo unhas",
  };
  const filtered = specialties.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase()) ||
      relatedTerms[item.id].includes(search.toLowerCase().trim()),
  );
  return (
    <main className="content-page">
      <PageIntro
        eyebrow="Conheça nosso cuidado"
        title="Especialidades para cada momento"
        description="Encontre a área que você procura e veja os próximos horários disponíveis."
        action="Agendar agora"
        go={go}
      />
      <div className="container search-row">
        <div className="search-box">
          <Search size={18} />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar especialidade"
            aria-label="Buscar especialidade"
          />
        </div>
        <span className="result-count">
          {filtered.length} opções encontradas
        </span>
      </div>
      <p className="container search-hint">
        Você também pode buscar por termos relacionados, como “coração”, “pele” ou “criança”.
      </p>
      <section className="container specialty-grid">
        {filtered.length === 0 && (
          <div className="empty-state search-empty">
            <Search size={25} />
            <h2>Nenhuma especialidade encontrada</h2>
            <p>Tente outro termo ou limpe a busca.</p>
            <Button variant="soft" onClick={() => setSearch("")}>
              Limpar busca
            </Button>
          </div>
        )}
        {filtered.map((item) => (
          <SpecialtyCard key={item.id} specialty={item} go={go} />
        ))}
      </section>
      <section className="container small-note">
        <MessageCircle size={18} />
        <p>
          Não encontrou o que precisa?{" "}
          <button onClick={() => go("/ajuda")}>Fale com a equipe</button> e
          encontre o melhor caminho.
        </p>
      </section>
    </main>
  );
}

function SpecialtyDetailPage({
  specialty,
  go,
  startBooking,
}: {
  specialty: Specialty;
  go: (path: string) => void;
  startBooking: (id: string) => void;
}) {
  return (
    <main className="content-page">
      <div className="container breadcrumb">
        <button onClick={() => go("/especialidades")}>
          <ArrowLeft size={15} /> Especialidades
        </button>
        <ChevronRight size={14} />
        <span>{specialty.name}</span>
      </div>
      <section className="container detail-layout">
        <div className={`detail-hero ${specialty.tone}`}>
          <div className="specialty-icon large">
            <CareIcon name={specialty.icon} size={35} />
          </div>
          <span className="eyebrow">{specialty.eyebrow}</span>
          <h1>{specialty.name}</h1>
          <p>{specialty.detail}</p>
          <div className="detail-tags">
            <span>
              <CalendarDays size={15} /> {specialty.days}
            </span>
            <span>
              <Clock3 size={15} /> Agenda do MVP
            </span>
          </div>
        </div>
        <div className="detail-side-card">
          <span className="eyebrow">Próximos horários</span>
          <h3>Escolha um horário que funcione para você.</h3>
          <div className="detail-schedule">
            {availableDates(specialty.id)
              .slice(0, 3)
              .map((date) => {
                const part = dateParts(date);
                return (
                  <div key={date}>
                    <span className="schedule-day">
                      {part.weekday.toUpperCase()}
                    </span>
                    <strong>{part.day}</strong>
                    <small>{part.month}</small>
                  </div>
                );
              })}
          </div>
          <div
            className="detail-time-list"
            aria-label="Horários disponíveis"
          >
            {specialty.times
              .filter((time) => !unavailableTime(specialty.id, time))
              .map((time) => (
                <span key={time}>
                  <Clock3 size={13} /> {time}
                </span>
              ))}
          </div>
          <p className="schedule-explanation">
            Horários de atendimento, sem disponibilidade real. Confirme a oferta nos
            canais oficiais.
          </p>
          <Button
            onClick={() => startBooking(specialty.id)}
            className="full-btn"
          >
            Agendar <ArrowRight size={16} />
          </Button>
        </div>
      </section>
      <section className="container detail-info-grid">
        <div>
          <SectionHeading
            eyebrow="Para entender"
            title="Como funciona"
            description="Um atendimento pensado para ouvir você com calma e orientar os próximos passos."
          />
          <div className="step-list">
            <div>
              <span>01</span>
              <div>
                <strong>Escuta inicial</strong>
                <p>Você compartilha o que está sentindo e o que precisa.</p>
              </div>
            </div>
            <div>
              <span>02</span>
              <div>
                <strong>Avaliação individual</strong>
                <p>
                  A equipe entende seu momento e registra as informações
                  necessárias.
                </p>
              </div>
            </div>
            <div>
              <span>03</span>
              <div>
                <strong>Orientação</strong>
                <p>Você sai com clareza sobre os próximos passos do cuidado.</p>
              </div>
            </div>
          </div>
        </div>
        <div className="professional-card">
          <div className="profile-avatar">
            {specialty.professional
              .split(" ")
              .slice(1, 3)
              .map((name) => name[0])
              .join("")}
          </div>
          <span className="eyebrow">Profissional de referência</span>
          <h3>{specialty.professional}</h3>
          <p>
            Atendimento acolhedor e centrado nas necessidades de cada paciente.
          </p>
          <span className="pro-note">
            <CheckCircle2 size={15} /> Agenda do MVP
          </span>
        </div>
      </section>
    </main>
  );
}

function InfoPage({ go }: { go: (path: string) => void }) {
  return (
    <main className="content-page">
      <PageIntro
        eyebrow="Conheça a clínica"
        title="Informação para você se localizar"
        description="Localização, horários e contatos informativos para avaliar a proposta. Confirme os canais oficiais antes de buscar atendimento."
        action="Agendar atendimento"
        go={go}
      />
      <section className="container info-layout">
        <div className="map-card">
          <div className="map-top">
            <span className="eyebrow">Localização</span>
            <span className="map-tag">
              <MapPin size={14} /> São Luís, MA
            </span>
          </div>
          <div className="fake-map">
            <div className="map-road road-one" />
            <div className="map-road road-two" />
            <div className="map-road road-three" />
            <div className="map-block block-one" />
            <div className="map-block block-two" />
            <div className="map-block block-three" />
            <div className="map-pin">
              <MapPin size={22} />
            </div>
          </div>
          <div className="address-row">
            <div>
              <strong>Clínica-Escola Integrada · Unidade Renascença</strong>
              <span>Av. Jerônimo de Albuquerque, 1200 · Campus CEUMA</span>
              <span>São Luís — MA, 65075-120</span>
            </div>
            <span className="map-tag">Mapa informativo</span>
          </div>
        </div>
        <div className="info-side">
          <div className="info-card">
            <div className="mini-icon teal-bg">
              <Clock3 />
            </div>
            <div>
              <span className="eyebrow">Horário de funcionamento</span>
              <strong>Segunda a sexta</strong>
              <p>07h às 18h</p>
              <small>Atendimento telefônico até 17h30</small>
            </div>
          </div>
          <div className="info-card">
            <div className="mini-icon blue-bg">
              <Phone />
            </div>
            <div>
              <span className="eyebrow">Canais de atendimento</span>
              <strong>(98) 3214-0000</strong>
              <p>WhatsApp: (98) 98888-0000</p>
              <small>Resposta em horário comercial</small>
            </div>
          </div>
          <div className="info-card">
            <div className="mini-icon lavender-bg">
              <Landmark />
            </div>
            <div>
              <span className="eyebrow">Dentro da clínica</span>
              <strong>Recepção principal</strong>
              <p>Campus Renascença · Bloco de Saúde</p>
              <small>Procure a equipe de acolhimento</small>
            </div>
          </div>
        </div>
      </section>
      <section className="container info-bottom">
        <SectionHeading
          eyebrow="No seu tempo"
          title="Escolha o melhor canal para você"
          description="O site é uma opção. O telefone e o atendimento presencial continuam disponíveis."
        />
        <div className="channel-grid">
          <button onClick={() => go("/agendamento")}>
            <CalendarDays />
            <strong>Quero agendar online</strong>
            <span>Escolho data e horário pelo site</span>
            <ArrowRight />
          </button>
          <button onClick={() => go("/ajuda")}>
            <Phone />
            <strong>Prefiro falar por telefone</strong>
            <span>Recebo ajuda da equipe</span>
            <ArrowRight />
          </button>
          <button onClick={() => go("/ajuda")}>
            <House />
            <strong>Quero ir presencialmente</strong>
            <span>Converso com a recepção</span>
            <ArrowRight />
          </button>
        </div>
      </section>
      <section className="container info-bottom">
        <SectionHeading
          eyebrow="Cuidado e orientação"
          title="Conheça o que está na proposta"
          description="Conheça as especialidades e serviços disponíveis. Confirme a oferta e os horários com a clínica."
        />
        <div
          className="info-specialty-links"
          aria-label="Especialidades disponíveis"
        >
          {specialties.map((item) => (
            <Button
              key={item.id}
              variant="soft"
              onClick={() => go(`/especialidades/${item.id}`)}
            >
              {item.name} <ArrowRight size={14} />
            </Button>
          ))}
        </div>
        <div className="service-note">
          <Info size={20} />
          <div>
            <strong>Antes de buscar atendimento real</strong>
            <p>
              Confirme os contatos, o endereço e a disponibilidade nos canais
              oficiais. Para exames ou procedimentos, consulte a equipe sobre os
              documentos e as orientações necessários; este MVP não
              fornece preparo médico.
            </p>
            <Button variant="ghost" onClick={() => go("/servicos")}>
              Consultar exames e serviços <ArrowRight size={15} />
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

function ServicesPage({ go }: { go: (path: string) => void }) {
  const services: {
    icon: CareIconName;
    title: string;
    description: string;
    note: string;
  }[] = [
    {
      icon: "services",
      title: "Exames laboratoriais",
      description: "Informações gerais para você entender como se preparar.",
      note: "Consulte orientações",
    },
    {
      icon: "care",
      title: "Avaliações clínicas",
      description:
        "Atendimentos de cuidado integral para diferentes necessidades.",
      note: "Ver especialidades",
    },
    {
      icon: "heart",
      title: "Acompanhamento em saúde",
      description:
        "Orientações para acompanhar seu cuidado com mais tranquilidade.",
      note: "Falar com a equipe",
    },
  ];
  return (
    <main className="content-page">
      <PageIntro
        eyebrow="Serviços para você"
        title="Encontre o que precisa antes de ir"
        description="Informações organizadas para reduzir dúvidas e deixar seu atendimento mais tranquilo."
        action="Agendar atendimento"
        go={go}
      />
      <section className="container services-layout">
        <div className="service-list">
          {services.map((item) => (
            <article className="service-card" key={item.title}>
              <div className="service-icon">
                <CareIcon name={item.icon} size={25} />
              </div>
              <div>
                <span className="eyebrow">Disponível na proposta</span>
                <h2>{item.title}</h2>
                <p>{item.description}</p>
                <button
                  onClick={() =>
                    go(
                      item.title.includes("Avaliações")
                        ? "/especialidades"
                        : "/ajuda",
                    )
                  }
                >
                  {item.note} <ArrowRight size={15} />
                </button>
              </div>
            </article>
          ))}
        </div>
        <aside className="orientation-card">
          <div className="orientation-icon">
            <Info size={21} />
          </div>
          <span className="eyebrow">Importante</span>
          <h3>As orientações podem variar.</h3>
          <p>
            Antes de qualquer exame ou procedimento, confirme as instruções com
            a equipe da clínica. Esta página é uma visão do MVP e não
            substitui uma orientação profissional.
          </p>
          <Button variant="soft" onClick={() => go("/ajuda")}>
            Tirar dúvidas <ArrowRight size={16} />
          </Button>
        </aside>
      </section>
      <section className="container service-note">
        <ShieldCheck size={18} />
        <div>
          <strong>Sem preços ou informações médicas inventadas</strong>
          <p>
            O MVP apresenta apenas a ideia de organização dos serviços. Os
            detalhes serão definidos pela clínica.
          </p>
        </div>
      </section>
    </main>
  );
}

function HelpPage({ go }: { go: (path: string) => void }) {
  const options = [
    {
      icon: CalendarDays,
      title: "Preciso de ajuda para agendar",
      text: "Em uma solução real, a equipe poderia orientar você em cada etapa.",
      action: "Falar com a equipe",
    },
    {
      icon: Phone,
      title: "Prefiro atendimento por telefone",
      text: "Telefone de atendimento: (98) 3214-0000. Confirme o canal oficial antes de ligar.",
      action: "Ver telefone disponível",
    },
    {
      icon: House,
      title: "Quero atendimento presencial",
      text: "A proposta mantém a recepção presencial como alternativa. Local informativo: Unidade Renascença.",
      action: "Ver endereço",
    },
  ];
  return (
    <main className="content-page help-page">
      <div className="container help-hero">
        <div className="help-hero-icon">
          <LifeBuoy size={30} />
        </div>
        <span className="eyebrow">Acolhimento em primeiro lugar</span>
        <h1>Precisa de ajuda?</h1>
        <p>
          Você não precisa dominar a tecnologia para cuidar da sua saúde.
          Escolha o jeito que deixa você mais confortável.
        </p>
      </div>
      <section className="container help-options">
        {options.map((option) => {
          const Icon = option.icon;
          return (
            <article key={option.title}>
              <div className="help-option-icon">
                <Icon size={21} />
              </div>
              <h2>{option.title}</h2>
              <p>{option.text}</p>
              <button onClick={() => go("/informacoes")}>
                {option.action} <ArrowRight size={15} />
              </button>
            </article>
          );
        })}
      </section>
      <section className="container accessibility-card">
        <div>
          <span className="eyebrow">Acessibilidade e privacidade</span>
          <h2>O digital deve facilitar, não criar barreiras.</h2>
          <p>
            Use zoom, leitor de tela ou peça ajuda a alguém de confiança. A
            equipe presencial e telefônica continua existindo. Os dados deste
            Os dados informados no MVP, em uma solução real, seriam utilizados
            apenas para atendimento e agendamento.
          </p>
        </div>
        <div className="accessibility-list">
          <span>
            <CheckCircle2 size={16} /> Texto simples e legível
          </span>
          <span>
            <CheckCircle2 size={16} /> Botões grandes e claros
          </span>
          <span>
            <CheckCircle2 size={16} /> Ajuda sempre por perto
          </span>
        </div>
      </section>
      <section className="container faq-section" aria-labelledby="faq-title">
        <div className="section-heading">
          <div>
            <span className="eyebrow">Dúvidas frequentes</span>
            <h2 id="faq-title">Respostas para começar</h2>
          </div>
          <span className="data-badge">Conteúdo disponível</span>
        </div>
        <div className="faq-list">
          {[
            ["Como faço um agendamento?", "Escolha uma especialidade, uma data e um horário. Depois, preencha seus dados e revise o atendimento."],
            ["O atendimento digital é obrigatório?", "Não. A proposta mantém telefone e atendimento presencial como alternativas para quem preferir."],
            ["Meus dados são enviados à clínica?", "Não. Este MVP não envia dados para a clínica e guarda atendimentos somente neste navegador."],
            ["Posso cancelar ou alterar um atendimento?", "Sim. Na área Meus agendamentos, use os controles locais de alterar ou cancelar a atendimento."],
          ].map(([question, answer]) => (
            <details key={question}>
              <summary>{question}<ChevronDown size={17} /></summary>
              <p>{answer}</p>
            </details>
          ))}
        </div>
      </section>
    </main>
  );
}

function ProposalPage({ go }: { go: (path: string) => void }) {
  const stakeholders = [
    ["Pacientes", "Encontrar informações claras e autonomia para escolher o canal."],
    ["Recepção", "Reduzir dúvidas repetitivas e organizar a chegada dos atendimentos."],
    ["Profissionais e supervisores", "Visualizar uma jornada mais previsível para o cuidado."],
    ["Coordenação", "Acompanhar uma proposta integrada sem perder o acolhimento."],
  ];
  return (
    <main className="content-page proposal-page">
      <PageIntro
        eyebrow="Apresentação acadêmica"
        title="Uma proposta para aproximar cuidado e informação"
        description="Esta área explica o raciocínio do MVP, seus limites e possibilidades futuras. Não é uma página de atendimento real."
        action="Começar agendamento"
        go={go}
      />
      <section className="container proposal-grid">
        <article className="proposal-card proposal-highlight">
          <GraduationCap size={24} />
          <span className="eyebrow">Objetivo da solução</span>
          <h2>Deixar a jornada mais compreensível antes da chegada à clínica.</h2>
          <p>O MVP organiza informações, apresenta alternativas digitais e preserva o telefone e o atendimento presencial.</p>
        </article>
        <article className="proposal-card">
          <span className="eyebrow">5 porquês · síntese</span>
          <h2>Por que esta proposta existe?</h2>
          <ol>
            <li>Porque pacientes têm dúvidas antes de buscar atendimento.</li>
            <li>Porque informações dispersas dificultam a decisão.</li>
            <li>Porque a recepção recebe perguntas repetitivas.</li>
            <li>Porque a jornada ainda pode ser mais orientada.</li>
            <li>Porque uma interface clara pode apoiar o acolhimento.</li>
          </ol>
        </article>
      </section>
      <section className="container proposal-section">
        <SectionHeading eyebrow="Quem participa" title="Stakeholders considerados" description="Uma visão inicial para orientar futuras validações com a instituição." />
        <div className="stakeholder-grid">
          {stakeholders.map(([name, text]) => <article key={name}><strong>{name}</strong><p>{text}</p></article>)}
        </div>
      </section>
      <section className="container proposal-limitations">
        <Info size={20} />
        <div><strong>Limites atuais e próximos passos</strong><p>Os dados são informados, ainda não há integração com sistemas da clínica. Uma evolução exigiria validação institucional, requisitos de privacidade e arquitetura segura.</p></div>
        <Button variant="soft" onClick={() => go("/privacidade")}>Ver privacidade <ArrowRight size={15} /></Button>
      </section>
    </main>
  );
}

function AccessibilityControls({
  highContrast,
  setHighContrast,
  largeText,
  setLargeText,
  hidden,
  setHidden,
}: {
  highContrast: boolean;
  setHighContrast: (value: boolean) => void;
  largeText: boolean;
  setLargeText: (value: boolean) => void;
  hidden: boolean;
  setHidden: (value: boolean) => void;
}) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", closeOnEscape);
    return () => document.removeEventListener("keydown", closeOnEscape);
  }, [open]);
  if (hidden) return null;
  return (
    <div className="accessibility-widget">
      <button
        className={`accessibility-trigger ${open ? "is-open" : ""}`}
        aria-label="Abrir opções de acessibilidade"
        aria-expanded={open}
        aria-controls="accessibility-panel"
        aria-haspopup="dialog"
        onClick={() => setOpen((value) => !value)}
      >
        <Accessibility size={21} aria-hidden="true" />
        <span className="sr-only">Acessibilidade</span>
      </button>
      {open && (
        <div className="accessibility-modal-backdrop" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setOpen(false);
        }}>
          <div id="accessibility-panel" className="accessibility-panel" role="dialog" aria-modal="true" aria-labelledby="accessibility-title">
            <div className="accessibility-panel-heading">
              <div className="accessibility-panel-icon"><Accessibility size={19} /></div>
              <div>
                <strong id="accessibility-title">Acessibilidade</strong>
                <span>Escolha os recursos que ajudam na sua leitura.</span>
              </div>
              <button className="accessibility-close" onClick={() => setOpen(false)} aria-label="Fechar opções de acessibilidade"><X size={18} /></button>
            </div>
            <div className="accessibility-options">
              <button aria-pressed={highContrast} onClick={() => setHighContrast(!highContrast)}>
                <Contrast size={17} />
                <span><strong>Alto contraste</strong><small>Reforça cores e bordas.</small></span>
                <span className="accessibility-check" aria-hidden="true">{highContrast ? "Ativo" : "Ativar"}</span>
              </button>
              <button aria-pressed={largeText} onClick={() => setLargeText(!largeText)}>
                <Type size={17} />
                <span><strong>Texto maior</strong><small>Aumenta o tamanho do texto.</small></span>
                <span className="accessibility-check" aria-hidden="true">{largeText ? "Ativo" : "Ativar"}</span>
              </button>
              <button className="accessibility-hide" onClick={() => { setOpen(false); setHidden(true); }}>
                <X size={17} />
                <span><strong>Ocultar botão</strong><small>Reative pelo rodapé quando quiser.</small></span>
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
  );
}

export default function Home() {
  const [location, setLocation] = useLocation();
  const [booking, setBooking] = useState<Booking>(createDraft);
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    if (typeof window === "undefined") return [];
    try { return JSON.parse(window.localStorage.getItem("ceuma-mvp-appointments") ?? "[]") as Appointment[]; } catch { return []; }
  });
  const [confirmed, setConfirmed] = useState<Appointment | null>(() => {
    if (typeof window === "undefined") return null;
    try { return JSON.parse(window.localStorage.getItem("ceuma-mvp-confirmed") ?? "null") as Appointment | null; } catch { return null; }
  });
  const [highContrast, setHighContrast] = useState(() => typeof window !== "undefined" && window.localStorage.getItem("ceuma-high-contrast") === "true");
  const [largeText, setLargeText] = useState(() => typeof window !== "undefined" && window.localStorage.getItem("ceuma-large-text") === "true");
  const [accessibilityHidden, setAccessibilityHidden] = useState(() => typeof window !== "undefined" && window.localStorage.getItem("ceuma-accessibility-hidden") === "true");
  const [messageBooking, setMessageBooking] = useState<Booking | null>(null);
  const go = (path: string) => {
    if (
      ["/agendamento", "/cadastro", "/confirmacao", "/whatsapp"].includes(path)
    )
      setMessageBooking(null);
    setLocation(path);
  };
  const showMessage = (item: Booking) => {
    setMessageBooking(item);
    setLocation("/whatsapp");
  };
  const cleanPath = location.split("?")[0];
  const specialty = specialties.find(
    (item) => cleanPath === `/especialidades/${item.id}`,
  );
  const startBooking = (id?: string) => {
    setBooking((prev) => (id ? selectSpecialty(prev, id) : createDraft()));
    setMessageBooking(null);
    go("/agendamento");
  };
  const confirm = () => {
    if (!validSelection(booking) || validatePatient(booking.patient)) return;
    const appointment: Appointment = {
      ...booking,
      patient: { ...booking.patient },
      protocol: createProtocol(booking.date, appointments.length + 1),
    };
    setAppointments((prev) => [...prev, appointment]);
    setConfirmed(appointment);
    setMessageBooking(appointment);
    go("/sucesso");
  };
  const editBooking = (appointment: Appointment) => {
    setBooking({ ...appointment, patient: { ...appointment.patient } });
    go("/agendamento");
  };
  const cancelAppointment = (protocol: string) => {
    setAppointments((prev) => prev.filter((item) => item.protocol !== protocol));
  };
  const resetLocalData = () => {
    setBooking(createDraft());
    setAppointments([]);
    setConfirmed(null);
    setMessageBooking(null);
    go("/");
  };
  useEffect(() => {
    window.localStorage.setItem("ceuma-mvp-appointments", JSON.stringify(appointments));
  }, [appointments]);
  useEffect(() => {
    if (confirmed) window.localStorage.setItem("ceuma-mvp-confirmed", JSON.stringify(confirmed));
    else window.localStorage.removeItem("ceuma-mvp-confirmed");
  }, [confirmed]);
  useEffect(() => {
    window.localStorage.setItem("ceuma-high-contrast", String(highContrast));
    window.localStorage.setItem("ceuma-large-text", String(largeText));
  }, [highContrast, largeText]);
  useEffect(() => {
    window.localStorage.setItem("ceuma-accessibility-hidden", String(accessibilityHidden));
  }, [accessibilityHidden]);
  useEffect(() => {
    const title =
      navItems.find(([, path]) => path === cleanPath)?.[0] ??
      specialty?.name ??
      "MVP";
    document.title = `${title} · Clínica-Escola Integrada Ana Lúcia Chaves Fecury`;
    window.scrollTo({ top: 0, behavior: "instant" });
    const main = document.querySelector("main");
    if (main) {
      main.id = "main-content";
      main.tabIndex = -1;
      main.focus({ preventScroll: true });
    }
  }, [cleanPath, specialty?.name]);
  let content: React.ReactNode;
  if (cleanPath === "/") content = <HomePage go={go} />;
  else if (cleanPath === "/especialidades")
    content = <SpecialtiesPage go={go} />;
  else if (specialty)
    content = (
      <SpecialtyDetailPage
        specialty={specialty}
        go={go}
        startBooking={startBooking}
      />
    );
  else if (cleanPath === "/agendamento")
    content = <BookingPage booking={booking} setBooking={setBooking} go={go} />;
  else if (cleanPath === "/cadastro")
    content = (
      <PatientFormPage booking={booking} setBooking={setBooking} go={go} />
    );
  else if (cleanPath === "/confirmacao")
    content = <ReviewPage booking={booking} go={go} confirm={confirm} />;
  else if (cleanPath === "/sucesso")
    content = confirmed ? (
      <SuccessPage
        appointment={confirmed}
        go={go}
        showMessage={() => showMessage(confirmed)}
      />
    ) : (
      <MissingConfirmationPage go={go} />
    );
  else if (cleanPath === "/agendamentos")
    content = (
      <AppointmentsPage
        appointments={appointments}
        go={go}
        newBooking={() => startBooking()}
        showMessage={showMessage}
        editBooking={editBooking}
        cancelAppointment={cancelAppointment}
      />
    );
  else if (cleanPath === "/informacoes") content = <InfoPage go={go} />;
  else if (cleanPath === "/servicos") content = <ServicesPage go={go} />;
  else if (cleanPath === "/ajuda") content = <HelpPage go={go} />;
  else if (cleanPath === "/sobre-proposta") content = <ProposalPage go={go} />;
  else if (cleanPath === "/privacidade")
    content = <PrivacyPage go={go} resetLocalData={resetLocalData} />;
  else if (cleanPath === "/whatsapp")
    content = <WhatsAppPage booking={messageBooking ?? booking} go={go} />;
  else
    content = (
      <main className="content-page">
        <section className="container empty-state">
          <h1>Página não encontrada</h1>
          <p>Escolha uma seção no menu ou volte ao início.</p>
          <Button onClick={() => go("/")}>
            Voltar para o início <ArrowRight size={16} />
          </Button>
        </section>
      </main>
    );

  return (
    <div className={`app-shell is-loaded ${highContrast ? "high-contrast" : ""} ${largeText ? "large-text" : ""}`}>
      <a className="skip-link" href="#main-content">
        Pular para o conteúdo
      </a>
      <Header go={go} location={cleanPath} />
      <div className="mvp-banner">
        <span>
          MVP acadêmico · Informações para orientação e atendimento
        </span>
        <button onClick={() => go("/privacidade") }>
          Sobre o MVP <ArrowRight size={13} />
        </button>
      </div>
      <AccessibilityControls highContrast={highContrast} setHighContrast={setHighContrast} largeText={largeText} setLargeText={setLargeText} hidden={accessibilityHidden} setHidden={setAccessibilityHidden} />
      {content}
      <Footer go={go} onShowAccessibility={accessibilityHidden ? () => setAccessibilityHidden(false) : undefined} />
      <button
        className="floating-help"
        onClick={() => go("/ajuda")}
        aria-label="Precisa de ajuda"
      >
        <CircleHelp size={19} />
        <span>Ajuda</span>
      </button>
    </div>
  );
}
