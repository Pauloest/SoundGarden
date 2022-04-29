function orderEvents(events) {
    return events.sort((event1, event2) => { return new Date(event1.scheduled) - new Date(event2.scheduled) })
}

function removePastEvents(events) {
    return events.filter((event) => {
        return new Date() - new Date(event.scheduled) < 0;
    })
}

function onButtonClick(clickEvent) {
    const button = clickEvent.target

    const modalLabelSelector = document.querySelector('#modal_Label')

    modalLabelSelector.innerText = button.dataset.name

    const reserveButton = document.querySelector('#reserve_Button')

    reserveButton.setAttribute('data-id', button.dataset.id)

}

function createReserve(event){
    const nameSelector = document.querySelector('#txt_Name')

    const emailSelector = document.querySelector('#txt_Email')

    const body = {
        owner_name: nameSelector.value,
        owner_email: emailSelector.value,
        number_tickets: 1,
        event_id: event.target.dataset.id
    }

    console.log(JSON.stringify(body))

    fetch("https://xp41-soundgarden-api.herokuapp.com/bookings", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })
        .then(response => {
            console.log(response);
        })
        .catch(err => {
            console.error(err);
        });

}

function renderEvents(events) {
    events.forEach(event => {
        const articleElement = document.createElement('article')
        articleElement.classList.add('evento')
        articleElement.classList.add('card')
        articleElement.classList.add('p-5')
        articleElement.classList.add('m-3')

        const h2Element = document.createElement('h2')
        const eventName = event.name;
        const eventDate = event.scheduled.substring(0, 10).replaceAll('-', '/')
        h2Element.innerText = eventName + " - " + eventDate;        

        const h4Element = document.createElement('h4')
        h4Element.innerText = event.attractions.join(', ')

        const pElement = document.createElement('p')
        pElement.innerText = event.description;

        const anchorElement = document.createElement('a')
        anchorElement.classList.add('btn')
        anchorElement.classList.add('btn-primary')
        anchorElement.classList.add('btn-toggle-modal')
        anchorElement.setAttribute('data-toggle', 'modal')
        anchorElement.setAttribute('data-target', '#example_Modal')
        anchorElement.setAttribute('data-id', event._id)
        anchorElement.setAttribute('data-name', event.name)
        anchorElement.innerText = "reservar ingresso"
        anchorElement.addEventListener('click', (clickEvent) => onButtonClick(clickEvent) )

        const articlesContainer = document.querySelector('#events-container')

        articleElement.append(h2Element, h4Element, pElement, anchorElement)

        articlesContainer.append(articleElement)
    })

}

function setEventListenerOnModalButton(){
    const reserveButtonSelector = document.querySelector('#reserve_Button');

    reserveButtonSelector.addEventListener('click', (event) => createReserve(event) );
}


const arrowGetEvents = async () => {
    try {
        const response = await fetch('https://xp41-soundgarden-api.herokuapp.com/events');
        // console.log(response);

        const data = await response.json();
        // console.log(data);
        return data;


    } catch (error) {
        console.error(error);
    }
}


async function main() {
    try {
        const events = await arrowGetEvents()
        
        const orderedEvents = orderEvents(events)
        
        const removedPastEvents = removePastEvents(orderedEvents)
        
        const threeNearestEvents = removedPastEvents.slice(0,3)  

        renderEvents(threeNearestEvents)

        setEventListenerOnModalButton();

    } catch (error) {
        console.error(error)
    }
}

main()