const formIndex = document.querySelector('#formIndex')

formIndex.addEventListener('submit', (event) => {
    event.preventDefault();

    const formObject = new FormData(formIndex)

    const attractionsArray = formObject.get('txt_attractions').split(',')
    
    const ticketsNumber = Number(formObject.get('txt_tickets'))

const body = {
    "name": formObject.get('txt_name'),
    "poster": "N/D",
    "attractions": attractionsArray,
    "description": formObject.get('txt_description'),
    "scheduled": formObject.get('txt_datetime'),
    "number_tickets": ticketsNumber
}

console.log(body)

fetch('https://xp41-soundgarden-api.herokuapp.com/events', {
    "method": "POST",
    "headers": { "Content-Type": "application/JSON" },
    "body": JSON.stringify(body)
})
.then( response => console.log(response))
.catch( error => console.error(error))
});

