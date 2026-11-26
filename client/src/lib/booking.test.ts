import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  availableDates,
  createDraft,
  dateParts,
  defaultPatient,
  formatDate,
  localDate,
  parseDate,
  selectSpecialty,
  specialties,
  unavailableTime,
  validSelection,
  validatePatient,
  createProtocol,
} from "./booking";

beforeEach(() => {
  vi.useFakeTimers();
  vi.setSystemTime(new Date(2026, 10, 26, 12));
});
afterEach(() => vi.useRealTimers());

describe("agenda do MVP", () => {
  const expectedDays: Record<string, number[]> = {
    "clinica-medica": [2, 4],
    cardiologia: [1, 3],
    ginecologia: [3, 5],
    pediatria: [1, 5],
    dermatologia: [2, 5],
  };
  for (const specialty of specialties) {
    it(`oferece quatro datas futuras compatíveis com ${specialty.name}`, () => {
      const dates = availableDates(specialty.id);
      expect(dates).toHaveLength(4);
      expect(new Set(dates).size).toBe(4);
      for (const date of dates) {
        expect(date > localDate(new Date())).toBe(true);
        expect(expectedDays[specialty.id]).toContain(parseDate(date).getDay());
        expect(localDate(parseDate(date))).toBe(date);
        expect(formatDate(date)).toContain("2026");
        expect(dateParts(date).day).toBe(String(parseDate(date).getDate()));
      }
    });
  }
  it("preserva a especialidade do detalhe, incluindo dermatologia, sem perder o paciente", () => {
    const draft = createDraft();
    const next = selectSpecialty(draft, "dermatologia");
    expect(next.specialtyId).toBe("dermatologia");
    expect(next.professional).toBe(
      specialties.find((item) => item.id === "dermatologia")?.professional,
    );
    expect(next.patient).toEqual(draft.patient);
    expect(validSelection(next)).toBe(true);
  });
  it("rejeita datas e horários incompatíveis com a agenda", () => {
    const draft = createDraft();
    expect(validSelection(draft)).toBe(true);
    expect(validSelection({ ...draft, date: "2026-11-12" })).toBe(false);
    expect(validSelection({ ...draft, time: "23:00" })).toBe(false);
    expect(validSelection({ ...draft, time: "16:00" })).toBe(false);
    expect(unavailableTime("clinica-medica", "16:00")).toBe(true);
  });
  it("trata a virada de ano sem rótulos fixos", () => {
    const dates = availableDates("clinica-medica", new Date(2026, 11, 31, 12));
    expect(dates.every((date) => date.startsWith("2027-"))).toBe(true);
  });
});

describe("cadastro", () => {
  it("aceita o perfil padrão e não exige campos opcionais", () => {
    expect(validatePatient(defaultPatient)).toBeNull();
    expect(
      validatePatient({
        ...defaultPatient,
        cpf: "",
        birth: "",
        email: "",
        address: "",
      }),
    ).toBeNull();
  });
  it("orienta nome completo, telefone, CPF, nascimento e e-mail inválidos", () => {
    expect(validatePatient({ ...defaultPatient, name: "   " })).toMatch(
      /nome completo/,
    );
    expect(validatePatient({ ...defaultPatient, name: "Mariana" })).toMatch(
      /nome completo/,
    );
    expect(validatePatient({ ...defaultPatient, phone: "123" })).toMatch(
      /telefone/,
    );
    expect(validatePatient({ ...defaultPatient, cpf: "12" })).toMatch(/CPF/);
    expect(validatePatient({ ...defaultPatient, birth: "2026-02-30" })).toMatch(
      /nascimento/,
    );
    expect(validatePatient({ ...defaultPatient, birth: "2027-01-01" })).toMatch(
      /nascimento/,
    );
    expect(validatePatient({ ...defaultPatient, email: "invalido" })).toMatch(
      /e-mail/,
    );
  });
  it("gera rascunhos independentes sem compartilhar mutações do paciente", () => {
    const first = createDraft();
    const second = createDraft();
    first.patient.name = "Outro Paciente";
    expect(second.patient.name).toBe(defaultPatient.name);
  });
  it("gera protocolos diferentes por confirmação", () => {
    const date = createDraft().date;
    expect(createProtocol(date, 1)).toMatch(/^CEUMA-\d{8}-001$/);
    expect(createProtocol(date, 1)).not.toBe(createProtocol(date, 2));
  });
});
