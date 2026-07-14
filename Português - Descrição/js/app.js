// Lógica Interativa de Descrição - 6º Ano
$(document).ready(function () {

    // ----------------------------------------
    // LABORATÓRIO DE DESCRIÇÃO (SWITCHER-BOX)
    // ----------------------------------------
    var descricaoFrases = [
        {
            title: "A Antiga Casa",
            direto: 'A edificação de <b class="text-warning">dois andares</b> possui paredes de <b class="text-warning">tijolos aparentes</b>, telhado colonial de barro e uma porta de madeira medindo <b class="text-warning">2,10 metros</b> de altura.',
            indireto: 'A casa velha parecia <b class="text-success">cansada pelo tempo</b>. Suas paredes ásperas guardavam segredos antigos, enquanto o telhado gordo de barro <b class="text-success">escondia a luz do sol</b> como um chapéu pesado.',
            isDireto: true, // true = Objetiva, false = Subjetiva
            expl_direto: "Na Descrição Objetiva, focamos em dados exatos, medidas e fatos reais, sem dar opiniões ou usar sentimentos.",
            expl_indireto: "Na Descrição Subjetiva, o narrador usa as emoções e comparações poéticas ('cansada pelo tempo', 'chapéu pesado') para criar impressões."
        },
        {
            title: "Chuva de Verão",
            direto: 'O índice pluviométrico atingiu <b class="text-warning">15 milímetros</b> em trinta minutos. A temperatura ambiente caiu de <b class="text-warning">32°C para 24°C</b> instantaneamente.',
            indireto: 'A água despencou do céu como uma <b class="text-success">cortina fresca e barulhenta</b>, lavando a poeira das calçadas e trazendo um <b class="text-success">cheiro delicioso de terra molhada</b>.',
            isDireto: true,
            expl_direto: "Dados exatos e numéricos. Linguagem puramente técnica, literal e informativa.",
            expl_indireto: "Apelo aos sentidos! Ativa a audição ('barulhenta'), o tato ('fresca') e o olfato ('cheiro de terra molhada')."
        },
        {
            title: "Olhar do Personagem",
            direto: 'O indivíduo apresenta olhos com <b class="text-warning">íris castanhas</b>, diâmetro pupilar normal e <b class="text-warning">ausência de óculos</b> corretivos.',
            indireto: 'Seus olhos castanhos eram <b class="text-success">profundos e acolhedores</b> como duas xícaras de café quente em uma tarde de inverno.',
            isDireto: true,
            expl_direto: "Descrição anatômica e fria, registrando o que qualquer câmera fotográfica veria.",
            expl_indireto: "Uso marcante de metáforas e adjetivos expressivos para descrever o sentimento transmitido pelo olhar."
        }
    ];

    var currentDialogueIdx = 0;

    function renderDescription() {
        var item = descricaoFrases[currentDialogueIdx];
        var textToDisplay = item.isDireto ? item.direto : item.indireto;
        var modeLabel = item.isDireto ? '<span class="label label-warning mb-2 d-inline-block">Tipo: Descrição Objetiva</span>' : '<span class="label label-success mb-2 d-inline-block">Tipo: Descrição Subjetiva</span>';
        var explText = item.isDireto ? item.expl_direto : item.expl_indireto;

        $('#switcher-sentence-container').html(
            '<div class="text-center">' + modeLabel + '<p class="lead text-white my-3">' + textToDisplay + '</p></div>'
        );
        $('#switcher-explanation').html('<i class="bi text-secondary bi-lightbulb-fill me-2"></i> ' + explText);
    }

    // Inicializar Laboratório de Descrição
    renderDescription();

    // Navegar entre os temas de descrição
    $('.sentence-selector-btn').on('click', function () {
        $('.sentence-selector-btn').removeClass('active');
        $(this).addClass('active');
        currentDialogueIdx = $(this).data('index');
        descricaoFrases[currentDialogueIdx].isDireto = true; // Reinicia para objetiva por padrão ao alternar
        renderDescription();
    });

    // Botão de alternar (Toggle) entre Objetiva e Subjetiva
    $('#btn-switch-toggle').on('click', function () {
        descricaoFrases[currentDialogueIdx].isDireto = !descricaoFrases[currentDialogueIdx].isDireto;
        renderDescription();
    });


    // ----------------------------------------
    // QUIZ INTERATIVO (PROCESSO DESCRITIVO)
    // ----------------------------------------
    var quizQuestions = [
        {
            question: "1. Qual classe gramatical é considerada a mais importante e utilizada em um texto descritivo?",
            options: [
                "Os Verbos de Ação",
                "Os Adjetivos e Locuções Adjetivas",
                "Os Pronomes Pessoais",
                "Os Advérbios de Tempo"
            ],
            correct: 1,
            explanation: "Exatamente! Os adjetivos são cruciais porque dão características, cores, qualidades e formas aos elementos que estamos retratando."
        },
        {
            question: "2. Se um texto descreve o temperamento, os medos e as virtudes de um personagem, que tipo de caracterização foi feita?",
            options: [
                "Caracterização Física",
                "Caracterização Objetiva",
                "Caracterização Psicológica",
                "Caracterização Espacial"
            ],
            correct: 2,
            explanation: "Perfeito! A caracterização psicológica mapeia o lado interno: a personalidade, os sentimentos e o comportamento de alguém."
        },
        {
            question: "3. 'O quarto era gelado e exalava um perfume doce de lavanda.' Quais sentidos humanos foram despertados nessa descrição?",
            options: [
                "Apenas a Visão",
                "Tato (gelado) e Olfato (perfume de lavanda)",
                "Audição e Paladar",
                "Nenhum sentido foi utilizado"
            ],
            correct: 1,
            explanation: "Muito bem! 'Gelado' ativa o tato (temperatura) e 'perfume doce de lavanda' ativa o nosso olfato (aroma)."
        },
        {
            question: "4. Em qual tipo de texto encontramos mais frequentemente uma Descrição Objetiva?",
            options: [
                "Em um poema de amor",
                "Em um manual de instruções ou anúncio técnico de venda",
                "Em uma fábula com animais falantes",
                "Em um diário pessoal emocional"
            ],
            correct: 1,
            explanation: "Correto! Textos técnicos e anúncios precisam de uma descrição exata, sem sentimentos ou impressões particulares."
        },
        {
            question: "5. No processo descritivo de um cenário, qual estratégia ajuda o leitor a compreender a localização dos objetos?",
            options: [
                "Usar verbos no futuro",
                "Repetir muitas vezes a palavra 'coisa'",
                "Utilizar organizadores espaciais (à esquerda, ao fundo, no topo)",
                "Focar apenas nas ações rápidas"
            ],
            correct: 2,
            explanation: "Isso mesmo! Advérbios e locuções de lugar guiam os olhos do leitor, organizando o cenário na mente de quem lê."
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

        // Bloquear outros botões após a resposta
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
            // Destacar o botão correto para fins didáticos
            $('.quiz-option-btn').eq(q.correct).addClass('correct');
            $('#quiz-feedback-container')
                .removeClass('d-none')
                .addClass('bg-danger-subtle text-danger-emphasis')
                .html('<strong><i class="bi bi-x-circle-fill"></i> Não foi dessa vez.</strong><br>' + q.explanation);
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
            // Fim do quiz, preencher barra de progresso 100%
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
            text = "Sensacional! Você possui olhos de lince para capturar detalhes e domina todas as técnicas de texto descritivo!";
        } else if (userScore >= 3) {
            emoji = "📷";
            text = "Excelente! Você consegue identificar com clareza os apelos sensoriais e os tipos de caracterização. Continue observando o mundo!";
        } else {
            emoji = "📝";
            text = "Uma revisão rápida sobre as diferenças entre o texto objetivo e subjetivo ajudará você a gabaritar na próxima tentativa!";
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