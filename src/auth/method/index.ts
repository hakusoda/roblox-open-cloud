export default abstract class AuthenticationMethod {
	public abstract getHeaders(): Promise<Record<string, string>>
}