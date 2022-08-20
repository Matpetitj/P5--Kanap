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
    console.log(products);
  }

  //Fonctionnalité de suppression

  