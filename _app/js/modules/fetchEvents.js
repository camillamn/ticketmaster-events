import { apikey } from "../env.js";


const warningElement = document.querySelector('.warning');

export default async function fetchEvents() {
	const baseUrl = 'https://app.ticketmaster.com/discovery/v2/events.json';
	const city = 'bergen';
	const sort = 'date,asc';
	const perPage = 30;
	const page = 1;
	const classification = 'music';
	const options = {
		method: "GET"
	};

	const endpoint = `
		${baseUrl}
		?apikey=${apikey}
		&locale=*
		&size=${perPage}
		&page=${page}
		&city=${city}
		&classificationName=${classification}
		&sort=${sort}
		`;

		let response = '';
		if (!response) {
			loading();
		}

		console.log(endpoint)
		response =  await fetch(endpoint, options);

	try {
		const data = await handleResponse(response);
		return data._embedded.events;
	} catch (error) {
		handleError(error);
	}

	async function handleResponse(response) {
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
	
	function loading() {
		console.log('wait');
	}

	function handleError(error) {
		warningElement.classList.toggle('hidden');
		warningElement.textContent = error;
	}

}