const menuData = [

  { name: "Pisang Berendam", price: 8000, img: "https://i.imgur.com/dm3UsN2.jpeg" },
  { name: "Matcha Latte", price: 7000, img: "https://i.imgur.com/3FKM86V.jpeg" },
  { name: "choco drink", price: 8000, img: "https://i.imgur.com/VVin49p.png" }
];

const menuContainer = document.getElementById("menu");
const cartList = document.getElementById("cart-list");
const totalPrice = document.getElementById("total-price");

let cart = JSON.parse(localStorage.getItem("cart")) || {};

function renderMenu() {
  menuData.forEach((item, index) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${item.img}">
      <div class="card-content">
        <h3>${item.name}</h3>
        <p>Rp ${item.price}</p>
        <button onclick="addToCart(${index})">Tambah</button>
      </div>
    `;

    menuContainer.appendChild(card);
  });
}

function addToCart(index) {
  const item = menuData[index];

  if (cart[item.name]) {
    cart[item.name].qty++;
  } else {
    cart[item.name] = {
      price: item.price,
      qty: 1
    };
  }

  saveCart();
  updateCart();
}

function removeItem(name) {
  delete cart[name];
  saveCart();
  updateCart();
}

function updateCart() {
  cartList.innerHTML = "";
  let total = 0;

  for (let name in cart) {
    const item = cart[name];
    const subtotal = item.price * item.qty;

    const li = document.createElement("li");
    li.innerHTML = `
      ${name} (${item.qty} pcs) - Rp ${subtotal}
      <button onclick="removeItem('${name}')">X</button>
    `;

    cartList.appendChild(li);

    total += subtotal;
  }

  totalPrice.textContent = total;
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function checkout() {
  const keys = Object.keys(cart);

  if (keys.length === 0) {
    alert("Keranjang lu masih kosong!");
    return;
  }

  let message = "Halo, saya mau pesan:%0A";
  let total = 0;

  for (let name in cart) {
    const item = cart[name];
    const subtotal = item.price * item.qty;

    message += `- ${name} (${item.qty} pcs) - Rp ${subtotal}%0A`;
    total += subtotal;
  }

  message += `Total: Rp ${total}`;

  const phone = "+6283162695997";
  window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
}

renderMenu();
updateCart();
