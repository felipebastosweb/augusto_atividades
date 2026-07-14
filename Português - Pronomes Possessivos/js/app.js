document.addEventListener('DOMContentLoaded', function() {
    // ----------------------------------------------------
    // 1. REVELAÇÃO AO ROLAR (Intersection Observer com Fallback ES5)
    // ----------------------------------------------------
    var revealElements = document.querySelectorAll('.reveal-on-scroll');
    if (typeof window.IntersectionObserver !== 'undefined') {
        var observer = new IntersectionObserver(function(entries) {
            for (var i = 0; i < entries.length; i++) {
                var entry = entries[i];
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target); // Revela apenas uma vez
                }
            }
        }, {
            threshold: 0.15
        });

        for (var i = 0; i < revealElements.length; i++) {
            observer.observe(revealElements[i]);
        }
    } else {
        // Fallback: Revela imediatamente no Android 4.1 para não quebrar a usabilidade
        for (var i = 0; i < revealElements.length; i++) {
            revealElements[i].classList.add('visible');
        }
    }

    // ----------------------------------------------------
    // 2. MÁQUINA DE SUBSTITUIÇÃO DE PRONOMES
    // ----------------------------------------------------
    var sentences = [
        {
            id: 1,
            originalText: "O menino comprou o caderno na papelaria.",
            originalWords: [
                { text: "O", isNoun: false },
                { text: "menino", isNoun: true, label: "Substantivo (Sujeito)" },
                { text: "comprou", isNoun: false },
                { text: "o", isNoun: false },
                { text: "caderno", isNoun: true, label: "Substantivo (Objeto)" },
                { text: "na", isNoun: false },
                { text: "papelaria.", isNoun: false }
            ],
            replacedWords: [
                { text: "Ele", isPronoun: true, label: "Pronome Pessoal Reto (Sujeito)" },
                { text: "o", isPronoun: true, label: "Pronome Pessoal Oblíquo (Objeto)" },
                { text: "comprou", isNoun: false },
                { text: "na", isNoun: false },
                { text: "papelaria.", isNoun: false }
            ],
            explanation: "Trocamos os substantivos pelos pronomes equivalentes: <b>o menino</b> virou <b>Ele</b> (sujeito) e <b>o caderno</b> virou o pronome oblíquo <b>o</b> (colocado antes do verbo)."
        },
        {
            id: 2,
            originalText: "Os alunos entregaram a matéria para a professora.",
            originalWords: [
                { text: "Os", isNoun: false },
                { text: "alunos", isNoun: true, label: "Substantivo Plural (Sujeito)" },
                { text: "entregaram", isNoun: false },
                { text: "a", isNoun: false },
                { text: "matéria", isNoun: true, label: "Substantivo (Objeto)" },
                { text: "para", isNoun: false },
                { text: "a", isNoun: false },
                { text: "professora.", isNoun: true, label: "Substantivo (Destinatário)" }
            ],
            replacedWords: [
                { text: "Eles", isPronoun: true, label: "Pronome Pessoal Reto (Sujeito)" },
                { text: "a", isPronoun: true, label: "Pronome Pessoal Oblíquo (Objeto)" },
                { text: "entregaram", isNoun: false },
                { text: "para", isNoun: false },
                { text: "ela.", isPronoun: true, label: "Pronome Oblíquo Preposicionado" }
            ],
            explanation: "Aqui, <b>Os alunos</b> viraram <b>Eles</b>; <b>a matéria</b> virou o pronome oblíquo <b>a</b>; e <b>a professora</b> virou <b>ela</b> (precedido da preposição <i>para</i>)."
        },
        {
            id: 3,
            originalText: "Lívia e Rafael encontraram os amigos no parque.",
            originalWords: [
                { text: "Lívia", isNoun: true, label: "Substantivo Próprio" },
                { text: "e", isNoun: false },
                { text: "Rafael", isNoun: true, label: "Substantivo Próprio" },
                { text: "encontraram", isNoun: false },
                { text: "os", isNoun: false },
                { text: "amigos", isNoun: true, label: "Substantivo Plural (Objeto)" },
                { text: "no", isNoun: false },
                { text: "parque.", isNoun: false }
            ],
            replacedWords: [
                { text: "Eles", isPronoun: true, label: "Pronome Pessoal Reto (Sujeito Composto)" },
                { text: "os", isPronoun: true, label: "Pronome Pessoal Oblíquo (Objeto)" },
                { text: "encontraram", isNoun: false },
                { text: "no", isNoun: false },
                { text: "parque.", isNoun: false }
            ],
            explanation: "O sujeito composto <b>Lívia e Rafael</b> é substituído por <b>Eles</b>, e a expressão <b>os amigos</b> vira o pronome oblíquo <b>os</b>."
        }
    ];

    var currentSentenceIndex = 0;
    var isReplaced = false;

    var sentenceContainer = document.getElementById('switcher-sentence-container');
    var switcherExplanation = document.getElementById('switcher-explanation');
    var btnSwitchToggle = document.getElementById('btn-switch-toggle');
    var sentenceSelectors = document.querySelectorAll('.sentence-selector-btn');

    function renderSentence() {
        var sentenceData = sentences[currentSentenceIndex];
        sentenceContainer.innerHTML = '';
        
        var wordsList = isReplaced ? sentenceData.replacedWords : sentenceData.originalWords;
        
        for (var j = 0; j < wordsList.length; j++) {
            var word = wordsList[j];
            var span = document.createElement('span');
            span.textContent = word.text + ' ';
            span.className = 'switcher-word';
            
            if (!isReplaced && word.isNoun) {
                span.className += ' highlight-noun';
                span.title = word.label;
                span.setAttribute('data-toggle', 'tooltip');
                span.setAttribute('data-placement', 'top');
            } else if (isReplaced && word.isPronoun) {
                span.className += ' highlight-pronoun';
                span.title = word.label;
                span.setAttribute('data-toggle', 'tooltip');
                span.setAttribute('data-placement', 'top');
            }
            
            sentenceContainer.appendChild(span);
        }

        // Inicializar tooltips do Bootstrap 3 via jQuery
        if (typeof jQuery !== 'undefined' && jQuery.fn.tooltip) {
            jQuery('[data-toggle="tooltip"]').tooltip();
        }

        // Atualizar explicações e estados do botão
        if (isReplaced) {
            switcherExplanation.innerHTML = '<i class="bi bi-info-circle-fill me-2"></i> ' + sentenceData.explanation;
            switcherExplanation.style.opacity = 1;
            btnSwitchToggle.innerHTML = '<i class="bi bi-arrow-counterclockwise me-2"></i> Voltar ao Original';
            btnSwitchToggle.classList.remove('btn-switcher-primary');
            btnSwitchToggle.classList.add('btn-outline-light');
        } else {
            switcherExplanation.innerHTML = '<i class="bi bi-lightbulb-fill me-2"></i> Clique em "Substituir" para ver a mágica do pronome!';
            switcherExplanation.style.opacity = 0.8;
            btnSwitchToggle.innerHTML = '<i class="bi bi-arrow-left-right me-2"></i> Substituir por Pronomes';
            btnSwitchToggle.classList.add('btn-switcher-primary');
            btnSwitchToggle.classList.remove('btn-outline-light');
        }
    }

    // Eventos do seletor de frase
    for (var k = 0; k < sentenceSelectors.length; k++) {
        sentenceSelectors[k].addEventListener('click', function(e) {
            var btn = e.currentTarget || this;
            for (var m = 0; m < sentenceSelectors.length; m++) {
                sentenceSelectors[m].classList.remove('active');
            }
            btn.classList.add('active');
            currentSentenceIndex = parseInt(btn.getAttribute('data-index'), 10);
            isReplaced = false;
            renderSentence();
        });
    }

    // Evento de clique para substituir
    btnSwitchToggle.addEventListener('click', function() {
        sentenceContainer.style.opacity = 0;
        setTimeout(function() {
            isReplaced = !isReplaced;
            renderSentence();
            sentenceContainer.style.opacity = 1;
        }, 200);
    });

    // Inicializa a máquina de substituição
    renderSentence();

    // ----------------------------------------------------
    // 3. QUIZ INTERATIVO SOBRE PRONOMES
    // ----------------------------------------------------
    var quizQuestions = [
        {
            question: "1. Identifique a alternativa em que todos os pronomes destacados são pessoais do caso reto:",
            options: [
                "A) Ontem eu vi ti na escola com eles.",
                "B) Nós estudamos muito e ela explicou a matéria.",
                "C) Venha comigo, pois seu irmão te espera.",
                "D) Aquele material é meu, mas quem guardou foi você."
            ],
            correctIndex: 1,
            explanation: "Os pronomes retos (eu, tu, ele/ela, nós, vós, eles/elas) desempenham o papel de sujeito da frase. Na alternativa B, 'Nós' e 'ela' são pronomes retos que realizam as ações de 'estudar' e 'explicar'."
        },
        {
            question: "2. Na frase: 'Este estojo é meu, mas aquele em cima da mesa é seu', os pronomes destacados são classificados, respectivamente, como:",
            options: [
                "A) Demonstrativo, possessivo, demonstrativo, possessivo.",
                "B) Possessivo, demonstrativo, demonstrativo, possessivo.",
                "C) Demonstrativo, demonstrativo, pessoal, possessivo.",
                "D) Indefinido, possessivo, relativo, de tratamento."
            ],
            correctIndex: 0,
            explanation: "'Este' e 'aquele' são pronomes demonstrativos pois situam os objetos no espaço. 'Meu' e 'seu' indicam a quem pertencem os objetos, logo são possessivos."
        },
        {
            question: "3. Em qual das frases abaixo o pronome oblíquo foi empregado de acordo com a norma padrão para substituir um substantivo?",
            options: [
                "A) Eu encontrei o professor e chamei ele para a sala.",
                "B) Peguei o giz e coloquei ele no bolso.",
                "C) O aluno fez a tarefa e apresentou-a ao professor.",
                "D) Eles trouxeram os jogos e deram eles para nós."
            ],
            correctIndex: 2,
            explanation: "Na norma culta, pronomes do caso reto (ele, ela, eles, elas) não devem funcionar como objeto direto. Deve-se usar pronomes oblíquos ('a' no caso de 'tarefa', resultando em 'apresentou-a')."
        },
        {
            question: "4. Assinale a alternativa que apresenta apenas pronomes indefinidos:",
            options: [
                "A) Ninguém, alguém, tudo, algo, outrem.",
                "B) Você, senhor, Vossa Senhoria, tu.",
                "C) Que, quem, qual, quanto, onde.",
                "D) Teu, vosso, nosso, meu, seu."
            ],
            correctIndex: 0,
            explanation: "Os pronomes indefinidos referem-se à terceira pessoa do discurso de modo vago, indeterminado ou impreciso (ninguém, alguém, tudo, algo, outrem)."
        },
        {
            question: "5. Na frase 'Você já fez a leitura do livro indicado?', qual é a classificação gramatical do pronome destacado?",
            options: [
                "A) Pronome pessoal oblíquo.",
                "B) Pronome possessivo.",
                "C) Pronome de tratamento.",
                "D) Pronome indefinido."
            ],
            correctIndex: 2,
            explanation: "'Você' é gramaticalmente classificado como um pronome de tratamento (originado de 'Vossa Mercê'), usado para comunicação informal do dia a dia."
        }
    ];

    var quizCurrentQuestionIndex = 0;
    var quizScore = 0;
    var optionSelected = false;

    var quizProgressFill = document.getElementById('quiz-progress-fill');
    var quizQuestionText = document.getElementById('quiz-question-text');
    var quizOptionsContainer = document.getElementById('quiz-options-container');
    var quizFeedbackContainer = document.getElementById('quiz-feedback-container');
    var quizFeedbackText = document.getElementById('quiz-feedback-text');
    var quizBtnNext = document.getElementById('quiz-btn-next');
    
    var quizActiveWrapper = document.getElementById('quiz-active-wrapper');
    var quizResultsWrapper = document.getElementById('quiz-results-wrapper');
    var quizResultsEmoji = document.getElementById('quiz-results-emoji');
    var quizResultsScore = document.getElementById('quiz-results-score');
    var quizResultsText = document.getElementById('quiz-results-text');
    var quizBtnRestart = document.getElementById('quiz-btn-restart');

    function loadQuizQuestion() {
        optionSelected = false;
        quizFeedbackContainer.classList.add('d-none');
        quizFeedbackContainer.classList.remove('success');
        quizFeedbackContainer.classList.remove('danger');
        quizBtnNext.classList.add('d-none');
        
        // Progress bar
        var progressPercent = (quizCurrentQuestionIndex / quizQuestions.length) * 100;
        quizProgressFill.style.width = progressPercent + '%';

        // Question text
        var currentQ = quizQuestions[quizCurrentQuestionIndex];
        quizQuestionText.textContent = currentQ.question;

        // Render options
        quizOptionsContainer.innerHTML = '';
        for (var idx = 0; idx < currentQ.options.length; idx++) {
            (function(index) {
                var optionText = currentQ.options[index];
                var btn = document.createElement('button');
                btn.className = 'quiz-option-btn';
                btn.innerHTML = '<span>' + optionText + '</span> <i class="bi bi-circle"></i>';
                btn.addEventListener('click', function() {
                    handleOptionSelection(index, btn);
                });
                quizOptionsContainer.appendChild(btn);
            })(idx);
        }
    }

    function handleOptionSelection(selectedIdx, selectedBtn) {
        if (optionSelected) return; // Prevent multiple clicks
        optionSelected = true;

        var currentQ = quizQuestions[quizCurrentQuestionIndex];
        var isCorrect = selectedIdx === currentQ.correctIndex;
        
        // Disable all buttons
        var optionButtons = quizOptionsContainer.querySelectorAll('.quiz-option-btn');
        for (var b = 0; b < optionButtons.length; b++) {
            optionButtons[b].disabled = true;
        }

        // Highlight choices
        if (isCorrect) {
            quizScore++;
            selectedBtn.classList.add('correct');
            selectedBtn.querySelector('i').className = 'bi bi-check-circle-fill';
            
            quizFeedbackContainer.className = 'quiz-feedback success';
            quizFeedbackText.innerHTML = '<strong>Correto! 🎉</strong> ' + currentQ.explanation;
        } else {
            selectedBtn.classList.add('incorrect');
            selectedBtn.querySelector('i').className = 'bi bi-x-circle-fill';
            
            // Highlight the correct one
            var correctBtn = optionButtons[currentQ.correctIndex];
            correctBtn.classList.add('correct');
            correctBtn.querySelector('i').className = 'bi bi-check-circle-fill';
            
            quizFeedbackContainer.className = 'quiz-feedback danger';
            quizFeedbackText.innerHTML = '<strong>Ops! Resposta incorreta. 😕</strong> ' + currentQ.explanation;
        }

        quizFeedbackContainer.classList.remove('d-none');
        quizBtnNext.classList.remove('d-none');

        // If it's the last question, change next button text
        if (quizCurrentQuestionIndex === quizQuestions.length - 1) {
            quizBtnNext.innerHTML = 'Ver Resultado <i class="bi bi-trophy-fill ms-2"></i>';
        } else {
            quizBtnNext.innerHTML = 'Próxima Questão <i class="bi bi-arrow-right ms-2"></i>';
        }
    }

    function showQuizResults() {
        quizProgressFill.style.width = '100%';
        quizActiveWrapper.classList.add('d-none');
        quizResultsWrapper.classList.remove('d-none');
        
        quizResultsScore.textContent = quizScore + ' / ' + quizQuestions.length;

        // Feedback based on score
        if (quizScore === quizQuestions.length) {
            quizResultsEmoji.textContent = "🏆";
            quizResultsText.innerHTML = "<h4>Excelente! Você é um mestre dos pronomes!</h4><p>Você acertou todas as questões. Seu domínio dos pronomes está fantástico!</p>";
        } else if (quizScore >= 3) {
            quizResultsEmoji.textContent = "🌟";
            quizResultsText.innerHTML = "<h4>Muito bem! Excelente esforço!</h4><p>Você conhece muito bem as classes e funções dos pronomes. Revise os pontos em que errou e tente gabaritar na próxima!</p>";
        } else {
            quizResultsEmoji.textContent = "📚";
            quizResultsText.innerHTML = "<h4>Continue estudando!</h4><p>Não desanime. Que tal dar mais uma lida com calma nas tabelas explicativas acima e tentar fazer o quiz novamente?</p>";
        }
    }

    quizBtnNext.addEventListener('click', function() {
        if (quizCurrentQuestionIndex < quizQuestions.length - 1) {
            quizCurrentQuestionIndex++;
            loadQuizQuestion();
        } else {
            showQuizResults();
        }
    });

    quizBtnRestart.addEventListener('click', function() {
        quizCurrentQuestionIndex = 0;
        quizScore = 0;
        quizActiveWrapper.classList.remove('d-none');
        quizResultsWrapper.classList.add('d-none');
        loadQuizQuestion();
    });

    // Inicializar o quiz
    loadQuizQuestion();
});
