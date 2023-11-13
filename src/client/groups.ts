import type OpenCloudClient from './index.ts';
import type { OpenCloudGroup } from '../types.ts';
import { GenericRequestError } from '../errors.ts';
export default class OpenCloudGroups {
	private client: OpenCloudClient;
	private baseUrl = 'v2/groups';
	public constructor(client: OpenCloudClient) {
		this.client = client;
	}

	public get(groupId: string | number) {
		return this.request<OpenCloudGroup>(groupId)
			.then(response => {
				if (!response.success)
					throw new GenericRequestError();
				return response.data;
			});
	}

	private request<T>(path: string | number) {
		return this.client.request<T>(`${this.baseUrl}/${path}`);
	}
}