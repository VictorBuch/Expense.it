<script lang="ts">
	import { goto } from '$app/navigation';
	import { supabaseClient } from '$lib/db';
	import { user } from '$lib/stores/user';
	import type { Expense } from '$lib/types/expense';
	import type { User } from '$lib/types/user';
	import type { Group } from '$lib/types/group';

	export let data;
	let { users, group }: { users: User[]; group: Group } = data;
	users = [
		{
			full_name: 'sBefore',
			avatar_url: 'https://picsum.photos/200',
			id: '2',
			email: 'none',
			phone: '29039276'
		},
		{
			full_name: 'sAfter',
			avatar_url: 'https://picsum.photos/200',
			id: '3',
			email: 'none',
			phone: '29039276'
		},
		{
			full_name: 'beforeeven',
			avatar_url: 'https://picsum.photos/200',
			id: '4',
			email: 'none',
			phone: '29039276'
		},
		{
			full_name: 'afterven',
			avatar_url: 'https://picsum.photos/200',
			id: '5',
			email: 'none',
			phone: '29039276'
		}
	];

	let expense: Expense = {
		group_id: group.id,
		paid_by_user_id: $user.id,
		amount: '0',
		currency: 'kr.',
		comment: ''
	};

	// TODO: proposal - make a user proportions property which will keep track of how much propotional to the expense each user has to pay.
	// this can also be set to 0 to exclude a user from the expense.

	$: payingUser = users.find((user: User) => user.id == expense.paid_by_user_id);
	// TODO: use user proportions to calculate share
	$: getUserShare = (user: User) => parseFloat(expense.amount) / users.length;

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
			if (!error) goto(`/groups/${group.id}`);
		} catch (error) {
			console.log(error);
		}
	}

	$: activeProfile = (user: User) => user.id == expense.paid_by_user_id;

	$: beforeActive = (user: User, index: number) => {
		const indexOfBeforeActive = users.findIndex((user) => expense.paid_by_user_id == user.id);
		return users[indexOfBeforeActive - index]?.id == user.id;
	};

	$: afterActive = (user: User, index: number) => {
		const indexOfBeforeActive = users.findIndex((user) => expense.paid_by_user_id == user.id);
		return users[indexOfBeforeActive + index]?.id == user.id;
	};

	function setActiveProfile(user: User) {
		expense.paid_by_user_id = user.id;
	}
</script>

<main class="h-screen relative">
	<div class="overflow-y-scroll max-h-[76vh]">
		<a href={`/groups/${group.id}`}>
			<i class=" fa-solid fa-chevron-left cursor-pointer scale-125 text-primary my-4 mx-4" />
		</a>
		<div class="my-4 min-h-8 container flex flex-col items-center space-y-2 overflow-x-hidden">
			<p class="text-base-content text-lg">New amount</p>
			<div class="w-full h-20 relative">
				{#each users as user, index}
					<button
						class="user-avatar-wrapper cursor-pointer"
						class:active={activeProfile(user)}
						class:before-active={beforeActive(user, 1)}
						class:after-active={afterActive(user, 1)}
						class:hide-before-active={beforeActive(user, 2)}
						class:hide-after-active={afterActive(user, 2)}
						class:hide-before-before-active={beforeActive(user, 3)}
						class:hide-after-after-active={afterActive(user, 3)}
						on:click={setActiveProfile(user)}
					>
						<div class="avatar">
							<div class="w-16 rounded-full">
								<img src={user.avatar_url ?? `https://placeimg.com/19${index}/19${index}/people`} />
							</div>
						</div>
					</button>
				{/each}
			</div>
			<p class="text-base-content text-lg">
				{#if payingUser?.full_name == $user.full_name}
					I pay
				{:else}
					{payingUser?.full_name} pays
				{/if}
			</p>
		</div>
		<div
			class="flex items-center justify-center space-x-2 relative bg-base-200 text-base-content h-min p-2"
		>
			<p class="text-lg font-semibold custom-caret">{expense.amount}</p>
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
							<img src={user.avatar_url ?? 'https://placeimg.com/192/192/people'} />
						</div>
					</div>
					<div class="ml-2">
						<p class="text-lg leading-5 font-bold text-base-content">{user.full_name}</p>
						<p class="text-xs leading-5 text-base-content">{user.phone ?? 'unknown'}</p>
					</div>
					<div class="ml-auto flex items-center space-x-5">
						<!-- TODO: update this number based on how much you should pay and take into account any changes the user makes to this -->
						<p class="font-bold">{getUserShare(user)}</p>
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

<style>
	/* TODO: theres a minor visual glitch if clicking on a user further than one away from the active one. maybe fix 🤷‍♂️ */
	.user-avatar-wrapper {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		display: none;
		transition: all 0.5s ease-in-out;
	}

	.active {
		display: block;
		transform: translate(-50%, -50%) scale(1);
	}
	.before-active {
		display: block;
		left: calc(50% - 76px);
		transform: translate(-50%, -50%) scale(0.8);
	}
	.after-active {
		display: block;
		left: calc(50% + 76px);
		transform: translate(-50%, -50%) scale(0.8);
	}
	.hide-before-active {
		display: block;
		transform: translate(-50%, -50%) scale(0.5);
		opacity: 50%;
		left: calc(50% - 139px);
	}
	.hide-after-active {
		display: block;
		transform: translate(-50%, -50%) scale(0.5);
		opacity: 50%;
		left: calc(50% + 139px);
	}
	.hide-before-before-active {
		display: block;
		transform: translate(-50%, -50%) scale(0);
		opacity: 0;
		left: calc(50% - 200px);
	}
	.hide-after-after-active {
		display: block;
		transform: translate(-50%, -50%) scale(0);
		opacity: 0;
		left: calc(50% + 200px);
	}
</style>
