const listDone = document.getElementById('listDone');
const listNotDone = document.getElementById('listNotDone');

fetch('/todos')
.then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des todos');
        }
        return response.json();
    })
    .then(todos => {
        todos.forEach(todo => {
            const li = document.createElement('li');
            const todoDiv = document.createElement('div');
            todoDiv.innerHTML = `
                <form id="form${todo.id}" class="todo" action="/todos/${todo.id}" method="POST">
                    <input type="hidden" name="id" value="${todo.id}" required>
                    <h3><input type="text" name="title" value="${todo.title}" onkeydown="checkEnter(event, ${todo.id})" required></h3>
                    <p><input type="text" name="description" value="${todo.description}" onkeydown="checkEnter(event, ${todo.id})" required></p>
                    <div>
                        <button class="done${todo.done} statusDone" name="done" onclick="updateDoneTodo(${todo.id})">Pas fait</button>
                        <div>
                            <button class="delete" onclick="deleteTodo(${todo.id})"><img src="images/delete.png" alt="icon supprimer"></button>
                            <button class="save" type="submit"><img src="images/save.png" alt="icon enregistrer"></button>
                        </div>
                    </div>
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