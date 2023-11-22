<script>
	import { selectedId } from '$lib/store'
	import  { trimAndEllipsis } from '$lib/utils'
	import { XCircle, InformationCircle, ExclamationTriangle, ArchiveBox, ArchiveBoxArrowDown, Icon } from 'svelte-hero-icons';

	export let id = '';
	export let level = 0 | 1 | 2;
	export let archived = false;
	export let name = ''
	export let description = '';
	export let timestamp = '';
	export readMore = false;

</script>

<div class="flex items-center gap-x-3 border-b hover:bg-base-200 px-4">


	<div class="py-4 w-full">
		<div class="flex items-center justify-between">
			<div class="flex items-center gap-1">
				{#if level === 0}
					<Icon src={InformationCircle} class='text-info' size="16" />
				{:else if level === 1}
					<Icon src={ExclamationTriangle} class="text-warning" size="16" />
				{:else if level === 2}
					<Icon src={XCircle} class="text-error" size="16" />
				{/if}
	
				{#if level === 0}
					<span class="text-info text-sm">INFO</span>
				{:else if level === 1}
					<span class="text-warning text-sm">WARNING</span>
				{:else if level === 2}
					<span class="text-error text-sm">CRITICAL</span>
				{/if}
			</div>
			<div class="text-xs text-[#82878E]">{timestamp}</div>
		</div>

		
		<span class="font-semibold text-sm">{name}</span>
		{#if !readMore}
			<p class="text-sm pt-1">{trimAndEllipsis(description)}</p><a on:click={() => {readMore = !readMore}} class="link link-primary">Read More</a>
		{:else}
			<p class="text-sm pt-1">{description}</p>
		{/if}

		
		
	</div>

	{#if !archived}
		<button on:click={() => {$selectedId = id}} onclick="archive_confirmation_modal.showModal()" class="btn btn-square bg-base-100"><Icon src={ArchiveBox} size="20" /></button>
	
	{:else }
		<button on:click={() => {$selectedId = id}} onclick="unarchive_confirmation_modal.showModal()" class="btn btn-square bg-base-100"><Icon src={ArchiveBoxArrowDown} size="20" /></button>
	{/if}

</div>
