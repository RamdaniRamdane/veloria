// cart.js
let cart = [];

document.addEventListener('DOMContentLoaded', () => {
    cart = getUserCart();
    if(window.location.pathname.includes('cart.html')) {
        updateCartDisplay();
    }
});

// Expose functions globally
window.addToCart = addToCart;
window.removeFromCart = removeFromCart;
window.updateQuantity = function(productId, newQuantity) {
    const product = cart.find(item => item.id === productId);
    if (product) {
        product.quantity = parseInt(newQuantity);
        saveUserCart(cart);
        updateCartDisplay();
    }
};

function addToCart(productId, name, price) {
    if(!currentUser) {
        alert('Veuillez vous connecter pour ajouter des articles au panier');
        window.location.href = 'login.html';
        return;
    }

    const existingItem = cart.find(item => item.id === productId);
    
    if(existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name,
            price: Number(price),
            quantity: 1
        });
    }
    
    saveUserCart(cart);
    updateCartDisplay();
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveUserCart(cart);
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartContainer = document.getElementById('cart-items');
    const totalElement = document.getElementById('cart-total');
    
    if(!cartContainer || !totalElement) return;
    
    cartContainer.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <div class="item-info">
                <h4>${item.name}</h4>
                <p>Prix unitaire: €${item.price.toFixed(2)}</p>
            </div>
            <div class="item-controls">
                <input type="number" 
                       value="${item.quantity}" 
                       min="1" 
                       onchange="updateQuantity('${item.id}', this.value)">
                <button class="remove-btn" onclick="removeFromCart('${item.id}')">
                    Supprimer
                </button>
            </div>
            <div class="item-total">
                €${itemTotal.toFixed(2)}
            </div>
        `;
        cartContainer.appendChild(itemElement);
    });
    
    totalElement.textContent = `Total: €${total.toFixed(2)}`;
}

document.addEventListener('DOMContentLoaded', () => {
    if(window.location.pathname.includes('cart.html')) {
        updateCartDisplay();
    }
});
