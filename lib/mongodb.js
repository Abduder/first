import { MongoClient } from 'mongodb'

const uri = process.env.MONGODB_URI || "mongodb+srv://abduder:AbdU1234@cluster0.vd6uv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";


/**
 * Chouf l fer9 mabin hada w hadak li kan 3ndk, dima khli l code dyalk ma 9alla wa dal
 * w ila jbdtih mn chi blasa akhra dima 9rah w fhmo b3da 9bl matkhdem bih, surement ghayban lik fin t ameliorer
 */

/**
 * la7d kifach dima ghadyin b nfs structure dyal {data} awla {error}
 * ila mafhmtich dik new Promise() goulha lia nchre7ha lik
 */
const connectToDatabase = () => {
  return new Promise(resolve => {
    console.log("Connecting to", uri)
    const client = new MongoClient(uri,{useUnifiedTopology:true, useNewUrlParser:true})
    client.connect()
      .then(connection => {
        resolve(connection)
      })
      .catch(e => {
        resolve({ error: e.message })
      })
  })
}


export default connectToDatabase;
