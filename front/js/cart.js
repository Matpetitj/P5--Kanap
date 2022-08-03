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

let productLocalStorage = getCart();

if (productLocalStorage.length == 0) {

    const cartTitle = document.querySelector("h1");
    cartTitle.textContent = "Votre panier est vide !";

    const cartSection = document.querySelector(".cart");
    cartSection.style.display = "none";

} else {

    for (const product of productLocalStorage) {

        const productId = product._id;
        const color = product.color;
        const amount = product.amount;

        fetch("http://localhost:3000/api/products/" + productId)

        .then((res) => res.json())
        .then((sofa) => {
            console.log(sofa);
            const zoneCart = document.getElementById("cart__items");

            const productArticle = document.createElement("article")
            productArticle.className = "cart__item";
            productArticle.setAttribute("data-id", productId);
            productArticle.setAttribute("data-color", color);
            zoneCart.appendChild(productArticle);

            const productImgDiv = document.createElement("div");
            productImgDiv.className = "cart__item__img";
            productArticle.appendChild(productImgDiv);
            
            const productImg = document.createElement("img");
            productImg.setAttribute('src', sofa.imageUrl);
            productImg.setAttribute('alt', sofa.altTxt);
            productImgDiv.appendChild(productImg);

            const productItemContent = document.createElement("div");
            productItemContent.className = "cart__item__content";
            productArticle.appendChild(productItemContent);

            const productItemContentDescription = document.createElement("div");
            productItemContentDescription.className = "cart__item__content__description";
            productItemContent.appendChild(productItemContentDescription);

            const productTitle = document.createElement("h2");
            productTitle.textContent = sofa.name;
            productItemContentDescription.appendChild(productTitle);

            const productColor = document.createElement("p");
            productColor.textContent = color;
            productItemContentDescription.appendChild(productColor);

            const productPrice = document.createElement("p");
            productPrice.textContent = sofa.price;
            productItemContentDescription.appendChild(productPrice);

            const productItemContentSettings = document.createElement("div");
            productItemContentSettings.className = "cart__item__content__settings";
            productItemContent.appendChild(productItemContentSettings);

            const productItemContentSettingsQuantity = document.createElement("div");
            productItemContentSettingsQuantity.className = "cart__item__content__settings__quantity";
            productItemContentSettings.appendChild(productItemContentSettingsQuantity);

            const productQuantityValue = document.createElement("p");
            productQuantityValue.textContent = amount;
            productItemContentSettingsQuantity.appendChild(productQuantityValue);

            const productQuantity = document.createElement("input");
            productQuantity.value = amount;
            productQuantity.className = "itemQuantity";
            productQuantity.setAttribute("type", "number");
            productQuantity.setAttribute("min", "1");
            productQuantity.setAttribute("max", "100");
            productQuantity.setAttribute("name", "itemQuantity");
            productItemContentSettingsQuantity.appendChild(productQuantity);

            const productItemContentSettingsDelete = document.createElement("div");
            productItemContentSettingsDelete.className = "cart__item__content__settings__delete";
            productItemContentSettings.appendChild(productItemContentSettingsDelete);

            const productDelete = document.createElement("p");
            productDelete.className = "deteleItem";
            productDelete.textContent = "Supprimer";
            productItemContentSettingsDelete.appendChild(productDelete);
            productDelete.addEventListener("click", (e) => {
                e.preventDefault;

                let deleteId = productId;
                let deleteColor = color;

                productLocalStorage = productLocalStorage.filter(element => element.productId !== deleteId || element.color !== deleteColor);

                localStorage.setItem('product', JSON.stringify(productLocalStorage));

                if (productLocalStorage.length === 0) {
                    localStorage.clear(); //pas de else nécessaire
                }

                //un refresh de la page nécessaire?
            });
        })
    }
}