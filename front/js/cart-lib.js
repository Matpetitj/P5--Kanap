function getCart() {
    const cart = localStorage.getItem("product");
    if (cart == null) {
      return [];
    } else {
     return JSON.parse(cart);
    }
  }
  
  //sauvegarder le panier dans le localStorage
    function saveCart(products) {
    localStorage.setItem("product",JSON.stringify(products));
  }

  function deleteItem() {
      productDelete.addEventListener("click", (e) => {
        e.preventDefault;

        let deleteId = productId;
        let deleteColor = color;

        productLocalStorage = productLocalStorage.filter(element => element.productId !== deleteId || element.color !== deleteColor);

        localStorage.setItem('product', JSON.stringify(productLocalStorage));

        if (productLocalStorage.length === 0) {
            localStorage.clear(); //pas de else nécessaire
        }

        location.reload();
    });
  }