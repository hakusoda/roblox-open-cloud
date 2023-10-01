import OpenCloudUsers from './users';
import OpenCloudGroups from './groups';
import type { HttpMethod } from '../types';
import type AuthenticationMethod from '../auth/method/index';
export default class OpenCloudClient {
	public auth: AuthenticationMethod;
	public users: OpenCloudUsers;
	public groups: OpenCloudGroups;
	public baseUrl = 'https://apis.roblox.com/cloud';
	public constructor(auth: AuthenticationMethod) {
		this.auth = auth;
		this.users = new OpenCloudUsers(this);
		this.groups = new OpenCloudGroups(this);
	}

	public async request<T>(path: string, method: HttpMethod = 'GET', payload?: any, headers?: Record<string, string>): Promise<T> {
		const isJson = !!payload && (Object.getPrototypeOf(payload).constructor === Object || Array.isArray(payload));
		return fetch(`${this.baseUrl}/${path}`, {
			body: isJson ? JSON.stringify(payload) : payload,
			method,
			headers: {
				accept: 'application/json',
				'content-type': isJson ? 'application/json' : 'text/plain',
				...await this.auth.getHeaders(),
				...headers
			}
		})
			.then(response => {
				if (response.headers.get('content-type')!.includes('application/json'))
					return response.json();
				return response.text();
			});
	}
}