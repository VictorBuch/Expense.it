<script>
	import { page } from '$app/stores';
	import {user} from '$lib/stores/user'
	export let data;

	let {users} = data;

	let spliceIndex =Math.floor(users.length/2) 
	console.log(spliceIndex, $user)
	users.splice(spliceIndex, 0, $user)
	console.log(users)

	let selected = users[spliceIndex]

	
</script>

<main>
	<a href={`/groups/${$page.params.group}`}>
		<i class=" fa-solid fa-chevron-left cursor-pointer scale-125 text-primary my-4 mx-4" />
	</a>
	<div class="my-4 container flex flex-col items-center space-y-2 overflow-x-hidden">
		<p class="text-base-content text-lg">New amount</p>
		<div class="flex items-center justify-center space-x-6 w-full overflow-x-hidden">
			<select bind:value={selected.username} class="select max-w-xs">
				{#each users as user}
				<option value={user.username} class:selected={user.username=='Me'}>{user.username}</option>
				{/each}
			</select>
		</div>
		<p class="text-base-content text-lg">
			{#if selected.name == 'Me'}
				 I pay
		{:else}
				{selected.username} pays
			
			{/if}
		</p>
	</div>
	<div
		class="flex items-center justify-center space-x-2 relative bg-base-200 text-base-content h-min p-2"
	>
		<p class="text-lg font-semibold custom-caret active">300</p>
		<!-- <div on:click={changeCurrecy} class="flex items-center cursor-pointer space-x-4">
			<p class="leading-3 font-xs">kr.</p>
			<i class="fa-solid fa-circle-chevron-down text-primary" />
		</div>
		<i on:click={remove} class="fa-solid fa-delete-left absolute right-4 cursor-pointer" /> -->
	</div>

	<div class="w-full h-min bg-base-200 text-base-content flex items-center justify-center my-1">
		<input
			class="input input-ghost focus:outline-none focus:bg-transparent caret-green-400 text-center"
			type="text"
			placeholder="Add comment or emoji"
		/>
	</div>

	<div class="mt-8">
		{#each users as user}
			<div class="py-1 px-2 cursor-pointer flex items-center bg-base-100">
				<div class="avatar">
					<div class="w-10 rounded-full">
						<img src="https://placeimg.com/192/192/people" />
					</div>
				</div>
				<div class="ml-2">
					<p class="text-lg leading-5 font-bold text-base-content">{user.username}</p>
					<p class="text-xs leading-5 text-base-content">{user.number?? 'unknown'}</p>
				</div>
				<div class="ml-auto flex items-center space-x-5">
					<p class="font-bold">0.00</p>
					<i class="fa-sharp fa-solid fa-pen text-primary" />
					<!-- <div class="form-control">
						<input
							type="checkbox"
							checked="checked"
							class="checkbox checkbox-primary rounded-full"
						/>
					</div> -->
				</div>
			</div>
			<div class="divider my-0.5 h-0.5" />
		{/each}
	</div>
</main>
