document.addEventListener('DOMContentLoaded', function() {
    const sendText = document.querySelector('.sendText');
    const sendButton = document.querySelector('.send');
    const list = document.querySelector('ul');
    
    // Carrega itens do localStorage ao iniciar
    loadItems();
    
    sendButton.addEventListener('click', addItem); // Adiciona novo item
    sendText.addEventListener('keypress', function(e) { //Adiciona a possibilidade de submete um item com a tecla "Enter"
        if (e.key === 'Enter') {
            addItem();
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