import type OpenCloudClient from './index.ts';
import type { ListInventoryItemsResponse } from '../types.ts';
export default class OpenCloudUsers {
	private client: OpenCloudClient;
	private baseUrl = 'v2/users';
	public constructor(client: OpenCloudClient) {
		this.client = client;
	}

	/**
	 * List inventory items in a user's inventory.
	 * 
	 * The inventory items returned depend on the target user’s choice under **Settings > Privacy > Who can see my inventory?**:
	 * 
	 * If the user granted inventory visibility to "Everyone," then any API key or OAuth2 token can be used to view the target’s inventory, no matter what scopes it has or who created it.
	 * 
	 * • If the user has not granted inventory visibility to "Everyone":
	 * 
	 * &nbsp;&nbsp;◦ Their inventory can still be viewed with an API key created by the target user with **Inventory: Read** permission.
	 * 
	 * &nbsp;&nbsp;◦ Their inventory can still be viewed with an OAuth2 token if the target user authorizes an app requesting permissions for the `user.inventory-item:read` scope.
	 * @see https://create.roblox.com/docs/cloud/reference/InventoryItem#List-Inventory-Items
	 * 
	 * @param userId - The user ID.
	 * @param maxPageSize
	 * The maximum number of inventory items to return.
	 * The service might return fewer than this value.
	 * If unspecified, at most 10 inventory items are returned.
	 * The maximum value is 100 and higher values are set to 100.
	 * 
	 * @param filter
	 * This field may be set in order to filter the resources returned.
	 * 
	 * See the [filtering](https://create.roblox.com/docs/cloud/reference/patterns#list-inventory-items) documentation for more information.
	 * 
	 * @param pageToken
	 * A page token, received from a previous call, to retrieve a subsequent page.
	 * When paginating, all other parameters provided to the subsequent call must match the call that provided the page token.
	 * 
	 * @returns A list of InventoryItems in the parent collection.
	 */
	public getInventoryItems(userId: string | number, maxPageSize: number = 10, filter?: string | null, pageToken?: string | null) {
		const params = new URLSearchParams(`maxPageSize=${maxPageSize}`);
		if (filter)
			params.set('filter', filter);
		if (pageToken)
			params.set('pageToken', pageToken);

		return this.request<ListInventoryItemsResponse>(`${userId}/inventory-items?${params}`);
	}

	private request<T>(path: string | number | URL) {
		return this.client.request<T>(`${this.baseUrl}/${path}`);
	}
}