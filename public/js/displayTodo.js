fetch('/todos')
.then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des todos');
        }
        return response.json();
    })
    .then(todos => {
        const listDone = document.getElementById('listDone');
        const listNotDone = document.getElementById('listNotDone');
        todos.forEach(todo => {
            const li = document.createElement('li');
            const todoDiv = document.createElement('div');
            todoDiv.innerHTML = `
                <form class="todo" action="/todos/${todo.id}" method="POST">
                    <input type="hidden" name="id" value="${todo.id}" required>
                    <h3><input type="text" name="title" value="${todo.title}" required></h3>
                    <p><input type="text" name="description" value="${todo.description}" required></p>
                    <button onclick="deleteTodo(${todo.id})">Supprimer</button>
                    <button class="done${todo.done}" name="done" onclick="updateDoneTodo(${todo.id})">Pas fait</button>
                    <button type="submit">Enregistrer</button>
                </form>
            `;
            li.appendChild(todoDiv);
            if (todo.done === true) {
                listDone.appendChild(li);
            } else {
                listNotDone.appendChild(li);
            }
            document.querySelectorAll('.donefalse').forEach(function(button) {
                button.textContent = 'Fait';
            });
        });
    })
    .catch(error => console.error(error));