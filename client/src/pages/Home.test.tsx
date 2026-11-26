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

describe("páginas do protótipo migrado", () => {
  for (const route of routes) {
    it(`renderiza ${route} com navegação e aviso demonstrativo`, () => {
      const html = render(route);
      expect(html).toContain("Clínica-Escola Integrada");
      expect(html).toContain("Protótipo acadêmico");
      expect(html).toContain("Sem reserva ou envio real");
      expect(html).toContain("<main");
    });
  }
  it("não exibe sucesso sem confirmar um exemplo", () => {
    const html = render("/sucesso");
    expect(html).toContain("Ainda não há confirmação nesta visita");
    expect(html).not.toContain("Agendamento realizado");
  });
  it("não inventa uma confirmação na lista inicial", () => {
    const html = render("/agendamentos");
    expect(html).toContain("Nenhum exemplo confirmado ainda");
    expect(html).not.toContain("Confirmado · simulação");
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
    expect(html).toContain("Não há integração ativa nem envio de mensagens");
    expect(html).not.toContain("Você receberá");
  });
  it("mostra horários disponíveis no detalhe da especialidade", () => {
    const html = render("/especialidades/clinica-medica");
    expect(html).toContain("Horários demonstrativos disponíveis");
    expect(html).toContain("08:00");
    expect(html).not.toContain("16:00");
  });
  it("inclui tipo de atendimento fictício sem solicitar dados clínicos", () => {
    const html = render("/cadastro");
    expect(html).toContain("Tipo de atendimento de exemplo");
    expect(html).toContain("Não informe sintomas, diagnósticos");
  });
  it("apresenta FAQ e conteúdo acadêmico separado", () => {
    expect(render("/ajuda")).toContain("Dúvidas frequentes");
    expect(render("/sobre-proposta")).toContain("Apresentação acadêmica");
  });
});
