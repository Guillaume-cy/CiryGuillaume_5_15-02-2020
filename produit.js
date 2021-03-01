// Page produit //

// Fetch de l' API // 

async function getTeddies() {
    try {
        let response = await fetch("http://localhost:3000/api/teddies");
        if (response.ok) {
            let teddies = await response.json();
            //console.log(teddies);
            cartePageProduit(teddies);
        } else {
            console.error('Retour du serveur : ', response.status)
        }
    } catch (e) {
        console.log(e);
    }
}


// Appel de la funtion getTeddies // 

getTeddies();


// Creation des cartes produits dynamique // 

// Utilisation de l'Id pour creer l'url // 
function cartePageProduit(teddies) {
    let urlSearch = new URLSearchParams(window.location.search);
    // console.log(urlSearch);
    let idTeddies = urlSearch.get('id');
    // console.log(idTeddies);
    caracteristiqueOurs(teddies, idTeddies);
}

// Récupération de la peluche correspondant à l'Id //
function caracteristiqueOurs(teddies, idTeddies) {
    let produitSelectionner = teddies.find(teddies => teddies['_id'] == idTeddies);
    // console.log(produitSelectionner);
    carteProduit (produitSelectionner, idTeddies);
}


//Création de la structure HTML de la peluche //
function carteProduit (produitSelectionner, idTeddies) {
    let divPrimaire = document.createElement("div");
    const produit = document.getElementById("produit");
    produit.appendChild(divPrimaire);
    divPrimaire.classList.add("row", "mx-auto", "my-3", "w-75");

    let divSecondaire = document.createElement("div");
    divPrimaire.appendChild(divSecondaire);
    divSecondaire.classList.add("card", "col", "m-auto", "p-2");

    let imageTeddies = document.createElement("img");
    divSecondaire.appendChild(imageTeddies);
    imageTeddies.classList.add("card-image-top", "photo", "img-fluid");
    imageTeddies.src = produitSelectionner.imageUrl;

    let divCard = document.createElement("div");
    divSecondaire.appendChild(divCard);
    divCard.classList.add("card-body", "text-center", "px-0", "d-flex", "flex-column", "justify-content-between");

    // Création des éléments enfants de la div CardBody // 
    let nomDeLours = document.createElement("h1");
    divCard.appendChild(nomDeLours);
    nomDeLours.classList.add("card-title", "title-produit");
    nomDeLours.textContent = produitSelectionner.name;

    let descriptionOurs = document.createElement("p");
    divCard.appendChild(descriptionOurs);
    descriptionOurs.classList.add("description-produit", "text-justify");
    descriptionOurs.textContent = produitSelectionner.description;

    choixCouleurs(divCard, produitSelectionner);

    // Div pour prix et boutton //
    let divPrix = document.createElement("div");
    divCard.appendChild(divPrix);
    divPrix.classList.add("d-flex", "flex-md-row", "flex-column", "justify-content-between");

    // Prix //
    let prixOurs = document.createElement("p");
    divPrix.appendChild(prixOurs);
    prixOurs.classList.add("price-produit", "font-weight-bold");
    prixOurs.textContent = produitSelectionner.price / 100 + ' $';

    let lienProduit = document.createElement("a");
    divPrix.appendChild(lienProduit);

    // Création du bouton  //
    let bouttonAcheter = document.createElement("button");
    lienProduit.appendChild(bouttonAcheter);
    bouttonAcheter.classList.add("btn", "btn-primary", "block-right");
    

    // Texte du bouton //
    bouttonAcheter.textContent = "Ajouter au panier";
    // console.log(idTeddies);
    ajoutCouleurSelectionner(bouttonAcheter, idTeddies);



    
}


// Choix de couleurs //

function choixCouleurs(divCard, produitSelectionner) {
    let decisionCouleurs = document.createElement("p");
    divCard.appendChild(decisionCouleurs);
    decisionCouleurs.classList.add("text-left", "my-3");
    decisionCouleurs.textContent = "Choisir la couleur :";

    let couleurChoisi = document.createElement("select");
    divCard.appendChild(couleurChoisi);
    couleurChoisi.classList.add("form-control", "mb-5");
    couleurChoisi.id = "list";

    numeroCouleurs = produitSelectionner.colors;
    for (let i = 0; i < numeroCouleurs.length; i++) {
        let optionDeLaCouleurs = document.createElement("option");
        couleurChoisi.appendChild(optionDeLaCouleurs);
        optionDeLaCouleurs.textContent = produitSelectionner.colors[i];
    }
}


// Ajout des articles au panier //
function ajoutCouleurSelectionner(bouttonAcheter, idTeddies) {
    bouttonAcheter.addEventListener('click', function () {
        let contenuDuPanier = JSON.parse(localStorage.getItem("contenuDuPanier"));
        console.log(contenuDuPanier)
        let couleurValider = document.getElementById('list').value;
        //console.log(couleurValider);
        if (contenuDuPanier === null) {
            contenuDuPanier = [];
        }
        let produit = new mesArticles(idTeddies, couleurValider);
        contenuDuPanier.push(produit);
        localStorage.setItem("contenuDuPanier", JSON.stringify(contenuDuPanier));
    })
}

// Création d'une classe pour le tableau produit //
class mesArticles {
    constructor(idTeddies, couleurValider) {
        this.idTeddies = idTeddies;
        this.couleurValider = couleurValider;
    }
}


