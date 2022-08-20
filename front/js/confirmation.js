function mainOrder() {
    const order = document.getElementById("orderId");
    order.textContent = localStorage.getItem("orderId");
    console.log(localStorage.getItem("orderId"));
    localStorage.clear();
}

mainOrder();

//faire un location refresh / redirect page js