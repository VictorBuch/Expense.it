import type { PageLoad } from '../$types';

export const load: PageLoad = async () => {
	const getGroups = async () => {
		return [];
	};
	const getInvites = async () => {
		return [];
	};
	return {
		groups: [],
		invites: []
	};
};
