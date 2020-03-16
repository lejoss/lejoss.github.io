import React from 'react';
import axios from 'axios';
import isEmpty from 'lodash/isEmpty';
import mapKeys from 'lodash/mapKeys';
import { Post as PostComponent } from './Post'
import { usersResource, postsResource } from './constants';
import { v4 as uuidv4 } from 'uuid';
import { PageState, Post } from './types'
import { useLocalStorage } from './useLocalStorage';

const initialState: PageState = { posts: [], users: {}, fetching: false };

export const Page: React.FC = (): React.ReactElement => {
	const [clientId, setClientId] = useLocalStorage('clientId');
	const [storedData, setDataToStore] = useLocalStorage('data');

	const [{ posts, users, fetching }, setState] = React.useState<PageState>(() => {
		if (!isEmpty(storedData)) {
			const data = JSON.parse(storedData);
			return {
				...initialState,
				clientId,
				posts: data.posts,
				users: data.users,
			}
		}

		return initialState;
	});

	const fetchData = async () => {
		setState({ ...initialState, fetching: true });
		const posts = await axios.get(postsResource);
		const users = await axios.get(usersResource);

		setState({ posts: posts.data, users: mapKeys(users.data, 'id'), fetching: false });
		const data = JSON.stringify({ posts: posts.data, users: mapKeys(users.data, 'id') });
		setDataToStore(data);
	}

	React.useEffect(() => {
		if (isEmpty(clientId)) {
			setClientId(uuidv4())
		}
	}, [])

	React.useEffect(() => {
		if (isEmpty(storedData)) {
			fetchData();
		}
	}, []);

	const renderPosts = posts.map((p: Post) => {
		const post = {
			id: p.id,
			title: p.title,
			body: p.body,
			username: users[p.userId].username,
			city: users[p.userId].address.city,
		}

		return <PostComponent key={post.id} post={post} />
	});

	return fetching ? <h2 data-testid="loading">loading...</h2> : <>{renderPosts}</>

}