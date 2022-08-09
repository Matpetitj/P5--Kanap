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

  function deleteProduct () {
    let deleteButton = document.querySelectorAll(".deleteItem");
    for (j = 0; j < deleteButton.length; j++) {
      deleteButton[j].addEventListener("click", (e) => {
        e.preventDefault();

        let deleteId = productLocalStorage[j].productId;
        let deleteColor = productLocalStorage[j].color;

        productLocalStorage = productLocalStorage.filter( el => el.productId !== deleteId || el.color !== deleteColor);

        localStorage.setItem("product", JSON.stringify(productLocalStorage));

        alert("Ce produit a bien été supprimé");
        location.reload();
      })
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