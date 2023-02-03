import { supabaseClient } from '$lib/db';

/** @type {import('./$types').LayoutLoad} */
export async function load({ params }) {
	const getGroup = async () => {
		const { data, error } = await supabaseClient.from('groups').select('*').eq('id', params.group);
		return data[0] ?? [];
	};
	const getExpenses = async () => {
		const { data, error } = await supabaseClient
			.from('expenses')
			.select('*')
			.eq('group_id', params.group);

		return data ?? [];
	};
	return {
		group: getGroup(),
		expenses: getExpenses()
	};
}
