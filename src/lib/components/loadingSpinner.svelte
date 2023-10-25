<script>
	import { fade } from 'svelte/transition';
</script>

<div transition:fade={{ delay: 150, duration: 150 }}>
	<div class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
		<span class="loading loading-spinner loading-lg" />
	</div>
</div>
