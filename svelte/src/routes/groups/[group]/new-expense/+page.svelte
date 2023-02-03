<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { supabaseClient } from '$lib/db';
	import { user } from '$lib/stores/user';
	import type { Expense } from '$lib/types/expense';
	import type { User } from '$lib/types/user';

	export let data;
	let { users } = data;

	let expense: Expense = {
		group_id: $page.params.group,
		paid_by_user_id: $user.id,
		amount: '0',
		currency: 'kr.',
		comment: ''
	};

	$: payingUser = users.find((user: User) => user.id == expense.paid_by_user_id);
	$: myShare = parseFloat(expense.amount) / users.length;

	let spliceIndex = Math.floor(users.length / 2);
	users.splice(spliceIndex, 0, $user);
	expense.paid_by_user_id = users[spliceIndex].id;

	function changeCurrecy() {
		// TODO: Change currency to a list of currencies
		expense.currency = expense.currency == 'kr.' ? '$' : 'kr.';
	}

	function removeDigit() {
		expense.amount = expense.amount.slice(0, -1);
	}

	function addNumber(number: string) {
		if (expense.amount.includes('.')) {
			if (expense.amount.split('.')[1].length < 2) {
				expense.amount += number;
			}
		} else if (expense.amount == '0') {
			expense.amount = number;
		} else if (expense.amount.length < 10) {
			expense.amount += number;
		}
	}

	function addDecimal() {
		if (!expense.amount.includes('.')) {
			expense.amount += '.';
		}
	}

	async function createExpense() {
		if (expense.amount == '0') return;
		const dbExpense = {
			...expense,
			amount: parseFloat(expense.amount)
		};
		try {
			const { data, error } = await supabaseClient.from('expenses').insert(dbExpense).select();
			console.log('data: ', data);
			if (!error) goto(`/groups/${$page.params.group}`);
		} catch (error) {
			console.log(error);
		}
	}
</script>

<main class="h-screen relative">
	<div class="overflow-y-scroll max-h-[76vh]">
		<a href={`/groups/${$page.params.group}`}>
			<i class=" fa-solid fa-chevron-left cursor-pointer scale-125 text-primary my-4 mx-4" />
		</a>
		<div class="my-4 min-h-8 container flex flex-col items-center space-y-2 overflow-x-hidden">
			<p class="text-base-content text-lg">New amount</p>
			<div class="flex items-center justify-center space-x-6 w-full overflow-x-hidden">
				<select bind:value={expense.paid_by_user_id} class="select max-w-xs">
					{#each users as user}
						<option value={user.id} class:selected={user.user_metadata.name == 'me'}
							>{user.user_metadata.name}</option
						>
					{/each}
				</select>
			</div>
			<p class="text-base-content text-lg">
				{#if payingUser.user_metadata.name == $user.user_metadata.name}
					I pay
				{:else}
					{payingUser.user_metadata.name} pays
				{/if}
			</p>
		</div>
		<div
			class="flex items-center justify-center space-x-2 relative bg-base-200 text-base-content h-min p-2"
		>
			<p class="text-lg font-semibold custom-caret active">{expense.amount}</p>
			<button on:click={changeCurrecy} class="flex items-center cursor-pointer space-x-4">
				<p class="leading-3 font-xs">{expense.currency}</p>
				<i class="fa-solid fa-circle-chevron-down text-primary" />
			</button>
			<button on:click={removeDigit} class="absolute right-4">
				<i class="fa-solid fa-delete-left" />
			</button>
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
						<p class="text-lg leading-5 font-bold text-base-content">{user.user_metadata.name}</p>
						<p class="text-xs leading-5 text-base-content">{user.number ?? 'unknown'}</p>
					</div>
					<div class="ml-auto flex items-center space-x-5">
						<!-- TODO: update this number based on how much you should pay and take into account any changes the user makes to this -->
						<p class="font-bold">{myShare}</p>
						<i class="fa-sharp fa-solid fa-pen text-primary" />
					</div>
				</div>
				<div class="divider my-0.5 h-0.5" />
			{/each}
		</div>
	</div>

	<!-- Make a pin like grid with numbers that will update the value with the number in the grid -->
	<div class="absolute w-full bottom-0 grid grid-cols-3 gap-0.5 bg-base-200 shrink-0 shadow-md">
		<button
			on:click={() => addNumber('1')}
			class="btn btn-ghost btn-sm bg-base-100 rounded-none h-12">1</button
		>
		<button
			on:click={() => addNumber('2')}
			class="btn btn-ghost btn-sm bg-base-100 rounded-none h-12">2</button
		>
		<button
			on:click={() => addNumber('3')}
			class="btn btn-ghost btn-sm bg-base-100 rounded-none h-12">3</button
		>
		<button
			on:click={() => addNumber('4')}
			class="btn btn-ghost btn-sm bg-base-100 rounded-none h-12">4</button
		>
		<button
			on:click={() => addNumber('5')}
			class="btn btn-ghost btn-sm bg-base-100 rounded-none h-12">5</button
		>
		<button
			on:click={() => addNumber('6')}
			class="btn btn-ghost btn-sm bg-base-100 rounded-none h-12">6</button
		>
		<button
			on:click={() => addNumber('7')}
			class="btn btn-ghost btn-sm bg-base-100 rounded-none h-12">7</button
		>
		<button
			on:click={() => addNumber('8')}
			class="btn btn-ghost btn-sm bg-base-100 rounded-none h-12">8</button
		>
		<button
			on:click={() => addNumber('9')}
			class="btn btn-ghost btn-sm bg-base-100 rounded-none h-12">9</button
		>
		<button on:click={addDecimal} class="btn btn-ghost btn-sm bg-base-100 rounded-none h-12"
			>.</button
		>
		<button
			on:click={() => addNumber('0')}
			class="btn btn-ghost btn-sm bg-base-100 rounded-none h-12">0</button
		>
		<button on:click={createExpense} class="btn btn-primary btn-sm rounded-none h-12">ok</button>
	</div>
</main>
