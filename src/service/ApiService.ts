import axios from "axios";

const apiService = axios.create({
  baseURL: "http://192.168.80.1:8000/",
  timeout: 5000,
});

// // 定义Axios服务
// export const ApiService = {
//   // 发送GET请求并返回数据
//   async get<T>(url: string): Promise<T> {
//     return apiService.get<T>(url).then(response => response.data);
//   },

//   // 发送POST请求并返回数据
//   async post<T>(url: string, payload: any): Promise<T> {
//     return apiService.post<T>(url, payload).then(response => response.data);
//   },

//   // 发送PUT请求并返回数据
//   async put<T>(url: string, payload: any): Promise<T> {
//     return apiService.put<T>(url, payload).then(response => response.data);
//   },

//   // 发送DELETE请求并返回数据
//   async delete<T>(url: string, payload: any): Promise<T> {
//     return apiService.delete<T>(url, payload).then(response => response.data);
//   },
// };

// 定义Axios服务
export const ApiService = {
  // 发送GET请求并返回数据
  async get<T>(url: string): Promise<T | null> {
    try {
      const response = await apiService.get<{ code: number; data: T; msg: string }>(url);
      if (response.data.code === 1) {
        return response.data.data;
      } else {
        console.error('Request failed:', response.data.msg);
        return null;
      }
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  },

  // 发送POST请求并返回数据
  async post<T>(url: string, payload: any): Promise<T | null> {
    try {
      const response = await apiService.post<{ code: number; data: T; msg: string }>(url, payload);
      if (response.data.code === 1) {
        return response.data.data;
      } else {
        console.error('Request failed:', response.data.msg);
        return null;
      }
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  },

  // 发送PUT请求并返回数据
  async put<T>(url: string, payload: any): Promise<T | null> {
    try {
      const response = await apiService.put<{ code: number; data: T; msg: string }>(url, payload);
      if (response.data.code === 1) {
        return response.data.data;
      } else {
        console.error('Request failed:', response.data.msg);
        return null;
      }
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  },

  // 发送DELETE请求并返回数据
  async delete<T>(url: string, payload: any): Promise<T | null> {
    try {
      const response = await apiService.delete<{ code: number; data: T; msg: string }>(url, payload);
      if (response.data.code === 1) {
        return response.data.data;
      } else {
        console.error('Request failed:', response.data.msg);
        return null;
      }
    } catch (error) {
      console.error('Error:', error);
      return null;
    }
  },
};

