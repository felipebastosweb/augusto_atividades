# Plano de Implementação - A Terra no Espaço: Forma e Movimentos

Este plano descreve a criação de uma página web educacional e interativa sobre o tema "A Terra no Espaço: Forma e movimentos (Rotação e Translação)", voltada para alunos do 6º ano do Ensino Fundamental. A página será visualmente atraente, usando Bootstrap para a estrutura base e CSS customizado para um design "premium" com tema espacial, além de uma simulação interativa com Canvas/JS e um quiz gamificado com feedback imediato.

## Requisitos do Design e Usabilidade

- **Tema Visual**: "Espacial Moderno" com paleta de cores harmoniosa baseada em tons escuros de azul e roxo (nebulosas), contrastando com tons vibrantes de amarelo (Sol), azul celeste (Terra) e neon (detalhes/interações).
- **Tipografia**: Fontes modernas carregadas via Google Fonts (ex: 'Outfit' ou 'Inter' para o texto, 'Space Grotesk' para títulos).
- **Acessibilidade & Responsividade**: Layout totalmente responsivo, testado em múltiplos tamanhos de tela.
- **Interatividade**:
  - Simulação interativa usando HTML5 Canvas e JavaScript para demonstrar a rotação (dia/noite) e a translação (estações do ano com inclinação do eixo terrestre de ~23.5°).
  - Quiz dinâmico no final, com 5 perguntas, exibindo explicações claras após cada resposta e uma pontuação final animada.

## Proposta de Conteúdo (Nível 6º Ano)

1. **Introdução**: O planeta Terra no Sistema Solar, destacando sua forma de esferoide oblato (ou geóide).
2. **Rotação**:
   - Definição (giro em torno do próprio eixo).
   - Sentido (de Oeste para Leste).
   - Duração (aproximadamente 24 horas).
   - Principal consequência (ciclo dos dias e das noites).
3. **Translação**:
   - Definição (órbita ao redor do Sol).
   - Duração (365 dias e 6 horas, justificando o ano bissexto).
   - Inclinação do eixo terrestre (~23,5°) e sua consequência crucial (as estações do ano: solstícios e equinócios).
4. **Simulador Interativo**: Uma seção central com um Canvas interativo demonstrando os movimentos de rotação e translação de forma animada, permitindo pausar, alterar velocidades e visualizar a inclinação do eixo.
5. **Quiz do Espaço**: 5 perguntas interativas de múltipla escolha com botões coloridos para verificar a resposta correta e explicação científica associada.

---

## Arquivos Propostos

### [NEW] [index.html](file:///c:/Users/Escola/Desktop/ATIVIDADES%20WEB/A%20Terra%20no%20Espa%C3%A7o%20Forma%20e%20movimentos/index.html)
Será a estrutura da página principal contendo:
- Cabeçalho hero com título marcante.
- Seções informativas com cards ilustrativos e animações CSS suaves.
- A área do simulador interativo.
- O quiz com interface interativa.

### [NEW] [style.css](file:///c:/Users/Escola/Desktop/ATIVIDADES%20WEB/A%20Terra%20no%20Espa%C3%A7o%20Forma%20e%20movimentos/lib/css/style.css)
CSS personalizado para:
- Cores de fundo gradiente simulando o espaço sideral.
- Estilos dos cards informativos, efeitos de hover, sombras suaves e fontes.
- Estilização moderna e intuitiva para o painel de controle da simulação e para as perguntas do quiz.
- Micro-animações de estrelas e transições suaves.

### [NEW] [simulation.js](file:///c:/Users/Escola/Desktop/ATIVIDADES%20WEB/A%20Terra%20no%20Espa%C3%A7o%20Forma%20e%20movimentos/lib/js/simulation.js)
Código da simulação da Terra e Sol:
- Canvas interativo renderizando o Sol no centro e a Terra orbitando com inclinação de eixo.
- Linhas que indicam a incidência de raios solares (demonstrando por que um hemisfério recebe mais calor que o outro).
- Rotação da própria Terra representada graficamente (linha do equador, polos e sombra de dia/noite).
- Painel para alternar entre visualizar a Rotação (foco na Terra girando) e Translação (foco no ano e estações).

### [NEW] [quiz.js](file:///c:/Users/Escola/Desktop/ATIVIDADES%20WEB/A%20Terra%20no%20Espa%C3%A7o%20Forma%20e%20movimentos/lib/js/quiz.js)
Controle lógico das perguntas:
- Lista de 5 questões estruturadas in JSON.
- Gerenciamento do estado da pergunta atual, verificação de acerto, exibição de explicações.
- Tela final com pontuação, feedback encorajador e botão de reinício.

---

## Plano de Verificação

### Testes Manuais
1. **Verificação de Layout**: Visualizar em diferentes resoluções (desktop e mobile) para garantir o comportamento responsivo e legibilidade das fontes.
2. **Validação das Animações**:
   - Testar botões de controle do simulador (Iniciar/Pausar, Alterar velocidade, Selecionar modo).
   - Garantir que a inclinação do eixo terrestre da simulação de translação esteja correta e que os hemisférios mostrem as estações coerentemente.
3. **Validação do Quiz**:
   - Responder de forma errada e correta para validar cores (vermelho/verde) e mensagens explicativas.
   - Completar o quiz e verificar se a pontuação final está correta.

---
## Imagens Adicionais (Geradas por IA)
Criaremos duas imagens ilustrativas na pasta `lib/images/`:
- `terra_espaco_capa.jpg`: Uma imagem premium da Terra vista do espaço com o Sol ao fundo para o cabeçalho.
- `estacoes_ano_diagrama.jpg`: Um diagrama simplificado e educativo das estações do ano para ilustrar o conteúdo de translação.
