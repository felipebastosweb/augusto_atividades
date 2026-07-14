// Lógica Interativa de Dissertação - Redação e Argumentação
$(document).ready(function () {

    // ----------------------------------------
    // LABORATÓRIO DE ESCRITA DISSERTATIVA (SWITCHER-BOX)
    // ----------------------------------------
    var dissertacaoFrases = [
        {
            title: "Fake News nas Redes",
            direto: '<span class="text-warning-emphasis">"Eu acho que as redes sociais fazem as pessoas acreditarem em muita mentira e isso bagunça a nossa cabeça."</span>',
            indireto: '<span class="text-success-emphasis">"A proliferação de notícias falsas no ambiente virtual aliena o corpo social e compromete o exercício pleno da democracia."</span>',
            isDireto: true, // true = Registro Pessoal/Coloquial, false = Registro Acadêmico/Impessoal
            expl_direto: "Nesta versão, há uso de marca pessoal ('Eu acho', 'nossa cabeça') e termos informais ('bagunça', 'muita mentira'), enfraquecendo o caráter científico do texto.",
            expl_indireto: "Na versão impessoalizada, o argumento usa terminologia precisa ('proliferação', 'aliena o corpo social'), garantindo objetividade científica e maior peso analítico."
        },
        {
            title: "Mobilidade Urbana",
            direto: '<span class="text-warning-emphasis">"O trânsito está horrível e as prefeituras não fazem nada para arrumar o transporte público de verdade."</span>',
            indireto: '<span class="text-success-emphasis">"A saturação das vias urbanas decorre do investimento histórico insuficiente no transporte público coletivo pelas administrações municipais."</span>',
            isDireto: true,
            expl_direto: "Uso de termos de valor genérico ('horrível', 'nada para arrumar', 'de verdade'), sem apontar a causa estrutural de forma neutra.",
            expl_indireto: "A causa é apresentada de forma sociológica ('saturação das vias', 'investimento histórico insuficiente'), conectando a falha à sua origem técnica."
        },
        {
            title: "Importância da Educação",
            direto: '<span class="text-warning-emphasis">"A gente precisa estudar muito para o Brasil poder crescer e todo mundo ter um emprego decente."</span>',
            indireto: '<span class="text-success-emphasis">"A democratização do acesso à educação de qualidade é indispensável para impulsionar o desenvolvimento econômico nacional e a inclusão produtiva."</span>',
            isDireto: true,
            expl_direto: "Uso do pronome indefinido coloquial 'a gente' e ideias excessivamente gerais ('estudar muito', 'emprego decente').",
            expl_indireto: "Transformação para a norma padrão culta utilizando conectores formais e termos técnicos de macroeconomia e sociologia."
        }
    ];

    var currentDialogueIdx = 0;

    function renderDescription() {
        var item = dissertacaoFrases[currentDialogueIdx];
        var textToDisplay = item.isDireto ? item.direto : item.indireto;
        var modeLabel = item.isDireto ? '<span class="label label-warning mb-2 d-inline-block">Registro: Coloquial e Pessoal</span>' : '<span class="label label-success mb-2 d-inline-block">Registro: Dissertativo Acadêmico</span>';
        var explText = item.isDireto ? item.expl_direto : item.expl_indireto;

        $('#switcher-sentence-container').html(
            '<div class="text-center">' + modeLabel + '<p class="lead text-white my-3">' + textToDisplay + '</p></div>'
        );
        $('#switcher-explanation').html('<i class="bi text-secondary bi-lightbulb-fill me-2"></i> ' + explText);
    }

    // Inicializar Laboratório de Escrita
    renderDescription();

    // Navegar entre os temas de dissertação
    $('.sentence-selector-btn').on('click', function () {
        $('.sentence-selector-btn').removeClass('active');
        $(this).addClass('active');
        currentDialogueIdx = $(this).data('index');
        dissertacaoFrases[currentDialogueIdx].isDireto = true; // Reinicia para o registro coloquial por padrão ao alternar
        renderDescription();
    });

    // Botão de alternar (Toggle)
    $('#btn-switch-toggle').on('click', function () {
        dissertacaoFrases[currentDialogueIdx].isDireto = !dissertacaoFrases[currentDialogueIdx].isDireto;
        renderDescription();
    });


    // ----------------------------------------
    // QUIZ INTERATIVO (PROCESSO DISSERTATIVO)
    // ----------------------------------------
    var quizQuestions = [
        {
            question: "1. Qual deve ser o posicionamento do autor em relação à tese de um texto dissertativo-argumentativo?",
            options: [
                "Mostrar os dois lados do debate sem escolher uma posição",
                "Defender uma posição clara de maneira impessoal na terceira pessoa",
                "Apresentar histórias pessoais e comoventes para tocar o leitor",
                "Evitar conclusões para deixar a decisão final a critério do leitor"
            ],
            correct: 1,
            explanation: "Perfeito! O coração do texto dissertativo-argumentativo é defender uma única tese (posicionamento central) de forma lógica e neutra."
        },
        {
            question: "2. Na estrutura dissertativa clássica, em qual parágrafo deve-se apresentar a Tese ao leitor?",
            options: [
                "No primeiro parágrafo do Desenvolvimento (D1)",
                "Na Proposta de Intervenção ao final da redação",
                "No parágrafo de Introdução",
                "Apenas no título da redação"
            ],
            correct: 2,
            explanation: "Isso mesmo! A introdução serve para contextualizar o tema geral e apresentar, no final do parágrafo, a tese que guiará todo o desenvolvimento."
        },
        {
            question: "3. Qual das seguintes opções apresenta uma tática de 'Repertório Legitimado' para apoiar um argumento?",
            options: [
                "Citar pensamentos e conversas com a sua própria família",
                "Copiar frases completas diretamente dos textos de apoio da prova",
                "Usar provérbios e ditos populares consagrados",
                "Citar um conceito de um filósofo, um dado do IBGE ou um fato histórico"
            ],
            correct: 3,
            explanation: "Exatamente! Citações filosóficas, dados oficiais de pesquisa e alusões históricas constituem bases externas respeitadas pelas bancas avaliadoras."
        },
        {
            question: "4. No modelo de intervenção (Enem), qual pergunta responde diretamente ao elemento obrigatório 'MEIO/MODO'?",
            options: [
                "O que o agente fará na sociedade?",
                "Como ou através de que vias a ação proposta será realizada?",
                "Qual é o público que se beneficiará da intervenção?",
                "Quem é o responsável por aplicar as multas legais?"
            ],
            correct: 1,
            explanation: "Excelente! O meio ou modo esclarece o método ou instrumento prático usado para colocar a proposta em prática (ex: 'por intermédio de repasse de verbas')."
        },
        {
            question: "5. Por que se deve evitar expressões como 'eu acho', 'no meu ponto de vista' e 'nós percebemos' no texto dissertativo?",
            options: [
                "Porque essas expressões deixam o texto excessivamente longo",
                "Porque comprometem o princípio da impessoalidade exigido pela norma culta",
                "Porque são palavras gramaticalmente incorretas em qualquer situação",
                "Porque dão excesso de autoridade científica à argumentação"
            ],
            correct: 1,
            explanation: "Correto! O gênero dissertativo exige que o ponto de vista pareça uma verdade lógica de caráter universal, e não apenas uma opinião subjetiva ou pessoal."
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
            // Destacar o botão correto
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
            text = "Parabéns! Você domina com primor as técnicas do texto dissertativo. Sua redação tem bases fortes para uma Nota 1000!";
        } else if (userScore >= 3) {
            emoji = "✍️";
            text = "Ótimo desempenho! Você compreende a estrutura lógica do texto. Faça pequenos ajustes em relação ao repertório e impessoalidade para alcançar o nível máximo!";
        } else {
            emoji = "📖";
            text = "Bom começo! Recomendamos revisar as 5 competências do Enem e praticar a eliminação de marcas de oralidade para fortalecer seu texto.";
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