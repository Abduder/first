import Head from "next/head"
import Link from "next/link"
import {useEffect, useState} from "react"
export default function Ajouter(){
	const [add,setAdd]= useState(false)
	const [nom, setNom] = useState("");
	const [prix, setPrix] =useState("");
	const [quantite,setQuantite] = useState("");

	async function submit(e){
		e.preventDefault();
		if(!nom || !prix || !quantite){
			window.alert("Champs manquant")
		}else{
			setAdd(true);
			let res = await fetch("/api/post", {
      			method: "POST",
      			body: JSON.stringify({
        			nom : nom,
        			prix: prix,
        			quantite: quantite
      			})
    		});
    		res = await res.json();
    		window.alert("added");
    		setNom("");
    		setPrix("");
    		setQuantite("");
    		setAdd(false);
		}
		
	}
	return(
		<>
			<Head>
				<title>Ajouter</title>
			</Head>
			<main>
			<Link href="/">
			<button className="card" >HOME</button>
			</Link>
				<input type="text" className="input-nom" value={nom}
				placeholder = "nom de l article" 
				onChange = {(e)=>setNom(e.target.value)} />
				<input type="text" className="input-prix" value={prix}
				placeholder= "prix HT unite"
				onChange = {(e)=>setPrix(e.target.value)} />
				<input type= "number" className="input-quantite" value={quantite}
				placeholder="quantite"
				onChange = {(e)=>setQuantite(e.target.value)} />
				<button className="card" id="ajouter"  
				onClick= {submit} >{add?"En cours":"Ajouter"}</button>
			</main>

		</>)
}
