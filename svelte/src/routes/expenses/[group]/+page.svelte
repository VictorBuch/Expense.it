<script>
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";



</script>


<div class="h-12 flex items-center py-2 px-4 shadow-md relative bg-base-200">
    <a href="/expenses">
		<i class=" fa-solid fa-chevron-left cursor-pointer scale-125 text-primary mr-8"></i>
    </a>
		<h1 class='text-lg text-base-content font-semibold uppercase'>{$page.params.group}</h1>
		<i class="fa-solid fa-gear scale-125 text-primary ml-auto"></i>
		<div class='absolute origin-center -bottom-3 z-30 w-full flex items-center justify-center '>
			<span class="badge badge-primary cursor-pointer rounded-xl shadow-sm px-5 relative text-center py-2.5 flex items-center">View expenses
				<i class="fa-solid fa-chevron-right cursor-pointer scale-75 ml-2 absolute right-1.5 top-1/4 bottom-1/2"></i>
			</span>
		</div>
	</div>

    <footer class="absolute bottom-0 w-full">
		<button class="btn btn-primary btn-block gap-2 rounded-b-none">
			<i class="fa-solid fa-dollar-sign text-center"></i>
			Add new expense</button>
		<!-- 		<input type="text" placeholder="Write a message here" class="input focus:outline-none input-ghost w-full max-w-xs" />
		<div class="flex items-center justify-between p-2">
			<p class='w-1/2 text-center'>Aa</p>
			<i class="fa-solid fa-dollar-sign w-1/2 text-center"></i>
		</div> -->
	</footer>