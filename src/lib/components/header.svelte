<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { archivedActive, loading, totalItems,  } from '$lib/store'
	import IntervalDropdown from './IntervalDropdown.svelte';

	async function toggleArchive(status: boolean) {
		$archivedActive = status
	}
</script>

<header class="w-full border-b shadow-sm fixed bg-white z-20">
	<div class="max-w-lg mx-auto px-4">
		<div class="flex items-center justify-between py-2">
			<div class="flex items-center gap-2">
				<h1 class="font-semibold text-xl">Alerts</h1>
				<div class="flex items-center justify-center rounded-full bg-red-500 w-6 h-6 text-white">
					{$totalItems}
				</div>
			</div>

	<IntervalDropdown />

		</div>
		<div class="flex justify-between">
			<div class="tabs">
				<a on:click={() => toggleArchive(false)} class="tab tab-bordered font-medium {!$archivedActive && 'tab-active'}">All</a>
				<a on:click={() => toggleArchive(true)} class="tab tab-bordered font-medium {$archivedActive && 'tab-active'}">Archived</a>
			</div>

			{#if !$archivedActive} 
			<form action="?/archiveAllTodayAlerts" method="post" use:enhance={() => {
				$loading = true;
				return async ({ result }) => {
					setTimeout(async () => {
						$loading = false;
					}, 1000);
					await applyAction(result);
					await invalidateAll();
				};
			}}>
			<button class="link link-hover text-[#007FFF]">Archive All</button>
				
			</form>

			{/if}


		</div>
	</div>
</header>
