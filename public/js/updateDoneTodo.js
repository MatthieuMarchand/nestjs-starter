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

function checkEnter(event, id) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById(`form${id}`).submit();
    }
}