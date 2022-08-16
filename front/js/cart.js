// //Ici il faut créer une fonction pour afficher les produits dans le panier lorsqu'on les ajoute

let productLocalStorage = getCart();

if (productLocalStorage.length == 0) {

    const cartTitle = document.querySelector("h1");
    cartTitle.textContent = "Votre panier est vide !";

    const cartSection = document.querySelector(".cart");
    cartSection.style.display = "none";

} else {

    let totalPrice = 0;
    let totalQuantity = 0;

    for (const product of productLocalStorage) {

        const productId = product._id;
        const color = product.color;
        const amount = product.amount;

        //Ici on récupère les informations des produits dans l'api mais aussi les informations du produit dans le localStorage

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
            productPrice.textContent = sofa.price + " €";
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

            let deleteButton = document.getElementsByClassName('deleteItem');
            productDelete.addEventListener("click", () => {
                //To do code suppression du produit
                
            })

            totalPrice += sofa.price * amount;
            totalQuantity += amount;

            const finalQuantityElement = document.getElementById("totalQuantity");
            const finalPriceElement = document.getElementById("totalPrice");

            finalQuantityElement.textContent = totalQuantity;
            finalPriceElement.textContent = totalPrice;
            console.log("mise à jour des prix", totalPrice);
            
        });
    }
}

// function findTotalQuantityPrice() {
//     const productQuantity = document.getElementsByClassName('itemQuantity');
//     const productLength = productQuantity.length,
//     totalQuantity = 0;

//     for (const i = 0; i < productLength; ++i){
//         totalQuantity += productQuantity[i].value;
//     }

//     const itemTotalQuantity = document.getElementById("totalQuantity");
//     itemTotalQuantity.innerHTML = totalQuantity;

//     // totalPrice = 0;

//     // for (const i = 0; i < productLength; ++i) {
//     //     totalPrice += (productQuantity[i].value * productLocalStorage[i].price);
//     // }

//     // const productFinalPrice = document.getElementById("totalPrice");
//     // productFinalPrice.innerHTML = totalPrice;
// }
// findTotalQuantityPrice();


function totalProductAmount () {
    let modifyQuantity = document.getElementsByClassName('itemQuantity');

    for (const i = 0; i < modifyQuantity.length; i++) {
        modifyQuantity.addEventListener("change", (event) => {
            event.preventDefault();

            const newProductQuandtity = productLocalStorage[i].amount;
            const newProductQuandtityValue = modifyQuantity[i].value;

            const resultProductQuantity = productLocalStorage.find((el) => el.newProductQuandtityValue !== newProductQuandtity);

            resultProductQuantity.amount = newProductQuandtityValue;
            productLocalStorage[i].amount = resultProductQuantity.amount;

            localStorage.setItem("product", JSON.stringify(products));

            location.reload();
        })
    }
}
totalProductAmount();
// faire appel à getcart()

//Gestion du formulaire

function getForm() {
    let form = document.querySelector(".cart__order__form");

    const addressReg = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");
    const emailReg = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
    const charReg = new RegExp("^[a-zA-Z ,.'-]+$");

    const validFirstName = function(areaFirstName) {
        let firstNameErrorMsg = areaFirstName.nextElementSibling;

        if (charRegExp.test(areaFirstName.value)) {
            firstNameErrorMsg.textContent = '';
        } else {
            firstNameErrorMsg.textContent = 'Veuillez renseigner ce champ.';
        }
    };

    form.firstName.addEventListener('change', function() {
        validFirstName(this);
    });

    const validLastName = function(areaLastName) {
        let lastNameErrorMsg = areaLastName.nextElementSibling;

        if (charRegExp.test(areaLastName.value)) {
            lastNameErrorMsg.textContent = '';
        } else {
            lastNameErrorMsg.textContent = 'Veuillez renseigner ce champ.';
        }
    };

    form.lastName.addEventListener('change', function() {
        validLastName(this);
    });

    const validAddress = function(areaAddress) {
        let addressErrorMsg = areaAddress.nextElementSibling;

        if (addressRegExp.test(areaAddress.value)) {
            addressErrorMsg.textContent = '';
        } else {
            addressErrorMsg.textContent = 'Veuillez renseigner ce champ.';
        }
    };

    form.address.addEventListener('change', function() {
        validAddress(this);
    });

    const validCity = function(areaCity) {
        let cityErrorMsg = areaCity.nextElementSibling;

        if (charRegExp.test(areaCity.value)) {
            cityErrorMsg.textContent = '';
        } else {
            cityErrorMsg.textContent = 'Veuillez renseigner ce champ.';
        }
    };

    form.city.addEventListener('change', function() {
        validCity(this);
    });

    const validEmail = function(areaEmail) {
        let emailErrorMsg = areaEmail.nextElementSibling;

        if (emailRegExp.test(areaEmail.value)) {
            emailErrorMsg.textContent = '';
        } else {
            emailErrorMsg.textContent = 'Veuillez renseigner votre email.';
        }
    };

    form.email.addEventListener('change', function() {
        validEmail(this);
    });
}
getForm();