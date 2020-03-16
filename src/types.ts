export type PageState = {
	posts: Array<Post>;
	users: any;
	fetching: boolean;
}

export type Post = {
	id: number;
	userId: number;
	title: string;
	body: string;
	city?: string;
	username?: string;
}

export type User = {
	id: number;
	username: string;
	address: {
		city: string;
	};
}

export type SavedData ={
	posts: Array<Post>;
	users: object;
}