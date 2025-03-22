import { env } from '$env/dynamic/public';
import axios from 'axios';

const axiosInstance = axios.create({
	baseURL: env.PUBLIC_API_URL,
	headers: {
		Accept: 'application/json'
	}
});

axiosInstance.interceptors.request.use(
	(config) => {
		const accessToken = localStorage.getItem('accessToken');
		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// response interceptor
axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		console.log(error);
		// TODO
		if (error.status === 401) {
			// logout();
		}

		return Promise.reject(error);
	}
);

export default axiosInstance;
