export default function renderEvents(events) {
	const eventContainer = document.getElementById('event-container');
	eventContainer.innerHTML = events.map(event => `
		<div class="event__container-card">
			<img class="event__image" src="${event.images[0].url}" alt="${event.name}">
			<div class="event__content">
			<h2>${event.name}</h2>
			<p class="event__artist">${event._embedded.attractions[0].name}</p>
			<p class="event__date"> ${event.dates.start.localDate}</p>
			<p class="event__time"> ${event.dates.start.localTime}</p>
			<p class="event__location"> ${event._embedded.venues[0].name}</p>
			<button alt="Order tickets here"> <a class="event__order-ticket" href="${event.url}">Order ticket(s) here</a></button>
			</div>
		</div>
		`).join('');
}