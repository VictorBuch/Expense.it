/** @type {import('./$types').PageLoad} */
export async function load({ fetch }) {
	const response = await fetch('https://dummyjson.com/users?limit=5&skip=10');
	let { users } = await response.json();

	return {
		users: users
	};
}
