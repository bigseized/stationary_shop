let placeholder = document.getElementById("data");
let toPrint = ""

async function updateCart() {
    let products = await getProducts();
    let totalCost = 0;
    toPrint = ''
    for (var i = 0; i < products.length; i++) {
        if (sessionStorage.getItem(i) === null) {
            continue;
        }
        let product = JSON.parse(sessionStorage.getItem(i));
        totalCost += product.quantity * product.price;

        toPrint += `
    <div class="cart-item">
        <div class="cart-product">
            <div class="top d-flex">
                <div class="cart-product-image-container">
                    <img src=${product.url} alt="" class="cart-product-image" />
                </div>
            </div>
            <div class="cost-title">    
                <div class="bottom">
                    <div class="d-flex">
                        <h2 class="cart-product-title">${product.title}</h2>
                    </div>
                    <div class="d-flex">
                        <div class="cart-product-price">Price: $${product.price}</div>
                    </div>
                </div>
                <div class="bottom-container">
                    <div class="quantity-container">
                                <button class="quantity-btn" onclick="decreaseQuantity(${product.id})">-</button>
                                <span class="quantity">${product.quantity}</span>
                                <button class="quantity-btn" onclick="increaseQuantity(${product.id})">+</button>
                            </div>
                    <div class="sub-cost">
                        <h3>Subcost:</h3>
                        <span class="sub-price"> $${product.quantity * product.price}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `
    }
    if (totalCost !== 0){
        toPrint += `
    <div class="total-cost">
        <div class="total-cost-price">
            <h3>Total cost:</h3>
            <span class="price-total">$${totalCost}</span>
         </div>
         <div class="checkout-btn">
            <a onclick="checkout()">Checkout</a>
         </div>
    </div>
    `
    }else{
        toPrint += `<div class="empty-cart">
    <h4 style="text-align: center; margin-bottom: 20px; font-size: 20px; font-weight: bolder">Your cart is empty!</h4>
    <a href="shop.html" class="btn-empty-cart">Start Shopping!</a>
    </div>  
    `
    }

    updateCounter()
    placeholder.innerHTML = toPrint;
}

function checkout() {
    for (var i = 0; i < products.length; i++) {
        if (sessionStorage.getItem(i) === null) {
            continue;
        }
        sessionStorage.removeItem(i);
    }
    updateCart();
}

function increaseQuantity(id) {
    let temp = JSON.parse(sessionStorage.getItem(String(id)));
    temp.quantity++;
    sessionStorage.setItem(String(id), JSON.stringify(temp));
    updateCart();
}

function decreaseQuantity(id) {
    let temp = JSON.parse(sessionStorage.getItem(String(id)));
    if (temp.quantity === 1){
        sessionStorage.removeItem(String(id));
        updateCart();
        return;
    }
    temp.quantity--;
    sessionStorage.setItem(String(id), JSON.stringify(temp));
    updateCart();
}
updateCart();

