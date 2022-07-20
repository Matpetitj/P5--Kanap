//Il faut récupérer l'ID dans l'URL avec "params"

const paramsUrl = new URLSearchParams(document.location.search);
const productId = paramsUrl.get("_id");

console.log(productId);

//Prendre les produits dans l'API

fetch("http://localhost:3000/api/products")

.then((res) => res.json())
  .then((listSofa) => {
    console.table(listSofa);
    insertProductIntoPage(listSofa);
  })

  //Ajout des informations des produits

  function insertProductIntoPage(products) {
    const zoneImage = document.querySelector("article div.item__img");
    const productTitle = document.getElementById("title");
    const productPrice = document.getElementById("price");
    const productDescription = document.getElementById("description");
    const productColor = document.getElementById("colors");

    for (const choice of products) {
        
        const createProductImage = document.createElement('img');
        zoneImage.appendChild(createProductImage);

        if (productId == choice._id) {

            createProductImage.setAttribute('src', choice.imageUrl);
            createProductImage.setAttribute('alt', choice.altTxt);    

            productTitle.textContent = choice.name;

            productPrice.textContent = choice.price;

            productDescription.textContent = choice.description;

            for (const colors of choice.colors) {
                productColor.innerHTML += `<option value="${colors}">${colors}</option>`; //utilisation littéraux de gabarits
            }
        }
    }
    console.log("affichage effectué");
  }

  //Ajout du produit au panier

function addToCart(productId, color, amount) {
  console.log(productId, color, amount);
  //récupérer le panier
  //vérifier si le produit existe déjà avec l'id et la couleur identiques
  //si il existe, + les deux quantités (avant maintenant)
  //sinon, insérer le produit dans le panier
  //sauvegarder le panier dans le localStorage
}

let productChoice = document.getElementById("addToCart");
productChoice.addEventListener("click", () => {
  let colorChoice = document.getElementById("colors");
  let quantityChoice = document.querySelector('input[id="quantity"]');
  if (
   //valeurs dynamiques (non définies au départ, il faut cliquer et changer la valeur pour accéder à la logique)
    quantityChoice.value.quantity < 1 ||
    quantityChoice.value.quantity > 100 ||
    quantityChoice.value.quantity === undefined ||
    colorChoice.value.color === "" ||
    colorChoice.value.color === undefined
  ) {
    alert("Pour valider votre choix, veuillez renseigner une couleur et/ou une quantité valide");
  } else {
    Cart();
    console.log("clic effectué");
    document.getElementById("addToCart").textContent = "Et Hop!";
  }

  addToCart(productId,colorChoice.value, quantityChoice.value);
});



// let colorChoice = document.getElementById("colors");

//   colorChoice.addEventListener("input", (ec) => {

//   document.getElementById("addToCart").style.color = "white";
//   document.getElementById("addToCart").textContent = "Ajouter au panier";
//   console.log(productColor);
// });

// let quantityChoice = document.querySelector('input[id="quantity"]');
// // On écoute ce qu'il se passe dans input[name="itemQuantity"]
// quantityChoice.addEventListener("input", (eq) => {
//   //reset
//   document.getElementById("addToCart").style.color = "white";
//   document.getElementById("addToCart").textContent = "Ajouter au panier";
//   console.log(productQuantity);
// });


// // déclaration tableau qui sera le 1er, unique et destiné à initialiser le panier
// let clientProductChoice = [];
// let productSave = [];
// let temporaryProduct = [];
// let pushingProduct = [];

// function addFirstProduct() {
//   console.log(productSave);
//   //if productSave est null, existe pas/ pas créé
//   if (productSave === null) {
//     // push le produit choisit
//     clientProductChoice.push(productAddToCart);
//     console.log(productAddToCart);
//     return (localStorage.cartStock = JSON.stringify(clientProductChoice));
//   }
// }

// function addOtherProduct() {
//   // vide/initialise pushing... pour recevoir les nouvelles données
//   pushingProduct = [];
//   // push le produit choisit dans temporary
//   temporaryProduct.push(productAddToCart);
//   pushingProduct = productSave.concat(temporaryProduct);
//   //Triage avec technologie "sort"
//   pushingProduct.sort(function sorting(a, b) {
//     if (a._id < b._id) return -1;
//     if (a._id > b._id) return 1;
//     if (a._id = b._id){
//       if (a.color < b.color) return -1;
//       if (a.color > b.color) return 1;
//     }
//     return 0;
//   });
//   temporaryProduct = [];
//   return (localStorage.cartStock = JSON.stringify(pushingProduct));
// }

// function Cart() {
//   productSave = JSON.parse(localStorage.getItem("cartStock"));
//   if (productSave) {
//     for (let choice of productSave) {
//       //comparateur articles choisis et déjà ajoutés
//       if (choice._id === productId && choice.color === productAddToCart.color) {
//         alert("RAPPEL: Ce produit existe déjà dans votre panier");
//         let addQuantity = parseInt(choice.quantity) + parseInt(productQuantity);
//         choice.quantity = JSON.stringify(addQuantity);
//         // dernière commande, on renvoit un nouveau panierStocké dans le localStorage
//         return (localStorage.cartStock = JSON.stringify(productSave));
//       }
//     }
//     return addOtherProduct();
//   }
//   return addFirstProduct();
// }