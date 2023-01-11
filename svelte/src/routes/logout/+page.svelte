<script>
	import { supabaseClient } from '$lib/db';
	import { redirect } from '@sveltejs/kit';
	const logout = async () => {
		const { error } = await supabaseClient.auth.signOut();
		if (!error) {
			throw redirect(303, '/login');
		}
	};
</script>

<button on:click={logout}>Logout</button>
