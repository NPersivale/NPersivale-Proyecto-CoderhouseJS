// *******************************************************
// CLASSES
// *******************************************************

class shoppingCartProd {
    constructor(name, price, prodType, game, color){
        this.name = name;
        this.price = price;
        this.prodType = prodType;
        this.game = game;
        this.color = color;
    }
}



// *******************************************************
// HTML POPULATE VIA JSON FILE
// *******************************************************

let URLproducts = "../data/products.json";

$("#storeFeed").ready(() => { 
    $.getJSON(URLproducts, function (answer, status) {
        if(status === "success"){
            $(`#storeFeed`).on('trigger', createProduct(answer)); // CREATES THE HTML
            let storeBtn = document.getElementsByClassName("storeBtn"); // ADDS FUNCTIONALITY TO THE BUTTONS
            for (let  index = 0 ; index < answer.length; index++) {
                $(storeBtn[index]).on('click', addToCart);
            }        
        }
        })
})



// *******************************************************
// EVENT LISTENERS
// *******************************************************

const shoppingCart = [];

console.log(shoppingCart); //TESTING PURPOSES ONLY

$(`#saveBtn`).on('click', saveCart);
$(`#recoverBtn`).on('click', recoverCart);
$(`#clearBtn`).on('click', resetStorage);


// *******************************************************
// FUNCTIONS
// *******************************************************

const saveLocally = (key, value) => { localStorage.setItem(key, value) };

function saveCart(){ //STORES CART IN LOCALSTORAGE
    saveLocally("shoppingCartLocal", JSON.stringify(shoppingCart));
}

function resetStorage(){ //CLEARS LOCALSTORAGE
    localStorage.clear();
}

function recoverCart(){ //RETRIEVES CART FROM LOCALSTORAGE
    const storedProducts = JSON.parse(localStorage.getItem("shoppingCartLocal"));
    const recoveredProducts = [];
    for (const product of storedProducts){
        recoveredProducts.push(new shoppingCartProd(product.name, product.price, product.prodType, product.game, product.color));
    }
    console.log(recoveredProducts); //TESTING PURPOSES ONLY
}

function createProduct(products) {
    for(product of products){
        $("#storeFeed").append(`
        <div class="entry col-lg-5 col-sm-12">
            <div class="storeItem">
                <h2 class="prodH2" >${product.name}</h2>
                <img class="store__img" src=\"${product.image}">
                <h3 class="prodPrice" >Price: $${product.price}</h3>
                <input class="prodType" value="${product.prodType}" type="hidden">
                <input class="prodGame" value="${product.game}" type="hidden">
                <input class="prodColor" value="${product.color}" type="hidden">
                <input class="btn storeBtn" id="${product.id}" type="submit" value="Add to Cart">
                <h3 style="display: none" id="${product.id}prodAdded">Agregado!</h3>
            </div>
        </div>
        `);
    }
}

$("#storeFilters").append(`
    <h2>Store Filters</h2>
    <div class="flex-row storeSubFilters">
        <h3>Filter by game:</h3>
        <ul>
            <li><input type="checkbox" class="checkboxFilter filterByGame" name="EFTGame" value="EFT"><label for="EFTGame">EFT</label></li>
            <li><input type="checkbox" class="checkboxFilter filterByGame" name="SCGame" value="Star Citizen"><label for="SCGame">Star Citizen</label></li>
            <li><input type="checkbox" class="checkboxFilter filterByGame" name="IRGame" value="iRacing"><label for="IRGame">iRacing</label></li>
        </ul>
    </div>
    <div class="flex-row storeSubFilters">
        <h3>Filter by Color:</h3>
        <ul>
            <li><input type="checkbox" class="checkboxFilter filterByColor" name="blackColor" value="Black"><label for="blackColor">Black</label></li>
            <li><input type="checkbox" class="checkboxFilter filterByColor" name="grayColor" value="Gray"><label for="grayColor">Gray</label></li>
            <li><input type="checkbox" class="checkboxFilter filterByColor" name="whiteColor" value="White"><label for="whiteColor">White</label></li>
            <li><input type="checkbox" class="checkboxFilter filterByColor" name="clearColor" value="Clear"><label for="clearColor">Clear</label></li>
        </ul>
    </div>
    <div class="flex-row storeSubFilters">
        <h3>Filter by Product Type:</h3>
        <ul>
            <li><input type="checkbox" class="checkboxFilter filterByProdType" name="typeDrinkware" value="Drinkware"><label for="typeDrinkware">Drinkware</label></li>
            <li><input type="checkbox" class="checkboxFilter filterByProdType" name="typeApparel" value="Apparel"><label for="typeApparel">Apparel</label></li>
            <li><input type="checkbox" class="checkboxFilter filterByProdType" name="typeLuggage" value="Luggage"><label for="typeLuggage">Luggage</label></li>
        </ul>
    </div>
`);

// *******************************************************
// WIP
// *******************************************************

$(`.checkboxFilter`).change( 
    function(event){
        $(`#storeFeed`). empty();
        const checkedBox = [];
        $.each($("input:checkbox:checked"), function (){
            checkedBox.push($(this).val());
        })
        $.getJSON(URLproducts, function (answer, status) {
            if(status === "success"){
                for(filter of checkedBox){
                    filtered = answer.filter(product => product.game === filter || product.color === filter || product.prodType === filter);
                    createProduct(filtered);
                }
            };
            if(checkedBox.length == 0){
                $.getJSON(URLproducts, function (answer, status) {
                    if(status === "success"){
                        createProduct(answer);
                    }
                })
            }
        })
    })


function addToCart(event){
    let targetId = event.target.id;
    let addItem = document.getElementsByClassName("storeBtn")[targetId].parentElement.querySelectorAll(".prodPrice, .prodH2, .prodType, .prodGame, .prodColor, .prodAdded");
    shoppingCart.push(new shoppingCartProd(addItem[0].innerHTML, addItem[1].innerHTML.replace(/[^0-9]/g,''), addItem[2].value, addItem[3].value, addItem[4].value));
    console.log(shoppingCart); //TESTING PURPOSES ONLY
    $("#"+ targetId + "prodAdded").fadeIn().fadeOut(1000);
}