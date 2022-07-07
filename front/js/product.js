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