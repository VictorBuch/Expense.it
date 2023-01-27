<script>
	import { supabaseClient } from '$lib/db';
	import { user } from '$lib/stores/user';

	export let data;
	let { invitations } = data;

	const removeInviteFromList = (id) => {
		invitations = invitations.filter((invite) => invite.id !== id);
	};

	const rejectInvitation = async (id) => {
		console.log('reject invite', id);
		// Delete the invite
		const { data, error } = await supabaseClient.from('invitations').delete().eq('id', id);
		removeInviteFromList(id);
		if (error) throw error;
	};

	const acceptInvitation = async (invitationId, groupId) => {
		console.log('accept invite', invitationId, groupId);
		// Find the group corresponding to the invite group id
		// Then find the user_x column that is empty
		// Then update that column to include the current user

		// TODO: Make updating the group work and append the new user

		const { data: updatedGroup, error: groupError } = await supabaseClient
			.from('groups')
			.update({ user_3: $user.id })
			.eq('id', groupId)
			.select();
		console.log('updated Group: ', updatedGroup);
		if (groupError) throw groupError;

		// Delete the invite
		// const {data, error} = await supabaseClient.from('invitations').delete().eq('id', invitationId)
		// removeInviteFromList(invitationId)
		// if(error) throw error
	};
</script>

<header class="h-16 flex items-center py-2 px-4 shadow-lg bg-base-200">
	<a href="/groups">
		<i class=" fa-solid fa-chevron-left cursor-pointer scale-125 text-primary mr-8" />
	</a>
	<h1 class="text-lg text-base-content font-semibold uppercase">Invites</h1>
</header>

<div class="space-y-6 mt-6 flex flex-col items-center container">
	{#each invitations as invitation}
		<div
			class="card w-full select-none cursor-pointer rounded-sm bg-base-200 dark:bg-base-200 shadow-xl"
		>
			<figure class="h-20 relative">
				<img src="https://placeimg.com/400/225/arch" alt="Shoes" />
				<p class="absolute text-white font-bold text-xl">{invitation.group_id.name}</p>
			</figure>
			<div class="flex px-4 py-2 flex-row justify-between">
				<div class="text-center">
					<p class="text-base-content font-bold text-lg">
						Victor Buch invited you to: {invitation.group_id.name}
					</p>
				</div>
			</div>
			<div class="m-2 flex justify-evenly">
				<button on:click={() => rejectInvitation(invitation.id)} class="btn btn-error w-1/3"
					>Reject</button
				>
				<button
					on:click={() => acceptInvitation(invitation.id, invitation.group_id.id)}
					class="btn btn-success w-1/3">Accept</button
				>
			</div>
		</div>
	{:else}
		<div class="card w-full select-none rounded-sm bg-base-100 dark:bg-base-200 shadow-xl">
			<div class="flex px-4 py-12 flex-row justify-between">
				<div class="text-center">
					<p class="text-base-content font-bold text-lg">No invites</p>
				</div>
			</div>
		</div>
	{/each}
</div>
