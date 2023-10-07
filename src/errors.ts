import type { OAuthScope } from './types';
export class OpenCloudClientError extends Error {}

export class WebRequestError extends OpenCloudClientError {}

export class MissingOAuthScopeError extends OpenCloudClientError {
	public readonly scope: OAuthScope;
	public constructor(scope: OAuthScope) {
		super(`Missing OAuth 2.0 Scope: ${scope}`);
		this.scope = scope;
	}
}

export class RefreshOAuthTokensError extends OpenCloudClientError {}

export class GenericRequestError extends OpenCloudClientError {}

export class InvalidOAuthGrantError extends OpenCloudClientError {}