import type OpenCloudClient from '../../client/index.ts';
export default abstract class AuthenticationMethod {
	public abstract getHeaders(client: OpenCloudClient): Promise<Record<string, string>>
}