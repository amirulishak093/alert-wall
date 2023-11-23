<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import AlertCard from '$lib/components/alertCard.svelte';
	import { archivedActive, loading, selectedId, totalItems, refreshInterval } from '$lib/store.js';
	import { onDestroy, onMount } from 'svelte';

	let intervalId: any

	export let data

	
	$: {
		if ($refreshInterval) {
			resetInterval();
		}
	}

	$: alerts = data.alerts.filter(alert => $archivedActive ? alert.archived : !alert.archived)
	
	function getTimeInMilliseconds(value: string): number {
            switch (value) {
                case '5s':
                    return 5000;
                case '10s':
                    return 10000;
                case '30s':
                    return 30000;
                case '1m':
                    return 60000;
                case '5m':
                    return 300000;
                default:
                    return 0; 
            }
        }

		function resetInterval() {
		clearInterval(intervalId);
		intervalId = setInterval(refreshData, getTimeInMilliseconds($refreshInterval));
	}

	async function refreshData() {
		await invalidateAll();
		$totalItems = data.alerts.filter(alert => !alert.archived).length
	}

	onMount(() => {
		$totalItems = data.alerts.filter(alert => !alert.archived).length
	})

	onDestroy(() => {
		clearInterval(intervalId);
	});
</script>

<div class="w-full max-w-xl mx-auto pt-[89px]">
{#if alerts.length > 0}
	<div>
		{#each alerts as alert (alert.id) }
			<AlertCard id={alert.id} level={alert.level} name={alert.name} description={alert.description} archived={alert.archived} createdAt={alert.createdAt} />
		{/each}
	

	</div>

{:else}
	<div class="flex items-center justify-center text-gray-500 pt-8">	
		No alerts for now
	</div>
{/if}

</div>

<dialog id="archive_confirmation_modal" class="modal">
	<div class="modal-box">
	  <h3 class="font-bold text-base">Archive this alert?</h3>
	  <div class="modal-action">
		<form action="?/toggleOne" method="post" use:enhance={() => {
			$loading = true;
			return async ({ result }) => {
				setTimeout(async () => {
					$loading = false;
				}, 1000);
				await applyAction(result);
				await invalidateAll();
			};
		}}>
			<button class="btn btn-primary">Yes</button>
			
			<input name="alertId" type="hidden" value={$selectedId} />
		</form>

		<form method="dialog">
			<button class="btn">No</button>
		</form>
	</div>
	</div>
	<form method="dialog" class="modal-backdrop">
	  <button>close</button>
	</form>
  </dialog>

  <dialog id="unarchive_confirmation_modal" class="modal">
	<div class="modal-box">
	  <h3 class="font-bold text-base">Unarchive this alert?</h3>
	  <div class="modal-action">
		<form action="?/toggleOne" method="post" use:enhance={() => {
			$loading = true;
			return async ({ result }) => {
				setTimeout(async () => {
					$loading = false;
				}, 1000);
				await applyAction(result);
				await invalidateAll();
			};
		}}>
			<button class="btn btn-primary">Yes</button>
			
			<input name="alertId" type="hidden" value={$selectedId} />
		</form>

		<form method="dialog">
			<button class="btn">No</button>

		</form>
	</div>
	</div>
	<form method="dialog" class="modal-backdrop">
	  <button>close</button>
	</form>
  </dialog>
