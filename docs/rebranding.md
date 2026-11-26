# Plano — Rebranding da Clínica-Escola Integrada Ana Lúcia Chaves Fecury

## Escopo
Atualizar o protótipo web existente para substituir a marca “Clínica do CEUMA” por “Clínica-Escola Integrada Ana Lúcia Chaves Fecury” e criar uma identidade visual minimalista, coerente com o site atual.

## Design Read
- **Artefato:** website/protótipo institucional de saúde, já navegável.
- **Público:** pacientes, comunidade acadêmica e apresentação institucional.
- **Linguagem visual:** minimalismo humanizado de saúde, com confiança institucional e acolhimento sem aparência hospitalar fria.
- **Modo:** redesign/preserve; manter IA, fluxo, dados fictícios e acessibilidade existentes.
- **Variação visual:** 3/10 — refinamento de marca, não uma mudança radical.
- **Intensidade de movimento:** 1/10 — preservar as interações atuais e evitar movimento desnecessário.
- **Densidade de informação:** 5/10 — o nome longo exige hierarquia e quebras responsivas cuidadosas.
- **Dependência de assets:** 8/10 — logo será aplicado em cabeçalho, rodapé, confirmação e comunicação.
- **Fidelidade à marca:** 9/10 — o nome solicitado deve aparecer corretamente em todo o site.

## Direção escolhida
- **Movimento:** minimalismo humanizado / editorial de saúde.
- **Princípios:** reconhecimento imediato; símbolo simples e escalável; nome completo com hierarquia; contraste e legibilidade acima de decoração.
- **Filosofia de cor:** preservar o verde-petróleo como cor proprietária de cuidado e ação, apoiado pelo azul-marinho de confiança e fundos claros quentes.
- **Paradigma de layout:** manter as faixas de serviço e a navegação existentes; ajustar apenas a marca, o cabeçalho e pontos de comunicação para o nome longo.
- **Elementos assinatura:** monograma “A” abstrato em duas linhas contínuas; ponto central representando a pessoa; wordmark em duas linhas com “Clínica-Escola Integrada” em maior evidência.
- **Interação:** sem mudança de comportamento; logo no cabeçalho retorna ao início, com foco visível e área de toque adequada.
- **Animação:** nenhuma nova animação; preservar hover e feedback existentes.
- **Tipografia:** Manrope para wordmark/títulos e DM Sans para interface, mantendo a base atual.
- **Essência:** uma clínica-escola integrada que aproxima cuidado, formação e acesso. Personalidade: acolhedora, confiável, essencial.
- **Voz:** institucional, direta e humana. Exemplos: “Cuidado integrado, mais perto de você.” / “Escolha como quer ser atendido.”
- **Logo:** símbolo geométrico com monograma “A” contínuo e ponto central; versão horizontal e versão compacta para mobile.
- **Cor proprietária:** `#1F7A72`.

## Implementação
- Criar `client/public/brand/clinic-escola-mark.svg` como asset real do logo, sem redesenhar o logo apenas com CSS.
- Atualizar o componente `Brand` em `client/src/pages/Home.tsx`, cabeçalho, rodapé e simulação de WhatsApp.
- Substituir ocorrências visíveis de “Clínica do CEUMA” pela nova marca, mantendo “protótipo acadêmico” e a natureza conceitual quando aplicável.
- Atualizar `client/index.html` com título/meta description coerentes.
- Manter todas as rotas, o manifesto, fluxo de agendamento, dados fictícios, responsividade e acessibilidade.
- Registrar os caminhos e tokens em `brand-spec.md`.

## Atualização — prévia visual interativa v0
- **Modo:** redesign/preserve, com mudança visual concentrada na camada de interface; rotas, conteúdo, fluxo e logo permanecem protegidos.
- **Direção:** sinalização editorial de uma clínica-escola acolhedora, com menos aparência de dashboard e mais hierarquia institucional.
- **Ícones:** família autoral linear em SVG, baseada em arco de cuidado, ponto central e integração; aplicada primeiro à home, especialidades, seleção de agendamento e serviços.
- **Ajustes de superfície:** remover orbes/gradientes decorativos, reduzir sombras e raios, reforçar bordas, tipografia e agrupamento das ações.
- **Escopo da v0:** home, especialidades, detalhe de especialidade, seleção de horário, serviços e componentes compartilhados; demais telas continuam funcionais para avaliação do fluxo.

## Estrutura do projeto
- `client/public/brand/clinic-escola-mark.svg`: logo vetorial da nova marca.
- `client/src/pages/Home.tsx`: componente de marca e textos visíveis do produto.
- `client/src/index.css`: tokens e regras responsivas da marca longa.
- `client/index.html`: título e metadados.
- `brand-spec.md`: referência de identidade.
- `TODO.md`: critérios de entrega e status.

## Entrega
Rodar checagem TypeScript e build estático, verificar o manifesto e iniciar o Preview. Após validação, criar checkpoint no `origin/main`; não publicar em domínio externo sem autorização.
