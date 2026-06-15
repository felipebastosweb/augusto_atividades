// js/app.js

document.addEventListener('DOMContentLoaded', function () {
  // --- DICIONÁRIO DE DADOS DAS CAMADAS ---
  var layersData = {
    crust: {
      name: 'Crosta Terrestre',
      'class': 'header-crust',
      thickness: '5 a 70 km (Mais fina sob os oceanos, mais grossa sob as montanhas)',
      temperature: 'Aproximadamente 15°C a 600°C',
      state: 'Sólido (Rochas rígidas)',
      composition: 'Silício, Alumínio e Oxigênio (rochas como granito e basalto)',
      summary: 'É a camada externa da Terra, onde nós moramos, construímos nossas cidades e plantamos nosso alimento. Se compararmos a Terra com uma maçã, a crosta seria a casca bem fininha! Ela é dividida em pedaços chamados placas tectônicas.',
      curiosity: 'Você sabia que o buraco mais profundo já cavado pelo ser humano (o Poço Superprofundo de Kola, na Rússia) tem apenas 12 km de profundidade? Nós nem arranhamos a crosta direito!'
    },
    mantle: {
      name: 'Manto',
      'class': 'header-mantle',
      thickness: 'Cerca de 2.900 km de profundidade',
      temperature: 'De 1.000°C a 2.000°C',
      state: 'Pastoso / Semi-sólido (como uma gelatina ou plástico muito quente)',
      composition: 'Silício, Magnésio e Ferro (rochas derretidas chamadas magma)',
      summary: 'É a camada intermediária e a mais espessa da Terra. Devido ao calor extremo vindo do núcleo, o magma no manto se movimenta de forma lenta e circular (chamadas correntes de convecção). Esse movimento lento é o que empurra as placas tectônicas na superfície, provocando terremotos e erupções vulcânicas!',
      curiosity: 'Os vulcões expelem o magma do manto! Quando esse material pastoso e quente consegue sair e chega à superfície da Terra, ele passa a ser chamado de <strong>lava</strong>.'
    },
    'outer-core': {
      name: 'Núcleo Externo',
      'class': 'header-outer-core',
      thickness: 'Cerca de 2.200 km de espessura',
      temperature: 'De 3.000°C a 4.500°C',
      state: 'Líquido (Metal derretido em constante movimento)',
      composition: 'Ferro e Níquel líquidos',
      summary: 'Uma camada superquente de metal derretido que gira constantemente. O movimento desse metal líquido supercondutor funciona como um dínamo gigante, gerando uma corrente elétrica enorme que cria o <strong>campo magnético da Terra</strong>. Esse campo age como um "escudo protetor" invisível contra radiações perigosas vindas do Sol.',
      curiosity: 'Se não fosse pelo núcleo externo líquido gerando nosso campo magnético protetor, a vida na Terra provavelmente não existiria, pois os ventos solares destruiriam nossa atmosfera!'
    },
    'inner-core': {
      name: 'Núcleo Interno',
      'class': 'header-inner-core',
      thickness: 'Cerca de 1.250 km de raio',
      temperature: 'De 5.000°C a 6.000°C (Tão quente quanto a superfície do Sol!)',
      state: 'Sólido (Metal extremamente compactado)',
      composition: 'Ferro e Níquel sólidos',
      summary: 'É a parte mais profunda e central da Terra. Embora a temperatura aqui seja absurda, o núcleo é completamente sólido! Isso acontece porque a pressão exercida pelo peso de todo o planeta acima dele é tão colossal que força os átomos de ferro a ficarem espremidos e organizados na forma sólida.',
      curiosity: 'O núcleo interno é tão isolado que estudos indicam que ele gira um pouquinho mais rápido do que a própria superfície da Terra!'
    }
  };

  // --- COMPONENTES DA INTERFACE ---
  var svgLayers = document.querySelectorAll('.interactive-layer');
  var listItems = document.querySelectorAll('.list-group-item-action');
  
  var infoHeader = document.getElementById('info-header');
  var infoName = document.getElementById('info-name');
  var statThickness = document.getElementById('stat-thickness');
  var statTemp = document.getElementById('stat-temp');
  var statState = document.getElementById('stat-state');
  var statComposition = document.getElementById('stat-composition');
  var infoSummary = document.getElementById('info-summary');
  var infoCuriosity = document.getElementById('info-curiosity');

  // Função para mudar a camada exibida no painel
  function selectLayer(layerKey) {
    var data = layersData[layerKey];
    if (!data) return;

    // Atualizar classes de cabeçalho do painel
    infoHeader.className = 'info-layer-header ' + data['class'];
    infoName.textContent = data.name;

    // Atualizar estatísticas e textos
    statThickness.textContent = data.thickness;
    statTemp.textContent = data.temperature;
    statState.textContent = data.state;
    statComposition.textContent = data.composition;
    infoSummary.innerHTML = data.summary;
    infoCuriosity.innerHTML = data.curiosity;

    // Atualizar destaques visuais no SVG
    for (var i = 0; i < svgLayers.length; i++) {
      var layer = svgLayers[i];
      if (layer.getAttribute('data-layer') === layerKey) {
        layer.classList.add('active');
      } else {
        layer.classList.remove('active');
      }
    }

    // Atualizar destaques visuais na lista de botões
    for (var j = 0; j < listItems.length; j++) {
      var item = listItems[j];
      if (item.getAttribute('data-layer') === layerKey) {
        item.classList.add('active');
        item.classList.add('bg-primary');
        item.classList.add('border-primary');
        item.style.color = '#fff';
      } else {
        item.classList.remove('active');
        item.classList.remove('bg-primary');
        item.classList.remove('border-primary');
        item.style.color = '';
      }
    }
  }

  // Eventos para o SVG e lista
  for (var k = 0; k < svgLayers.length; k++) {
    (function (layer) {
      layer.addEventListener('click', function () {
        var layerKey = layer.getAttribute('data-layer');
        selectLayer(layerKey);
      });
    })(svgLayers[k]);
  }

  for (var m = 0; m < listItems.length; m++) {
    (function (item) {
      item.addEventListener('click', function (e) {
        e.preventDefault();
        var layerKey = item.getAttribute('data-layer');
        selectLayer(layerKey);
      });
    })(listItems[m]);
  }

  // Inicializa com a Crosta selecionada
  selectLayer('crust');

  // --- LÓGICA DO QUIZ INTERATIVO ---
  var quizQuestions = [
    {
      question: "Qual é a camada mais fina e externa da Terra, onde nós vivemos, construímos cidades e plantamos?",
      options: [
        "Manto Terrestre",
        "Núcleo Externo",
        "Crosta Terrestre",
        "Núcleo Interno"
      ],
      correctIndex: 2,
      explanation: "Isso mesmo! A Crosta Terrestre é a camada superficial e fina como a casca de uma maçã ou de um ovo cozido. Toda a nossa vida acontece nela!"
    },
    {
      question: "O manto é composto por rochas muito quentes e pastosas. Qual é o nome desse material derretido que dá origem à lava dos vulcões?",
      options: [
        "Água Termal",
        "Magma",
        "Ferro Sólido",
        "Granito Moído"
      ],
      correctIndex: 1,
      explanation: "Exato! No interior da Terra, chamamos esse material pastoso e derretido de <strong>magma</strong>. Quando ele escapa por erupções vulcânicas para a superfície, passa a ser chamado de <strong>lava</strong>."
    },
    {
      question: "O núcleo interno da Terra atinge temperaturas de até 6.000°C (tão quente quanto o Sol!). Por que ele é sólido e não líquido?",
      options: [
        "Porque a pressão exercida pelo peso das camadas superiores é tão gigantesca que impede o metal de derreter",
        "Porque lá no centro tem gelo espacial acumulado",
        "Porque o ferro e o níquel congelam no calor",
        "Porque o núcleo interno não recebe calor do manto"
      ],
      correctIndex: 0,
      explanation: "Perfeito! A pressão lá no centro é tão monstruosa (o peso de toda a Terra espremendo o núcleo) que os átomos de ferro e níquel não conseguem se espalhar para virar líquido, mesmo sob calor extremo!"
    },
    {
      question: "Qual camada da Terra é líquida e o movimento de seus metais é responsável por criar o campo magnético protetor do nosso planeta?",
      options: [
        "Crosta Continental",
        "Manto Superior",
        "Núcleo Externo",
        "Núcleo Interno"
      ],
      correctIndex: 2,
      explanation: "Correto! O <strong>Núcleo Externo</strong>, por ser líquido e composto de metais (ferro e níquel), move-se de forma a gerar correntes elétricas gigantescas, criando o nosso campo magnético (que desvia a radiação prejudicial do Sol)."
    },
    {
      question: "Se a broca de perfuração mais profunda do ser humano só chegou a 12 km, como sabemos que a Terra tem manto e núcleo por dentro?",
      options: [
        "Porque olhamos com um óculos de raio-X gigante do espaço",
        "Através do estudo das ondas sísmicas de terremotos que viajam pelo interior do planeta",
        "Porque os astronautas da Lua conseguem ver o interior da Terra de longe",
        "Lendo mapas antigos da civilização atlântida"
      ],
      correctIndex: 1,
      explanation: "Excelente! As vibrações dos terremotos (ondas sísmicas) viajam pelo interior da Terra e mudam de velocidade ou direção ao bater em materiais diferentes (sólidos, líquidos ou pastosos). É assim que os cientistas sismólogos mapeiam o interior terrestre!"
    }
  ];

  var currentQuestionIndex = 0;
  var score = 0;
  var userHasAnswered = false;

  var quizCardContent = document.getElementById('quiz-card-content');
  var quizResultsContent = document.getElementById('quiz-results-content');
  var questionNumberEl = document.getElementById('question-number');
  var questionTextEl = document.getElementById('question-text');
  var optionsContainer = document.getElementById('options-container');
  var feedbackContainer = document.getElementById('feedback-container');
  var progressBarFill = document.getElementById('progress-bar-fill');
  var nextBtn = document.getElementById('next-question-btn');
  var restartBtn = document.getElementById('restart-quiz-btn');

  // Elementos do Resultado
  var scoreBadge = document.getElementById('score-badge');
  var scoreTitle = document.getElementById('score-title');
  var scoreText = document.getElementById('score-text');

  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    quizCardContent.classList.remove('d-none');
    quizResultsContent.classList.add('d-none');
    loadQuestion();
  }

  function loadQuestion() {
    userHasAnswered = false;
    feedbackContainer.innerHTML = '';
    nextBtn.classList.add('d-none');
    
    var currentQuestion = quizQuestions[currentQuestionIndex];
    
    // Atualizar progresso
    var progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
    progressBarFill.style.width = progressPercent + '%';

    // Carregar pergunta
    questionNumberEl.textContent = 'Pergunta ' + (currentQuestionIndex + 1) + ' de ' + quizQuestions.length;
    questionTextEl.textContent = currentQuestion.question;

    // Carregar opções
    optionsContainer.innerHTML = '';
    for (var n = 0; n < currentQuestion.options.length; n++) {
      (function (index) {
        var option = currentQuestion.options[index];
        var button = document.createElement('button');
        button.className = 'option-btn';
        button.innerHTML = '<span class="fw-bold me-2">' + String.fromCharCode(65 + index) + ')</span> ' + option;
        button.setAttribute('data-index', index);
        button.addEventListener('click', function () {
          selectOption(button, index);
        });
        optionsContainer.appendChild(button);
      })(n);
    }
  }

  function selectOption(selectedButton, index) {
    if (userHasAnswered) return;
    userHasAnswered = true;

    var currentQuestion = quizQuestions[currentQuestionIndex];
    var optionButtons = optionsContainer.querySelectorAll('.option-btn');

    // Desabilitar todas as opções e destacar
    for (var p = 0; p < optionButtons.length; p++) {
      var btn = optionButtons[p];
      btn.disabled = true;
      var btnIndex = parseInt(btn.getAttribute('data-index'), 10);
      
      if (btnIndex === currentQuestion.correctIndex) {
        btn.classList.add('correct');
      }
    }

    var isCorrect = (index === currentQuestion.correctIndex);
    
    if (isCorrect) {
      score++;
      selectedButton.classList.add('correct');
      showFeedback(true, currentQuestion.explanation);
    } else {
      selectedButton.classList.add('incorrect');
      selectedButton.classList.add('shake-animation');
      showFeedback(false, currentQuestion.explanation);
    }

    // Atualizar progresso após responder
    var progressPercent = ((currentQuestionIndex + 1) / quizQuestions.length) * 100;
    progressBarFill.style.width = progressPercent + '%';

    // Exibir botão "Próximo"
    nextBtn.classList.remove('d-none');
    if (currentQuestionIndex === quizQuestions.length - 1) {
      nextBtn.textContent = 'Ver Resultado Final 🎉';
    } else {
      nextBtn.textContent = 'Próxima Pergunta ➔';
    }
  }

  function showFeedback(isCorrect, text) {
    var feedbackBox = document.createElement('div');
    var titleClass = isCorrect ? 'correct' : 'incorrect';
    feedbackBox.className = 'quiz-feedback-box ' + titleClass;
    
    var title = isCorrect ? '✅ Resposta Correta!' : '❌ Ops, não foi dessa vez!';
    
    feedbackBox.innerHTML = 
      '<div class="feedback-title ' + titleClass + '">' + title + '</div>' +
      '<p class="feedback-text">' + text + '</p>';
    
    feedbackContainer.appendChild(feedbackBox);
  }

  nextBtn.addEventListener('click', function () {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      currentQuestionIndex++;
      loadQuestion();
    } else {
      showResults();
    }
  });

  restartBtn.addEventListener('click', function () {
    startQuiz();
  });

  function showResults() {
    quizCardContent.classList.add('d-none');
    quizResultsContent.classList.remove('d-none');

    // Determinar badge, título e mensagem com base na pontuação
    var badge = '🌍';
    var title = '';
    var message = '';

    if (score === 5) {
      badge = '💎';
      title = 'Super Geólogo(a)!';
      message = 'Incrível! Você acertou todas as questões. Você conhece as camadas da Terra tão bem quanto a palma da sua mão. Parabéns!';
    } else if (score >= 3) {
      badge = '🌋';
      title = 'Explorador(a) da Terra!';
      message = 'Ótimo trabalho! Você acertou ' + score + ' de 5 perguntas. Você já entende bastante sobre a estrutura da Terra, continue estudando!';
    } else {
      badge = '⛏️';
      title = 'Aprendiz de Ciências!';
      message = 'Você acertou ' + score + ' de 5 perguntas. Que tal ler os textos informativos e clicar nas camadas da Terra interativas novamente para tirar suas dúvidas e tentar de novo?';
    }

    scoreBadge.textContent = badge;
    scoreTitle.textContent = title;
    scoreText.innerHTML = 'Você fez <span class="score-number">' + score + '</span> de <span class="fw-bold">' + quizQuestions.length + '</span> acertos. <br><br> ' + message;
  }

  // --- CONTROLE DE COLAPSO DO MENU (NAVBAR) SEM DEPENDÊNCIA DE JQUERY ---
  var toggleBtn = document.querySelector('.navbar-toggle');
  var targetMenu = document.getElementById('navbarNav');
  if (toggleBtn && targetMenu) {
    toggleBtn.addEventListener('click', function () {
      if (targetMenu.classList.contains('in') || targetMenu.classList.contains('show')) {
        targetMenu.classList.remove('in');
        targetMenu.classList.remove('show');
      } else {
        targetMenu.classList.add('in');
        targetMenu.classList.add('show');
      }
    });
  }

  // Inicializar o Quiz
  startQuiz();
});
