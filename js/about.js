const price = document.getElementById("about-price");
let placeholder = document.querySelector(".about");
let aboutData = "";
let prodcts;

async function getDescriptions() {
    try {
        const results = await fetch('./data/descriptions.json');
        const data = await results.json();
        console.log(data);
        return data;
    } catch (err) {
        console.log(err);
    }
}

async function showAbout(id) {
    console.log("Fetching product data...");
    prodcts = await getProducts();
    let product = prodcts[id];
    let descriptions = await getDescriptions();
    let description = descriptions[String(id)];
    console.log("Fetching product description...");
    aboutData += `
    <div class="product-container">
        <div class="product-image">
            <img id="about_image" src="${product.url}" alt="Product Image">
        </div>
        <div class="product-details">
            <div class="product-title">${product.title}</div>
            <div class="product-description">
                <p>${String(description)}</p>
            </div>
            <div class="about-bottom">
                <div id="about-price" class="product-price">Price: $${product.price}</div>
                <a class="btn cart-btn  checkout-btn" onclick="addToCart(${product.id})">Add to cart</a>
            </div>
        </div>
    </div>
    `;

    placeholder.innerHTML = aboutData;
}

let search = location.search.substring(1);
id = Number(
    JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}', function (key, value) {
        return key === "" ? value : decodeURIComponent(value);
    }).id
);
showAbout(id);
