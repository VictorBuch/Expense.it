import { supabaseClient } from '$lib/db';
import { user } from '$lib/stores/user';
import { get } from 'svelte/store';
import type { PageLoad } from '../$types';

export const load: PageLoad = async () => {
	const getGroups = async () => {
		const { data, error } = await supabaseClient
			.from('groups')
			.select('*')
			.eq('user_1', get(user).id);
		return data ?? [];
	};
	// const getInvites = async () => {
	// 	const { data, error } = await supabaseClient
	// 		.from('invitations')
	// 		.select('*')
	// 		.eq('invited_user_id', get(user).id);
	// 	return data ?? [];
	// };
	const getInvites = async () => {
		const { data, error } = await supabaseClient
			.from('invitations')
			.select('*, group_id (name, id)')
			.eq('invited_user_id', get(user).id);
		return data ?? [];
	};
	return {
		groups: getGroups(),
		invitations: getInvites()
	};
};
