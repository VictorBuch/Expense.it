<script>
	import { page } from '$app/stores';

	export let data;
	let { expenses } = data;

	let currency = 'kr.';
	// let expenses = [
	// 	{ amount: 200, myShare: 100, paidBy: 'me' },
	// 	{ amount: 700, myShare: 350, paidBy: 'Vero' },
	// 	{ amount: 200, myShare: 100, paidBy: 'me' },
	// 	{ amount: 200, myShare: 100, paidBy: 'me' },
	// 	{ amount: 700, myShare: 350, paidBy: 'Vero' },
	// 	{ amount: 700, myShare: 350, paidBy: 'Vero' },
	// 	{ amount: 200, myShare: 100, paidBy: 'me' },
	// 	{ amount: 200, myShare: 100, paidBy: 'me' },
	// 	{ amount: 700, myShare: 350, paidBy: 'Vero' },
	// 	{ amount: 200, myShare: 100, paidBy: 'me' },
	// 	{ amount: 700, myShare: 350, paidBy: 'Vero' }
	// ];
</script>

<main class="h-screen">
	<header class="h-12 flex items-center py-2 px-4 shadow-lg relative bg-base-200">
		<a href="/groups">
			<i class=" fa-solid fa-chevron-left cursor-pointer scale-125 text-primary mr-8" />
		</a>
		<h1 class="text-lg text-base-content font-semibold uppercase">{$page.params.group}</h1>
		<a class="ml-auto" href={'/groups/' + $page.params.group + '/settings'}>
			<i class="fa-solid fa-gear scale-125 text-primary" />
		</a>
		<div class="absolute origin-center -bottom-3 z-30 w-full flex items-center justify-center ">
			<a href={`/groups/${$page.params.group}/expenses`}>
				<span
					class="badge badge-primary cursor-pointer rounded-xl shadow-sm px-5 relative text-center py-2.5 flex items-center"
					>View expenses
					<i
						class="fa-solid fa-chevron-right cursor-pointer scale-75 ml-2 absolute right-1.5 top-1/4 bottom-1/2"
					/>
				</span>
			</a>
		</div>
	</header>
	<div class="flex flex-col-reverse h-[90vh] container overflow-y-scroll">
		{#each expenses.reverse() as expense}
			<div class="flex items-end mb-4 last:mt-4" class:justify-end={expense.paidBy == 'me'}>
				{#if expense.paidBy !== 'me'}
					<div class="rounded-full mr-2 bg-primary flex items-center justify-center w-6 h-6">
						<i class="fa-regular fa-user text-primary-content scale-90" />
					</div>
				{/if}
				<div>
					{#if expense.paidBy !== 'me'}
						<p class="text-neutral text-xs mb-0.5">
							{expense.paidBy}
						</p>
					{/if}
					<div
						class="rounded-md w-24 h-min cursor-pointer select-none bg-primary-focus flex flex-col justify-between text-primary-content overflow-clip"
					>
						<div class="text-center p-1">
							<h1 class="font-bold text-md">{expense.amount + currency}</h1>
							{#if expense.comment !== null}
								<p class="text-xs">{expense.comment}</p>
							{/if}
						</div>
						<div class="text-center relative bg-primary p-1 flex items-center justify-center ">
							<div>
								<h2 class="text-xs">My share:</h2>
								<p class="text-xs">{expense.myShare + currency}</p>
							</div>
							<i class="fa-solid fa-chevron-right scale-75 absolute right-1" />
						</div>
					</div>
				</div>
			</div>
		{/each}
	</div>

	<footer class="absolute bottom-0 w-full">
		<a
			href={`/groups/${$page.params.group}/new-expense`}
			class="btn btn-primary btn-block gap-2 rounded-b-none"
		>
			<i class="fa-solid fa-dollar-sign text-center" />
			Add new expense</a
		>
		<!-- 		<input type="text" placeholder="Write a message here" class="input focus:outline-none input-ghost w-full max-w-xs" />
		<div class="flex items-center justify-between p-2">
			<p class='w-1/2 text-center'>Aa</p>
			<i class="fa-solid fa-dollar-sign w-1/2 text-center"></i>
		</div> -->
	</footer>
</main>
