function deleteItem(type, id, e: MouseEvent) {
    fetch(`/api/delete/${type}/${id}`, { method: 'DELETE' })
        .then(res => {
            if (res.ok)
                return res.json()
            else {
                throw new Error(`something went wrong while deleting the ${type}`)
            }
        })
        .then(data => {
            if (data.success) {
                (e.target as HTMLElement).parentElement.parentElement.parentElement.remove()
            } else {
                throw new Error(`something went wrong while deleting the ${type}`)
            }
        })
        .catch(alert)
}

window.deleteItem = deleteItem

function resetAll() {
    fetch('/api/reset', {
        method: 'put'
    })
}

window.resetAll = resetAll