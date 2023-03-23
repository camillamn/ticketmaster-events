import { apikey } from "../env.js";
import renderEvents from "./renderEvents.js";

const baseUrl = 'https://app.ticketmaster.com/discovery/v2/events.json';
const city = 'bergen';
const sort = 'date,asc';
const perPage = 30;
let currentPage = 1;
const options = {
	method: "GET"
};

const endpoint = `
	${baseUrl}
	?apikey=${apikey}
	&locale=*
	&city=${city}
	&classificationName=music
	&size${perPage}
	&page=${currentPage}
	&sort=${sort}
	`;

export default async function fetchEvents() {
	try {
		const response = await fetch(endpoint, options);
		const data = await handleResponse(response);
		return data._embedded.events;
	} catch (error) {
		handleError(error);
	}
}

function handleResponse(response) {
	if(response.ok) {
		return response.json();
	} else if (response.status === 404) {
		 throw new Error('Url not existing');
	} else if (response.status === 401) {
		 throw new Error('Not authorized user');
	} else if (response.status >= 500) {
		 throw new Error('Server not responding');
	} else {
		 throw new Error('Something went wrong');
	}
}

// function loading() {
// 	console.log('wait');
// }

function handleError(error) {
	warningElement.classList.toggel('hidden');
	warningElement.textContent = error;
}

fetchEvents().then(events => {
	renderEvents(events);
});