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

// function fullCart(index) {
//     let cart = JSON.parse(localStorage.getItem("cartStock"));
//      if (cart && cart.length != 0) {
//       for (const choice of cart) {
//         console.log(choice);
//         for (let g = 0, h = index.length; g < h; g++) {
//           if (choice._id === index[g]._id) {
//             choice.name = index[g].name;
//             choice.price = index[g].price;
//             choice.image = index[g].imageUrl;
//             choice.description = index[g].description;
//             choice.alt = index[g].altTxt;
//           }
//         }
//       }
//       show(cart);
//     } else {
//       document.getElementById("totalQuantity").innerHTML = "0";
//       document.getElementById("totalPrice").innerHTML = "0";
//       document.querySelector("h1").innerHTML = "Panier vide";
//     }
//     modifQuantity();
//     suppr();
//   }