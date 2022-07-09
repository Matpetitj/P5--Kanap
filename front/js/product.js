//Il faut récupérer l'ID dans l'URL avec "params"

const paramsUrl = new URLSearchParams(document.location.search);
const productId = paramsUrl.get("_id");

console.log(productId);

//Prendre les produits dans l'API

fetch("http://localhost:3000/api/products")

.then((res) => res.json())
  // on nomme ce que l'on recoit "receiveobject"
  .then((listSofa) => {
    // info en console
    console.table(listSofa);
    // call function
    pageProducts(listSofa);
  })

  let productAddToCart = {};

  productAddToCart._id = productId;

  //Ajout des informations des produits

  function pageProducts(products) {
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

            productAddToCart.productPrice = choice.price;

            for (const colors of choice.colors) {
                productColor.innerHTML += `<option value="${colors}">${colors}</option>`;
            }
        }
    }
    console.log("affichage effectué");
  }

  //Ajout du produit au panier

let colorChoice = document.getElementById("colors");

  colorChoice.addEventListener("input", (ec) => {
  let productColor;
  
  couleurProduit = ec.target.value;

  productAddToCart.color = productColor;

  document.getElementById("addToCart").style.color = "white";
  document.getElementById("addToCart").textContent = "Ajouter au panier";
  console.log(productColor);
});

let quantityChoice = document.querySelector('input[id="quantity"]');
let quantityProduct;
// On écoute ce qu'il se passe dans input[name="itemQuantity"]
quantityChoice.addEventListener("input", (eq) => {
  // on récupère la valeur de la cible de l'évenement dans couleur
  quantityProduct = eq.target.value;
  // on ajoute la quantité à l'objet panierClient
  productAddToCart.quantity = quantityProduct;
  //ça reset la couleur et le texte du bouton si il y a une action sur les inputs dans le cas d'une autre commande du même produit
  document.getElementById("addToCart").style.color = "white";
  document.getElementById("addToCart").textContent = "Ajouter au panier";
  console.log(quantityProduct);
});
//------------------------------------------------------------------------
// conditions de validation du clic via le bouton ajouter au panier
//------------------------------------------------------------------------
// déclaration variable
let productChoice = document.getElementById("addToCart");
// On écoute ce qu'il se passe sur le bouton #addToCart pour faire l'action :
productChoice.addEventListener("click", () => {
  //conditions de validation du bouton ajouter au panier
  if (
    // les valeurs sont créées dynamiquement au click, et à l'arrivée sur la page, tant qu'il n'y a pas d'action sur la couleur et/ou la quantité, c'est 2 valeurs sont undefined.
    productAddToCart.quantity < 1 ||
    productAddToCart.quantity > 100 ||
    productAddToCart.quantity === undefined ||
    productAddToCart.color === "" ||
    productAddToCart.color === undefined
  ) {
    // joue l'alerte
    alert("Pour valider votre choix, veuillez renseigner une couleur et une quantité valide");
    // si ça passe le controle
  } else {
    // joue panier
    Panier();
    console.log("clic effectué");
    //effet visuel d'ajout de produit
    document.getElementById("addToCart").style.color = "rgb(0, 205, 0)";
    document.getElementById("addToCart").textContent = "Produit ajouté !";
  }
});
//------------------------------------------------------------------------
// Déclaration de tableaux utiles (voir mutation)
//------------------------------------------------------------------------
// déclaration tableau qui sera le 1er, unique et destiné à initialiser le panier
let clientProductChoice = [];
// déclaration tableau qui sera ce qu'on récupère du local storage appelé panierStocké et qu'on convertira en JSon (importance dans Panier())
let productSave = [];
// déclaration tableau qui sera un choix d'article/couleur non effectué donc non présent dans le panierStocké
let temporaryProduct = [];
// déclaration tableau qui sera la concaténation des produitsEnregistrés et de produitsTemporaires
let pushingProduct = [];
//-------------------------------------------------------------------------
// fonction ajoutPremierProduit qui ajoute l'article choisi dans le tableau vierge
//-------------------------------------------------------------------------
function addFirstProduct() {
  console.log(productSave);
  //si produitsEnregistrés est null c'est qu'il n'a pas été créé
  if (productSave === null) {
    // pousse le produit choisit dans choixProduitClient
    clientProductChoice.push(productAddToCart);
    console.log(productAddToCart);
    // dernière commande, envoit choixProduitClient dans le local storage sous le nom de panierStocké de manière JSON stringifié
    return (localStorage.cartStock = JSON.stringify(clientProductChoice));
  }
}
//-------------------------------------------------------------------------
// fonction ajoutAutreProduit qui ajoute l'article dans le tableau non vierge et fait un tri
//------------------------------------------------------------------------- 
function addOtherProduct() {
  // vide/initialise produitsAPousser pour recevoir les nouvelles données
  pushingProduct = [];
  // pousse le produit choisit dans produitsTemporaires
  temporaryProduct.push(productAddToCart);
  // combine produitsTemporaires et/dans produitsEnregistrés, ça s'appele produitsAPousser
  // autre manière de faire: produitsAPousser = produitsEnregistrés.concat(produitsTemporaires);
  pushingProduct = [...productSave, ...temporaryProduct];
  //fonction pour trier et classer les id puis les couleurs https://www.azur-web.com/astuces/javascript-trier-tableau-objet
  pushingProduct.sort(function sorting(a, b) {
    if (a._id < b._id) return -1;
    if (a._id > b._id) return 1;
    if (a._id = b._id){
      if (a.color < b.color) return -1;
      if (a.color > b.color) return 1;
    }
    return 0;
  });
  // vide/initialise produitsTemporaires maintenant qu'il a été utilisé
  temporaryProduct = [];
  // dernière commande, envoit produitsAPousser dans le local storage sous le nom de panierStocké de manière JSON stringifié
  return (localStorage.cartStock = JSON.stringify(pushingProduct));
}
//--------------------------------------------------------------------
// fonction Panier qui ajuste la quantité si le produit est déja dans le tableau, sinon le rajoute si tableau il y a, ou créait le tableau avec un premier article choisi 
//--------------------------------------------------------------------
function Cart() {
  // variable qui sera ce qu'on récupère du local storage appelé panierStocké et qu'on a convertit en JSon
  productSave = JSON.parse(localStorage.getItem("cartStock"));
  // si produitEnregistrés existe (si des articles ont déja été choisis et enregistrés par le client)
  if (productSave) {
    for (let choice of productSave) {
      //comparateur d'égalité des articles actuellement choisis et ceux déja choisis
      if (choice._id === id && choice.color === productAddToCart.color) {
        //information client
        alert("RAPPEL: Vous aviez déja choisit cet article.");
        // on modifie la quantité d'un produit existant dans le panier du localstorage
        //définition de additionQuantité qui est la valeur de l'addition de l'ancienne quantité parsée et de la nouvelle parsée pour le même produit
        let addQuantity = parseInt(choice.quantity) + parseInt(productQuantity);
        // on convertit en JSON le résultat précédent dans la zone voulue
        choice.quantity = JSON.stringify(addQuantity);
        // dernière commande, on renvoit un nouveau panierStocké dans le localStorage
        return (localStorage.cartStock = JSON.stringify(productSave));
      }
    }
    // appel fonction ajoutAutreProduit si la boucle au dessus ne retourne rien donc n'a pas d'égalité
    return addOtherProduct();
  }
  // appel fonction ajoutPremierProduit si produitsEnregistrés n'existe pas
  return addFirstProduct();
}