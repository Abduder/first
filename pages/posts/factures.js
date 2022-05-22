import Head from "next/head"
import {useEffect, useState} from "react"
export default function Facture({initialPosts}){
	const [table, setTable] =useState ([]);
	const [article, setArticle] = useState("");
	const [quantite, setQuantite] = useState("");
	function ajouter(){
		if(!article || !quantite){
			window.alert("Champs manquants")
		}else{
			let index = initialPosts.findIndex(ele=>{return ele.nom==article})
			if(index>0){
				let art = initialPosts[index];
				if(art.quantite<quantite){
					window.alert("Il ne rest que "+art.quantite)
				}else{
					art.quantite=quantite;
					art.total = art.prix*quantite;
					setTable([...table,art])}
				}
				
			else{window.alert("l'article n'exist pas en stock")} 
		}
	}
	return(
		<>
			<Head>
				<title>Factures</title>
			</Head>
			<main>
				<input className="input-article" type="text" placeholder="article a ajouter" value={article} onChange={(e)=>setArticle(e.target.value)} />
				<input className="input-quant" type="number" placeholder="article a ajouter" value={quantite} onChange={(e)=>setQuantite(e.target.value)} />
				<button className="card" onClick = {ajouter}>Ajouter</button>
				<div className="facture-article" >
				<h3 className ="table-header">Désignation</h3>
				<h3 className ="table-header">TVA</h3>
				<h3 className ="table-header">P.U.HT</h3>
				<h3 className ="table-header">Qté</h3>
				<h3 className ="table-header">Total HT</h3>
				</div>
				{
					table.map(ele=>{
					return (<div className="facture-article" key={ele._id}>
						<h4 className="nom">{ele.nom}</h4>
						<p className="tva">20%</p>
						<p className="prix">{ele.prix}</p>
						<p className="quantite">{ele.quantite}</p>
						<p className="total">{ele.total}</p>
					</div>);
				})
				}
			</main>
		</>)
}
export async function getServerSideProps(context) {
  let res = await fetch("/api/get", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  let initialPosts = await res.json();

  /**
   * Hna khsna nfer9o mabin initial posts w posts, hit mli ghadir useState dyal les posts rah ghadi y t updataw
   * donc bach madoukhch dima tflsef f smyat d les variables
   * fl program dyalna ghan3tiwh b3da des posts bach ybda (initiaPosts) 3ad mn be3d ghayb9a ykhdem b posts li ghay t updataw koul ma zdna haja jdida
   */
  return {
    props: { initialPosts },
  };
}
