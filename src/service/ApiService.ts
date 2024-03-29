import axios from "axios";

const apiService = axios.create({
  baseURL: "/api",
  timeout: 5000,
});

// 定义Axios服务
export const ApiService = {
  // 发送GET请求并返回数据
  async get<T>(url: string): Promise<T> {
    return apiService.get<T>(url).then(response => response.data);
  },

  // 发送POST请求并返回数据
  async post<T>(url: string, payload: any): Promise<T> {
    return apiService.post<T>(url, payload).then(response => response.data);
  },

  // 发送PUT请求并返回数据
  async put<T>(url: string, payload: any): Promise<T> {
    return apiService.put<T>(url, payload).then(response => response.data);
  },

  // 发送DELETE请求并返回数据
  async delete<T>(url: string, payload: any): Promise<T> {
    return apiService.delete<T>(url, payload).then(response => response.data);
  },
};

// import axios, { AxiosResponse } from "axios";
// const apiService = axios.create({
//   baseURL: "http://192.168.80.1:8000",
//   timeout: 5000,
// });

// // 定义接口用于描述API返回的数据结构
// interface ApiResponse<T> {
//   success: boolean;
//   data: T;
//   meg?: string;
// }

// // 定义Axios服务
// export const ApiService = {
//   //发送get请求并返回数据
//   async get<T>(url: string): Promise<T> {
//     const response: AxiosResponse<ApiResponse<T>> = await apiService.get(url);
//     return response.data.data;
//   },
//   async post<T>(url: string, payload: any): Promise<T> {
//     const response: AxiosResponse<ApiResponse<T>> = await apiService.post(
//       url,
//       payload
//     );
//     return response.data.data;
//   },
//   async put<T>(url: string, payload: any): Promise<T> {
//     const response: AxiosResponse<ApiResponse<T>> = await apiService.put(
//       url,
//       payload
//     );
//     return response.data.data;
//   },
//   async delete<T>(url: string, payload: any): Promise<T> {
//     const response: AxiosResponse<ApiResponse<T>> = await apiService.delete(
//       url,
//       payload
//     );
//     return response.data.data;
//   },
// };
