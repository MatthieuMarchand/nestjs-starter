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
                <form action="/todos/${todo.id}" method="POST">
                    <input type="hidden" name="id" value="${todo.id}" required>
                    <h1><input type="text" name="title" value="${todo.title}" required></h1>
                    <p><textarea name="description" required>${todo.description}</textarea></p>
                    <button onclick="deleteTodo(${todo.id})">Supprimer</button>
                    <button id="done" onclick="updateDoneTodo(${todo.id})">Done</button>
                    <button type="submit">Mettre à jour</button>
                </form>
            `;
            li.appendChild(todoDiv);
            if (todo.done === true) {
                listDone.appendChild(li);
            } else {
                listNotDone.appendChild(li);
            }
        });
    })
    .catch(error => console.error(error));