function mainAcceptation() {
    const order = document.getElementById("orderId");
    order.textContent = localStorage.getItem("orderId");
    console.log(localStorage.getItem("orderId"));
    localStorage.clear();
}

mainAcceptation();