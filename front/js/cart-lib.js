//méthode pour récupérer le panier
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
      for(const product of products){
        if(product.amount > 100){
          alert("Impossible d'ajouter plus de produits de ce type");
          product.amount = 100;
        }
      }
      localStorage.setItem("product",JSON.stringify(products));
    // console.log(products);
  }
