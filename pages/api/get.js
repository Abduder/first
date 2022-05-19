import connectToDatabase from "../../lib/mongodb";

/**
 * la7d m3aya kifach mfer9in getPosts w addPost
 * 3reft 3la annak knti adirha mn be3d walakin dima fker mn lewel t cleani l code dyalk
 * bach ila w93at chi erreur ghatkoun shel bach annak debugiha matkounch rwina
 */

/**
 * w la7d 3awtani kifach khsek t structurer returns dyalk, f had l7ala return 3ndo 2 cas
 * ya ima {data dyalna} ila kan koulchi houwa hadak
 * awla {erreur} ila kant erreur bach f index.js kadir checking: if(posts.error) ERR else MZYAN
 * kataf9 m3a rassk 3la structure w7da unifiée w katst3mlha f ga3 l endpoints dl api dyalk
 */

export default async function handler(req, res) {
  const connection = await connectToDatabase();

  /**
   * Dima checki b3da wach l variable dyalk valide wla machi valide f ay haja dertiha
   */
  if (!connection || connection.error) {
    return res.json({ error: `Connection to database failed: ${connection.error || "unknown error."}` })
  }

  const db = connection.db("stock");
  if(!db){
    return res.json({error: "Database not found"})
  }


  const articles = await db.collection("articles").find({}).toArray();
  res.json(articles ? articles : { error: "Couldn't fetch entries." }); //Dima checki htal akhir haja moumkina

}
