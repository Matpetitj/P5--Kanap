//fonction pour récupérer et afficher l'orderId ! Pour nettoyer le localStorage
function mainOrder() {
    const order = document.getElementById("orderId");
    //on récupère le numéro de commande dans l'url
    const paramsUrl = new URLSearchParams(document.location.search);
    const orderId = paramsUrl.get("order_id");
    //on édite le contenu du DOM
    order.textContent = orderId;    
    console.log(orderId);
    //on retire les produits du localStorage et donc du panier
    localStorage.removeItem("product");
}

mainOrder();