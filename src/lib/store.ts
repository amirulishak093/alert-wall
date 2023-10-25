import { writable } from 'svelte/store';

export const archivedActive = writable(false)
export const selectedId = writable('')
export const loading = writable(false);
export const totalItems = writable(0)
export const refreshInterval = writable<'5s' | '10s' | '30s' | '1m' | '5m'>()

refreshInterval.set('5s')