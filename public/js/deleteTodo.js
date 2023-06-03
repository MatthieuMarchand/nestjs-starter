function deleteTodo(id) {
    fetch(`/todos/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de la suppression du todo');
        }
        location.reload();
    })
    .catch(error => console.error(error));
}

function updateDoneTodo(id) {
    fetch(`/todos/${id}`, {
        method: 'POST'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de l\' update du todo');
        }
        location.reload();
    })
    .catch(error => console.error(error));
}