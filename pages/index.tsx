import type {NextPage} from 'next'
import Head from 'next/head'
import Layout, {siteTitle} from '../components/layout'
import axios from 'axios'
import useSWR from 'swr'
import {Table} from 'react-bootstrap'

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'api'

const fetcher = (url: string) => axios.get(url).then((res) => res.data)
const Home: NextPage = () => {
  const {data, error} = useSWR(`${API_URL}/nft`, fetcher)

  return (
    <Layout>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      <section>
        <Table>
          <thead>
            <tr>
              <th>Token ID</th>
              <th>Token Name</th>
              <th>Token Symbol</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              data.map((item: any, index: number) => (
                <tr key={index}>
                  <th>{item.tokenID}</th>
                  <th>{item.tokenName}</th>
                  <th>{item.tokenSymbol}</th>
                  <th>{item.timeStamp}</th>
                </tr>
              ))}
          </tbody>
        </Table>
      </section>
    </Layout>
  )
}

export default Home
