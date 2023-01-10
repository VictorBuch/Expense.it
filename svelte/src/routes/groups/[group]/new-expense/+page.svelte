<script>
import { page } from "$app/stores";


    let users = [{name:'john', number: '+45 31784920'}, {name:'legend', number: '+45 31774280'}, {name:'Jimmy', number: '+45 89372594'}]
</script>
<main>
    <a href={`/groups/${$page.params.group}`}>
        <i class=" fa-solid fa-chevron-left cursor-pointer scale-125 text-primary my-4 mx-4"></i>
    </a>
<div class="my-32"></div>
		<div class="flex items-center justify-center space-x-2 relative bg-base-200 text-base-content h-min p-2">
			<p class='text-lg font-semibold custom-caret active'>300</p>
			<div onclick='changeCurrecy' class="flex items-center cursor-pointer space-x-4">
				<p class='leading-3 font-xs'>kr.</p>
				<i class="fa-solid fa-circle-chevron-down text-primary"></i>
			</div>
			<i onclick="remove" class="fa-solid fa-delete-left absolute right-4 cursor-pointer"></i>
		</div>

		<div class="w-full h-min bg-base-200 text-base-content flex items-center justify-center my-1">
			<input class="input input-ghost focus:outline-none focus:bg-transparent caret-green-400" type="text" placeholder="Add comment or emoji" />
		</div>

		<div class="mt-8">
            {#each users as user}
                 <div class="py-1 px-2 cursor-pointer flex items-center bg-base-100">
                     <div class="avatar">
					<div class="w-10 rounded-full">
						<img src="https://placeimg.com/192/192/people" />
					</div>
				</div>
				<div class='ml-2'>
					<p class="text-lg leading-5 font-bold text-base-content">{user.name}</p>
					<p class="text-xs leading-5 text-base-content">{user.number}</p>
				</div>
				<div class='ml-auto flex items-center space-x-5'>
                    <p class="font-bold">0.00</p>
					<i class="fa-sharp fa-solid fa-pen text-primary"></i>
					<div class="form-control">
                        <input type="checkbox" checked="checked" class="checkbox checkbox-primary rounded-full" />
					</div>
				</div>
			</div>
			<div class="divider my-0.5 h-0.5"></div>
            {/each}
		</div>
	</main>