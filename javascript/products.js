const products = [
    {
        id: 'skincare-01',
        name: 'Sérum Hydratant à la Rose',
        category: 'Skincare',
        price: 45.99,
        description: 'Hydratation intense avec extrait de rose biologique.',
        image: 'images/skincare.png'
    },
    {
        id: 'haircare-01',
        name: 'Huile Capillaire à l\'Argan Nourrissante',
        category: 'Haircare',
        price: 34.50,
        description: 'Restaure l\'éclat et la force avec de l\'huile d\'argan pure.',
        image: 'images/serum.png'
    },
    {
        id: 'bodycare-01',
        name: 'Beurre Corporel à la Lavande',
        category: 'Body Care',
        price: 29.99,
        description: 'Beurre corporel ultra-hydratant avec de la lavande apaisante.',
        image: 'images/cleaningGel.png'
    },
    {
        id: 'clean-beauty-01',
        name: 'Baume à Lèvres Écologique',
        category: 'Clean Beauty',
        price: 12.99,
        description: 'Soin des lèvres durable avec des ingrédients naturels.',
        image: 'images/champ.png'
    },
    {
        id: 'skincare-02',
        name: 'Crème Éclaircissante à la Vitamine C',
        category: 'Skincare',
        price: 55.00,
        description: 'Illuminez votre peau avec notre formule puissante à la Vitamine C.',
        image: 'images/makillage.png'
    },
    {
        id: 'bodycare-02',
        name: 'Gommage Corporel aux Sels Minéraux',
        category: 'Body Care',
        price: 39.99,
        description: 'Gommage exfoliant avec des sels minéraux naturels.',
        image: 'images/skincare.png'
    }
];

class ProductManager {
    constructor(products) {
        this.products = products;
        this.filteredProducts = [...products];
        this.currentPage = 1;
        this.productsPerPage = 6;

        this.initEventListeners();
    }

    initEventListeners() {
        const categoryFilter = document.getElementById('category-filter');
        const sortPriceAsc = document.getElementById('sort-price-asc');
        const sortPriceDesc = document.getElementById('sort-price-desc');
        const prevPage = document.getElementById('prev-page');
        const nextPage = document.getElementById('next-page');

        if (categoryFilter) {
            categoryFilter.addEventListener('change', () => this.filterProducts());
        }

        if (sortPriceAsc) {
            sortPriceAsc.addEventListener('click', () => this.sortProducts('asc'));
        }

        if (sortPriceDesc) {
            sortPriceDesc.addEventListener('click', () => this.sortProducts('desc'));
        }

        if (prevPage) {
            prevPage.addEventListener('click', () => this.changePage(-1));
        }

        if (nextPage) {
            nextPage.addEventListener('click', () => this.changePage(1));
        }
    }

    filterProducts() {
        const categoryFilter = document.getElementById('category-filter');
        const selectedCategory = categoryFilter.value;

        this.filteredProducts = selectedCategory 
            ? this.products.filter(product => product.category === selectedCategory)
            : [...this.products];

        this.currentPage = 1;
        this.displayProducts();
    }

    sortProducts(order) {
        this.filteredProducts.sort((a, b) => 
            order === 'asc' 
                ? a.price - b.price 
                : b.price - a.price
        );
        this.displayProducts();
    }

    changePage(direction) {
        const totalPages = Math.ceil(this.filteredProducts.length / this.productsPerPage);
        this.currentPage += direction;

        if (this.currentPage < 1) this.currentPage = 1;
        if (this.currentPage > totalPages) this.currentPage = totalPages;

        this.displayProducts();
        this.updatePaginationDisplay();
    }

    updatePaginationDisplay() {
        const currentPageSpan = document.getElementById('current-page');
        if (currentPageSpan) {
            currentPageSpan.textContent = this.currentPage;
        }
    }

    displayProducts() {
        const productsContainer = document.getElementById('products-container');
        if (!productsContainer) return;

        // Clear previous products
        productsContainer.innerHTML = '';

        // Calculate start and end indices for current page
        const startIndex = (this.currentPage - 1) * this.productsPerPage;
        const endIndex = startIndex + this.productsPerPage;
        const pageProducts = this.filteredProducts.slice(startIndex, endIndex);

        pageProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.category}</p>
                <p>${product.price.toFixed(2)} €</p>
                <button onclick="addToCart('${product.id}', '${product.name}', ${product.price})">
                    Ajouter au Panier
                </button>
            `;
            productsContainer.appendChild(productCard);
        });
    }
    createProductCard(product) {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-category">${product.category}</p>
                <p class="product-price">€${product.price.toFixed(2)}</p>
                <button class="add-to-cart-btn" 
                        onclick="addToCart('${product.id}', '${product.name}', ${product.price})">
                    Ajouter au panier
                </button>
            </div>
        `;
        return card;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const productManager = new ProductManager(products);
    productManager.displayProducts();
});

window.addToCart = function(id, name, price) {
    if(!currentUser) {
        alert('Veuillez vous connecter pour ajouter au panier');
        window.location.href = 'login.html';
        return;
    }
    
    const cart = getUserCart();
    const existing = cart.find(item => item.id === id);
    
    if(existing) {
        existing.quantity++;
    } else {
        cart.push({ id, name, price: Number(price), quantity: 1 });
    }
    
    saveUserCart(cart);
    alert(`${name} ajouté au panier !`);
};
