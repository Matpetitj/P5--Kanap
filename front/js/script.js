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
    zoneArticle.innerHTML += `<a href="./product.html?_id=${product._id}">
    <article>
      <img src="${product.imageUrl}" alt="${product.altTxt}">
      <h3 class="productName">${product.name}</h3>
      <p class="productDescription">${product.description}</p>
    </article>
  </a>`;
  }
}