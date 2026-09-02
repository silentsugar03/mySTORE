// Cart Page Functionality
class CartPage {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.init();
    }

    init() {
        this.renderCart();
        this.updateSummary();
    }

    renderCart() {
        const container = document.getElementById('cart-container');

        if (this.cart.length === 0) {
            container.innerHTML = '<p class="empty-message">Your cart is empty. <a href="shop.html">Continue shopping</a></p>';
            return;
        }

        container.innerHTML = this.cart.map((item, index) => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${item.price}</div>
                    <div class="cart-item-quantity">Quantity: 1</div>
                    <button class="remove-btn" onclick="cartPage.removeItem(${index})">Remove from Cart</button>
                </div>
            </div>
        `).join('');
    }

    removeItem(index) {
        this.cart.splice(index, 1);
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.renderCart();
        this.updateSummary();
    }

    updateSummary() {
        // Calculate subtotal from prices (parse the price string)
        let subtotal = 0;
        this.cart.forEach(item => {
            const price = parseFloat(item.price.replace('$', ''));
            subtotal += price;
        });

        const shipping = 5.00;
        const tax = subtotal * 0.1; // 10% tax
        const total = subtotal + shipping + tax;

        document.getElementById('subtotal').textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
        document.getElementById('total').textContent = `$${total.toFixed(2)}`;
    }
}

// Initialize cart page
let cartPage;
document.addEventListener('DOMContentLoaded', () => {
    cartPage = new CartPage();
});
