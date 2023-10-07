import type OpenCloudClient from '../../client';
export default abstract class AuthenticationMethod {
	public abstract getHeaders(client: OpenCloudClient): Promise<Record<string, string>>
}