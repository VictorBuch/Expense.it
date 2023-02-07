import type { User } from '$lib/types/user';

export type Group = {
	id: string;
	name: string;
	people: User[];
	default_currency: string;
	cover?: string;
	total_expenses: number;
	expenses_paid: boolean;
	expenses_last_paid_date: Date;
};
