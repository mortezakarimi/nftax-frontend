import Head from 'next/head'
import {Col, Container, Row} from 'react-bootstrap'
import Menu from './menu'

export const siteTitle = 'NFTax'

export default function Layout({children}: {children: React.ReactNode}) {
  return (
    <>
      <Head>
        <meta charSet='utf-8' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <title>{siteTitle}</title>
      </Head>
      <Menu />
      <br />
      <Container as={'main'}>
        <Row>
          <Col>{children}</Col>
        </Row>
      </Container>
    </>
  )
}
