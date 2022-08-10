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

  function deleteProduct () {
    for (i = 0; i < deleteButton.length; i++) {

        let deleteId = productLocalStorage[i].productId;
        let deleteColor = productLocalStorage[i].color;

        productLocalStorage = productLocalStorage.filter( el => el.productId !== deleteId || el.color !== deleteColor);

        localStorage.setItem("product", JSON.stringify(products));

        alert("Ce produit a bien été supprimé");

        if(productLocalStorage.length === 0) {
          localStorage.clear();
        }

        location.reload();
    }
  }

  // function deleteItem() {
  //     productDelete.addEventListener("click", (e) => {
  //       e.preventDefault;

  //       let deleteId = productId;
  //       let deleteColor = color;

  //       productLocalStorage = productLocalStorage.filter(element => element.productId !== deleteId || element.color !== deleteColor);

  //       localStorage.setItem('product', JSON.stringify(productLocalStorage));

  //       if (productLocalStorage.length === 0) {
  //           localStorage.clear(); //pas de else nécessaire
  //       }

  //       location.reload();
  //   });
  // }