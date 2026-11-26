import type { CareIconName } from "../components/CareIcon";

export type Specialty = {
  id: string;
  name: string;
  eyebrow: string;
  description: string;
  detail: string;
  icon: CareIconName;
  tone: string;
  professional: string;
  days: string;
  times: string[];
};

export type Patient = {
  name: string;
  cpf: string;
  birth: string;
  phone: string;
  email: string;
  address: string;
  purpose: string;
};

export type Booking = {
  specialtyId: string;
  professional: string;
  date: string;
  time: string;
  patient: Patient;
};

export const specialties: Specialty[] = [
  {
    id: "clinica-medica",
    name: "Clínica médica",
    eyebrow: "Cuidado integral",
    description:
      "Acompanhamento geral para cuidar da sua saúde de forma contínua.",
    detail:
      "Uma primeira escuta para entender suas necessidades e orientar os próximos passos do cuidado.",
    icon: "heart",
    tone: "teal",
    professional: "Dra. Camila Nunes",
    days: "Terças e quintas",
    times: ["08:00", "09:30", "11:00", "14:30", "16:00"],
  },
  {
    id: "cardiologia",
    name: "Cardiologia",
    eyebrow: "Prevenção e cuidado",
    description: "Orientação especializada para a saúde do coração.",
    detail:
      "Consultas para acompanhamento cardiovascular e avaliação individualizada.",
    icon: "care",
    tone: "blue",
    professional: "Dr. Rafael Martins",
    days: "Segundas e quartas",
    times: ["08:30", "10:00", "13:30", "15:00"],
  },
  {
    id: "ginecologia",
    name: "Ginecologia",
    eyebrow: "Cuidado feminino",
    description: "Atenção integral à saúde da mulher em todas as fases.",
    detail: "Um espaço de escuta, prevenção e acompanhamento com acolhimento.",
    icon: "specialties",
    tone: "coral",
    professional: "Dra. Marina Alves",
    days: "Quartas e sextas",
    times: ["09:00", "10:30", "14:00", "15:30"],
  },
  {
    id: "pediatria",
    name: "Pediatria",
    eyebrow: "Crescer com saúde",
    description: "Acompanhamento para crianças e adolescentes.",
    detail:
      "Atendimento pensado para acolher a criança e orientar toda a família.",
    icon: "child",
    tone: "yellow",
    professional: "Dra. Luísa Rocha",
    days: "Segundas e sextas",
    times: ["08:00", "09:00", "10:00", "14:00"],
  },
  {
    id: "dermatologia",
    name: "Dermatologia",
    eyebrow: "Pele em foco",
    description: "Avaliação e orientação para a saúde da pele.",
    detail:
      "Consulta para entender queixas e construir uma rotina de cuidado adequada.",
    icon: "skin",
    tone: "lavender",
    professional: "Dr. Pedro Siqueira",
    days: "Terças e sextas",
    times: ["08:30", "10:00", "13:30", "16:30"],
  },
];

export type Appointment = Booking & { protocol: string };

const scheduleDays: Record<string, number[]> = {
  "clinica-medica": [2, 4],
  cardiologia: [1, 3],
  ginecologia: [3, 5],
  pediatria: [1, 5],
  dermatologia: [2, 5],
};

export function localDate(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

export function parseDate(value: string): Date {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day, 12);
}

export function availableDates(
  specialtyId: string,
  today = new Date(),
): string[] {
  const days = scheduleDays[specialtyId] ?? scheduleDays["clinica-medica"];
  const result: string[] = [];
  const cursor = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    12,
  );
  // A agenda é uma demonstração: só oferece dias futuros da semana da especialidade.
  for (let offset = 1; offset <= 28 && result.length < 4; offset++) {
    cursor.setDate(cursor.getDate() + 1);
    if (days.includes(cursor.getDay())) result.push(localDate(cursor));
  }
  return result;
}

export function dateParts(value: string) {
  const date = parseDate(value);
  return {
    day: String(date.getDate()),
    month: date
      .toLocaleDateString("pt-BR", { month: "short" })
      .replace(".", ""),
    weekday: date
      .toLocaleDateString("pt-BR", { weekday: "short" })
      .replace(".", ""),
    year: String(date.getFullYear()),
  };
}

export function formatDate(value: string): string {
  return parseDate(value).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function unavailableTime(specialtyId: string, time: string): boolean {
  return specialtyId === "clinica-medica" && time === "16:00";
}

export function validSelection(booking: Booking): boolean {
  const specialty = specialties.find((item) => item.id === booking.specialtyId);
  return Boolean(
    specialty &&
      availableDates(booking.specialtyId).includes(booking.date) &&
      specialty.times.includes(booking.time) &&
      !unavailableTime(booking.specialtyId, booking.time),
  );
}

export function selectSpecialty(booking: Booking, id: string): Booking {
  const specialty =
    specialties.find((item) => item.id === id) ?? specialties[0];
  return {
    ...booking,
    specialtyId: specialty.id,
    professional: specialty.professional,
    date: availableDates(specialty.id)[0],
    time: specialty.times[0],
  };
}

export const demoPatient: Patient = {
  name: "Mariana Costa",
  cpf: "123.456.789-00",
  birth: "1994-04-15",
  phone: "(98) 98888-1111",
  email: "mariana@example.com",
  address: "Rua Exemplo, 120 — endereço fictício",
  purpose: "Consulta inicial",
};

export function createDraft(): Booking {
  return {
    specialtyId: specialties[0].id,
    professional: specialties[0].professional,
    date: availableDates(specialties[0].id)[0],
    time: specialties[0].times[0],
    patient: { ...demoPatient },
  };
}

export function validatePatient(patient: Patient): string | null {
  if (patient.name.trim().split(/\s+/).length < 2)
    return "Informe o nome completo fictício para a demonstração.";
  const phone = patient.phone.replace(/\D/g, "");
  if (phone.length < 10 || phone.length > 11)
    return "Informe um telefone fictício com DDD e 10 ou 11 dígitos.";
  if (patient.cpf && patient.cpf.replace(/\D/g, "").length !== 11)
    return "O CPF demonstrativo deve conter 11 dígitos.";
  if (patient.birth) {
    const date = parseDate(patient.birth);
    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(patient.birth) ||
      Number.isNaN(date.getTime()) ||
      localDate(date) !== patient.birth ||
      patient.birth > localDate(new Date())
    ) {
      return "Informe uma data de nascimento válida, que não esteja no futuro.";
    }
  }
  if (patient.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(patient.email))
    return "Confira o formato do e-mail fictício.";
  return null;
}

export function createProtocol(date: string, sequence: number): string {
  return `DEMO-${date.replace(/-/g, "")}-${String(sequence).padStart(3, "0")}`;
}
