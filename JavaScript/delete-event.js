const formIndex = document.querySelector('#formIndex')
const nameSelector = document.querySelector('#txt_description')
const bannerSelector = document.querySelector('#txt_banner')
const attractionsSelector = document.querySelector('#txt_attractions')
const descriptionSelector = document.querySelector('#txt_description')
const dateSelector = document.querySelector('#txt_datetime')
const ticketsSelector = document.querySelector('#txt_tickets')

const queryParameter = new URLSearchParams(window.location.search)

function placeInputValuesFromEvents(data) {
    nameSelector.value = data.name
    bannerSelector.value = data.poster
    attractionsSelector.value = data.attractions.join(', ')
    descriptionSelector.value = data.description
    const date = data.scheduled.substring(0, 16)
    dateSelector.value = date
    ticketsSelector.value = data.number_tickets
}

formIndex.addEventListener('submit', event => {

    event.preventDefault()

    fetch("https://xp41-soundgarden-api.herokuapp.com/events/" + queryParameter.get('id'), {
        "method": "DELETE",
        "headers": {}
    })
        .then(response => {
            console.log(response);
            alert("Evento excluido com sucesso!")
            setTimeout(function () {
                window.location.href = '/admin.html'
            }, 1000);
        })
        .catch(err => {
            console.error(err);
        });
})


fetch("https://xp41-soundgarden-api.herokuapp.com/events/" + queryParameter.get('id'), {
    "method": "GET",
    "headers": {}
})
    .then(response => {
        console.log(response);
        return response.json();
    }).then(data => {
        console.log(data);
        placeInputValuesFromEvents(data);
    })
    .catch(err => {
        console.error(err);
    });
