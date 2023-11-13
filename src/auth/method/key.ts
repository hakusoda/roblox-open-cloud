import AuthenticationMethod from './index.ts';
export default class OpenCloudApiKey extends AuthenticationMethod {
	private value: string;
	public constructor(value: string) {
		super();
		this.value = value;
	}

	public getHeaders() {
		return Promise.resolve({ 'x-api-key': this.value });
	}
}