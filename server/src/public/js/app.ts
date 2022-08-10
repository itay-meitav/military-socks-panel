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

function resetAll(e) {
    e.target.querySelector('span').classList.add('spin')
    fetch('/api/reset', {
        method: 'put'
    })
        .then(res => { if (res.ok) return res.json() })
        .then((res) => {
            if (res.success)
                window.location.href = window.location.href
        }).catch(() => {
            e.target.querySelector('span').classList.remove('spin')
        })
}

window.resetAll = resetAll




window.onload = () => {
    document.getElementsByClassName('navbar-toggle')![0].addEventListener('click', (e) => {
        document.querySelector('.left-nav').classList.toggle('hide-left-nav')
    })
}