// Sample product data
const products = [
  { name: "Air Jordan 1", price: 450 },
  { name: "Yeezy 350", price: 300 },
  { name: "Adidas x BAPE", price: 190 },
];

// Array to store cart items
const cart = [];

// Array to store product names
const productNames = ["Air Jordan 1", "Yeezy 350", "Adidas x BAPE"];

// Function to handle selecting a size
function selectSize(cardIndex, selectedSize) {
  const sizeButtons = document.querySelectorAll(
    `#card${cardIndex} .size-button`
  );
  sizeButtons.forEach((button) => {
    button.classList.remove("selected");
  });

  const selectedButton = document.querySelector(
    `#card${cardIndex} .size-button[data-size="${selectedSize}"]`
  );
  selectedButton.classList.add("selected");
}

// Function to handle adding items to the shopping cart
function addToCart(cardIndex) {
  const selectedSize = document.querySelector(
    `#card${cardIndex} .size-button.selected`
  );
  const quantityInput = document.querySelector(
    `#card${cardIndex} .quantity-input`
  );
  const quantity = parseInt(quantityInput.value);

  if (selectedSize && !isNaN(quantity) && quantity > 0) {
    const size = parseInt(selectedSize.getAttribute("data-size"));
    // Add the selected product to the cart
    cart.push({ productId: cardIndex, size: size, quantity: quantity });
    updateCartDisplay();
  }
}

// Function to update displayed shopping cart contents and total cost
function updateCartDisplay() {
  const cartContents = document.getElementById("cartContents");
  const totalCost = document.getElementById("totalCost");

  cartContents.innerHTML = ""; // Clear the cart contents
  let cartTotal = 0;

  for (let i = 0; i < cart.length; i++) {
    const productIndex = cart[i].productId - 1; // Subtract 1 to match array index
    const productName = productNames[productIndex]; // Get the product name from the array

    const cartItem = document.createElement("div");
    cartItem.innerHTML = `<p>${productName} - Size: ${cart[i].size}, Quantity: ${cart[i].quantity}</p>`;
    cartContents.appendChild(cartItem);

    cartTotal += cart[i].quantity * products[productIndex].price;
  }

  totalCost.textContent = `Total Cost: $${cartTotal}`;
}

// Function to clear the shopping cart
function clearCart() {
  cart.length = 0; // Clear the cart array
  updateCartDisplay(); // Update the cart display
}
