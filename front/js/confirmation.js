//fonction pour récupérer et afficher l'orderId ! Pour nettoyer le localStorage
function mainOrder() {
    const order = document.getElementById("orderId");
    order.textContent = localStorage.getItem("orderId");
    console.log(localStorage.getItem("orderId"));
    localStorage.removeItem("product");
    localStorage.removeItem("orderId");
}

mainOrder();