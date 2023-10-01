import AuthenticationMethod from './index';
export default class OpenCloudApiKey extends AuthenticationMethod {
	private value: string;
	public constructor(value: string) {
		super();
		this.value = value;
	}

	getHeaders() {
		return Promise.resolve({ 'x-api-key': this.value });
	}
}