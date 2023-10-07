import OpenCloudUsers from './users';
import OpenCloudGroups from './groups';
import { WebRequestError } from '../errors';
import type AuthenticationMethod from '../auth/method/index';
import type { HttpMethod, ClientRequestResponse } from '../types';
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

	public async request<T>(path: string, method: HttpMethod = 'GET', payload?: any, headers?: Record<string, string>, withAuthorisation = true): Promise<ClientRequestResponse<T>> {
		const isJson = !!payload && (Object.getPrototypeOf(payload).constructor === Object || Array.isArray(payload));
		return fetch(path.startsWith('http') ? path : `${this.baseUrl}/${path}`, {
			body: isJson ? JSON.stringify(payload) : payload,
			method,
			headers: {
				accept: 'application/json',
				'content-type': isJson ? 'application/json' : 'text/plain',
				...(withAuthorisation ? await this.auth.getHeaders(this) : {}),
				...headers
			}
		})
			.then(response => {
				if (response.headers.get('content-type')?.includes('application/json'))
					return response.json()
						.catch(error => {
							throw new WebRequestError(error.message, { cause: error });
						});
				return response.text();
			})
			.then(data => {
				if (typeof data !== 'string' && data.error)
					return { ...data, success: false };
				return { data, success: true };
			});
	}
}