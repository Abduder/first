import Head from "next/head"
import Link from "next/link"
import { useEffect, useState } from "react";
export default function Stock(){
	const [posts, setPosts] = useState([])
	useEffect(() => {
		fetch("/api/get", {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
			},
		}).then(res => res.json())
			.then(setPosts);
	}, [])
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
					posts.map(ele=>{
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
