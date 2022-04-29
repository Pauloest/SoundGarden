const arrowGetEventById = async () => {
    try {
        const queryParameter = new URLSearchParams(window.location.search)

        const response = await fetch(
        "https://xp41-soundgarden-api.herokuapp.com/events/" +
            queryParameter.get("id")
        );

        const data = await response.json()

        return data;
    } catch {
        (error) => console.error(error);
    }
    }

    function placeInputByEvent(event) {
    const nameSelector = document.querySelector("#txt_Name")
    nameSelector.value = event.name

    const bannerSelector = document.querySelector("#txt_Banner")
    bannerSelector.value = event.poster

    const attractionsSelector = document.querySelector("#txt_Attractions")
    attractionsSelector.value = event.attractions.join(", ")

    const descriptionSelector = document.querySelector("#txt_Description")
    descriptionSelector.value = event.description

    const dateSelector = document.querySelector("#txt_DateTime")
    dateSelector.value = event.scheduled.substring(0, 16)

    const capacityInput = document.querySelector("#txt_Tickets")
    capacityInput.value = event.number_tickets
    }

    function createBodyFromInput(event){
    const nameSelector = document.querySelector("#txt_Name");
    const bannerSelector = document.querySelector("#txt_Banner");
    const attractionsSelector = document.querySelector("#txt_Attractions");
    const descriptionSelector = document.querySelector("#txt_Description");
    const dateSelector = document.querySelector("#txt_DateTime");
    const capacityInput = document.querySelector("#txt_Tickets");

    // const body = {}

    // if(nameSelector.value === event.name){
    //   body.name = nameSelector.value;
    // }

    return {
        "name": nameSelector.value,
        "attractions": attractionsSelector.value.split(', '),
        "poster": bannerSelector.value,
        "description": descriptionSelector.value,
        "scheduled": dateSelector.value,
        "number_tickets": capacityInput.value
    };

    }

    async function main() {
    try {
        const queryParameter = new URLSearchParams(window.location.search)
        const eventObject = await arrowGetEventById();


        placeInputByEvent(eventObject);

        const formSelector = document.querySelector("#form")

        formSelector.addEventListener('submit', (event) => {
        event.preventDefault();

        const body =  createBodyFromInput(event);

        fetch(("https://xp41-soundgarden-api.herokuapp.com/events/" +
        queryParameter.get("id")), {"method": "PUT", "headers": {"content-type": "application/json"}, 
        "body": JSON.stringify(body)
        }).then(response => {
        console.log(response)
        alert("Evento foi atualizado com sucesso!")
        }).catch(error => {console.error(error)})

        })

    } catch  {
        (error) => console.error(error)
    }
    }

    main()
