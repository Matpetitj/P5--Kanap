//fonction pour récupérer et afficher l'orderId ! Pour nettoyer le localStorage
function mainOrder() {
    const order = document.getElementById("orderId");
    const paramsUrl = new URLSearchParams(document.location.search);
    const orderId = paramsUrl.get("order_id");
    order.textContent = orderId;
    console.log(orderId);
    localStorage.removeItem("product");
}

mainOrder();