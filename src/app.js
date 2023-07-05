const btn = document.querySelector("#button")
const todos = document.querySelector(".todos")
const input = document.querySelector("#input")


const api = "http://localhost:8000/todos"

const render = () => {
    fetch(api)
        .then(response => response.json())
        .then(data => {
            data.forEach(item => {
                const todo = document.createElement("div")
                todo.setAttribute("class", "todo")

                const delBtn = document.createElement("button")
                delBtn.setAttribute("class", "delete")
                delBtn.setAttribute('data-id', item.id)
                delBtn.innerHTML = "Сделано"

                todo.innerHTML = `
                    <div>
                        <span>${item.title}</span>
                    </div>
                `
                todo.append(delBtn)
                todos.append(todo)
            })
        })
}

render()

btn.onclick = (e) => {
    let todo = {
        id: null,
        title: input.value
    }

    fetch(api, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(todo)
    })

    input.value = ''
    window.location.reload()
}

const del = (e) => {
    let id = null
    if (e.target.tagName === "BUTTON") {
        id = e.target.attributes['data-id'].value
    }
    fetch(`${api}/${id}`, {
        method: "DELETE"
    })
    window.location.reload()
}

todos.addEventListener('click', del)











setTimeout(() => {
    console.log('ahmad loh')
}, 10000)