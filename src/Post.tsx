import React from 'react';

interface PostProps {
	post: {
		id: number;
		title: string;
		body: string;
		username: string;
		city: string;
	}
}

export const Post = ({ post }: PostProps) => {
	return (
		<div>
			<h2>{post.title}</h2>
			<h4>{post.body}</h4>
			<h5>Username: {post.username}</h5>
			<h5>City: {post.city}</h5>
		</div>
	)
}