import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'api'

export const LS_KEY = 'nftax-storage'

export class UsersService {
  public static async register(walletAddress: string) {
    return axios.post<{walletAddress: string; nonce: string; _id: string}>(
      `${API_URL}/users/register`,
      {walletAddress}
    )
  }

  public static async login(walletAddress: string, signature: string) {
    const loginResponse = await axios.post<{accessToken: string}>(`${API_URL}/auth/login`, {
      walletAddress,
      signature,
    })
    if (loginResponse.status === 200 && loginResponse.data.accessToken && process.browser) {
      window.localStorage.setItem(LS_KEY, JSON.stringify(loginResponse.data))
    }
  }

  public static async getUserInfo() {
    if (process.browser) {
      const lsAuth = window.localStorage.getItem(LS_KEY)
      if (lsAuth) {
        const {accessToken} = JSON.parse(lsAuth)
        const {data} = await axios.get(`${API_URL}/auth/me`)
        if (data) {
          const userInfo = {accessToken, ...data}
          window.localStorage.setItem(LS_KEY, JSON.stringify(userInfo))
        }
      }
    }
    return {}
  }

  public static getAccessToken() {
    if (process.browser) {
      const lsAuth = window.localStorage.getItem(LS_KEY)
      if (lsAuth) {
        const {accessToken = null} = JSON.parse(lsAuth)
        return accessToken
      }
    }
    return null
  }

  public static async logout() {
    return process.browser && window.localStorage.removeItem(LS_KEY)
  }
}
