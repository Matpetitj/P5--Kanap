//Il faut récupérer l'ID dans l'URL avec "params"

const paramsUrl = new URLSearchParams(document.location.search);
const productId = paramsUrl.get("_id");

console.log(productId);

//Prendre les produits dans l'API

fetch("http://localhost:3000/api/products/" + productId)

.then((res) => res.json())
  .then((sofa) => {
    console.log(sofa);
    insertProductIntoPage(sofa);
  })

  //Ajout des informations des produits

  function insertProductIntoPage(product) {
    const zoneImage = document.querySelector("article div.item__img");
    const productTitle = document.getElementById("title");
    const productPrice = document.getElementById("price");
    const productDescription = document.getElementById("description");
    const productColor = document.getElementById("colors");

    // for (const choice of products) {
        
        const createProductImage = document.createElement('img');
        zoneImage.appendChild(createProductImage);

        // if (productId == choice._id) {

            createProductImage.setAttribute('src', product.imageUrl);
            createProductImage.setAttribute('alt', product.altTxt);    

            productTitle.textContent = product.name;

            productPrice.textContent = product.price;

            productDescription.textContent = product.description;

            for (const colors of product.colors) {
                productColor.innerHTML += `<option value="${colors}">${colors}</option>`; //utilisation littéraux de gabarits
            }
        // }
    // }
    console.log("affichage effectué");
  }

  //Ajout du produit au panier

function addToCart(productId, color, amount) {
  console.log(productId, color, amount);
  //récupérer le panier
  const cart = getCart();
  let productFound = false;
  let productIndex = 0;
  //vérifier si le produit existe déjà avec l'id et la couleur identiques
  for (let i = 0; i < cart.lenght; i ++) {
    const product = cart[i];
    if (product._id == productId && product.color == color) {
      productFound = true;
      productIndex = i;
    }
  }
  //si il existe, + les deux quantités (avant maintenant)
  if (productFound == true) {
    cart[productIndex].amount += amount;
  //sinon, insérer le produit dans le panier
  } else { 
    let newProduct = {
      _id: productId,
      color: color,
      amount: amount,
    }
    cart.push(newProduct);
    console.log(newProduct);
    console.log("clic effectué");
    document.getElementById("addToCart").textContent = "Et Hop!";
  }
  saveCart(cart);
}



let productChoice = document.getElementById("addToCart");
      productChoice.addEventListener("click", () => {
    let colorChoice = document.getElementById("colors");
    let quantityChoice = document.getElementById("quantity");
    if (
    //valeurs dynamiques (non définies au départ, il faut cliquer et changer la valeur pour accéder à la logique)
      quantityChoice.value < 1 || 
      quantityChoice.value > 100 ||
      quantityChoice.value === undefined && 
      colorChoice.value === "" || 
      colorChoice.value === undefined
    ) {
      alert("Pour valider votre choix, veuillez renseigner une couleur et/ou une quantité valide");
    } else {
      addToCart(productId, colorChoice.value, quantityChoice.value);
      console.log("clic effectué");
      document.getElementById("addToCart").textContent = "Et Hop!";
    }
});