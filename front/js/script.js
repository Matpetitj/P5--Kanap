//Récupération des produits de l'API//

fetch("http://localhost:3000/api/products")

.then((res) => res.json())
  // on nomme ce que l'on recoit "receiveobject"
  .then((listSofa) => {
    // info en console
    console.table(listSofa);
    // call function
    displayProducts(listSofa);
  })
  // Si erreur, renvoie d'un texte erreur 404.
  .catch((err) => {
    document.querySelector(".titles").innerHTML = "<h1>erreur 404</h1>";
    console.log("erreur 404, sur ressource api:" + err);
  });

// Affichage de l'API sur l'index

function displayProducts(productsCollection) {
  // lié une variable à la classe pour se placer
  const zoneArticle = document.getElementById("items");
  // boucle avec indice "article"
  for (const product of productsCollection) {

    const productLink = document.createElement('a');
    productLink.setAttribute('href',"./product.html?_id=" + product._id);
    zoneArticle.appendChild(productLink);
    
    const article = document.createElement('article');
    productLink.appendChild(article);

    const imageProduct = document.createElement('img');
    imageProduct.setAttribute('src', product.imageUrl);
    imageProduct.setAttribute('alt', product.altTxt);
    article.appendChild(imageProduct);

    const h3ProductName = document.createElement('h3');
    h3ProductName.setAttribute('class',product.Name);
    article.appendChild(h3ProductName);
    h3ProductName.textContent = product.name;

    const productDescription = document.createElement('p');
    productDescription.setAttribute('class',product.Description);
    article.appendChild(productDescription);
    productDescription.textContent = product.description;
  }
}