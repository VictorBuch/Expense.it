<script>
	import { goto } from "$app/navigation";


    let groups = [{name: 'house', total: 1000, myShare:20}, {name:'new years', total:2009, myShare:198}]
</script>


<div class="space-y-8 mt-12 container">
    {#each groups as group}
    <a href={`/groups/${group.name}`} class="card w-full select-none cursor-pointer rounded-sm bg-base-200 shadow-lg">
        <figure class='h-20 relative'><img src="https://placeimg.com/400/225/arch" alt="Shoes" />
			<p class="absolute text-white font-bold text-xl">{group.name}</p>
		</figure>
		<div class="flex px-12 py-2 flex-row justify-between">
            <div class="text-center">
                <p class='text-base-content font-bold text-lg'>{group.total} kr.</p>
				<p class="text-base-content text-xs">All expenses</p>
			</div>
			<div class='text-center'>
                <p class='text-success font-bold text-lg'>{group.myShare} kr.</p>
				<p class="text-base-content text-xs">You will receive</p>
			</div>
		</div>
	</a>
{/each}
</div>
<a href='/groups/create-group' class="btn btn-circle bg-primary hover:bg-primary-focus border-none fixed bottom-4 right-4">
<i class="fa-solid fa-plus text-primary-content"></i>
</a>