import Head from "next/head"
import Link from "next/link"
export default function Stock({initialPosts}){
	return(
		<>
			<Head>
				<title>Stock</title>
			</Head>
			<main>
			<Link href="/">
			<button className="card" >HOME</button>
			</Link>
				<div className="article" key="article-head">
						<h3 className="nom">Article</h3>
						<p className="prix">Prix</p>
						<p className="quantite">Quantite</p>
				</div>
				{
					initialPosts.map(ele=>{
					return (<div className="article" key={ele._id}>
						<h3 className="nom">{ele.nom}</h3>
						<p className="prix">{ele.prix}</p>
						<p className="quantite">{ele.quantite}</p>
					</div>);
				})
			}
			</main>
		</>);
}
export async function getServerSideProps(context) {
  let res = await fetch("http://localhost:3000/api/get", {
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
