import AuthenticationMethod from './index.ts';
import type { OAuthObtainTokenResponse } from '../../types.ts';
export default class OpenCloudOAuthToken extends AuthenticationMethod {
	private tokens: OAuthObtainTokenResponse;
	public constructor(tokens: OAuthObtainTokenResponse) {
		super();
		this.tokens = tokens;
	}

	getHeaders() {
		return Promise.resolve({
			authorization: `${this.tokens.token_type} ${this.tokens.access_token}`
		});
	}
}