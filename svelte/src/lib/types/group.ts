import type { User } from './user';

export type Group = {
	id: string;
	name: string;
	people: User[];
};
