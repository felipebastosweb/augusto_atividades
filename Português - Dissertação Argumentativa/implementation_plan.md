# Plano de Implementação: Página Interativa "Pronomes - Completo" (6º Ano)

Este plano detalha o design e a implementação de uma página web educacional e interativa sobre **Pronomes** voltada para alunos do 6º Ano do Ensino Fundamental. A página será visualmente atraente (estética premium), responsiva e altamente interativa.

## User Review Required

> [!IMPORTANT]
> A página utilizará o framework CSS **Bootstrap 5** (arquivos locais já disponíveis no projeto) para a estrutura de grid e responsividade, complementado por estilos autorais modernos em `css/styles.css` (gradientes modernos, tipografia elegante e animações fluidas).
> 
> Serão criadas duas ferramentas interativas principais em JavaScript (`js/app.js`):
> 1. **Máquina de Substituição de Pronomes**: Demonstração visual de como os pronomes substituem nomes nas frases.
> 2. **Quiz Interativo**: 5 questões de múltipla escolha com correção em tempo real e explicações pedagógicas.

## Proposed Changes

### Estrutura Geral do Projeto

A estrutura de arquivos internos será mantida e enriquecida da seguinte forma:
- `index.html` (na raiz do projeto): Estrutura HTML5 semântica e SEO.
- `css/styles.css` (novo arquivo): Design customizado, variáveis de cores (HSL), fontes e animações CSS.
- `js/app.js` (novo arquivo): Lógica da Máquina de Substituição e do Quiz.
- `images/banner.png` (nova imagem): Banner ilustrativo gerado pela ferramenta de imagem.

---

### Componentes de Design e Estilo

#### [NEW] [styles.css](file:///c:/Users/Escola/Desktop/Tudo%20sobre%20Pronomes/css/styles.css)
- **Tema Visual**: "Edutainment" Moderno (combinação de azul índigo profundo `#3b82f6` / `#4f46e5` para seriedade e amarelo âmbar `#f59e0b` / laranja `#f97316` para elementos lúdicos e destaques).
- **Tipografia**: Importação do Google Fonts com 'Plus Jakarta Sans' (para leitura fluida) e 'Fredoka' ou 'Outfit' para títulos chamativos e amigáveis.
- **Animações**:
  - Efeitos de entrada (Fade-in-up) com Intersection Observer ou classes CSS ativadas por scroll.
  - Efeitos de hover premium nos cards explicativos (elevação leve, mudança sutil de borda e brilho do gradiente).
  - Feedback visual animado no Quiz (balão de comemoração ao acertar, trepidação leve ao errar).

---

### Componentes de Conteúdo e Interatividade

#### [NEW] [app.js](file:///c:/Users/Escola/Desktop/Tudo%20sobre%20Pronomes/js/app.js)
- **Máquina de Substituição (Pronoun Switcher)**:
  - O aluno seleciona uma frase de exemplo (ex: *"O menino leu o livro no parque."*).
  - Ao clicar em "Substituir", o sistema aplica uma animação de transição, destacando os substantivos e trocando-os pelos pronomes correspondentes (*"**Ele** **o** leu no parque."*).
- **Quiz sobre Pronomes**:
  - 5 questões elaboradas especificamente para o nível de 6º Ano (compreendendo pronomes pessoais retos e oblíquos, possessivos, demonstrativos, indefinidos e de tratamento).
  - Correção imediata com exibição de mensagem de acerto ou erro, mais uma explicação detalhada ("Por que esta é a resposta correta?").
  - Painel final de pontuação com uma mensagem encorajadora personalizada com base no desempenho.

---

### Página Principal

#### [MODIFY] [index.html](file:///c:/Users/Escola/Desktop/Tudo%20sobre%20Pronomes/index.html)
- Estrutura completa do documento HTML5.
- Vinculação com o arquivo CSS do Bootstrap local (`css/bootstrap.min.css`) e com os estilos customizados (`css/styles.css`).
- Vinculação com o JavaScript do Bootstrap local (`js/bootstrap.bundle.min.js`) e com a lógica do quiz (`js/app.js`).
- Layout dividido em seções claras:
  1. **Hero Header**: Banner chamativo com título dinâmico e uma ilustração pedagógica gerada.
  2. **Introdução**: Conceito básico do que são pronomes (para que servem) com um design de card em destaque.
  3. **Categorias de Pronomes**: 5 abas ou cards expansíveis detalhando:
     - Pronomes Pessoais (Reto, Oblíquo e Tratamento)
     - Pronomes Possessivos
     - Pronomes Demonstrativos
     - Pronomes Indefinidos e Interrogativos
  4. **Seção Interativa**: A "Máquina de Substituição".
  5. **Quiz Final**: Teste de conhecimentos.
  6. **Footer**: Resumo e créditos.

---

## Plan de Imagem e Mídia

- Utilizaremos a ferramenta `generate_image` para criar um banner educativo:
  - **Prompt sugerido**: *"A vibrant and clean educational banner for a Portuguese grammar school website, 3d vector illustrations of books, pencils, letters, speech bubbles, bright playful pastel color palette, tech learning theme, no text, premium UI illustration."*
  - Salvaremos o resultado em `images/banner.png`.

---

## Verification Plan

### Testes Manuais
1. **Responsividade**: Testar o layout no navegador em diferentes resoluções (desktop, tablet e mobile).
2. **Interatividade da Máquina de Substituição**: Clicar nos botões de substituição e checar se a frase se altera com transições visuais suaves.
3. **Funcionamento do Quiz**:
   - Responder a todas as perguntas corretamente e verificar a nota máxima.
   - Responder incorretamente para verificar se as explicações são exibidas e se a contagem final está correta.
   - Testar o botão de reiniciar o quiz.
4. **Verificação de Acessibilidade**: Testar o contraste das cores e garantir que os botões tenham foco visível.
