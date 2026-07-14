// Lógica Interativa de Narração - 6º Ano
document.addEventListener('DOMContentLoaded', function () {

    // ----------------------------------------
    // MÁQUINA DE DIÁLOGOS (SWITCHER-BOX)
    // ----------------------------------------
    var dialogueFrases = [
        {
            title: "Diálogo da Floresta",
            direto: 'O lobo parou no meio da trilha de terra e perguntou com voz mansa:<br><b class="text-warning">— Para onde você vai com tanta pressa, Chapeuzinho Vermelho?</b>',
            indireto: 'O lobo parou no meio da trilha de terra e <b class="text-success">perguntou com voz mansa para onde Chapeuzinho Vermelho ia com tanta pressa.</b>',
            isDireto: true,
            expl_direto: "No Discurso Direto, usamos os dois-pontos e o travessão para registrar a fala original do Lobo.",
            expl_indireto: "No Discurso Indireto, as marcas de pontuação somem e o narrador reconta a pergunta do Lobo."
        },
        {
            title: "O Segredo de Ana",
            direto: 'Ana respirou fundo e confessou baixinho para a amiga:<br><b class="text-warning">— Não terminei a lição porque perdi o meu caderno.</b>',
            indireto: 'Ana respirou fundo e <b class="text-success">confessou baixinho para a amiga que não tinha terminado a lição porque perdera o seu caderno.</b>',
            isDireto: true,
            expl_direto: "O travessão indica a fala em primeira pessoa ('perdi o meu caderno').",
            expl_indireto: "As referências mudam para a terceira pessoa do discurso ('ela perdera o seu caderno')."
        },
        {
            title: "Pedido de Ajuda",
            direto: 'O marinheiro cansado implorou ao capitão:<br><b class="text-warning">— Por favor, mude a rota do navio para o norte!</b>',
            indireto: 'O marinheiro cansado <b class="text-success">implorou ao capitão que mudasse a rota do navio para o norte.</b>',
            isDireto: true,
            expl_direto: "Uso do travessão e do tom imperativo/exclamativo original.",
            expl_indireto: "O verbo passa a concordar no pretérito imperfeito do subjuntivo ('que mudasse')."
        }
    ];

    var currentDialogueIdx = 0;

    function renderDialogue() {
        var item = dialogueFrases[currentDialogueIdx];
        var textToDisplay = item.isDireto ? item.direto : item.indireto;
        var modeLabel = item.isDireto ? '<span class="label label-warning mb-2 d-inline-block">Modo: Discurso Direto</span>' : '<span class="label label-success mb-2 d-inline-block">Modo: Discurso Indireto</span>';
        var explText = item.isDireto ? item.expl_direto : item.expl_indireto;

        $('#switcher-sentence-container').html(
            '<div class="text-center">' + modeLabel + '<p class="lead text-white my-3">' + textToDisplay + '</p></div>'
        );
        $('#switcher-explanation').html('<i class="bi text-secondary bi-lightbulb-fill me-2"></i> ' + explText);
    }

    // Inicializar Laboratório de Diálogo
    renderDialogue();

    // Navegar entre Frases
    $('.sentence-selector-btn').on('click', function () {
        $('.sentence-selector-btn').removeClass('active');
        $(this).addClass('active');
        currentDialogueIdx = $(this).data('index');
        dialogueFrases[currentDialogueIdx].isDireto = true; // Reinicia para discurso direto por padrão ao trocar
        renderDialogue();
    });

    // Toggle de conversão
    $('#btn-switch-toggle').on('click', function () {
        dialogueFrases[currentDialogueIdx].isDireto = !dialogueFrases[currentDialogueIdx].isDireto;
        renderDialogue();
    });


    // ----------------------------------------
    // QUIZ INTERATIVO (SISTEMA DE FLUXO)
    // ----------------------------------------
    var quizQuestions = [
        {
            question: "1. Qual é o tipo de narrador que participa ativamente da história e conta os eventos em 1ª pessoa?",
            options: [
                "Narrador-Observador",
                "Narrador-Personagem",
                "Narrador-Onisciente",
                "Narrador-Invisível"
            ],
            correct: 1,
            explanation: "Exato! O Narrador-Personagem é aquele que vive os fatos relatados e fala em primeira pessoa (eu/nós)."
        },
        {
            question: "2. Na estrutura do enredo, como chamamos o momento de maior tensão e expectativa na história?",
            options: [
                "Apresentação",
                "Conflito Gerador",
                "Clímax",
                "Desfecho"
            ],
            correct: 2,
            explanation: "Perfeito! O clímax é o ápice do conflito, o momento crucial antes de a história se encaminhar para o final."
        },
        {
            question: "3. 'A menina estava triste. De repente, começou a correr.' Quais elementos do P.E.N.T.E estão visíveis nessa frase?",
            options: [
                "Apenas Tempo e Espaço",
                "Apenas Personagem e Ação (Enredo)",
                "Apenas Narrador e Tempo",
                "Nenhum elemento está presente"
            ],
            correct: 1,
            explanation: "Correto! Temos o personagem ('a menina') e as ações de seu estado e comportamento ('estava triste', 'começou a correr')."
        },
        {
            question: "4. Qual alternativa representa uma frase escrita em Discurso Indireto?",
            options: [
                "Ele disse: — Quero ir para casa agora.",
                "Quero ir para casa agora! — gritou o menino.",
                "A mãe mandou que ele fosse para o quarto imediatamente.",
                "E ela pensou: Será que vou me atrasar?"
            ],
            correct: 2,
            explanation: "Muito bem! No discurso indireto, o narrador transmite o comando ('A mãe mandou que ele fosse...') sem reproduzir a fala de forma direta."
        },
        {
            question: "5. Se uma narrativa se passa 'no inverno de 1889', de qual elemento estamos falando?",
            options: [
                "Espaço Físico",
                "Foco Narrativo",
                "Tempo Cronológico",
                "Clímax da Ação"
            ],
            correct: 2,
            explanation: "Correto! A indicação de estações do ano, anos ou horas refere-se à marcação de Tempo."
        }
    ];

    var currentQuestionIdx = 0;
    var userScore = 0;

    function loadQuestion() {
        var q = quizQuestions[currentQuestionIdx];

        // Atualizar barra de progresso
        var progressPercent = ((currentQuestionIdx) / quizQuestions.length) * 100;
        $('#quiz-progress-fill').css('width', progressPercent + '%');

        // Atualizar textos
        $('#quiz-question-text').text(q.question);
        $('#quiz-options-container').empty();
        $('#quiz-feedback-container').addClass('d-none').removeClass('bg-success-subtle bg-danger-subtle text-success-emphasis text-danger-emphasis');
        $('#quiz-btn-next').addClass('d-none');

        // Renderizar opções
        $.each(q.options, function (idx, option) {
            var btn = $('<button class="quiz-option-btn text-start w-100 mb-2">' + option + '</button>');
            btn.on('click', function () {
                checkAnswer(idx, btn);
            });
            $('#quiz-options-container').append(btn);
        });
    }

    function checkAnswer(selectedIdx, btnElement) {
        var q = quizQuestions[currentQuestionIdx];

        // Desabilitar outros botões
        $('.quiz-option-btn').prop('disabled', true);

        if (selectedIdx === q.correct) {
            btnElement.addClass('correct');
            userScore++;
            $('#quiz-feedback-container')
                .removeClass('d-none')
                .addClass('bg-success-subtle text-success-emphasis')
                .html('<strong><i class="bi bi-check-circle-fill"></i> Resposta Correta!</strong><br>' + q.explanation);
        } else {
            btnElement.addClass('wrong');
            // Destacar o correto
            $('.quiz-option-btn').eq(q.correct).addClass('correct');
            $('#quiz-feedback-container')
                .removeClass('d-none')
                .addClass('bg-danger-subtle text-danger-emphasis')
                .html('<strong><i class="bi bi-x-circle-fill"></i> Ops! Não foi dessa vez.</strong><br>' + q.explanation);
        }

        $('#quiz-btn-next').removeClass('d-none');
    }

    // Inicializar primeira questão do quiz
    loadQuestion();

    // Evento do botão "Próximo"
    $('#quiz-btn-next').on('click', function () {
        currentQuestionIdx++;
        if (currentQuestionIdx < quizQuestions.length) {
            loadQuestion();
        } else {
            // Fim do quiz, atualizar barra de progresso para 100%
            $('#quiz-progress-fill').css('width', '100%');
            showResults();
        }
    });

    function showResults() {
        $('#quiz-active-wrapper').addClass('d-none');
        $('#quiz-results-wrapper').removeClass('d-none');
        $('#quiz-results-score').text(userScore + " / " + quizQuestions.length);

        var emoji = "🏆";
        var text = "";

        if (userScore === 5) {
            emoji = "👑";
            text = "Incrível! Você é um verdadeiro mestre das histórias. Já pode começar a escrever seu primeiro livro!";
        } else if (userScore >= 3) {
            emoji = "📝";
            text = "Muito bom! Você compreende perfeitamente como funcionam os elementos e discursos da narração. Continue praticando!";
        } else {
            emoji = "📚";
            text = "Que tal dar mais uma lida nas nossas tabelas explicativas sobre narrador e enredo antes de tentar novamente?";
        }

        $('#quiz-results-emoji').text(emoji);
        $('#quiz-results-text').text(text);
    }

    // Evento de reinício
    $('#quiz-btn-restart').on('click', function () {
        currentQuestionIdx = 0;
        userScore = 0;
        $('#quiz-results-wrapper').addClass('d-none');
        $('#quiz-active-wrapper').removeClass('d-none');
        loadQuestion();
    });

});
