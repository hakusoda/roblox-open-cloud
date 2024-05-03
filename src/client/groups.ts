import type OpenCloudClient from './index.ts';
import { GenericRequestError } from '../errors.ts';
import type { OpenCloudGroup, ListGroupRolesResponse } from '../types.ts';
export default class OpenCloudGroups {
	private client: OpenCloudClient;
	private baseUrl = 'v2/groups';
	public constructor(client: OpenCloudClient) {
		this.client = client;
	}

	public get(group_id: string | number) {
		return this.request<OpenCloudGroup>(group_id)
			.then(response => {
				if (!response.success)
					throw new GenericRequestError();
				return response.data;
			});
	}

	/**
	 * List roles in a group.

	 * The permissions field for roles is viewable based on the requester's access and scopes.

	 * Permissions for the guest role are always visible - a scope is not needed.

	 * If the requester is a member of the group and has the `group:read` scope, permissions in their role are visible.

	 * If the requester is the owner of the group and has the `group:read` scope, permissions in all roles are visible.

	 * @param group_id The group ID.
	 * @param max_page_size
	 * The maximum number of group roles to return.
	 * The service might return fewer than this value.
	 * If unspecified, at most 10 group roles are returned.
	 * The maximum value is 20 and higher values are set to 20.
	 * @param page_token
	 * A page token, received from a previous call, to retrieve a subsequent page.
	 * When paginating, all other parameters provided to the subsequent call must match the call that provided the page token.

	 * @see https://create.roblox.com/docs/cloud/reference/GroupRole#List-Group-Roles
	 */
	public roles(group_id: string | number, max_page_size = 10, page_token?: string) {
		return this.request<ListGroupRolesResponse>(`${group_id}/roles?maxPageSize=${max_page_size}${page_token ? `&pageToken=${page_token}` : ''}`)
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