import Head from 'next/head'
import Link from 'next/link'
import connectToDatabase from '../lib/mongodb'

export default function Home({ isConnected }) {
  return (
    <div className="container">
      <Head>
        <title>First Power Energy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="title">
          First Power Energy
        </h1>

        {isConnected ? (
          <h2 className="subtitle">You are connected to MongoDB</h2>
        ) : (
          <h2 className="subtitle">
            You are NOT connected to MongoDB. Check the <code>README.md</code>{' '}
            for instructions.
          </h2>
        )}

        <div className="grid">
          <Link href="/posts/stock">
          <a className="card">
            <h3>Stock &rarr;</h3>
            <p>Explorer le stock.</p>
          </a>
          </Link>

          <Link href="/posts/ajouter">
          <a href="https://nextjs.org/learn" className="card">
            <h3>Ajouter &rarr;</h3>
            <p>Nouveau articles a ajouter</p>
          </a>
          </Link>

          <Link href="/posts/retirer">
          <a
            className="card"
          >
            <h3>Retirer &rarr;</h3>
            <p>Articles a retirer.</p>
          </a>
          </Link>

          <Link href="/posts/factures">
          <a
            className="card"
          >
            <h3>Factures &rarr;</h3>
            <p>
              Generer les factures.
            </p>
          </a>
          </Link> 
        </div>
      </main>

      <footer>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className="logo" />
        </a>
      </footer>
    </div>
  )
}

export async function getServerSideProps(context) {
  try {
    await connectToDatabase
    // `await clientPromise` will use the default database passed in the MONGODB_URI
    // However you can use another database (e.g. myDatabase) by replacing the `await clientPromise` with the following code:
    //
    // `const client = await clientPromise`
    // `const db = client.db("myDatabase")`
    //
    // Then you can execute queries against your database like so:
    // db.find({}) or any of the MongoDB Node Driver commands
    return {
      props: { isConnected: true },
    }
  } catch (e) {
    console.error(e)
    return {
      props: { isConnected: false },
    }
  }
}
