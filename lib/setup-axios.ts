import {AxiosError, AxiosInstance} from 'axios'
import {UsersService} from './services/users.service'

export function setupAxios(axios: AxiosInstance) {
  axios.interceptors.request.use(
    (config: any) => {
      const accessToken = UsersService.getAccessToken()
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`
      }

      return config
    },
    (err: any) => Promise.reject(err)
  )

  axios.interceptors.response.use(
    (config: any) => config,
    (err: AxiosError) => {
      if (err?.response?.status === 400) {
        return Promise.reject(err)
      }
      return Promise.resolve()
    }
  )
}
