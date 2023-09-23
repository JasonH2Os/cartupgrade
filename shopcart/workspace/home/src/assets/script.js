const products = [
  {
  
     name: "Cherry",
     price: 5.00,
     quantity: 0,
     productId: 101,
     image: "/images/cherry.jpg"
  },
  {
     name: "Orange",
     price: 1.00,
     quantity: 0,
     productId: 102,
     image: "/images/orange.jpg"
  },
  {
     name: "Strawberry",
     price: 4.99,
     quantity: 0,
     productId: 103,
     image: "/images/strawberry.jpg"
  }
];
let cart = [];

function getProductByIdFromList(productId, productList) { //helper function
  return products.find(product => product.productId === productId);
 
}
function addProductToCart(productId) { //adds product to cart
  let product = getProductByIdFromList(productId, products);

  if (product) {
    let productInCart = cart.find(item => item.productId === productId);

    if (!productInCart) {
      cart.push({ ...product, quantity: 1 }); //product not in cart add it
      product.quantity = 1;
    } else {
      productInCart.quantity++;
      product.quantity++
    }
  }
}


function increaseQuantity(productId) { //increases quantity in cart
  let product = getProductByIdFromList(productId, products);
  if (product) {
    product.quantity++; 
    cart.find(item => item.productId === productId).quantity++;

  }
}

function decreaseQuantity(productId) { //decreases quantity in cart
  let product = getProductByIdFromList(productId, products);
  let productInCart = cart.find(item => item.productId === productId);

  if (product && productInCart) {
    product.quantity--;
    if (product.quantity === 0) {
      cart.splice(cart.indexOf(productInCart), 1);
    } else {
      productInCart.quantity--;
    }
  }
}


  
function removeProductFromCart(productId) { //removes product from cart
  let product = getProductByIdFromList(productId, products);
  product.quantity = 0;
  cart.splice(cart.indexOf(product), 1);
}
// Function to calculate total price of the items in the cart
function cartTotal() {
  let total = 0;
  
  // Iterate over each product in the cart
  cart.forEach(product => {
    // Add the price of each product multiplied by its quantity to the total
    total += product.quantity * product.price;
  });

  return total;
}

// Function to empty the cart
function emptyCart() {
  cart = []; // Reassign cart to an empty array
}

// Function to handle payment
function pay(amount) {
  let totalPaid = cartTotal(); // Get the total price of the cart

  // Calculate remaining balance
  let remaining = amount - totalPaid;

  // If the calculated remaining balance is greater or equal to zero, update totalPaid and empty the cart
  if (remaining >= 0) {
    totalPaid = amount;
    emptyCart();
  }

  // Return remaining balance if it's >= 0 else return amount that is still due
  return remaining >= 0 ? remaining : -remaining;
}

/* The following is for running unit tests. 
   To fully complete this project, it is expected that all tests pass.
   Run the following command in terminal to run tests
   npm run test
*/

module.exports = {
  products,
  cart,
  addProductToCart,
  increaseQuantity,
  decreaseQuantity,
  removeProductFromCart,
  cartTotal,
  pay, 
  emptyCart,
}
  /* Uncomment the following line if completing the currency converter bonus */
// currency
