import fetchEvents from "./fetchEvents.js";

export default async function renderEvents() {
	const eventContainer = document.querySelector('.event__container');

	const events = await fetchEvents();

	console.log(events)

	function createEventItemDOM() {
		for (const event of events) {
		const eventCard = document.createElement('div');
		const eventImage = document.createElement('figure');
		const eventImg = document.createElement('img');
		const eventContent = document.createElement('div');
		const eventArtist = document.createElement('h3');
		const eventName = document.createElement('p');
		const eventDate = document.createElement('p');
		const eventTime = document.createElement('p');
		const eventLocation = document.createElement('p');
		const eventLink = document.createElement('a');

		eventCard.className = 'event__container-card grid__column--4 box';
		eventImage.className = 'event__image';
		eventImg.className = 'event__img';
		eventContent.className = 'event__content';
		eventArtist.className = 'event__artist';
		eventName.className = 'event__name';
		eventDate.className = 'event__date';
		eventTime.className = 'event__time';
		eventLocation.className = 'event__location';
		eventLink.className = 'event__link';

		// use the first image that is wider than 400
		const selectedImg = event.images.find(image => image.width >= 400);
		if (selectedImg) {
			eventImg.src = selectedImg.url;
		} else {
			const noImage = document.createElement('p');
			noImage.textContent= 'No image available';
			eventImage.appendChild(noImage);
		}
		eventImg.alt = event.name;

		// format the date to norwegian 
		const dateOptions = {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		};
		const startDate = new Date(event.dates.start.localDate);
		const formattedDate = startDate.toLocaleDateString('nb-NO', dateOptions);
		eventDate.innerText = formattedDate;

		// format time, return empty string if no time is available
		if (event.dates.start.localTime) {
			const timeOptions = {
				minute: '2-digit',
				hour: '2-digit'
			};
		const startTime = new Date(`${event.dates.start.localDate}T${event.dates.start.localTime}`);
		const formattedTime = startTime.toLocaleTimeString('nb-NO', timeOptions);
		eventTime.innerText = formattedTime;
		} else {
			eventTime.innerText = '';
		}

		eventArtist.innerText = event._embedded.attractions[0].name;
		eventName.innerText = `(${event.name})`;
		eventLocation.innerText = event._embedded.venues[0].name;

		eventLink.innerText = 'Finn billetter her';
		eventLink.href = event.url;
		eventLink.target = '_blank';

		eventImage.appendChild(eventImg);

		eventContent.appendChild(eventArtist);
		eventContent.appendChild(eventName);
		eventContent.appendChild(eventDate);
		eventContent.appendChild(eventTime);
		eventContent.appendChild(eventLocation);
		eventContent.appendChild(eventLink);
		eventCard.appendChild(eventImage);
		eventCard.appendChild(eventContent);
		eventContainer.appendChild(eventCard);
	}
}
	// return eventContainer;

	function renderHTML() {
		createEventItemDOM();
	}
	renderHTML();
}
