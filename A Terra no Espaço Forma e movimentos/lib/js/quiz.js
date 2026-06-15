var quizQuestions = [
  {
    id: 1,
    question: "1. Qual é a forma real do planeta Terra no espaço?",
    options: [
      "Uma esfera perfeita, idêntica a uma bola de bilhar.",
      "Um disco totalmente plano e circular, cercado por uma parede de gelo.",
      "Um geoide (esferoide oblato), isto é, levemente achatada nos polos e com uma saliência no equador.",
      "Um cubo tridimensional com vértices arredondados."
    ],
    answer: 2,
    explanation: "A Terra não é perfeitamente redonda! Devido ao seu movimento de rotação (que gera uma força centrífuga), a Terra é ligeiramente achatada nos polos Norte e Sul e possui uma saliência (calombo) na região da linha do Equador. A esse formato irregular dá-se o nome de Geoide."
  },
  {
    id: 2,
    question: "2. O movimento de Rotação é o giro da Terra em torno do seu próprio eixo. Quanto tempo dura esse ciclo e qual é o seu principal efeito?",
    options: [
      "Dura 365 dias e 6 horas, originando as estações do ano.",
      "Dura aproximadamente 24 horas, dando origem aos dias e às noites.",
      "Dura 28 dias e causa as fases da Lua e as marés.",
      "Dura 12 horas e faz com que o Sol mude de tamanho ao longo do dia."
    ],
    answer: 1,
    explanation: "A rotação terrestre dura aproximadamente 24 horas (precisamente 23h 56min 4s, o dia sideral). A consequência mais direta é o ciclo do dia e da noite: enquanto o lado voltado para o Sol é dia, o lado oposto, que está na sombra, é noite."
  },
  {
    id: 3,
    question: "3. Ao observarmos o céu, temos a impressão de que o Sol se move de Leste para Oeste. Na verdade, quem está girando é a Terra! Em qual sentido ocorre a rotação terrestre?",
    options: [
      "De Leste para Oeste.",
      "De Norte para Sul.",
      "De Oeste para Leste.",
      "De Sul para Norte."
    ],
    answer: 2,
    explanation: "O movimento de rotação da Terra ocorre no sentido de Oeste para Leste. Isso gera o chamado movimento aparente dos astros: como giramos para Leste, o Sol, a Lua e as estrelas parecem nascer no Leste e se pôr no Oeste."
  },
  {
    id: 4,
    question: "4. A Translação é a órbita que a Terra faz ao redor do Sol, completando-se em cerca de 365 dias e 6 horas. Como compensamos essas 6 horas que sobram a cada ano?",
    options: [
      "Adicionamos um dia extra a cada 4 anos no mês de fevereiro (Ano Bissexto).",
      "Ignoramos essas horas, pois elas não afetam a contagem do tempo.",
      "Adicionamos 1 hora a mais no relógio no último dia de cada bimestre.",
      "Aumentamos a velocidade da rotação no mês de dezembro."
    ],
    answer: 0,
    explanation: "Como a translação leva 365 dias e 6 horas, o acúmulo de 6 horas ao longo de 4 anos soma 24 horas (6h x 4 = 24h), o equivalente a um dia completo. Por isso, a cada quatro anos temos o Ano Bissexto, com 366 dias, adicionando o dia 29 de fevereiro."
  },
  {
    id: 5,
    question: "5. Se o eixo de rotação da Terra fosse totalmente reto (sem inclinação), o que aconteceria?",
    options: [
      "Os dias seriam muito mais quentes em todo o planeta.",
      "A Terra sairia de órbita e viajaria em linha reta pelo espaço.",
      "Não haveria estações do ano; o clima seria o mesmo o ano todo em cada região.",
      "A gravidade deixaria de existir nos polos terrestre."
    ],
    answer: 2,
    explanation: "As estações do ano ocorrem porque a Terra orbita o Sol (Translação) mantendo seu eixo inclinado em cerca de 23,5°. Se o eixo fosse perfeitamente vertical, a luz solar sempre atingiria os hemisférios da mesma forma o ano todo, eliminando as estações climáticas."
  }
];

function SpaceQuiz() {
  this.currentQuestionIndex = 0;
  this.score = 0;
  this.userAnswers = []; // store user selections
  
  // DOM bindings
  this.quizView = document.getElementById('quiz-active-view');
  this.resultView = document.getElementById('quiz-result-view');
  this.questionText = document.getElementById('question-text');
  this.optionsContainer = document.getElementById('options-container');
  this.progressBar = document.getElementById('quiz-progress-bar');
  this.progressText = document.getElementById('quiz-progress-text');
  
  this.feedbackBox = document.getElementById('feedback-box');
  this.feedbackTitle = document.getElementById('feedback-title');
  this.feedbackText = document.getElementById('feedback-text');
  this.btnNext = document.getElementById('btn-next-question');
  
  // Result DOM bindings
  this.scoreCircle = document.getElementById('score-circle');
  this.resultRank = document.getElementById('result-rank');
  this.resultMessage = document.getElementById('result-message');
  this.btnRestart = document.getElementById('btn-restart-quiz');
  
  var self = this;
  if (this.btnNext) {
    this.btnNext.addEventListener('click', function() {
      self.handleNextQuestion();
    });
  }
  
  if (this.btnRestart) {
    this.btnRestart.addEventListener('click', function() {
      self.restartQuiz();
    });
  }
  
  this.startQuiz();
}

SpaceQuiz.prototype.startQuiz = function() {
  this.currentQuestionIndex = 0;
  this.score = 0;
  this.userAnswers = [];
  
  if (this.quizView) this.quizView.style.display = 'block';
  if (this.resultView) this.resultView.style.display = 'none';
  
  this.loadQuestion();
};

SpaceQuiz.prototype.loadQuestion = function() {
  // Clear previous state
  if (this.feedbackBox) {
    this.feedbackBox.style.display = 'none';
    this.feedbackBox.className = 'feedback-box';
  }
  if (this.btnNext) {
    this.btnNext.style.display = 'none';
  }
  if (this.optionsContainer) {
    this.optionsContainer.innerHTML = '';
  }
  
  var currentQuestion = quizQuestions[this.currentQuestionIndex];
  if (this.questionText) {
    this.questionText.textContent = currentQuestion.question;
  }
  
  // Progress
  var totalQuestions = quizQuestions.length;
  var progressPercent = (this.currentQuestionIndex / totalQuestions) * 100;
  if (this.progressBar) {
    this.progressBar.style.width = progressPercent + '%';
  }
  if (this.progressText) {
    this.progressText.textContent = 'Pergunta ' + (this.currentQuestionIndex + 1) + ' de ' + totalQuestions;
  }
  
  // Render options
  var letters = ['A', 'B', 'C', 'D'];
  var self = this;
  
  for (var i = 0; i < currentQuestion.options.length; i++) {
    (function(index) {
      var option = currentQuestion.options[index];
      var button = document.createElement('button');
      button.className = 'quiz-option-btn';
      button.innerHTML = '<span class="option-letter">' + letters[index] + '</span>' +
                         '<span class="option-content">' + option + '</span>';
      button.addEventListener('click', function() {
        self.selectOption(index);
      });
      if (self.optionsContainer) {
        self.optionsContainer.appendChild(button);
      }
    })(i);
  }
};

SpaceQuiz.prototype.selectOption = function(selectedIndex) {
  var currentQuestion = quizQuestions[this.currentQuestionIndex];
  var optionButtons = this.optionsContainer ? this.optionsContainer.querySelectorAll('.quiz-option-btn') : [];
  
  // Disable all option buttons
  for (var i = 0; i < optionButtons.length; i++) {
    optionButtons[i].disabled = true;
  }
  
  var isCorrect = (selectedIndex === currentQuestion.answer);
  
  if (isCorrect) {
    this.score++;
    if (optionButtons[selectedIndex]) {
      optionButtons[selectedIndex].className += ' correct';
    }
    if (this.feedbackBox) {
      this.feedbackBox.className += ' correct';
    }
    if (this.feedbackTitle) {
      this.feedbackTitle.innerHTML = '<span class="glyphicon glyphicon-ok-sign"></span> Excelente trabalho! Resposta correta.';
    }
  } else {
    if (optionButtons[selectedIndex]) {
      optionButtons[selectedIndex].className += ' wrong';
    }
    if (optionButtons[currentQuestion.answer]) {
      optionButtons[currentQuestion.answer].className += ' correct';
    }
    if (this.feedbackBox) {
      this.feedbackBox.className += ' wrong';
    }
    if (this.feedbackTitle) {
      this.feedbackTitle.innerHTML = '<span class="glyphicon glyphicon-remove-sign"></span> Opa, não foi dessa vez!';
    }
  }
  
  if (this.feedbackText) {
    this.feedbackText.textContent = currentQuestion.explanation;
  }
  if (this.feedbackBox) {
    this.feedbackBox.style.display = 'block';
  }
  
  // Show next or finish button
  var isLast = (this.currentQuestionIndex === quizQuestions.length - 1);
  if (this.btnNext) {
    this.btnNext.textContent = isLast ? "Ver Resultado Final" : "Próxima Pergunta";
    this.btnNext.style.display = 'inline-block';
  }
  
  this.userAnswers.push(selectedIndex);
};

SpaceQuiz.prototype.handleNextQuestion = function() {
  if (this.currentQuestionIndex < quizQuestions.length - 1) {
    this.currentQuestionIndex++;
    this.loadQuestion();
  } else {
    this.showResults();
  }
};

SpaceQuiz.prototype.showResults = function() {
  if (this.quizView) this.quizView.style.display = 'none';
  if (this.resultView) this.resultView.style.display = 'block';
  
  // Update progress bar to 100%
  if (this.progressBar) this.progressBar.style.width = '100%';
  if (this.progressText) this.progressText.textContent = 'Quiz Concluído!';
  
  var total = quizQuestions.length;
  if (this.scoreCircle) {
    this.scoreCircle.textContent = this.score + '/' + total;
  }
  
  var rank = "";
  var message = "";
  
  if (this.score === total) {
    rank = "🎖️ Mestre do Universo";
    message = "Incrível! Você acertou todas as questões. Você realmente compreende a forma da Terra, a rotação e a translação como um verdadeiro astrônomo! Parabéns!";
  } else if (this.score >= 3) {
    rank = "🚀 Navegador Espacial";
    message = "Muito bem! Você tem uma ótima base sobre os movimentos do nosso planeta. Revise os detalhes das estações e do formato da Terra para se tornar um mestre!";
  } else {
    rank = "🌍 Astronauta em Treinamento";
    message = "Continue estudando! O espaço é gigante e cheio de mistérios. Releia os textos acima sobre rotação, translação e a forma geoidal, e tente o quiz novamente!";
  }
  
  if (this.resultRank) {
    this.resultRank.textContent = rank;
  }
  if (this.resultMessage) {
    this.resultMessage.innerHTML = message;
  }
};

SpaceQuiz.prototype.restartQuiz = function() {
  this.startQuiz();
};

// Instantiate quiz on load
document.addEventListener('DOMContentLoaded', function() {
  window.quizInstance = new SpaceQuiz();
});
