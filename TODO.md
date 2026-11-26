# Entregas do MVP — Clínica-Escola Integrada Ana Lúcia Chaves Fecury

Este é um projeto novo autorizado, migrado da cópia recuperada. Os critérios funcionais abaixo foram implementados e revisados por inspeção de código, checagens automatizadas e capturas do Preview em desktop/mobile.

## 1. Identidade visual da Clínica-Escola Integrada
- [x] Usar o nome completo “Clínica-Escola Integrada Ana Lúcia Chaves Fecury” nos pontos visíveis da marca, com boa hierarquia no desktop e leitura no mobile.
- [x] Incluir um logo vetorial minimalista e escalável, com símbolo abstrato baseado no “A”, integração e pessoa no centro do cuidado, aplicado ao cabeçalho, rodapé e comunicação proposta.
- [x] Preservar a linguagem visual do site: verde-petróleo, azul-marinho, fundos claros, cantos arredondados moderados, espaço negativo e tipografia legível.
- [x] Não alterar rotas, fluxo de agendamento, dados informativos, responsividade, acessibilidade ou o caráter acadêmico do MVP ao aplicar o rebranding.

## 2. Página inicial institucional e navegação
- [x] A página inicial deve ser clara e acolhedora, conter o nome/logo da clínica, menu com Início, Especialidades, Exames e serviços, Agendamento, Meus agendamentos, Informações e Ajuda, e destacar “Agendar atendimento”.
- [x] A inicial deve apresentar “Cuide da sua saúde de forma mais simples.”, descrição curta, horário, localização, telefone, acesso ao WhatsApp, área de ajuda, resumo da clínica e atalhos para agendamento, especialidades e exames/serviços.
- [x] A navegação deve ser responsiva, simples no celular, com botões grandes e fácil acesso a telefone e WhatsApp.

## 3. Especialidades, informações e serviços
- [x] A tela de especialidades deve listar cards com nome, pequena descrição, ícone e botão “Ver horários”, além de busca/filtro.
- [x] O detalhe de uma especialidade deve mostrar nome, descrição, profissionais ou informações disponíveis, dias, horários disponíveis, informações importantes e botão “Agendar”.
- [x] A tela de informações deve exibir endereço, localização/mapa representado visualmente, horários, telefone, WhatsApp, especialidades, serviços e orientações importantes.
- [x] A tela de exames e serviços deve listar itens com nome, descrição, informações necessárias, orientações quando aplicável e ação para consultar disponibilidade/informações, sem inventar preços ou informações médicas específicas.

## 4. Fluxo de agendamento do MVP
- [x] O usuário deve conseguir percorrer Início → Especialidades → detalhe → escolha de data e horário → cadastro → confirmação → agendamento realizado → meus agendamentos.
- [x] O agendamento deve permitir selecionar especialidade, profissional quando aplicável, data e horários disponíveis, com disponibilidade claramente indicada.
- [x] O cadastro deve ser simples e dividido em etapas quando necessário, com nome completo, CPF, data de nascimento, telefone, e-mail, endereço e informação necessária ao atendimento, incluindo orientação/validação.
- [x] A confirmação deve mostrar “Confira seus dados antes de confirmar.”, especialidade, profissional, data, horário, paciente e telefone, com “Confirmar agendamento” e opção de voltar/editar.
- [x] A confirmação de sucesso deve mostrar “Agendamento realizado com sucesso!”, especialidade, data, horário, local, número/protocolo, ações “Ver meu agendamento” e “Voltar para o início”, e informar confirmação/lembrete por WhatsApp.

## 5. Meus agendamentos e comunicação proposta
- [x] Meus agendamentos deve mostrar cards com especialidade, data, horário, status, local e opção de consultar detalhes.
- [x] Deve existir uma representação visual, sem integração real, de mensagem de confirmação e lembrete pelo WhatsApp, deixando claro que é uma proposta conceitual.

## 6. Ajuda, acessibilidade, privacidade e responsabilidade
- [x] A tela “Precisa de ajuda?” deve oferecer “Preciso de ajuda para agendar”, “Prefiro atendimento por telefone” e “Quero atendimento presencial”, além de telefone e endereço.
- [x] A interface deve deixar claro que o digital é alternativa, não obrigação, mantendo atendimento presencial e telefônico.
- [x] O design deve usar tipografia legível, bom contraste, botões grandes, linguagem simples, hierarquia clara, ícones acompanhados de texto, poucos elementos por tela, navegação intuitiva e mensagens claras.
- [x] O MVP deve usar apenas dados informativos, não exibir dados sensíveis desnecessariamente e informar que os dados são utilizados para atendimento/agendamento, com acesso simples à política de privacidade/uso.
- [x] O produto não deve afirmar integração existente com o sistema interno da clínica nem inventar funcionalidades dele; deve ser apresentado como proposta conceitual futura.

## 7. Qualidade visual e responsividade
- [x] O resultado deve parecer um produto digital real, moderno, simples, acessível e profissional, adequado para apresentação acadêmica.
- [x] A identidade deve usar tons suaves de verde e azul, espaço em branco, cards, bordas arredondadas e elementos discretos, evitando aparência fria/hostil.
- [x] O layout deve funcionar em celular e desktop, com conteúdo vertical e CTAs acessíveis no mobile.

As regras responsivas recuperadas foram preservadas, e os novos componentes foram conferidos em capturas do Preview a 375px. O calendário foi ajustado após a inspeção para abrir no mês da primeira data válida.

## 8. Projeto estático independente
- [x] Manter o MVP como frontend estático React/Vite, sem servidor, autenticação, banco de dados ou integração real com os sistemas da clínica; usar dados informativos e deixar explícita a natureza conceitual.
- [x] Disponibilizar `/manus-routes.json` com todas as rotas de página efetivamente existentes, mantendo o manifesto sincronizado com o código (incluindo `/sobre-proposta`).
- [x] Preservar o comportamento das rotas e dos fluxos ao migrar o MVP para este projeto WebDev novo; manter comandos de execução, checagem TypeScript e build estático funcionais.

## Evidências e limites da etapa

O logo original foi recuperado do conteúdo do histórico exportado. O código foi separado em páginas, componentes compartilhados, jornada do MVP e lógica de agenda/cadastro. As datas são ISO e futuras, nos dias da semana da especialidade; todas as cinco especialidades podem ser escolhidas. A confirmação cria um registro com protocolo do MVP na memória, e a prévia de WhatsApp usa o rascunho ou registro explicitamente selecionado. Cadastro e revisão incluem tipo de atendimento necessário sem solicitar sintomas ou dados clínicos reais.

TypeScript (inclusive checagem de importações não utilizadas), 38 testes de lógica/renderização estática, build de produção e `git diff --check` passaram. O Preview foi capturado em desktop/mobile para home, especialidades, agendamento, agendamentos, ajuda e apresentação acadêmica. O manifesto agora contém 14 rotas. A publicação automática está desligada e este projeto não foi publicado.

Os dados de MVP agora permanecem somente no `localStorage` deste navegador para facilitar apresentações; não são enviados à clínica. Foram incluídos calendário mensal, edição/cancelamento locais, busca por termos relacionados, FAQ, controles de alto contraste/texto maior e área acadêmica. Telefones, endereço, profissionais, serviços e horários continuam informativos; não devem ser usados para buscar atendimento real.
