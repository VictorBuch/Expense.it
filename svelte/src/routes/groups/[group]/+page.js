import { supabaseClient } from '$lib/db';

/** @type {import('./$types').PageLoad} */
export async function load({ params }) {
	const getExpenses = async () => {
		const { data, error } = await supabaseClient
			.from('expense')
			.select('*')
			.eq('group_id', params.group);

		return data ?? [];
	};
	return {
		expenses: getExpenses()
	};
}
