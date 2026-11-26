import { describe, expect, it } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import { Router } from "wouter";
import Home from "./Home";

const routes = [
  "/",
  "/especialidades",
  "/especialidades/clinica-medica",
  "/especialidades/cardiologia",
  "/especialidades/ginecologia",
  "/especialidades/pediatria",
  "/especialidades/dermatologia",
  "/agendamento",
  "/cadastro",
  "/confirmacao",
  "/sucesso",
  "/agendamentos",
  "/informacoes",
  "/servicos",
  "/ajuda",
  "/sobre-proposta",
  "/whatsapp",
  "/privacidade",
];
function render(path: string) {
  // A renderização estática usa uma localização fixa, sem store de navegador.
  const hook = () => [path, () => {}] as [string, (path: string) => void];
  return renderToStaticMarkup(
    <Router hook={hook}>
      <Home />
    </Router>,
  );
}

describe("páginas do MVP", () => {
  for (const route of routes) {
    it(`renderiza ${route} com navegação e aviso institucional`, () => {
      const html = render(route);
      expect(html).toContain("Clínica-Escola Integrada");
      expect(html).toContain("MVP acadêmico");
      expect(html).toContain("Informações para orientação e atendimento");
      expect(html).toContain("<main");
    });
  }
  it("não exibe sucesso sem confirmar um agendamento", () => {
    const html = render("/sucesso");
    expect(html).toContain("Ainda não há confirmação nesta visita");
    expect(html).not.toContain("Agendamento realizado");
  });
  it("não inventa uma confirmação na lista inicial", () => {
    const html = render("/agendamentos");
    expect(html).toContain("Nenhum atendimento confirmado ainda");
    expect(html).not.toContain("Confirmado");
  });
  it("não transforma especialidade desconhecida em clínica médica", () => {
    expect(render("/especialidades/inexistente")).toContain(
      "Página não encontrada",
    );
  });
  it("mostra todas as especialidades e estado semântico de seleção", () => {
    const html = render("/agendamento");
    expect(html).toContain("Dermatologia");
    expect(html).toContain('aria-pressed="true"');
    expect(html).toContain("Próximas datas");
  });
  it("mantém o WhatsApp como representação, sem promessa de envio", () => {
    const html = render("/whatsapp");
    expect(html).toContain("A integração de mensagens ainda será definida");
    expect(html).not.toContain("Você receberá");
  });
  it("mostra horários disponíveis no detalhe da especialidade", () => {
    const html = render("/especialidades/clinica-medica");
    expect(html).toContain("Horários disponíveis");
    expect(html).toContain("08:00");
    expect(html).not.toContain("16:00");
  });
  it("inclui tipo de atendimento sem solicitar dados clínicos", () => {
    const html = render("/cadastro");
    expect(html).toContain("Tipo de atendimento (opcional)");
    expect(html).toContain("Não informe sintomas, diagnósticos");
  });
  it("apresenta FAQ e conteúdo acadêmico separado", () => {
    expect(render("/ajuda")).toContain("Dúvidas frequentes");
    expect(render("/sobre-proposta")).toContain("Apresentação acadêmica");
  });
  it("oferece controles de acessibilidade com estados semânticos", () => {
    const html = render("/");
    expect(html).toContain('aria-haspopup="dialog"');
    expect(html).toContain('aria-expanded="false"');
    expect(html).toContain('aria-controls="accessibility-panel"');
  });
});
