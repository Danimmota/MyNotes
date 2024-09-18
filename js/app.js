
const storageKeyName = "MYNOTESSTORAGE"
const defaultData = [{"id":"ZlLTIk18DV","type":"header","data":{"text":"Editor","level":2}},{"id":"H_LD2VxMyy","type":"paragraph","data":{"text":"Olá! Conheça o novo MyNotes. Nesta página você pode vê-lo em ação — começe editando este texto. "}},{"id":"oeDIkmDgab","type":"paragraph","data":{"text":"O espaço de trabalho do <i><b>MyNote</b> </i>consiste em blocos separados de edição avançada: <code class=\"inline-code\">parágrafos</code>, <code class=\"inline-code\">títulos</code>, <code class=\"inline-code\">listas</code>, <code class=\"inline-code\">citações</code>, etc. Você pode implementar <code class=\"inline-code\">blocos para tweets</code>, <code class=\"inline-code\">postagens no Instagram</code>, <code class=\"inline-code\">pesquisas</code> e <code class=\"inline-code\">enquetes</code>."}},{"id":"L1Yqm0AcuP","type":"paragraph","data":{"text":"Aqui você verá configurações possíveis para o seu texto:&nbsp;"}},{"id":"DQZPnT2m8l","type":"header","data":{"text":"Lista","level":3}},{"id":"tV2q4JPscq","type":"list","data":{"style":"ordered","items":["Primeiro","Segundo"]}},{"id":"L50YU41Yyh","type":"header","data":{"text":"CheckList - Lista de atividades","level":3}},{"id":"UBQCk6my1b","type":"checklist","data":{"items":[{"text":"Estudar","checked":false},{"text":"Trabalhar","checked":true}]}},{"id":"VXbBVYiOkC","type":"header","data":{"text":"Bloco de Código","level":3}},{"id":"Wt6mbLf_JD","type":"code","data":{"code":"{\n\t\"maxRunDistance\": \"float;1;20;1\",\n\t\"cpf\": \"cpf\",\n\t\"cnpj\": \"cnpj\",\n\t\"pretendSalary\": \"money\",\n\t\"age\": \"int;20;80\",\n\t\"gender\": \"gender\",\n\t\"firstName\": \"firstName\",\n\t\"lastName\": \"lastName\",\n\t\"phone\": \"maskInt;+55 (83) 9####-####\",\n\t\"address\": \"address\",\n\t\"hairColor\": \"color\"\n}"}},{"id":"lmAYNX-_NI","type":"delimiter","data":{}},{"id":"TTNzccKd59","type":"paragraph","data":{"text":"Organize suas idéias e tarefas com facilidade e flexibilidade."}},{"id":"VIEiLqjMpJ","type":"paragraph","data":{"text":" Divirta-se. 😏&nbsp;"}}]

var editor = new EditorJS({
    holder: 'editorjs',
    /**
     * Common Inline Toolbar settings
     * - if true (or not specified), the order from 'tool' property will be used
     * - if an array of tool names, this order will be used
     */
    // inlineToolbar: ['link', 'marker', 'bold', 'italic'],

    /**
     * Tools list
     */
    tools: {
        /**
         * Each Tool is a Plugin. Pass them via 'class' option with necessary settings {@link docs/tools.md}
         */
        header: {
            class: Header,
            inlineToolbar: ['marker', 'link'],
            config: {
                placeholder: 'Header'
            },
            shortcut: 'CMD+SHIFT+H'
        },

        /**
         * Or pass class directly without any configuration
         */
        image: SimpleImage,


        list: List,

        checklist: {
            class: Checklist,
            inlineToolbar: true,
        },

        quote: {
            class: Quote,
            inlineToolbar: true,
            config: {
                quotePlaceholder: 'Enter a quote',
                captionPlaceholder: 'Quote\'s author',
            },
            shortcut: 'CMD+SHIFT+O'
        },

        warning: {
            class: Warning,
            inlineToolbar: true,
            shortcut: 'CMD+SHIFT+W',
            config: {
                titlePlaceholder: 'Título',
                messagePlaceholder: 'Mensagem',
            },
        },

        marker: {
            class: Marker,
            shortcut: 'CMD+SHIFT+M'
        },

        code: {
            class: CodeTool,
            shortcut: 'CMD+SHIFT+C'
        },

        delimiter: Delimiter,

        inlineCode: {
            class: InlineCode,
            shortcut: 'CMD+SHIFT+C'
        },

        linkTool: LinkTool,

        embed: Embed,

        table: {
            class: Table,
            inlineToolbar: true,
            shortcut: 'CMD+ALT+T'
        },

    },

    // defaultBlock: 'paragraph',

    /**
     * Initial Editor data
     */
    data: {
        blocks: localStorage.getItem(storageKeyName) ? JSON.parse(localStorage.getItem(storageKeyName)).blocks : defaultData
    },
    onReady: function () {
        new Undo({ editor });
    },
    onChange: function (api, event) {
        editor.save().then((savedData) => {
            localStorage.setItem(storageKeyName, JSON.stringify(savedData));
        })
    }
});

// Função de inicialização
document.addEventListener('DOMContentLoaded', function() {
    // Referência ao botão de toggle do tema
    const darkLightToggleBtn = document.getElementById('darkLightToggleBtn');

    // Função de alternância de tema
    darkLightToggleBtn.addEventListener('click', function(event) {
        event.preventDefault();
        darkLightToggle();
    });

    // Verifica se está no modo dark e aplica a configuração ao carregar
    if (localStorage.getItem('theme') && localStorage.getItem('theme') === 'dark-mode') {
        setDarkMode();
    }
});

// DARK AND LIGHT MODE FUNCTIONS

function setDarkMode(){
    localStorage.setItem('theme', 'dark-mode')
        
    document.body.classList.remove("light-mode");
    document.body.classList.add("dark-mode");

    document.getElementById("img_dark_light").setAttribute("src","imgs/light-mode.png")
}

function setLightMode(){
    localStorage.setItem('theme', 'light-mode')

    document.body.classList.remove("dark-mode");
    document.body.classList.add("light-mode");
    
    document.getElementById("img_dark_light").setAttribute("src","imgs/dark-mode.png")
}


function darkLightToggle(){
    if (!localStorage.getItem('theme') || localStorage.getItem('theme') !== 'dark-mode') {
        setDarkMode()
    }else{
        setLightMode()
    }
}
