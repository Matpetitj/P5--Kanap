// const cartPage = document.location.href;

// //Le but est maintenant de récupérer les produits de l'API du script quand on est dans le panier donc SI

// if (cart.match("cart")) {
//     fetch("http://localhost:3000/api/products")
//     //alors
//       .then((res) => res.json())
//       .then((listSofa) => {
//           console.log(listSofa);
//           fullCart(listSofa);
//       })
//     } else {
//       console.log("Page confirmation");
//     }

// //Ici il faut créer une fonction pour afficher les produits dans le panier lorsqu'on les ajoute
fetch("http://localhost:3000/api/products")

let productLocalStorage = JSON.parse(localStorage.getItem("product"));

if (productLocalStorage) {

    const cartTitle = document.querySelector("h1");
    const cartSection = document.querySelector(".cart");

    cartTitle.textContent = "Votre panier est vide !";
    cartSection.style.display = "none";

} else {

    for (let i = 0; i < productLocalStorage.length; i++) {

        const zoneCart = document.getElementById("items");

        const productArticle = document.createElement("article")
        productArticle.className = "cart__item";
        productArticle.setAttribute("data-id", productLocalStorage[i].productId);
        zoneCart.appendChild(productArticle);

        const productImgDiv = document.createElement("div");
        productImgDiv.className = "cart__item__img";
        productArticle.appendChild(productImgDiv);
        
        const productImg = document.createElement("img");
        productImg.setAttribute('src', products.imageUrl);
        productImg.setAttribute('alt', product.altTxt);
        productImgDiv.appendChild(productImg);
    }
}