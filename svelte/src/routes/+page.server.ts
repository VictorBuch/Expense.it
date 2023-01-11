import type { LayoutServerLoad } from './$types';
import { getServerSession } from '@supabase/auth-helpers-sveltekit';
import { redirect } from '@sveltejs/kit';

export const load: LayoutServerLoad = async (event) => {
	if (event.locals.session) {
		throw redirect(303, '/groups');
	}
	return {
		session: await getServerSession(event)
	};
};
