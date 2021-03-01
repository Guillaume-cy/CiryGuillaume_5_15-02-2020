// PAGE PANIER //

// DECLARATION DES VARIABLES NECESSAIRES //

// Création d'un tableau de stockage des prix //
const tableauPrix = [];

//Création du tableau qui va être envoyé au serveur avec les id des caméras
let products = [];

//Création du tableau contact contenant les données du formulaire qui va être envoyé au serveur
let contact = {};

//Création d'une classe pour l'objet contact
class ContactData {
    constructor(name, surname, adress, city, email) {
        this.firstName = name;
        this.lastName = surname;
        this.address = adress;
        this.city = city;
        this.email = email;
    }
}

// MISE EN PLACE DU PANIER //

// Création de la structure HTML du panier à partir des données des articles choisis //
function creationDuPanier(itemTeddie, contenuDuPanier) {
    let panierPrincipal = document.getElementById('basket-content');
    //console.log(panierPrincipal)
    panierPrincipal.classList.add("my-3");
    let divPanier = document.createElement('div');

    //Ajouter attribut ID
    panierPrincipal.appendChild(divPanier);
    divPanier.classList.add('contenuDuPanierToClear');
    divPanier.classList.add("d-flex", "flex-row", "justify-content-between", "my-2", "px-1", "bold");

    let nomDeLours = document.createElement('p');
    divPanier.appendChild(nomDeLours);
    nomDeLours.textContent = itemTeddie.name;

    let couleurDeLours = document.createElement('p');
    divPanier.appendChild(couleurDeLours);
    couleurDeLours.textContent = contenuDuPanier[i].couleurValider;

    let prixDeLours = document.createElement('p');
    divPanier.appendChild(prixDeLours);
    prixDeLours.textContent = itemTeddie.price / 100;
    prixDeLours.classList.add("prix");
}

//Tableau de prix des articles choisis //
function ajoutDesPrix(itemTeddie) {
    let itemPrice = itemTeddie.price;
    tableauPrix.push(itemPrice);
}

//Ajout des id des articles choisis dans le tableau products //
function addIdProducts(contenuDuPanier) {
    products.push(contenuDuPanier[i].idTeddies);
}

//Prix total de la commande //
function totalPriceOrder(tableauPrix) {
    let totalPrice = document.getElementById('total-price');
    let total = 0;
    for (i = 0; i < tableauPrix.length; i++) {
        total = total + tableauPrix[i];
        totalPrice.textContent = "Prix total : " + total / 100 + "$";
        //Stockage du prix dans le localStorage pour la page de confirmation
        localStorage.setItem("totalOrder", JSON.stringify(total));
    }
}

// Création du panier //
async function recupPanier() {
    try {
        let response = await fetch("http://localhost:3000/api/teddies");
        if (response.ok) {
            let Teddie = await response.json();
            // Récupérer le bon objet dans l'api
            let contenuDuPanier = JSON.parse(localStorage.getItem("contenuDuPanier")) || {};
            console.log(contenuDuPanier)

            for (i = 0; i < contenuDuPanier.length; i++) {
                let itemTeddie = Teddie.find(Teddie => Teddie['_id'] == contenuDuPanier[i].idTeddies);
                console.log(itemTeddie);
                creationDuPanier(itemTeddie, contenuDuPanier);
                ajoutDesPrix(itemTeddie);
                addIdProducts(contenuDuPanier);
            }
            totalPriceOrder(tableauPrix);

        } else {
            console.error('Retour du serveur : ', response.status);
        }
    }
    catch (e) {
        console.log(e);
    }
}


// SUPPRESSION DES ARTICLES CHOISIS //

// Supprimer le contenu du panier
function suppPanier() {
    let divButtonClear = document.getElementById('button-clear-basket');
    let buttonClearBasket = document.createElement("button");

    divButtonClear.appendChild(buttonClearBasket);
    buttonClearBasket.classList.add("btn", "btn-primary", "block-right");
    buttonClearBasket.textContent = "Vider le panier";

    buttonClearBasket.addEventListener('click', function () {
        localStorage.removeItem('contenuDuPanier');
        localStorage.removeItem('totalOrder');
        let panierPrincipal = document.getElementById('basket-content');
        while (panierPrincipal.firstChild) {
            panierPrincipal.removeChild(panierPrincipal.firstChild);
            let totalPrice = document.getElementById('total-price');
            totalPrice.textContent = "Prix total : 0 $";
        }

    })
}

// VALIDATION DU FORMULAIRE ET ENVOIE DU FORMULAIRE ET DE CONTACT ET PRODUCT A L'API //

//Récupération de l'id de commande renvoyée par l'API et stockage dans le localStorage
function idConfimation(responseId) {
    let orderId = responseId.orderId;
    console.log(orderId);
    localStorage.setItem("orderConfirmationId", orderId);
}

//Récupération des données du formulaire dans le tableau contact
function getForm() {
    let firstname = document.getElementById('firstName').value;
    let lastname = document.getElementById('lastName').value;
    let address = document.getElementById('address').value;
    let city = document.getElementById('city').value;
    let email = document.getElementById('email').value;
    contact = new ContactData(firstname, lastname, address, city, email);
}

//Requête POST pour envoyer les infos Contact et le tableau products à l'API
async function postForm(dataToSend) {
    try {
        let response = await fetch("http://localhost:3000/api/teddies/order", {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: dataToSend,
        });
        if (response.ok) {
            let responseId = await response.json();
            idConfimation(responseId);
            window.location.href = "confirmation.html";
        } else {
            console.error('Retour du serveur : ', response.status);
        }
    } catch (e) {
        console.log(e);
    }
}

//Validation de la commande et envoie des infos Contact et du tableau product à l'API
function confirmationCommande() {
        getForm();
        dataToSend = JSON.stringify({ contact, products });
        console.log(dataToSend);
        postForm(dataToSend);
}

//Validation des données du formulaire
function validateForm() {
    let buttonValidation = document.getElementById('btn-validation');
     buttonValidation.addEventListener('click', function () {
        let firstname = document.getElementById('firstName').value;
        let lastname = document.getElementById('lastName').value;
        let address = document.getElementById('address').value;
        let city = document.getElementById('city').value;
        let email = document.getElementById('email').value;
        if (firstname, lastname, address, city, email != "" && /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
            confirmationCommande();
            return true;
        } else {
            alert("Saisissez tous les champs et entrez un email valide");
            return false;
        }
})
}


// APPEL DES FONCTIONS //

recupPanier();
suppPanier();
validateForm();


