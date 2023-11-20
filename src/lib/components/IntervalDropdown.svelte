<script lang="ts">
	import { invalidateAll } from '$app/navigation';
	import { refreshInterval } from '$lib/store';
	import { onMount } from 'svelte';
	import { Icon, ChevronDown } from 'svelte-hero-icons';

	let isOpen = false;
	let dropdown: any;

	function toggleDropdown() {
		isOpen = !isOpen;
	}

	function handleOutsideClick(event: MouseEvent) {
		if (dropdown && !dropdown.contains(event.target)) {
			isOpen = false;
		}
	}

	async function onSelect(interval:  '5s' | '10s' | '30s' | '1m' | '5m') {
		$refreshInterval = interval;
		toggleDropdown();
	}

	onMount(() => {
		window.addEventListener('click', handleOutsideClick);
		return () => {
			window.removeEventListener('click', handleOutsideClick);
		};
	});
</script>

<div class="relative z-[1000]" bind:this={dropdown}>
	<button
		class="flex bg-white gap-x-1 items-center px-4 h-10 border-b rounded-lg border-transparent hover:bg-[#F8F8F9] hover:shadow-sm hover:border-[#F8F8F9] transition-all text-sm"
		on:click={toggleDropdown}
		>{$refreshInterval}
		<Icon class="w-3" src={ChevronDown} />
	</button>

	{#if isOpen}
		<div class="absolute right-0 py-2 bg-white border rounded-lg shadow-md">
			<button
				on:click={() => onSelect('5s')}
				class="flex items-center px-4 h-8 text-gray-800 hover:bg-[#F8F8F9] appearance-none w-full text-sm"
				>5s</button
			>
			<button
				on:click={() => onSelect('10s')}
				class="flex items-center px-4 h-8 text-gray-800 hover:bg-[#F8F8F9] appearance-none w-full text-sm"
				>10s</button
			>
			<button
				on:click={() => onSelect('30s')}
				class="flex items-center px-4 h-8 text-gray-800 hover:bg-[#F8F8F9] appearance-none w-full text-sm"
				>30s</button
			>
			<button
				on:click={() => onSelect('1m')}
				class="flex items-center px-4 h-8 text-gray-800 hover:bg-[#F8F8F9] appearance-none w-full text-sm"
				>1m</button
			>
			<button
				on:click={() => onSelect('5m')}
				class="flex items-center px-4 h-8 text-gray-800 hover:bg-[#F8F8F9] appearance-none w-full text-sm"
				>5m</button
			>
		</div>
	{/if}
</div>
