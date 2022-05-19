import connectToDatabase from "../../lib/mongodb"

export default async function handler(req, res){


	const connection = await connectToDatabase();
	if(!connection || connection.error){
		return res.json({error:`Connection to database Failed: ${connection.error || "unknown error"}` })
	}
	const db = connection.db("stock")
	if(!db) {
		return res.json({error:"Database not found"});
	}
	let r = JSON.parse(req.body)
	let newArtic = await db.collection("articles").findOneAndUpdate({nom:r.nom},{$inc:{quantite:parseInt(r.quantite,10)},$set:{prix:r.prix}});
	
	if(!newArtic.value){
		newArtic = await db.collection("articles").insertOne({
		nom : r.nom,
		prix: r.prix,
		quantite : parseInt(r.quantite,10)
	});
	}
	res.json(newArtic && newArtic.ops && newArtic.ops.length>0 ? newArtic.ops[0] : {error:"couldn't add entry."});
}