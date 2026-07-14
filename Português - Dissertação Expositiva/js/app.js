// Lógica Interativa da Dissertação-Expositiva
$(document).ready(function () {

    // ----------------------------------------
    // LABORATÓRIO DE ABORDAGEM (SWITCHER-BOX)
    // ----------------------------------------
    var exposicaoFrases = [
        {
            title: "Tema: Aquecimento Global",
            expositivo: '<span class="text-info-emphasis">"O aquecimento global consiste no aumento das temperaturas médias do planeta. Entre suas principais causas, destacam-se as emissões de gases de efeito estufa derivadas da queima de combustíveis fósseis."</span>',
            argumentativo: '<span class="text-warning-emphasis">"É urgente que as grandes potências mundiais abandonem os combustíveis fósseis, pois a negligência governamental atual está empurrando a humanidade para um colapso climático irreversível."</span>',
            isExpositivo: true,
            expl_expositivo: "Aqui o texto apenas informa os conceitos e as causas de maneira neutra. Qualquer leitor consegue aprender o que é o fenômeno sem se sentir pressionado.",
            expl_argumentativo: "Neste formato, o autor emite opiniões fortes ('é urgente', 'negligência', 'colapso irreversível') e exige uma mudança de postura. Ele está tomando um partido (Tese)."
        },
        {
            title: "Tema: Redes Sociais",
            expositivo: '<span class="text-info-emphasis">"Os algoritmos das redes sociais são sistemas matemáticos programados para rastrear as preferências do usuário, exibindo conteúdos similares para aumentar o tempo de permanência na plataforma."</span>',
            argumentativo: '<span class="text-warning-emphasis">"Os algoritmos das redes sociais são mecanismos nocivos de manipulação psicológica que aprisionam os jovens em bolhas alienantes, exigindo severa regulamentação pelo Estado."</span>',
            isExpositivo: true,
            expl_expositivo: "O parágrafo funciona como um dicionário de tecnologia: ele explica detalhadamente O QUE É e COMO FUNCIONA o algoritmo, sem julgá-lo como bom ou ruim.",
            expl_argumentativo: "A neutralidade sumiu. O autor ataca a tecnologia com juízos de valor ('nocivos', 'manipulação', 'bolhas alienantes') e propõe uma intervenção ('regulamentação pelo Estado')."
        },
        {
            title: "Tema: Alimentação",
            expositivo: '<span class="text-info-emphasis">"Os alimentos ultraprocessados são formulações industriais que contêm altos teores de açúcares, sódio e gorduras saturadas, além de conservantes e corantes artificiais."</span>',
            argumentativo: '<span class="text-warning-emphasis">"O aumento alarmante da obesidade infantil é resultado direto da irresponsabilidade das indústrias alimentícias, sendo imprescindível a taxação imediata de alimentos ultraprocessados."</span>',
            isExpositivo: true,
            expl_expositivo: "Trata-se de uma definição técnica, típica de um livro de biologia ou nutrição. O foco é a composição do alimento.",
            expl_argumentativo: "O texto levanta uma tese (culpabilidade das indústrias) e apresenta uma postura combativa e defensiva em relação à saúde pública."
        }
    ];

    var currentDialogueIdx = 0;

    function renderDescription() {
        var item = exposicaoFrases[currentDialogueIdx];
        var textToDisplay = item.isExpositivo ? item.expositivo : item.argumentativo;
        var modeLabel = item.isExpositivo ? '<span class="label label-info mb-2 d-inline-block">Tipo: Dissertativo-Expositivo</span>' : '<span class="label label-warning mb-2 d-inline-block">Tipo: Dissertativo-Argumentativo</span>';
        var explText = item.isExpositivo ? item.expl_expositivo : item.expl_argumentativo;

        $('#switcher-sentence-container').html(
            '<div class="text-center">' + modeLabel + '<p class="lead text-white my-3">' + textToDisplay + '</p></div>'
        );
        $('#switcher-explanation').html('<i class="bi text-secondary bi-lightbulb-fill me-2"></i> ' + explText);
    }

    // Inicializar Laboratório
    renderDescription();

    // Navegar entre os temas
    $('.sentence-selector-btn').on('click', function () {
        $('.sentence-selector-btn').removeClass('active');
        $(this).addClass('active');
        currentDialogueIdx = $(this).data('index');
        exposicaoFrases[currentDialogueIdx].isExpositivo = true; // Reinicia para o registro expositivo por padrão ao alternar
        renderDescription();
    });

    // Botão de alternar (Toggle)
    $('#btn-switch-toggle').on('click', function () {
        exposicaoFrases[currentDialogueIdx].isExpositivo = !exposicaoFrases[currentDialogueIdx].isExpositivo;
        renderDescription();
    });


    // ----------------------------------------
    // QUIZ INTERATIVO (DISS.-EXPOSITIVO)
    // ----------------------------------------
    var quizQuestions = [
        {
            question: "1. Qual é o principal objetivo do texto dissertativo-expositivo?",
            options: [
                "Persuadir o leitor a concordar com a opinião do autor.",
                "Contar uma história de ficção com personagens e enredo.",
                "Informar, explicar e esclarecer conceitos de maneira objetiva.",
                "Fazer uma crítica bem-humorada sobre a política atual."
            ],
            correct: 2,
            explanation: "Exatamente! A missão do texto expositivo é unicamente a transmissão de conhecimento, deixando o leitor informado sobre o assunto, sem forçar opiniões."
        },
        {
            question: "2. Em qual dos locais abaixo é MAIS COMUM encontrarmos textos estritamente dissertativo-expositivos?",
            options: [
                "Nas redações do ENEM e editoriais de jornal político.",
                "Em livros didáticos escolares e verbetes de enciclopédias.",
                "Em contos de fadas e romances literários.",
                "Em propagandas de televisão e outdoors."
            ],
            correct: 1,
            explanation: "Perfeito! Livros didáticos e enciclopédias (como a Wikipédia) têm a função de explicar fatos científicos e históricos com base na neutralidade expositiva."
        },
        {
            question: "3. Qual a principal diferença entre uma Dissertação Argumentativa e uma Dissertação Expositiva?",
            options: [
                "O tamanho do texto, já que a expositiva não pode ter mais de dois parágrafos.",
                "A expositiva usa a 1ª pessoa ('eu acho') e a argumentativa não.",
                "A argumentativa defende uma tese (ponto de vista), a expositiva apenas informa fatos sem emitir opiniões.",
                "A expositiva só pode ser usada para falar de matemática e ciências exatas."
            ],
            correct: 2,
            explanation: "Correto! Essa é a regra de ouro. Na argumentação, você toma um partido e defende. Na exposição, você mantém distância e apenas explica os dados."
        },
        {
            question: "4. Qual figura de linguagem é INCOMPATÍVEL (não deve ser usada) em um texto expositivo acadêmico?",
            options: [
                "Conceituação (dar definições exatas).",
                "Enumeração (fazer listas de partes ou tipos).",
                "Metáforas obscuras, ironias e duplo sentido.",
                "Comparação lógica e objetiva."
            ],
            correct: 2,
            explanation: "Isso mesmo! O texto expositivo exige o sentido Denotativo (literal). Usar ironias ou metáforas confunde a explicação e retira a precisão científica do texto."
        },
        {
            question: "5. Se você precisar escrever o Desenvolvimento de um texto expositivo sobre a 'Guerra Fria', o que você fará no parágrafo?",
            options: [
                "Contarei uma história sobre dois soldados brigando na neve.",
                "Explicarei as causas do conflito, os blocos envolvidos (EUA e URSS) e os fatos históricos.",
                "Criticarei fortemente os governos envolvidos, exigindo a prisão de seus líderes.",
                "Escreverei que, na minha opinião, a guerra não deveria ter acontecido."
            ],
            correct: 1,
            explanation: "Excelente! Para expor um evento histórico, focamos em relatar os fatos estruturais (datas, causas, envolvidos), garantindo o valor informativo do parágrafo."
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
            emoji = "🧠";
            text = "Brilhante! Você compreendeu perfeitamente a sutileza do texto expositivo e sabe como transmitir informações com clareza e neutralidade absoluta!";
        } else if (userScore >= 3) {
            emoji = "📊";
            text = "Muito bom! Você entende os conceitos gerais da exposição. Basta treinar um pouquinho mais a distinção entre fatos neutros e opiniões argumentativas.";
        } else {
            emoji = "📚";
            text = "Recomendamos uma revisão. Volte à seção de diferenças entre Expositivo e Argumentativo para entender melhor quando o autor deve evitar as emoções!";
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