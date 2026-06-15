# Plano de Implementação: A Estrutura Interna da Terra (6º Ano)

Este plano descreve a criação de uma página web educativa, interativa e visualmente incrível sobre as camadas da Terra (Crosta, Manto e Núcleo), adaptada para estudantes do 6º Ano do Ensino Fundamental nas disciplinas de Ciências e Geografia.

## User Review Required

> [!IMPORTANT]
> **Design e Estética**: A página utilizará um tema "Espacial/Cosmo" moderno, combinando fundo escuro profundo, tipografia arredondada de fácil leitura (como *Outfit* ou *Quicksand* do Google Fonts) e elementos com efeito de vidro fosco (*glassmorphism*).
> **Tecnologias**: Usaremos o HTML estrutural, o Bootstrap 5 (já disponível no projeto em `css/bootstrap.min.css` e `js/bootstrap.bundle.min.js`) para o layout responsivo, estilos personalizados em `css/style.css` e lógica interativa em `js/app.js`.

## Proposed Changes

### [Web Application]

#### [NEW] [style.css](file:///c:/Users/Escola/Desktop/A%20estrutura%20interna%20da%20Terra%20-%20Crosta,%20manto%20e%20n%C3%BAcleo/css/style.css)
* Criar um arquivo CSS customizado para estender o Bootstrap.
* Definir a paleta de cores:
  * Espaço/Fundo: `#0d0f1d` (Azul bem escuro) com estrelas sutis brilhantes.
  * Crosta: `#4caf50` / `#8d6e63` (Verde e marrom terrestre).
  * Manto: `#ff5722` / `#ff9800` (Laranja/Vermelho magma).
  * Núcleo Externo: `#ffc107` (Amarelo brilhante líquido).
  * Núcleo Interno: `#ffffff` / `#ffe082` (Branco/Amarelo claro sólido).
* Adicionar regras para animações de pulsação, rotação lenta da Terra e efeitos de hover na seção interativa.
* Estilizar o quiz e as caixas de feedback.

#### [NEW] [app.js](file:///c:/Users/Escola/Desktop/A%20estrutura%20interna%20da%20Terra%20-%20Crosta,%20manto%20e%20n%C3%BAcleo/js/app.js)
* Implementar o controle da animação interativa:
  * Quando o aluno clicar em uma camada da Terra (no SVG), atualizar o painel lateral com as informações detalhadas dessa camada (Nome, Espessura, Temperatura, Estado Físico, Composição e uma Curiosidade didática).
  * Aplicar classes CSS para destacar visualmente a camada selecionada.
* Implementar o Quiz de Múltipla Escolha:
  * Array de 5 perguntas alinhadas com as habilidades da BNCC para o 6º ano.
  * Lógica para mostrar uma pergunta por vez, com progresso dinâmico.
  * Feedback instantâneo ao responder (verde para correto, vermelho para incorreto) acompanhado de uma explicação pedagógica curta.
  * Tela final com pontuação, animação de confetes/estrelas e uma medalha/título de geógrafo/cientista júnior.

#### [MODIFY] [index.html](file:///c:/Users/Escola/Desktop/A%20estrutura%20interna%20da%20Terra%20-%20Crosta,%20manto%20e%20n%C3%BAcleo/index.html)
* Desenvolver a estrutura completa da página com:
  1. **Cabeçalho Hero**: Título chamativo "Viagem ao Centro da Terra" com uma ilustração de fundo da Terra no espaço (gerada por IA ou desenhada em SVG).
  2. **Seção Didática & Comparativa**: Analogia clássica do ovo cozido (casca, clara e gema) ou fruta para facilitar o entendimento dos alunos do 6º ano.
  3. **Visualizador Interativo**: Um gráfico SVG de alta qualidade que representa o corte transversal da Terra, permitindo cliques interativos para revelar as camadas.
  4. **Seção de Leitura e Experiência**: Textos curtos e dinâmicos sobre cada camada e como os cientistas estudam o interior da Terra sem nunca terem ido lá (sismologia).
  5. **Quiz do Geólogo Aprendiz**: O jogo de perguntas e respostas para fixação do conteúdo.
  6. **Rodapé**: Créditos educativos.

## Verification Plan

### Manual Verification
1. Abrir `index.html` no navegador.
2. Clicar em cada camada do corte transversal da Terra no SVG interativo e verificar se as informações mudam corretamente e o destaque visual é aplicado.
3. Responder ao quiz errando e acertando questões para validar o feedback instantâneo e a explicação pedagógica.
4. Concluir o quiz para testar a tela de pontuação final.
5. Testar a responsividade em telas menores (celular e tablet).
