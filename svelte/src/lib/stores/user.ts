import type { User } from '$lib/types/user';
import { writable } from 'svelte/store';

export const user = writable<User>({
	id: '',
	email: '',
	full_name: '',
	phone: '',
});
