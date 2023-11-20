<script>
	import { selectedId } from '$lib/store'
	import { XCircle, InformationCircle, ExclamationTriangle, ArchiveBox, ArchiveBoxArrowDown, Icon } from 'svelte-hero-icons';

	export let id = '';
	export let level = 0 | 1 | 2;
	export let archived = false;
	export let name = ''
	export let description = '';
	export let timestamp = '';

</script>

<div class="flex items-center gap-x-3 border-b hover:bg-base-200 px-4">


	<div class="py-4 w-full">
		<div class="flex gap-2">
			{#if level === 0}
				<Icon src={InformationCircle} class='text-info' size="28" />
			{:else if level === 1}
				<Icon src={ExclamationTriangle} class="text-warning" size="28" />
			{:else if level === 2}
				<Icon src={XCircle} class="text-error" size="28" />
			{/if}

			{#if level === 0}
				<span class="text-info">INFO</span>
			{:else if level === 1}
				<span class="text-warning">WARNING</span>
			{:else if level === 2}
				<span class="text-error">CRITICAL</span>
		</div>
		{/if}
		<h2 class="font-semibold text-base">{name}</h2>
		<p>{description}</p>
		<span class="text-xs text-[#82878E]">{timestamp}</span>
	</div>

	{#if !archived}
		<button on:click={() => {$selectedId = id}} onclick="archive_confirmation_modal.showModal()" class="btn btn-square bg-base-100"><Icon src={ArchiveBox} size="20" /></button>
	
	{:else }
		<button on:click={() => {$selectedId = id}} onclick="unarchive_confirmation_modal.showModal()" class="btn btn-square bg-base-100"><Icon src={ArchiveBoxArrowDown} size="20" /></button>
	{/if}

</div>
