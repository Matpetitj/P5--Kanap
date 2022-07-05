//Récupération des produits de l'API//

fetch("http://localhost:3000/api/products")

.then((res) => res.json())
  // on nomme ce que l'on recoit "receiveobject"
  .then((receiveobject) => {
    // info en console
    console.table(receiveobject);
    // call function
    produits(receiveobject);
  })
  // Si erreur, renvoie d'un texte erreur 404.
  .catch((err) => {
    document.querySelector(".titles").innerHTML = "<h1>erreur 404</h1>";
    console.log("erreur 404, sur ressource api:" + err);
  });

// Affichage de l'API sur l'index

function produits(index) {
  // lié une variable à la classe pour se placer
  let zoneArticle = document.querySelector("#items");
  // boucle avec indice "article"
  for (let article of index) {
    zoneArticle.innerHTML += `<a href="./product.html?_id=${article._id}">
    <article>
      <img src="${article.imageUrl}" alt="${article.altTxt}">
      <h3 class="productName">${article.name}</h3>
      <p class="productDescription">${article.description}</p>
    </article>
  </a>`;
  }
}