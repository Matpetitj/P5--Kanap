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
            productQuantityValue.textContent = "Qté :";
            productItemContentSettingsQuantity.appendChild(productQuantityValue);

            const productQuantity = document.createElement("input");
            productQuantity.value = amount;
            productQuantity.className = "itemQuantity";
            productQuantity.setAttribute("type", "number");
            productQuantity.setAttribute("min", "1");
            productQuantity.setAttribute("max", "100");
            productQuantity.setAttribute("name", "itemQuantity");
            productItemContentSettingsQuantity.appendChild(productQuantity);

            function modifyQuantity(){           
                productQuantity.addEventListener("change", (event) => {
                    let cart = getCart();
                    event.preventDefault();
                    for (let i = 0; i < cart.length; i++){
                        if(cart[i]._id === productId && cart[i].color === color){
                            cart[i].amount = parseInt(productQuantity.value);
                            console.log(productId, color, parseInt(productQuantity.value), cart[i]);
                            saveCart(cart);
                            refreshQuantityPrice();
                            // location.reload();
                        }
                    }
                });
            }
            modifyQuantity();

            const productItemContentSettingsDelete = document.createElement("div");
            productItemContentSettingsDelete.className = "cart__item__content__settings__delete";
            productItemContentSettings.appendChild(productItemContentSettingsDelete);

            const productDelete = document.createElement("p");
            productDelete.className = "deteleItem";
            productDelete.textContent = "Supprimer";
            productItemContentSettingsDelete.appendChild(productDelete);

            function itemDelete(){
                productDelete.addEventListener("click", () => {
                    let cart = getCart();
                    let index = -1;
                    for(let i = 0; i < cart.length; i++){
                        const product = cart[i];
                        if (product._id === productId && product.color === color){
                            index = i;
                        }
                    }
                    if (index !== -1){
                        cart.splice(index, 1);
                        saveCart(cart);
                        //modifier le DOM avec element.closest()
                        refreshQuantityPrice();
                        //recalculer quantité et prix totaux
                        //location.reload();
                    }
                });
            }
            itemDelete();

            function totalPriceAndQuandity() {

                totalPrice += sofa.price * amount;
                totalQuantity += amount;

                const finalQuantityElement = document.getElementById("totalQuantity");
                const finalPriceElement = document.getElementById("totalPrice");

                finalQuantityElement.textContent = totalQuantity;
                finalPriceElement.textContent = totalPrice;
                console.log("mise à jour des prix", totalPrice);
            }
            totalPriceAndQuandity();
        });
    }
}

function refreshQuantityPrice (){

    let cart = getCart();

    let refreshPrice = 0;
    let refreshQuantity = 0;

    for (const product of cart) {
        fetch("http://localhost:3000/api/products/"  + product._id)

            .then((res) => res.json())
            .then((sofa) => {
                console.log(sofa);

            refreshPrice += sofa.price * product.amount;
            refreshQuantity += product.amount;

            const refreshQuantityElement = document.getElementById("totalQuantity");
            const refreshPriceElement = document.getElementById("totalPrice");

            refreshQuantityElement.textContent = refreshQuantity;
            refreshPriceElement.textContent = refreshPrice;

            console.log("mise à jour des prix", refreshPrice);
        })
    }   
}

//créer une fonction refreshQuantityPrice
//refaire fetch+then(pour récupérer les prix de produits)
//avec un getCart();
//compter les produits
//nvx prix
//document.byId
//uptade du textContent

//GESTION DU FORMULAIRE
document.addEventListener("DOMContentLoaded", function() {
    let form = document.querySelector(".cart__order__form");

    const addressReg = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");
    const emailReg = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');
    const charReg = new RegExp("^[a-zA-Z ,.'-]+$");

    const validFirstName = function(areaFirstName) {
        let firstNameErrorMsg = areaFirstName.nextElementSibling;

        if (charReg.test(areaFirstName.value)) {
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

        if (charReg.test(areaLastName.value)) {
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

        if (addressReg.test(areaAddress.value)) {
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

        if (charReg.test(areaCity.value)) {
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

        if (emailReg.test(areaEmail.value)) {
            emailErrorMsg.textContent = '';
        } else {
            emailErrorMsg.textContent = 'Veuillez renseigner un email valide email.';
        }
    };

    form.email.addEventListener('change', function() {
        validEmail(this);
    });

    form.addEventListener("submit", (event) => {
        const cart = getCart();

        event.preventDefault();
    
        let inputName = document.getElementById('firstName');
        let inputLastName = document.getElementById('lastName');
        let inputAdress = document.getElementById('address');
        let inputCity = document.getElementById('city');
        let inputMail = document.getElementById('email');

        let productsId = [];
        for (let i = 0; i < cart.length ; i++) {
            productsId.push(cart[i]._id);
        }
        console.log(productsId);

        const order = {
            contact : {
                firstName: inputName.value,
                lastName: inputLastName.value,
                address: inputAdress.value,
                city: inputCity.value,
                email: inputMail.value,
            },
            products: productsId,
        } 

        const options = {
            method: 'POST',
            body: JSON.stringify(order),
            headers: {
                'Accept': 'application/json', 
                "Content-Type": "application/json" 
            },
        };

        fetch("http://localhost:3000/api/products/order", options)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            // localStorage.removeItem("product");
            localStorage.setItem("orderId", data.orderId);

            window.location.href = "confirmation.html"; //redirection vers la page confirmation
        })
        .catch((err) => {
            alert ("Problème avec fetch : " + err.message);
        });
        });
})