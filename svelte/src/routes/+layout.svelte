<script>
	import './styles.css';
	import { supabaseClient } from '$lib/db';
	import { invalidate, goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { user } from '$lib/stores/user';

	// TODO: make storing user work
	// import { Preferences } from '@capacitor/preferences';

	// // JSON "set" example
	// async setObject() {
	//   await Preferences.set({
	//     key: 'user',
	//     value: JSON.stringify({
	//       id: 1,
	//       name: 'Max'
	//     })
	//   });
	// }

	// // JSON "get" example
	// async getObject() {
	//   const ret = await Preferences.get({ key: 'user' });
	//   const user = JSON.parse(ret.value);
	// }

	onMount(async () => {
		const {
			data: { subscription }
		} = supabaseClient.auth.onAuthStateChange((_, session) => {
			invalidate('supabase:auth');
		});

		if ($page.data.session.user) {
			const { data: profile, error } = await supabaseClient
				.from('profiles')
				.select('*')
				.eq('id', $page.data.session.user.id)
				.single();
			if (error) throw error;
			user.set(profile);
			// goto('/groups');
		} else {
			goto('/login');
		}
		return () => {
			subscription.unsubscribe();
		};
	});
</script>

<div class="app overflow-x-hidden h-screen">
	<slot />
</div>
