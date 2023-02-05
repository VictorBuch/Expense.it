<script>
	import { goto } from '$app/navigation';
	import { supabaseClient } from '$lib/db';
	import { user } from '$lib/stores/user';

	export let data;
	let { groups, invites } = data;
	console.log($user);

	const signout = async () => {
		const { error } = await supabaseClient.auth.signOut();
		if (!error) goto('/login');
	};
</script>

<header class="h-16 flex select-none items-center py-2 px-4 shadow-lg bg-base-200">
	<div class="avatar">
		<div class="w-10 rounded-full">
			{#if $user?.avatar_url}
				<img src={$user.avatar_url} alt="users google avatar" />
			{:else}
				<img src="https://placeimg.com/192/192/people" alt="radomly generated" />
			{/if}
		</div>
	</div>
	<div class="ml-2">
		<p class="text-md leading-5 font-bold text-base-content">{$user?.full_name}</p>
	</div>
	<a href="/groups/invites" class="ml-auto">
		{#if invites?.length}
			<span class="indicator-item badge badge-info">{invites.length}</span>
		{/if}
		<i class="fa-solid fa-bell text-primary scale-125" />
	</a>
</header>
<div class="space-y-8 mt-12 container">
	{#each groups as group}
		<a
			href={`/groups/${group.id}`}
			class="card w-full select-none cursor-pointer rounded-sm bg-base-200 shadow-lg"
		>
			<figure class="h-20 relative">
				<img src="https://placeimg.com/400/225/arch" alt="Shoes" />
				<p class="absolute text-white font-bold text-xl">{group.name}</p>
			</figure>
			<div class="flex px-8 py-2 flex-row justify-between">
				<div class="text-center">
					<p class="text-base-content font-bold text-lg">{group.total_expenses ?? 0} kr.</p>
					<p class="text-base-content text-xs">All expenses</p>
				</div>
				<div class="text-center">
					<p class="text-success font-bold text-lg">{group.myShare ?? 0} kr.</p>
					<p class="text-base-content text-xs">You will receive</p>
				</div>
			</div>
		</a>
	{:else}
		<div class="card w-full select-none  rounded-sm bg-base-200 shadow-lg">
			<div class="flex px-12 py-12 flex-row justify-between">
				<div class="text-center">
					<p class="text-base-content font-bold text-lg">You are not in any groups</p>
				</div>
			</div>
		</div>
	{/each}
</div>
<!-- <button on:click={signout}>signout</button> -->
<a
	href="/groups/create-group"
	class="btn btn-circle bg-primary hover:bg-primary-focus border-none fixed bottom-4 right-4"
>
	<i class="fa-solid fa-plus text-primary-content" />
</a>
