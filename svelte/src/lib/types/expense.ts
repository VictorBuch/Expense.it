import type { User } from '$lib/types/user';
export type Expense = {
	group_id: string;
	paid_by_user_id: User['id'];
	amount: string;
	currency: string;
	comment: string;
};
