import { supabaseClient } from '$lib/db';
import { user } from '$lib/stores/user';
import { get } from 'svelte/store';

/** @type {import('@sveltejs/kit').Load} */
export const load = async ({ url, params, props, fetch, session, stuff, status, error }) => {
	const getInvites = async () => {
		const { data, error } = await supabaseClient
			.from('invitations')
			.select('*, group_id (name, id)')
			.eq('invited_user_id', get(user).id);
		return data ?? [];
	};
	return {
		invitations: getInvites()
	};
};
