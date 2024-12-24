document.addEventListener("DOMContentLoaded", function() {
  const cartItemsContainer = document.querySelector(".cart-items");
  const cartSummaryContainer = document.querySelector(".cart-summary");

  // 1) Retrieve cart from localStorage
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // 2) Render the cart items to the page
  function renderCart() {
    // If cart is empty
    if (cart.length === 0) {
      cartItemsContainer.innerHTML = "<p>OOPS! Your cart is empty.</p>";
      cartSummaryContainer.innerHTML = "";
      return;
    }

    let itemsHTML = "";
    let totalPrice = 0;

    cart.forEach((item, index) => {
      // Ensure the item has a 'quantity' property. If not, set it to 1
      if (typeof item.quantity === "undefined") {
        item.quantity = 1;
      }

      // Convert price string (e.g., "$49.99") to a number
      let priceNumber = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));

      // Calculate total for this item = price * quantity
      let itemTotal = priceNumber * item.quantity;
      totalPrice += itemTotal;

      itemsHTML += `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}">
          <div class="cart-details">
            <p class="cart-item-name">${item.name}</p>
            <p class="cart-item-price">${item.price}</p>
            <p class="cart-item-quantity">
              Quantity: <strong>${item.quantity}</strong>
              <button class="increase-qty" data-index="${index}">+</button>
            </p>
          </div>
          <button class="remove-item" data-index="${index}">Remove</button>
        </div>
      `;
    });

    // Insert cart items into the container
    cartItemsContainer.innerHTML = itemsHTML;

    // Display summary (total items, total price, etc.)
    cartSummaryContainer.innerHTML = `
      <h3>Cart Summary</h3>
      <p>Total Items: ${getTotalItems()}</p>
      <p>Total Price: $${totalPrice.toFixed(2)}</p>
      <button class="checkout-button">Checkout</button>
    `;

    // Show a fun popup if total exceeds $1000
    if (totalPrice > 1000) {
      Swal.fire({
        title: "Wow, you're rich!",
        text: "Your cart total is over $1000!",
        icon: "info",
        confirmButtonText: "OK"
      });
    }

    // Attach event listeners for remove & quantity buttons
    document.querySelectorAll(".remove-item").forEach(button => {
      button.addEventListener("click", removeItem);
    });
    document.querySelectorAll(".increase-qty").forEach(button => {
      button.addEventListener("click", increaseQuantity);
    });
    document.querySelector(".checkout-button").addEventListener("click", handleCheckout);
  }

  // Helper to sum up total items in the cart
  function getTotalItems() {
    return cart.reduce((sum, item) => sum + (item.quantity || 1), 0);
  }

  // 3) Remove an item
  function removeItem(e) {
    const index = e.target.dataset.index;
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }

  // 4) Increase quantity of a specific item
  function increaseQuantity(e) {
    const index = e.target.dataset.index;
    cart[index].quantity = (cart[index].quantity || 1) + 1;
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
  }

  // 5) Handle Checkout
  function handleCheckout() {
    // Clear the cart
    cart = [];
    localStorage.setItem("cart", JSON.stringify(cart));

    // SweetAlert2 success
    Swal.fire({
      title: 'Checkout Successful!',
      text: 'Thank you for your purchase!',
      icon: 'success',
      confirmButtonText: 'OK',
      confirmButtonColor: '#28a745'
    }).then(() => {
      renderCart();
    });
  }

  // 6) Initial render
  renderCart();
});
