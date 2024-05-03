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

export type RobloxApiErrorType = 'invalid_grant' | string
export interface RobloxApiError {
	error: RobloxApiErrorType
	error_description: string
}

export type ClientRequestResponse<T> = {
	data: T
	success: true
} | (RobloxApiError & { success: false })

export interface OAuthObtainTokenResponse {
	scope: string
	id_token: string
	expires_in: number
	token_type: 'Bearer'
	access_token: string
	refresh_token: string
}

/**
 * You can use the `sub` value to uniquely identify the user.
 * 
 * Users can change their Roblox username and display name, so don't use them as unique identifiers to refer to users on your app.
 * @see https://create.roblox.com/docs/cloud/reference/oauth2#get-v1userinfo
 */
export interface OAuthUserInfo {
	/**
	 * Roblox user ID.
	 */
	sub: string

	/**
	 * Roblox display name.
	 */
	name?: string

	/**
	 * Roblox display name.
	 */
	nickname?: string

	/**
	 * Roblox username.
	 */
	preferred_username?: string

	/**
	 * Creation time of the Roblox account as a Unix timestamp.
	 */
	created_at?: number
	
	/**
	 * Roblox account profile URL.
	 */
	profile?: string

	/**
	 * Roblox avatar headshot image.
	 * Can be null if the avatar headshot image hasn't yet been generated or has been moderated.
	 */
	picture?: string | null
}

export interface OAuthMethodData extends OAuthObtainTokenResponse {
	/**
	 * The identifier of the Roblox OAuth 2.0 Application associated with these tokens.
	 * 
	 * Required for refreshing.
	 */
	client_id: OAuthClientId

	/**
	 * The secret of the Roblox OAuth 2.0 Application associated with these tokens.
	 * 
	 * Required for refreshing.
	 */
	client_secret: OAuthClientSecret

	/**
	 * Timestamp of when the tokens were created or last refreshed.
	 * 
	 * Required for refreshing.
	 */
	created_at: Date
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

/**
 * A configurable property to grant specific privileges for members within a group.
 * @see https://create.roblox.com/docs/cloud/reference/GroupRole
 */
export interface GroupRole {
	/** A unique ID that identifies a role. */
	id: string
	
	/**
	 * The resource path of the group role.

	 * Format: `groups/{group}/roles/{group_role}`
	 */
	path: `groups/${number}/roles/${number}`

	/**
	 * The rank of the role.

	 * The minimum value is 0. The maximum value is 255.
	 */
	rank: number

	/**
	 * The timestamp at which the GroupRole was created.

	 * Visible only to owners of the group. This string is formatted as a [Timestamp](https://create.roblox.com/docs/cloud/reference/types#timestamp).
	 */
	createTime: string

	/**
	 * The timestamp at which the GroupRole was last updated.

	 * Visible only to owners of the group. This string is formatted as a [Timestamp](https://create.roblox.com/docs/cloud/reference/types#timestamp).
	 */
	updateTime: string

	/**
	 * The name of the role.

	 * Has a maximum limit of 100 characters. Names above the limit are rejected.
	 */
	displayName: string

	/**
	 * The description of the role.

	 * Has a maximum limit of 1000 characters.
	 * Strings above the limit are rejected.
	 * 
	 * Visible only to owners of the group.
	 */
	description?: string

	/**
	 * Total number of members within a role.

	 * This field is not returned for guest roles.
	 */
	memberCount?: number

	/**
	 * The permissions granted for this role.

	 * This value is populated based on the read scope and role of the authorized user or API key creator.

	 * If the user or creator is the owner of the parent group, they are able to view all role permissions in the group.
	 
	 * If the user or creator is a member of the parent group, they are able to view their role's permissions in the group.
	
	 * Anyone can view guest permissions. In the case that someone can't view the permissions, this field is not returned.
	 */
	permissions?: {
		viewWallPosts: boolean
		createWallPosts: boolean
		deleteWallPosts: boolean
		viewGroupShout: boolean
		createGroupShout: boolean
		changeRank: boolean
		acceptRequests: boolean
		exileMembers: boolean
		manageRelationships: boolean
		viewAuditLog: boolean
		spendGroupFunds: boolean
		advertiseGroup: boolean
		createAvatarItems: boolean
		manageAvatarItems: boolean
		manageGroupUniverses: boolean
		viewUniverseAnalytics: boolean
		createApiKeys: boolean
		manageApiKeys: true
	}
}

/**
 * A list of GroupRoles in the parent collection.
 * @see https://create.roblox.com/docs/cloud/reference/GroupRole#List-Group-Roles
 */
export interface ListGroupRolesResponse {
	/**
	 * The GroupRoles from the specified Group.
	 */
	groupRoles: GroupRole[]

	/**
	 * A token that you can send as a `pageToken` parameter to retrieve the next page. If this field is omitted, there are no subsequent pages.
	 */
	nextPageToken?: string
}