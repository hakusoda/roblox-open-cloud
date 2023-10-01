export interface OpenCloudGroup {
	id: string
	path: `groups/${number}`
	owner?: `users/${number}`
	locked: boolean
	verified: boolean
	createTime: string
	updateTime: string
	displayName: string
	description: string
	memberCount: number
	publicEntryAllowed: boolean
}

/**
 * Represents an item in a user's inventory.
 * 
 * @see https://create.roblox.com/docs/cloud/reference/InventoryItem#InventoryItem
 */
export interface InventoryItem {
	/**
	 * The resource path of the inventory item.
	 */
	path: `users/${number}/inventory-items/${string}`

	/**
	 * Populated if this item is an asset.
	 */
	assetDetails?: {
		/**
		 * A unique ID that identifies an asset.
		 */
		assetId: string

		/**
		 * The specific asset type of this item.
		 */
		inventoryItemAssetType: unknown

		/**
		 * A unique ID that identifies an instance or "copy" of the asset that's owned by a user.
		 */
		instanceId: string

		/**
		 * Additional details if this asset is a collectible. Otherwise, this attribute will be omitted.
		 */
		collectibleDetails?: {
			/**
			 * A unique ID of a Roblox item that is a collectible.
			 */
			itemId: string

			/**
			 * A unique ID of an individual copy of a collectible with ownership tied to a group or user.
			 */
			instanceId: string

			/**
			 * The instance state of this specific Collectible Item Instance which affects whether it can be resold or traded.
			 */
			instanceState: 'HOLD' | 'AVAILABLE' | 'COLLECTIBLE_ITEM_INSTANCE_STATE_UNSPECIFIED'

			/**
			 * If the asset is a Limited, a user-visible number that shows this item is the nth replica of the asset. Otherwise, this attribute will be omitted.
			 */
			serialNumber?: number
		}

		/**
		 * Populated if this item is a badge.
		 */
		badgeDetails: {
			/**
			 * A unique ID that identifies a badge.
			 */
			badgeId: string
		}

		/**
		 * Populated if this item is a game pass.
		 */
		gamePassDetails: {
			/**
			 * A unique ID that identifies a game pass.
			 */
			gamePassId: string
		}

		/**
		 * Populated if this item is a private server.
		 */
		privateServerDetails: {
			/**
			 * A unique ID that identifies a private server.
			 */
			privateServerId: string
		}
	}
}

export type HttpMethod = 'GET' | 'HEAD' | 'OPTIONS' | 'POST' | 'PUT' | 'DELETE'

export type OAuthScope = 'openid' | 'profile' | 'asset:read' | 'asset:write' | 'user.inventory-item:read' | 'group:read' | 'universe-messaging-service:publish'
export type OAuthGrantType = 'authorization_code'
export type OAuthPromptType = 'none' | 'login' | 'consent' | 'select_account'
export type OAuthResponseType = 'none' | 'code'

export type OAuthClientId = `${number}` | number
export type OAuthClientSecret = `RBX-${string}`

export interface OAuthObtainTokenResponse {
	scope: string
	expires_in: number
	token_type: 'Bearer'
	access_token: string
	refresh_token: string
}

/**
 * A list of InventoryItems in the parent collection.
 * @see https://create.roblox.com/docs/cloud/reference/InventoryItem#List-Inventory-Items
 */
export interface ListInventoryItemsResponse {
	/**
	 * The InventoryItems from the specified User.
	 */
	inventoryItems: InventoryItem[]

	/**
	 * A token that you can send as a `pageToken` parameter to retrieve the next page.
	 * If this field is omitted, there are no subsequent pages.
	 */
	nextPageToken?: string
}