<script>
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
</script>

<main class="h-screen relative">
	<div class="w-full mb-4 h-32 bg-base-300 relative flex items-center justify-center ">
		<h1 class="text-center text-xl text-base-content font-bold">{$page.params.group}</h1>
		<button on:click={() => window.history.back()}>
			<i
				class="fa-solid fa-chevron-left scale-125 drop-shadow-lg text-base-content absolute left-4 top-4"
			/>
		</button>
	</div>
	<div class="text-center mt-6">
		<p class="text-base-content font-semibold">You owe nothing</p>
		<h2 class="text-base-content font-bold text-2xl mt-0.5 mb-2">0 kr.</h2>
		<!-- <a href={`${group.id}/all-expenses`} class='text-primary font-light'>Show overview of all expenses</a> -->
	</div>
	<div class="absolute bottom-0 w-full">
		<p class="text-sm text-neutral font-light text-center mb-2">
			You will not receive or pay money
		</p>
		<button class="btn btn-info btn-block rounded-b-none  drop-shadow-md btn-disabled">
			<i class="fa-solid fa-mobile mr-2" />
			Pay your share with MobilePay</button
		>
	</div>
</main>
