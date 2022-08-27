function mainOrder() {
    const order = document.getElementById("orderId");
    order.textContent = localStorage.getItem("orderId");
    console.log(localStorage.getItem("orderId"));
    localStorage.removeItem("orderId");
}

mainOrder();

//faire un localisation refresh / redirect page js