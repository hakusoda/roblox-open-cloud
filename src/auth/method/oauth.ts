import AuthenticationMethod from './index';
import type OpenCloudClient from '../../client';
import { RefreshOAuthTokensError } from '../../errors';
import type { OAuthScope, OAuthMethodData, OAuthObtainTokenResponse } from '../../types';
export default class OpenCloudOAuthToken extends AuthenticationMethod {
	public data: OAuthMethodData;
	public constructor(data: OAuthMethodData) {
		super();
		this.data = data;
	}

	public hasScope(scope: OAuthScope) {
		return this.data.scope.split(' ').includes(scope);
	}

	public async getHeaders(client: OpenCloudClient) {
		if (this.data.created_at.getTime() < Date.now() - this.data.expires_in * 1000)
			await this.refresh(client);

		return { authorization: `${this.data.token_type} ${this.data.access_token}` };
	}

	private async refresh(client: OpenCloudClient) {
		console.debug('refreshing oauth tokens');

		const { client_id, client_secret, refresh_token } = this.data;
		const tokens = await client.request<OAuthObtainTokenResponse>('https://apis.roblox.com/oauth/v1/token', 'POST', new URLSearchParams({
			client_id: client_id.toString(),
			grant_type: 'refresh_token',
			client_secret,
			refresh_token
		}), undefined, false);
		if (!tokens.success)
			throw new RefreshOAuthTokensError();

		this.data = {
			...tokens.data,
			client_id,
			client_secret,
			
			created_at: new Date()
		};
	}
}