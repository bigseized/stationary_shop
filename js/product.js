/* ========== Fetch the Products =========== */
const getProducts = async () => {
  try {
    const results = await fetch('./data/products.json');
    const data = await results.json();
    products = data.products;
    return products;
  } catch (err) {
    console.log(err);
  }
};

let products;
/* ========== Filter Products =========== */
const filters = [...document.querySelectorAll('.filters div')];

filters.forEach((filter) => {
  filters[0].classList.add('active');
  filter.addEventListener('click', async (e) => {
    const id = e.target.getAttribute('data-filter');
    const target = e.target;
    const products = await getProducts();
    filters.forEach((btn) => {
      btn.classList.remove('active');
    });
    target.classList.add('active');

    let menuCategory = products.filter((product) => {
      if (product.category === id || id === "All Products") {
        return product;
      }
    });

    displayProductItems(menuCategory);
    swiper.update();
  });
});

/* ========== Categories Products =========== */

const categoriesProducts = document.querySelector('.categories .products');
const loadmore = document.querySelector('.loadmore');
const counter = document.getElementById("number_of_products");
let currentIndex = 0;
function addToCart(id) {
  let product;
  if (sessionStorage.getItem(String(id)) === null) {
    product = {id: id, title: products[id].title, price: products[id].price, url: products[id].url, quantity: 1}
    sessionStorage.setItem(String(id), JSON.stringify(product))
  } else {
    product = JSON.parse(sessionStorage.getItem(String(id)))
    product.quantity++
    sessionStorage.setItem(String(id), JSON.stringify(product))
  }
  updateCounter()
}

function updateCounter() {
  let total = 0;
  for (let i = 0; i < sessionStorage.length; i++) {
    let key = sessionStorage.key(i);

    let product = JSON.parse(sessionStorage.getItem(key));
    total += product.quantity;
  }
  counter.textContent = String(total);
}

async function loadData(cnt) {
  if (cnt === 3) {
    return;
  }
  let products = await getProducts();
  if (currentIndex >= products.length) {
    loadmore.disabled = true;
    loadmore.innerText = 'No More Products';
    return;
  }

  let filterType = 'All Products'
  for (let i = 0; i < filters.length; i++) {
    if (filters[i].classList.contains('active')) {
      filterType = filters[i].getAttribute('data-filter')
    }
  }

  out = ''
  for (var i = 0; i < products.length; i++) {
    const product = products[i];
    if (product.category !== filterType && filterType !== 'All Products') {
      continue;
    }

    out += `
    <div class="product">
          <div class="top d-flex">
            <img src=${product.url} alt="" />
            <div class="icon d-flex">
              <i class="bx bxs-heart"></i>
            </div>
          </div>
          <div class="bottom">
            <div class="d-flex">
              <h4 style="margin: auto">${product.title}</h4>
              <div class="button-container">
              <a class="btn cart-btn" onclick="addToCart(${product.id})">Add to cart</a>
              <a href="about.html?id=${product.id}" onclick="showAbout(${product.id})" class="btn cart-btn">About</a>
              </div>
            </div>
            <div class="d-flex">
              <div class="price">$${product.price}</div>
              <div class="rating">
                <i class="bx bxs-star"></i>
                <i class="bx bxs-star"></i>
                <i class="bx bxs-star"></i>
                <i class="bx bxs-star"></i>
                <i class="bx bxs-star"></i>
              </div>
            </div>
          </div>
        </div>
    `
  }

  categoriesProducts.innerHTML = out;
  await loadData(cnt + 1);
}

updateCounter();
loadData(2);
