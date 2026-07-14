// Lógica Interativa para Estudo de Verbos e Tempos Verbais
$(document).ready(function () {

    // ----------------------------------------
    // SIMULADOR DE CONJUGAÇÃO (SWITCHER-BOX)
    // ----------------------------------------
    var verbosSimulador = [
        {
            verbo: "Estudar",
            conjugacao: "1ª Conjugação (-AR)",
            presente: "Eu <span class='text-primary'><strong>estudo</strong></span><br>Ele/Ela <span class='text-primary'><strong>estuda</strong></span><br>Nós <span class='text-primary'><strong>estudamos</strong></span><br>Eles/Elas <span class='text-primary'><strong>estudam</strong></span>",
            passado: "Eu <span class='text-warning-emphasis'><strong>estudei</strong></span><br>Ele/Ela <span class='text-warning-emphasis'><strong>estudou</strong></span><br>Nós <span class='text-warning-emphasis'><strong>estudamos</strong></span><br>Eles/Elas <span class='text-warning-emphasis'><strong>estudaram</strong></span>",
            isPresente: true,
            expl_presente: "O radical do verbo 'estud-' recebe as desinências do Presente. Mostra ações ocorrendo no cotidiano atual.",
            expl_passado: "Note como no Pretérito Perfeito a terminação se altera (ei, ou, amos, aram) para indicar um fato totalmente concluído no passado."
        },
        {
            verbo: "Escrever",
            conjugacao: "2ª Conjugação (-ER)",
            presente: "Eu <span class='text-primary'><strong>escrevo</strong></span><br>Ele/Ela <span class='text-primary'><strong>escreve</strong></span><br>Nós <span class='text-primary'><strong>escrevemos</strong></span><br>Eles/Elas <span class='text-primary'><strong>escrevem</strong></span>",
            passado: "Eu <span class='text-warning-emphasis'><strong>escrevi</strong></span><br>Ele/Ela <span class='text-warning-emphasis'><strong>escreveu</strong></span><br>Nós <span class='text-warning-emphasis'><strong>escrevemos</strong></span><br>Eles/Elas <span class='text-warning-emphasis'><strong>escreveram</strong></span>",
            isPresente: true,
            expl_presente: "A vogal temática 'e' aparece no radical de 2ª conjugação antes da maior parte das desinências do presente.",
            expl_passado: "O Pretérito Perfeito para verbos terminados em -ER recebe terminações como: i, eu, emos, eram."
        },
        {
            verbo: "Partir",
            conjugacao: "3ª Conjugação (-IR)",
            presente: "Eu <span class='text-primary'><strong>parto</strong></span><br>Ele/Ela <span class='text-primary'><strong>parte</strong></span><br>Nós <span class='text-primary'><strong>partimos</strong></span><br>Eles/Elas <span class='text-primary'><strong>partem</strong></span>",
            passado: "Eu <span class='text-warning-emphasis'><strong>parti</strong></span><br>Ele/Ela <span class='text-warning-emphasis'><strong>partiu</strong></span><br>Nós <span class='text-warning-emphasis'><strong>partimos</strong></span><br>Eles/Elas <span class='text-warning-emphasis'><strong>partiram</strong></span>",
            isPresente: true,
            expl_presente: "Na 3ª conjugação (-IR), o presente preserva a vogal 'i' principalmente na primeira pessoa do plural (partimos).",
            expl_passado: "O Pretérito Perfeito de verbos terminados em -IR resulta em desinências como: i, iu, imos, iram."
        }
    ];

    var currentVerbIdx = 0;

    function renderConjugation() {
        var item = verbosSimulador[currentVerbIdx];
        var textToDisplay = item.isPresente ? item.presente : item.passado;
        var modeLabel = item.isPresente ? '<span class="label label-info mb-2 d-inline-block">Tempo: Presente do Indicativo</span>' : '<span class="label label-warning mb-2 d-inline-block">Tempo: Pretérito Perfeito do Indicativo</span>';
        var explText = item.isPresente ? item.expl_presente : item.expl_passado;

        $('#switcher-sentence-container').html(
            '<div class="text-center"><h3 class="text-secondary mb-1">' + item.verbo + '</h3><span class="small text-muted mb-3 d-block">' + item.conjugacao + '</span>' + modeLabel + '<p class="lead text-white my-3" style="line-height: 2;">' + textToDisplay + '</p></div>'
        );
        $('#switcher-explanation').html('<i class="bi text-secondary bi-lightbulb-fill me-2"></i> ' + explText);
    }

    // Inicializar Simulador
    renderConjugation();

    // Trocar de Verbo/Conjugação
    $('.sentence-selector-btn').on('click', function () {
        $('.sentence-selector-btn').removeClass('active');
        $(this).addClass('active');
        currentVerbIdx = $(this).data('index');
        verbosSimulador[currentVerbIdx].isPresente = true; // Reinicia para o tempo presente ao trocar de verbo
        renderConjugation();
    });

    // Alternar Tempo Verbal (Toggle)
    $('#btn-switch-toggle').on('click', function () {
        verbosSimulador[currentVerbIdx].isPresente = !verbosSimulador[currentVerbIdx].isPresente;
        renderConjugation();
    });


    // ----------------------------------------
    // QUIZ INTERATIVO (VERBOS)
    // ----------------------------------------
    var quizQuestions = [
        {
            question: "1. Qual frase abaixo possui um verbo indicando um fenômeno da natureza?",
            options: [
                "Carlos viajou cedo ontem.",
                "Ventou muito durante a tempestade à tarde.",
                "As crianças estão muito quietas hoje.",
                "Eu comprei novos livros de português."
            ],
            correct: 1,
            explanation: "Perfeito! 'Ventou' (do verbo ventar) indica um acontecimento meteorológico (fenômeno da natureza), não possuindo sujeito que realize a ação de forma ativa."
        },
        {
            question: "2. Verbos terminados em -ER, como 'correr', 'beber' e 'perceber' pertencem a qual conjugação?",
            options: [
                "1ª Conjugação.",
                "2ª Conjugação.",
                "3ª Conjugação.",
                "Nenhuma das alternativas."
            ],
            correct: 1,
            explanation: "Correto! Os verbos terminados em -ER (e o verbo pôr, devido à sua origem histórica -poer) constituem a 2ª Conjugação da língua portuguesa."
        },
        {
            question: "3. Na frase 'Nós jogávamos videogame todas as quintas-feiras', em qual tempo está o verbo destacado?",
            options: [
                "Pretérito Perfeito.",
                "Presente.",
                "Pretérito Imperfeito.",
                "Futuro do Presente."
            ],
            correct: 2,
            explanation: "Excelente! 'Jogávamos' indica uma ação habitual e duradoura no passado, que acontecia repetidamente. Esse é o papel do Pretérito Imperfeito."
        },
        {
            question: "4. Qual é o tempo verbal que indica um acontecimento futuro condicionado a outro evento? (Ex: Eu iria à praia se fizesse sol).",
            options: [
                "Pretérito Mais-Que-Perfeito.",
                "Futuro do Presente.",
                "Futuro do Pretérito.",
                "Presente do Indicativo."
            ],
            correct: 2,
            explanation: "Isso mesmo! O Futuro do Pretérito expressa ações futuras hipotéticas que dependem de uma condição para ocorrer."
        },
        {
            question: "5. Em qual das opções o verbo está flexionado no Pretérito Perfeito do Indicativo?",
            options: [
                "Eu vendia doces na infância.",
                "Eles leram o livro inteiro na aula de ontem.",
                "Nós cantaremos no festival amanhã.",
                "Espero que ele compre os ingressos."
            ],
            correct: 1,
            explanation: "Exatamente! 'Leram' expressa uma ação que foi totalmente finalizada e concluída no passado (Pretérito Perfeito)."
        }
    ];

    var currentQuestionIdx = 0;
    var userScore = 0;

    function loadQuestion() {
        var q = quizQuestions[currentQuestionIdx];

        // Atualizar barra de progresso
        var progressPercent = ((currentQuestionIdx) / quizQuestions.length) * 100;
        $('#quiz-progress-fill').css('width', progressPercent + '%');

        // Atualizar textos da tela
        $('#quiz-question-text').text(q.question);
        $('#quiz-options-container').empty();
        $('#quiz-feedback-container').addClass('d-none').removeClass('bg-success-subtle bg-danger-subtle text-success-emphasis text-danger-emphasis');
        $('#quiz-btn-next').addClass('d-none');

        // Renderizar opções do Quiz
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

        // Bloquear botões após clicar
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
            // Destacar o botão correto
            $('.quiz-option-btn').eq(q.correct).addClass('correct');
            $('#quiz-feedback-container')
                .removeClass('d-none')
                .addClass('bg-danger-subtle text-danger-emphasis')
                .html('<strong><i class="bi bi-x-circle-fill"></i> Resposta Errada.</strong><br>' + q.explanation);
        }

        $('#quiz-btn-next').removeClass('d-none');
    }

    // Inicializar primeira questão do quiz
    loadQuestion();

    // Evento do botão "Próxima Questão"
    $('#quiz-btn-next').on('click', function () {
        currentQuestionIdx++;
        if (currentQuestionIdx < quizQuestions.length) {
            loadQuestion();
        } else {
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
            emoji = "🧠";
            text = "Incrível! Você se mostrou um verdadeiro mestre na identificação e classificação de verbos e seus tempos no Indicativo!";
        } else if (userScore >= 3) {
            emoji = "📊";
            text = "Muito bom! Você possui uma base sólida sobre verbos. Continue praticando para polir as diferenças entre os Pretéritos!";
        } else {
            emoji = "📚";
            text = "Não se preocupe! Verbo é um conteúdo extenso. Dê uma nova lida nas abas informativas acima e tente novamente.";
        }

        $('#quiz-results-emoji').text(emoji);
        $('#quiz-results-text').text(text);
    }

    // Evento para reiniciar o quiz
    $('#quiz-btn-restart').on('click', function () {
        currentQuestionIdx = 0;
        userScore = 0;
        $('#quiz-results-wrapper').addClass('d-none');
        $('#quiz-active-wrapper').removeClass('d-none');
        loadQuestion();
    });

});