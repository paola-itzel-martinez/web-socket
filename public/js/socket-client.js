const socket = io()

const labelStatus = document.querySelector("#labelStatus")
const inputMessage = document.querySelector("#inputMessage")
const btnSend = document.querySelector("#btnSend")


socket.on("connect", () => {
    labelStatus.classList.add('text-success')
    labelStatus.classList.remove('text-danger')
    labelStatus.innerText = 'Online'
})

socket.on("send-message", (payload) => {
    console.log(payload)
})

socket.on("disconnect", () => {
    labelStatus.classList.remove('text-success')
    labelStatus.classList.add('text-danger')
    labelStatus.innerText = 'Offline'
})

btnSend.addEventListener("click", () => {
    const payload = {
        id: '123',
        message: inputMessage.value,
        date: new Date().getTime()
    }

    socket.emit("send-message", payload, ({ id, date }) => {
        console.log('id', id)
        console.log('date', date)
    })
})
