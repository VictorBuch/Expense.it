<script lang="ts">
	import type { User } "$lib/types/user";
	import type { Group } "$lib/types/group";

	export let data;
	let { users, group } : {users: User[], group: Group} = data;

</script>

<main class="h-screen relative">
	<div class="w-full mb-2 h-32 bg-base-300 relative flex items-center justify-center ">
		<h1
			class="text-center font-bold text-xl text-base-content"
		>{group.id}</h1>
		<a href={`/groups/${group.id}`}>
			<i
				class="fa-solid fa-chevron-left scale-125 drop-shadow-lg text-base-content absolute left-4 top-4"
			/>
		</a>
		<a href={`/groups/${group.id}/upload-img`}>
			<i class="fa-solid fa-camera drop-shadow-lg text-base-content absolute top-4 right-4" />
		</a>
	</div>

	<div class="mb-6  space-y-2">
			<div class="form-control bg-base-200 p-2 text-lg font-medium">
	<label class="label cursor-pointer">
		<span class="label-text">Get push notifications</span> 
		<input type="checkbox" class="toggle toggle-primary" checked />
	</label>
	</div>
			<div class="flex justify-between bg-base-200 p-4 text-sm font-medium">
		<p>Currency</p> 
		<p>{group.default_currency}</p>
	</div>
	</div>
	<!-- 	add	 -->
	<div>
		<div class="py-1 px-2 cursor-pointer flex items-center bg-base-100">
			<div
				class="w-10 h-10 border border-solid border-base-200 rounded-full bg-base-100 flex items-center justify-center"
			>
				<i class="fa-solid fa-plus text-primary" />
			</div>

			<p class="text-md leading-5 ml-2 font-bold text-primary">Add friends</p>
		</div>
		<div class="divider my-0.5 h-0.5" />
	</div>
	<div>
		{#each users as user}
		<div class="py-1 px-2 cursor-pointer flex items-center bg-base-100">
			<div class="avatar">
				<div class="w-10 rounded-full">
					<img src={user.avatar_url ?? 'https://placeimg.com/192/192/people'} />
				</div>
			</div>
			<div class="ml-2">
				<p class="text-md leading-5 font-bold text-base-content">{user.username}</p>
				<p class="text-xs leading-5 text-base-content">{user.phone}</p>
			</div>
			<i class="fa-solid fa-trash-can ml-auto" />
		</div>
		<div class="divider my-0.5 h-0.5" />
		{/each}
	</div>
</main>
