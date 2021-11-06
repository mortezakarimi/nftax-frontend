import axios from 'axios'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'api'

export class NftService {
  public static async getNtfList() {
    return axios.get<{walletAddress: string; nonce: string; _id: string}>(`${API_URL}/nft`)
  }
}
