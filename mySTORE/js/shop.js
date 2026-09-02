const cart = [];

const cartCount = document.getElementById('cart-count');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

function renderCart() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    cartCount.textContent = totalItems;

    if (cart.length === 0) {
        cartItems.innerHTML = '<li class="empty-cart">Cart is empty</li>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <li>
                <span>${item.name} x${item.quantity}</span>
                <strong>$${(item.price * item.quantity).toFixed(2)}</strong>
            </li>
        `).join('');
    }

    cartTotal.textContent = `$${totalPrice.toFixed(2)}`;
}

document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productCard = button.closest('.product-card');
        const name = productCard.dataset.name;
        const price = Number(productCard.dataset.price);

        const existingProduct = cart.find(item => item.name === name);

        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }

        renderCart();
    });
});

renderCart();
