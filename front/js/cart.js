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

let productLocalStorage = JSON.parse(localStorage.getItem("product"));

if (productLocalStorage) {

    const titleCart = document.querySelector("h1");
    const sectionCart = document.querySelector(".cart");

    titleCart.innerHTML = "Votre panier est vide !";
    sectionCart.style.display = "none";

} else {

    for (let i=0; i < productLocalStorage.length; i++) {

    }
}