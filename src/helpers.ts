import { OAUTH_API_BASE } from './constants.ts';
import OpenCloudOAuthToken from './auth/method/oauth.ts';
import type { OAuthClientId, OAuthPromptType, OAuthClientSecret, OAuthResponseType, OAuthObtainTokenResponse } from './types';
export function createOAuthLink(client_id: OAuthClientId, redirect_uri: string, scope: string, prompt: OAuthPromptType = 'select_account', response_type: OAuthResponseType = 'code', state?: string | null, nonce?: string | null, code_challenge?: string | null, code_challenge_method?: string | null) {
	const url = new URL('v1/authorize', OAUTH_API_BASE);
	const params = url.searchParams;
	params.set('scope', scope);
	params.set('prompt', prompt);
	params.set('client_id', client_id.toString());
	params.set('redirect_uri', redirect_uri);
	params.set('response_type', response_type);

	if (state)
		params.set('state', state);
	if (nonce)
		params.set('nonce', nonce);
	if (code_challenge)
		params.set('code_challenge', code_challenge);
	if (code_challenge_method)
		params.set('code_challenge_method', code_challenge_method);
	return url.toString();
}

export function exchangeOAuthCodeForTokens(client_id: OAuthClientId, client_secret: OAuthClientSecret, code: string, code_verifier?: string | null): Promise<OAuthObtainTokenResponse> {
	const body = new URLSearchParams();
	body.set('code', code);
	body.set('client_id', client_id.toString());
	body.set('grant_type', 'authorization_code');
	body.set('client_secret', client_secret);

	if (code_verifier)
		body.set('code_verifier', code_verifier);
	return fetch(`${OAUTH_API_BASE}/v1/token`, {
		body,
		method: 'POST',
		headers: { 'content-type': 'application/x-www-form-urlencode' }
	}).then(response => response.json());
}

export function exchangeOAuthCodeForMethod(client_id: OAuthClientId, client_secret: OAuthClientSecret, code: string, code_verifier?: string | null) {
	return exchangeOAuthCodeForTokens(client_id, client_secret, code, code_verifier)
		.then(response => new OpenCloudOAuthToken(response));
}