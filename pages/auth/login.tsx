import type {NextPage} from 'next'
import Head from 'next/head'
import Layout, {siteTitle} from '../../components/layout'
import {Button} from 'react-bootstrap'
import {useEffect, useState} from 'react'
import detectEthereumProvider from '@metamask/detect-provider'
import {UsersService} from '../../lib/services/users.service'
import {bufferToHex} from 'ethereumjs-util'
import Router from 'next/router'

let ethereum: any | undefined = undefined

const Login: NextPage = () => {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (UsersService.getAccessToken()) {
      Router.push('/')
    }

    detectEthereumProvider().then((provider) => {
      if (provider) {
        console.log('Ethereum successfully detected!')
        if (provider !== window.ethereum) {
          console.error('Do you have multiple wallets installed?')
          return
        }
        ethereum = provider
      } else {
        // if the provider is not detected, detectEthereumProvider resolves to null
        console.error('Please install MetaMask!')
        return
      }
    })
  }, [])

  const handleClick = async () => {
    try {
      if (!ethereum) {
        console.error('Please install MetaMask!')
        return
      }
      await ethereum.request({method: 'eth_requestAccounts'})

      setLoading(true)

      const registerResponse = await UsersService.register(ethereum.selectedAddress)

      const signature = await ethereum.request({
        method: 'personal_sign',
        params: [
          bufferToHex(
            Buffer.from(`I am signing my one-time nonce: ${registerResponse.data.nonce}`, 'utf8')
          ),
          ethereum.selectedAddress,
        ],
      })
      await UsersService.login(ethereum.selectedAddress, signature)
      await UsersService.getUserInfo()
      setLoading(false)
    } catch (err: any) {
      console.error(err)
    }
  }
  return (
    <Layout>
      <Head>
        <title>{siteTitle} - Login</title>
      </Head>
      <section>
        <Button variant='metamask' onClick={handleClick}>
          {loading ? 'loading...' : 'Login with MetaMask'}
        </Button>
      </section>
    </Layout>
  )
}

export default Login
