// Page pricipale // 

// Fetch de l' API // 

async function getTeddies() {
    try {
        let response = await fetch("http://localhost:3000/api/teddies");
        if ( response.ok) {
            let teddies = await response.json(); 
            // console.log(teddies);
            creationCartesPelluches(teddies)
        } else {
            console.error('Erreur serveur : ')
        }
    } catch (e) {
        console.log (e)
    
    }
}

// Appel de la funtion getTeddies // 

getTeddies()

// Creation des cartes produit et integration des infos //


//Création des cartes //

function creationCartesPelluches(teddies) {
    let divPrimaire = document.createElement("div");
    const acceuil = document.getElementById("acceuil");
    acceuil.appendChild(divPrimaire);
    divPrimaire.classList.add("row-cols-1", "row-cols-md-1", "row-cols-lg-4", "d-flex", "flex-wrap");
    
    for (let i = 0; i < teddies.length; i++) {

        let divSecondaire = document.createElement("div");
        divPrimaire.appendChild(divSecondaire);
        divSecondaire.classList.add("col", "card", "pt-1");


        // Création des élements images et div avec la classe card//
        let imageTeddies = document.createElement("img");
        divSecondaire.appendChild(imageTeddies);
        imageTeddies.classList.add("card-image-top", "photo", "img-fluid");
        imageTeddies.src = teddies[i].imageUrl;

        let divCard = document.createElement("div");
        divSecondaire.appendChild(divCard);
        divCard.classList.add("card-body", "text-center", "px-0", "d-flex", "flex-column", "justify-content-between");


        // Création des éléments enfants de divCard //

        let nomDeLours = document.createElement("h3");
        divCard.appendChild(nomDeLours);
        nomDeLours.classList.add("card-title", "title");
        nomDeLours.textContent = teddies[i].name;

        let descriptionOurs = document.createElement("p");
        divCard.appendChild(descriptionOurs);
        descriptionOurs.classList.add("col", "description", "text-justify");
        descriptionOurs.textContent = teddies[i].description;


        // Création d'une div pour le prix //
        let divPrix = document.createElement("div");
        divCard.appendChild(divPrix);
        divPrix.classList.add("d-flex", "flex-row", "justify-content-between");

        // Création du prix //
        let prixOurs = document.createElement("p");
        divPrix.appendChild(prixOurs);
        prixOurs.classList.add("price", "my-2", "font-weight-bold");
        prixOurs.textContent = teddies[i].price / 100 + ' $';

        let lienProduit = document.createElement("a");
        divPrix.appendChild(lienProduit);
        urlDynamique(teddies,i,lienProduit);
        bouttonVoir(lienProduit);
    }
}

//Récupération de l'id pour rediriger vers la page produit correspondante //
function urlDynamique(teddies,i,lienProduit) {
   
    // récupération de l'url  //
    let splitUrl = window.location.pathname.split("/");
    let lastItem = splitUrl.pop();
    //console.log(window.location.pathname.replace(lastItem, 'product.html')) 
    let url = window.location.origin + window.location.pathname.replace(lastItem, 'boutique/produit.html');

    // Création d'un objet url  //
    let urlObj = new URL(url);
    let idTeddies = teddies[i]._id;
    //console.log(urlObj)

    // Ajout du query string id //
    urlObj.searchParams.append("id", idTeddies);
    lienProduit.href = urlObj;
    
  
}



//Création du bouton de redirection avec le bon url //
function bouttonVoir(lienProduit) {
    let bouttonLien = document.createElement("button");
    //console.log(bouttonLien)
    lienProduit.appendChild(bouttonLien);
    bouttonLien.classList.add("btn", "btn-primary", "stretched-link" , "block-right");
    bouttonLien.textContent = "Voir";
}

