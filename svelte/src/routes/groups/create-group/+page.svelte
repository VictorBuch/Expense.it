<script>
	const createGroup = () => {
		console.log('create group');
	};
</script>

<main class="h-screen relative">
	<div class="w-full mb-4 h-32 bg-base-300 relative flex items-center justify-center ">
		<input
			type="text"
			class="input text-center input-ghost focus:outline-none focus:bg-transparent custom-caret placeholder:text-xl placeholder:text-base-content placeholder:font-bold text-xl text-base-content font-bold"
			placeholder="Enter group name"
		/>
		<a href="/groups">
			<i
				class="fa-solid fa-chevron-left scale-125 drop-shadow-lg text-base-content absolute left-4 top-4"
			/>
		</a>
		<a href="/groupid/uploadImg">
			<i class="fa-solid fa-camera drop-shadow-lg text-base-content absolute top-4 right-4" />
		</a>
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
	<!-- 	Loop through added people	 -->
	<div>
		<div class="py-1 px-2 cursor-pointer flex items-center bg-base-100">
			<div class="avatar">
				<div class="w-10 rounded-full">
					<img src="https://placeimg.com/192/192/people" />
				</div>
			</div>
			<div class="ml-2">
				<p class="text-md leading-5 font-bold text-base-content">Me</p>
				<p class="text-xs leading-5 text-base-content">+45 38 92 87 02</p>
			</div>
			<i class="fa-sharp fa-solid fa-pen ml-auto text-primary" />
		</div>
		<div class="divider my-0.5 h-0.5" />
	</div>
	<button
		on:click={createGroup}
		class="btn btn-block origin-center mt-auto btn-primary drop-shadow-md absolute bottom-0 rounded-b-none"
		>Start!</button
	>
</main>
