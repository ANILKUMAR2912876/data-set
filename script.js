// ========== PRODUCTS DATABASE ==========
const products = [
    // FOOD CATEGORY
    { id: 1, name: 'Organic Honey', category: 'food', price: 12.99, description: 'Pure organic honey from local beehives', emoji: '🍯' },
    { id: 2, name: 'Premium Coffee Beans', category: 'food', price: 15.99, description: 'Freshly roasted arabica coffee beans', emoji: '☕' },
    { id: 3, name: 'Almond Butter', category: 'food', price: 8.99, description: 'Creamy almond butter made from roasted almonds', emoji: '🥜' },
    { id: 4, name: 'Extra Virgin Olive Oil', category: 'food', price: 18.99, description: 'Cold-pressed extra virgin olive oil from Italy', emoji: '🫒' },
    { id: 5, name: 'Organic Pasta', category: 'food', price: 4.99, description: 'Whole wheat organic pasta', emoji: '🍝' },
    { id: 6, name: 'Raw Almonds', category: 'food', price: 14.99, description: '1kg bag of premium raw almonds', emoji: '🥜' },

    // VEGETABLES CATEGORY
    { id: 7, name: 'Organic Broccoli', category: 'vegetables', price: 3.99, description: 'Fresh organic broccoli crowns', emoji: '🥦' },
    { id: 8, name: 'Red Bell Peppers', category: 'vegetables', price: 4.50, description: 'Sweet red bell peppers', emoji: '🫑' },
    { id: 9, name: 'Organic Spinach', category: 'vegetables', price: 3.49, description: 'Fresh organic spinach bundles', emoji: '🥬' },
    { id: 10, name: 'Carrots Bundle', category: 'vegetables', price: 2.99, description: '2kg bundle of fresh carrots', emoji: '🥕' },
    { id: 11, name: 'Tomatoes (6 Pack)', category: 'vegetables', price: 5.99, description: 'Ripe red tomatoes perfect for cooking', emoji: '🍅' },
    { id: 12, name: 'Cucumber (3 Pack)', category: 'vegetables', price: 2.49, description: 'Fresh crisp cucumbers', emoji: '🥒' },
    { id: 13, name: 'Lettuce Heads', category: 'vegetables', price: 2.99, description: 'Fresh romaine lettuce heads', emoji: '🥬' },
    { id: 14, name: 'Garlic Bulbs', category: 'vegetables', price: 1.99, description: 'Fresh garlic bulbs (1 pound)', emoji: '🧄' },

    // FAST FOOD CATEGORY
    { id: 15, name: 'Cheese Pizza', category: 'fastfood', price: 12.99, description: 'Large cheese pizza with fresh mozzarella', emoji: '🍕' },
    { id: 16, name: 'Crispy Fried Chicken', category: 'fastfood', price: 9.99, description: '6 pieces of crispy fried chicken', emoji: '🍗' },
    { id: 17, name: 'Gourmet Burger', category: 'fastfood', price: 11.99, description: 'Premium beef burger with special sauce', emoji: '🍔' },
    { id: 18, name: 'Hot Dog Combo', category: 'fastfood', price: 7.99, description: 'Hot dog with fries and drink', emoji: '🌭' },
    { id: 19, name: 'Fish & Chips', category: 'fastfood', price: 10.99, description: 'Crispy battered fish with fries', emoji: '🍟' },
    { id: 20, name: 'Chicken Sandwich', category: 'fastfood', price: 8.99, description: 'Grilled chicken breast sandwich', emoji: '🥪' },
    { id: 21, name: 'Tacos Pack (3)', category: 'fastfood', price: 6.99, description: 'Three delicious beef tacos', emoji: '🌮' },
    { id: 22, name: 'Mozzarella Sticks', category: 'fastfood', price: 5.99, description: 'Fried mozzarella sticks (8 pieces)', emoji: '🧀' },

    // CLOTHES CATEGORY
    { id: 23, name: 'Cotton T-Shirt', category: 'clothes', price: 19.99, description: 'Comfortable 100% cotton t-shirt', emoji: '👕' },
    { id: 24, name: 'Blue Jeans', category: 'clothes', price: 49.99, description: 'Classic blue denim jeans', emoji: '👖' },
    { id: 25, name: 'Summer Dress', category: 'clothes', price: 39.99, description: 'Light and breezy summer dress', emoji: '👗' },
    { id: 26, name: 'Hoodie Sweater', category: 'clothes', price: 59.99, description: 'Cozy hoodie sweater perfect for winter', emoji: '🧥' },
    { id: 27, name: 'Athletic Shorts', category: 'clothes', price: 24.99, description: 'Breathable athletic shorts', emoji: '🩳' },
    { id: 28, name: 'Winter Jacket', category: 'clothes', price: 89.99, description: 'Warm waterproof winter jacket', emoji: '🧥' },
    { id: 29, name: 'Polo Shirt', category: 'clothes', price: 29.99, description: 'Classic polo shirt in multiple colors', emoji: '👕' },
    { id: 30, name: 'Leather Belt', category: 'clothes', price: 34.99, description: 'Premium leather belt', emoji: '👜' }
];

// ========== GLOBAL STATE ==========
let cart = [];
let filteredProducts = [...products];
let selectedCategory = 'all';
let maxPrice = 500;
let sortBy = 'popular';

// ========== DOM ELEMENTS ==========
const productsContainer = document.getElementById('productsContainer');
const noProducts = document.getElementById('noProducts');
const cartBtn = document.querySelector('.cart-btn');
const cartModal = document.getElementById('cartModal');
const modalClose = document.querySelector('.modal-close');
const cartItems = document.getElementById('cartItems');
const cartBadge = document.querySelector('.cart-badge');
const priceSlider = document.getElementById('priceSlider');
const maxPriceDisplay = document.getElementById('maxPrice');
const sortSelect = document.getElementById('sortSelect');
const searchInput = document.getElementById('searchInput');
const categoryCards = document.querySelectorAll('.category-card');
const checkoutBtn = document.getElementById('checkoutBtn');
const continueShopping = document.getElementById('continueShopping');
const subtotalSpan = document.getElementById('subtotal');
const taxSpan = document.getElementById('tax');
const totalSpan = document.getElementById('total');
const ctaBtn = document.querySelector('.cta-btn');

// ========== EVENT LISTENERS ==========
cartBtn.addEventListener('click', openCart);
modalClose.addEventListener('click', closeCart);
continueShopping.addEventListener('click', closeCart);
checkoutBtn.addEventListener('click', checkout);

categoryCards.forEach(card => {
    card.addEventListener('click', () => {
        const category = card.dataset.category;
        filterByCategory(category);
        card.parentElement.querySelectorAll('.category-card').forEach(c => c.classList.remove('active'));
        card.classList.add('active');
    });
});

priceSlider.addEventListener('input', (e) => {
    maxPrice = parseInt(e.target.value);
    maxPriceDisplay.textContent = maxPrice;
    applyFilters();
});

sortSelect.addEventListener('change', (e) => {
    sortBy = e.target.value;
    applyFilters();
});

searchInput.addEventListener('input', () => {
    applyFilters();
});

cartModal.addEventListener('click', (e) => {
    if (e.target === cartModal) closeCart();
});

ctaBtn.addEventListener('click', () => {
    document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
});

// ========== INITIALIZATION ==========
displayProducts(filteredProducts);

// ========== FUNCTIONS ==========

// Display products
function displayProducts(productsToShow) {
    if (productsToShow.length === 0) {
        productsContainer.innerHTML = '';
        noProducts.style.display = 'block';
        return;
    }

    noProducts.style.display = 'none';
    productsContainer.innerHTML = productsToShow.map(product => `
        <div class="product-card" data-id="${product.id}">
            <div class="product-image ${product.category}">
                ${product.emoji}
            </div>
            <div class="product-info">
                <div class="product-category">${product.category}</div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <span class="product-price">$${product.price.toFixed(2)}</span>
                    <button class="add-to-cart-btn" data-id="${product.id}" onclick="addToCart(${product.id})">
                        ${isInCart(product.id) ? '✓ Added' : 'Add to Cart'}
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Filter by category
function filterByCategory(category) {
    selectedCategory = category;
    applyFilters();
}

// Apply all filters and sort
function applyFilters() {
    // Filter by category
    if (selectedCategory === 'all') {
        filteredProducts = [...products];
    } else {
        filteredProducts = products.filter(p => p.category === selectedCategory);
    }

    // Filter by search
    const searchTerm = searchInput.value.toLowerCase().trim();
    if (searchTerm) {
        filteredProducts = filteredProducts.filter(p =>
            p.name.toLowerCase().includes(searchTerm) ||
            p.description.toLowerCase().includes(searchTerm)
        );
    }

    // Filter by price
    filteredProducts = filteredProducts.filter(p => p.price <= maxPrice);

    // Sort
    sortProducts();

    displayProducts(filteredProducts);
}

// Sort products
function sortProducts() {
    switch (sortBy) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'newest':
            filteredProducts.sort((a, b) => b.id - a.id);
            break;
        case 'popular':
        default:
            // Keep original order
            break;
    }
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    updateCartUI();
    displayProducts(filteredProducts);
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
    displayProducts(filteredProducts);
}

// Check if product in cart
function isInCart(productId) {
    return cart.some(item => item.id === productId);
}

// Update cart UI
function updateCartUI() {
    cartBadge.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        subtotalSpan.textContent = '0.00';
        taxSpan.textContent = '0.00';
        totalSpan.textContent = '0.00';
        return;
    }

    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name} x${item.quantity}</div>
            </div>
            <span class="cart-item-price">$${(item.price * item.quantity).toFixed(2)}</span>
            <button class="remove-item-btn" onclick="removeFromCart(${item.id})">Remove</button>
        </div>
    `).join('');

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = subtotal * 0.10;
    const total = subtotal + tax;

    subtotalSpan.textContent = subtotal.toFixed(2);
    taxSpan.textContent = tax.toFixed(2);
    totalSpan.textContent = total.toFixed(2);
}

// Open cart modal
function openCart() {
    cartModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close cart modal
function closeCart() {
    cartModal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const tax = total * 0.10;
    const finalTotal = total + tax;

    alert(`Thank you for your purchase!\n\nOrder Summary:\nSubtotal: $${total.toFixed(2)}\nTax: $${tax.toFixed(2)}\nTotal: $${finalTotal.toFixed(2)}\n\nYour order has been placed successfully!`);

    cart = [];
    updateCartUI();
    closeCart();
}

