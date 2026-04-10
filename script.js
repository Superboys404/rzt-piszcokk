const menuData = [
  { name: "Piscok", price: 10000, img: "https://i.imgur.com/Nh2x0fZ.jpeg" },
  { name: "Matcha Latte", price: 7000, img: "https://i.imgur.com/3FKM86V.jpeg" },
  { name: "hot chocolate🤤", price: 8000, img: "https://i.imgur.com/7ugSnPj.jpeg" }
];

const menuContainer = document.getElementById("menu");
const cartList = document.getElementById("cart-list");
const totalPrice = document.getElementById("total-price");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderMenu() {
  menuData.forEach((item, index) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
      <img src="${item.img}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>Rp ${item.price}</p>
      <button onclick="addToCart(${index})">Tambah</button>
    `;

    menuContainer.appendChild(card);
  });
}

function addToCart(index) {
  cart.push(menuData[index]);
  saveCart();
  updateCart();
}

function removeItem(i) {
  cart.splice(i, 1);
  saveCart();
  updateCart();
}

function updateCart() {
  cartList.innerHTML = "";
  let total = 0;

  cart.forEach((item, i) => {
    total += item.price;

    const li = document.createElement("li");
    li.innerHTML = `${item.name} - Rp ${item.price} 
      <button onclick="removeItem(${i})">X</button>`;

    cartList.appendChild(li);
  });

  totalPrice.textContent = total;
}

function saveCart() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function checkout() {
  if (cart.length === 0) {
    alert("Keranjang lu masih kosong!");
    return;
  }

  let message = "Pesanan saya:%0A";
  let total = 0;

  cart.forEach(item => {
    message += `- ${item.name} (Rp ${item.price})%0A`;
    total += item.price;
  });

  message += `Total: Rp ${total}`;

  const phone = "62895327197215"; 
  window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
}

renderMenu();
updateCart();
