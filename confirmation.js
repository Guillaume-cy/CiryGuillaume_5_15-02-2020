// PAGE CONFIRMATION

// Confirmation de la commande

function validationCommande() {
    const confirmationId = localStorage.getItem("orderConfirmationId");
    const messageConfirmation = document.getElementById("orderId");
    messageConfirmation.innerHTML = "Merci pour votre commande n° " + confirmationId;
    const totalPrice = localStorage.getItem("totalOrder");
    const confirmationPrice = document.getElementById("total-price");
    confirmationPrice.innerHTML = "Prix total : " + totalPrice + " $";
}


// Vider le panier, le prix total et l'id de commande

function suppressionPanier() {
    buttonHome = document.getElementById('btn-confirmation');
    buttonHome.addEventListener('click', function () {
        localStorage.removeItem("orderConfirmationId");
        localStorage.removeItem('contenuDuPanier');
        localStorage.removeItem('totalOrder');
        window.location.href = "../../index.html";
    })
}


//APPEL DES FONCTIONS
validationCommande()
suppressionPanier()