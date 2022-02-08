// *******************************************************
// DOM READY
// *******************************************************

$(() => {
    console.log("The DOM is ready");
});


// *******************************************************
// ANIMATIONS
// *******************************************************

$(`#navbarDropdownMenuLink`).click(function(){
    $(`.dropdown-menu`).slideToggle("fast");
})


// *******************************************************
// SHOPPING CART - WIP
// *******************************************************

let index1 = 0;

$(`.nav-cart`).ready(()=>{ //CREATES CART STRUCTURE
    $(`.shoppingCart`).append(
        `<div class="containerProducts">
            <h1>Shopping Cart:</h1>
            <h5 class="closeBtn btn">x</h5>
        </div>
        <div class="container d-flex justify-content-around row m-auto my-5">
            <div>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Units</th>
                            <th>Item</th>
                            <th>Price</th>
                            <th>Total</th>
                            <th>Remove</th>
                        </tr>
                    </thead>
                    <tbody id="containerCart">              
                    </tbody>
                </table>
            </div>
    </div>

    <button class="btn w-30" id="deleteCart" type="submit">Delete Cart</button>
    <button class="btn w-30" id="checkOut" type="submit">Checkout</button>
    <div id="popUp">
        <div class="entry">
            <h3>Congratulations!</h3>
            <p>Your purchase is on its way!</p>
            <p>Thank you for supporting us.</p>
        </div>
        <button class="btn" id="okBtn" type="submit" onclick="hidePopup();">Ok</button>
    </div>
    `
    );
})

function showPopup() {
    $("#popUp").before('<div id=grayBack></div>');
    $("#grayBack").css('opacity', 0).fadeTo(300, 0.5, function() {
        $("#popUp").fadeIn(500);
    });
}

function hidePopup() {
    $("#grayBack").fadeOut('fast', function() {
        $(this).remove()
    });
    $("#popUp").fadeOut('fast', function() {
        $(this).hide()
    });
}

$(`.nav-cart`).click(()=>{ //TOGGLES SHOPPING CART
    $(`.shoppingCart`).slideDown(function(){
        $(`.closeBtn`).click(()=>{
            $(`.shoppingCart`).slideUp();
        });
    })
    $(`#deleteCart`).click(()=>{
        $(`#containerCart`).empty();
        shoppingCart.length = 0;
    })

    $(`#checkOut`).click(()=>{
        showPopup();
        console.log("checkout!");
    })
})
