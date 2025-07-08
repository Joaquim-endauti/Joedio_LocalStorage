document.addEventListener('DOMContentLoaded', function() {
    const sendText = document.querySelector('.sendText');
    const deleteAll = document.querySelector('.excluir_t');
    const riscarAll = document.querySelector('.risca_t');
    const sendButton = document.querySelector('.send');
    const list = document.querySelector('ul');
    const dark = document.querySelector('.dark');
    // Carrega itens do localStorage ao iniciar
    loadItems();
    
    sendButton.addEventListener('click', addItem); // Adiciona novo item

    deleteAll.addEventListener('click', function(a) { // Adiciona a possibilidade de excluir todos os itens
        list.innerHTML = '';
        localStorage.removeItem('shoppingList');
    });

    riscarAll.addEventListener('click', function(b) { // Adiciona a possibilidade de riscar todos os itens
        document.querySelectorAll('.item').forEach(item => {
            item.classList.add('completed');
        });
        saveItems();
    });

    sendText.addEventListener('keypress', function(e) { //Adiciona a possibilidade de submete um item com a tecla "Enter"
        if (e.key === 'Enter') {
            addItem();
        }
    });

    // Alternar entre modo claro e escuro
        dark.addEventListener('click', () => {
       document.body.classList.toggle('dark-mode');

    // Salvar preferência no localStorage
         const modoAtual = document.body.classList.contains('dark-mode') ? 'escuro' : 'claro';
         localStorage.setItem('modo_tema', modoAtual);
    });

    // Aplicar tema salvo ao carregar a página
        document.addEventListener('DOMContentLoaded', () => {
        const temaSalvo = localStorage.getItem('modo_tema');
        if (temaSalvo === 'escuro') {
          document.body.classList.add('dark-mode');
        }
    });
    
    function addItem() {
        const text = sendText.value.trim();
        if (text === '') return;
        
        createListItem(text);
        saveItems();
        sendText.value = '';
        sendText.focus();
    }

    function createListItem(text, isCompleted = false) {
        const li = document.createElement('li');
        li.className = 'item';
        if (isCompleted) {
            li.classList.add('completed');
        }
        
        const span = document.createElement('span');
        span.textContent = text;
        
        const greenButton = document.createElement('button');
        greenButton.type = 'button';
        greenButton.className = 'verde';
        greenButton.textContent = 'Riscar';
        greenButton.addEventListener('click', function() { //Adiciona a possibilidade de riscar um item    
            li.classList.toggle('completed');
            saveItems();
        });
        
        const redButton = document.createElement('button');
        redButton.type = 'button';
        redButton.className = 'vermelho';
        redButton.textContent = 'Excluir';
        redButton.addEventListener('click', function() { //Adiciona a possibilidade de excluir um item
            li.remove();
            saveItems();
        });

        li.appendChild(span);
        li.appendChild(greenButton);
        li.appendChild(redButton);
        list.appendChild(li);
    }
    
    function saveItems() {
        const items = [];
        document.querySelectorAll('.item').forEach(item => {
            items.push({
                text: item.querySelector('span').textContent,
                completed: item.classList.contains('completed')
            });
        });
        localStorage.setItem('shoppingList', JSON.stringify(items));
    }
    
    function loadItems() {
        const savedItems = localStorage.getItem('shoppingList');
        if (savedItems) {
            JSON.parse(savedItems).forEach(item => {
                createListItem(item.text, item.completed);
            });
        }
    }
});