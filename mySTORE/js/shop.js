// Shopping Cart Functionality
class ShoppingCart {
    constructor() {
        this.cart = JSON.parse(localStorage.getItem('cart')) || [];
        this.initEventListeners();
        this.displayCartCount();
    }

    initEventListeners() {
        document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
            btn.addEventListener('click', (e) => this.addToCart(e));
        });

        const categorySelect = document.getElementById('category');
        if (categorySelect) {
            categorySelect.addEventListener('change', (e) => this.filterProducts(e.target.value));
        }
    }

    addToCart(event) {
        const productCard = event.target.closest('.product-card');
        const product = {
            id: Date.now(),
            name: productCard.querySelector('h3').textContent,
            price: productCard.querySelector('.product-price').textContent,
            image: productCard.querySelector('.product-img').src,
            quantity: 1
        };

        this.cart.push(product);
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.displayCartCount();
        this.showNotification(`${product.name} added to cart!`);
    }

    filterProducts(category) {
        if (!category) {
            document.querySelectorAll('.product-card').forEach(card => {
                card.style.display = 'block';
            });
            return;
        }

        document.querySelectorAll('.product-card').forEach(card => {
            const productName = card.querySelector('h3').textContent.toLowerCase();
            if (productName.includes(category.toLowerCase())) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    displayCartCount() {
        const count = this.cart.length;
        console.log(`Items in cart: ${count}`);
    }

    showNotification(message) {
        const notification = document.createElement('div');
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: #27ae60;
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 4px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            z-index: 1000;
            animation: slideIn 0.3s ease-out;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Initialize shopping cart when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ShoppingCart();
});
