import Head from 'next/head'

const Fallback = () => (
  <>
    <Head>
      <title>Ops, internet não detectada</title>
    </Head>
    <h1>Para acessar, verifique sua conexão</h1>
    <h2>E reabra o aplicativo</h2>
  </>
)

export default Fallback