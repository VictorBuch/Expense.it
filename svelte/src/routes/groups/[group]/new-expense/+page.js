import { supabaseClient } from '$lib/db';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const getUsers = async () => {
		const { data, error } = await supabaseClient
			.from('group')
			.select('user_1(*), user_2(*)')
			.eq('id', params.group);
		return data ?? [];
	};
	return {
		users: getUsers()
	};
}
