export type User = {
	id: string;
	email: string;
	user_metadata?: {
		name: string;
		avatar_url: string;
	};
};
