<script>
	let invitations = [
		{ group: 'Household', inviter: 'Victor Buch', other_people_in_group: ['Nick', 'Mark', 'Line'] },
		{
			group: 'Satans deciples',
			inviter: 'Not Buch',
			other_people_in_group: ['Mark', 'Kirt', 'Line']
		}
	];

	const rejectInvitation = () => {
		console.log('reject invite');
	};

	const acceptInvitation = () => {
		console.log('accept invite');
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
			class="card w-full select-none cursor-pointer rounded-sm bg-base-200 dark:bg-base-300 shadow-xl"
		>
			<figure class="h-20 relative">
				<img src="https://placeimg.com/400/225/arch" alt="Shoes" />
				<p class="absolute text-white font-bold text-xl">Name</p>
			</figure>
			<div class="flex px-4 py-2 flex-row justify-between">
				<div class="text-center">
					<p class="text-base-content font-bold text-lg">Victor Buch invited you to: Group</p>
				</div>
			</div>
			<div class="m-2 flex justify-evenly">
				<button class="btn btn-error w-1/3">Reject</button>
				<button class="btn btn-success w-1/2">Accept</button>
			</div>
		</div>
	{/each}
</div>
