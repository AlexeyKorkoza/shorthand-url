import ky, { type KyInstance, type Options as KyOptions } from "ky";

interface HttpClientConfig extends KyOptions {
	baseUrl?: string;
}

interface RequestConfig extends Omit<KyOptions, "method"> {
	params?: Record<string, string>;
}

class HttpClient {
	private client: KyInstance;

	constructor(config: HttpClientConfig = {}) {
		const { baseUrl, ...restConfig } = config;

		this.client = ky.create({
			prefixUrl: baseUrl,
			hooks: {
				beforeRequest: [
					(request) => {
						request.headers.set("Content-Type", "application/json");
					},
				],
			},
			...restConfig,
		});
	}

	private async request<T>(
		method: string,
		url: string,
		config: RequestConfig = {},
	): Promise<T> {
		const { params, ...restConfig } = config;

		const urlWithParams = params
			? `${url}?${new URLSearchParams(params).toString()}`
			: url;
		console.log("urlWithParams", urlWithParams);

		try {
			return await this.client(urlWithParams, {
				method,
				...restConfig,
			}).json<T>();
		} catch (error) {
			console.log("HTTP error", error);
			throw error;
		}
	}

	async get<T>(url: string, config?: RequestConfig): Promise<T> {
		return this.request<T>("GET", url, config);
	}

	async post<T>(
		url: string,
		config?: RequestConfig & { json?: unknown },
	): Promise<T> {
		return this.request<T>("POST", url, config);
	}

	async put<T>(
		url: string,
		config?: RequestConfig & { json?: unknown },
	): Promise<T> {
		return this.request<T>("PUT", url, config);
	}

	async patch<T>(
		url: string,
		config?: RequestConfig & { json?: unknown },
	): Promise<T> {
		return this.request<T>("PATCH", url, config);
	}

	async delete<T>(url: string, config?: RequestConfig): Promise<T> {
		return this.request<T>("DELETE", url, config);
	}
}

const createHttpClient = () => {
	const baseUrl = import.meta.env.VITE_API_URL;

	console.log("baseUrl", baseUrl);
	return new HttpClient({
		baseUrl,
	});
};

const httpClient = createHttpClient();

export { httpClient };
