<script>
	import './styles.css';
	import { supabaseClient } from '$lib/db';
	import { invalidate } from '$app/navigation';
	import { onMount } from 'svelte';

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
		} = supabaseClient.auth.onAuthStateChange(() => {
			invalidate('supabase:auth');
		});
		return () => {
			subscription.unsubscribe();
		};
	});
</script>

<div class="app overflow-x-hidden h-screen">
	<slot />
</div>
