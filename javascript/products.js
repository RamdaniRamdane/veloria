const products = [
    {
        id: 'haircare-02',
        name: 'Masque Capillaire Nourrissant à l\'Argan',
        category: 'Haircare',
        price: 27.88,
        description: 'Nourrit et répare les cheveux secs et abîmés',
        image: 'images/masque_argan.jpg'
    },
    {
        id: 'haircare-03',
        name: 'Shampooing Douceur Naturelle',
        category: 'Haircare',
        price: 22.5,
        description: 'Shampooing 100% naturel pour des cheveux propres, doux et brillants.',
        image: 'images/shampooing_naturel.jpg'
    },
    {
        id: 'haircare-04',
        name: 'Après-Shampooing Douceur Intense',
        category: 'Haircare',
        price: 24.99,
        description: 'Après-shampooing 100% naturel pour des cheveux démêlés, doux et brillants.',
        image: 'images/apres_shampooing.jpg'
    },
    {
        id: 'haircare-05',
        name: 'Shampooing Sec',
        category: 'Haircare',
        price: 19,
        description: 'Shampooing sec pour des cheveux propres et volumineux en un instant.',
        image: 'images/shampooing_sec.jpg'
    },
    {
        id: 'clean-beauty-02',
        name: 'Démaquillant Douceur Naturelle',
        category: 'Clean Beauty',
        price: 26.99,
        description: 'Démaquille efficacement et préserve l\'hydratation naturelle.',
        image: 'images/demaquillant.jpg'
    },
    {
        id: 'clean-beauty-03',
        name: 'Rouge à Lèvres',
        category: 'Clean Beauty',
        price: 28,
        description: 'Rouge à lèvres pour des lèvres colorées et hydratées.',
        image: 'images/rouge_levres.jpg'
    },
    {
        id: 'clean-beauty-04',
        name: 'Mascara Volume',
        category: 'Clean Beauty',
        price: 19.99,
        description: 'Mascara pour des cils volumineux et définis.',
        image: 'images/mascara.jpg'
    },
    {
        id: 'clean-beauty-05',
        name: 'Fond de Teint',
        category: 'Clean Beauty',
        price: 34.99,
        description: 'Fond de teint pour un teint parfait et lumineux.',
        image: 'images/fond_teint.jpg'
    },
    {
        id: 'skincare-01',
        name: 'Crème Hydratante Peau Douce',
        category: 'Skincare',
        price: 22.66,
        description: 'Une crème hydratante pour une peau douce et éclatante. Nourrit intensément et protège contre le dessèchement.',
        benefits: [
            'Hydratation intense',
            'Protection contre le dessèchement'
        ],
        key_ingredients: [
            'Aloe Vera : Apaise et hydrate la peau.',
            'Beurre de Karité : Nourrit et protège la peau.',
            'Acide Hyaluronique : Maintient l\'hydratation et repulpe la peau.'
        ],
        image: 'images/creme.jpg'
    },
        {
        id: 'haircare-006',
        name: 'Après-Shampooing Douceur Intense',
        category: 'Haircare',
        price: 24.99,
        description: 'Après-shampooing 100% naturel pour des cheveux démêlés, doux et brillants.',
        image: 'images/shampIntnace.jpg'
    },
    {
        id: 'bodycare-003',
        name: 'Shower Gel',
        category: 'Body Care',
        price: 19.99,
        description: 'Enrichi en extraits de plantes et huiles essentielles',
        image: 'images/gelShower.jpg'
    },
    {
        id: 'bodycare-004',
        name: 'Lait Corporel 100% Naturel',
        category: 'Body Care',
        price: 24.55,
        description: 'Une hydratation légère et une peau douce comme de la soie.',
        image: 'images/corporalMilk.jpg'
    },
    {
        id: 'bodycare-005',
        name: 'Brume Corporelle',
        category: 'Body Care',
        price: 22.30,
        description: 'Une sensation de fraîcheur et un parfum délicat tout au long de la journée.',
        image: 'images/brumecorp.jpg'
    },
    {
        id: 'skincare-003',
        name: "Gel Nettoyant Douceur d'Argan",
        category: 'Skincare',
        price: 50,
        description: "Nettoyage et hydratation de peau avec huile d'argan",
        image: 'images/gelNetoiArga.jpg'
    },
    {
        id: 'skincare-004',
        name: "Natural Toner avec Huile d'Argan",
        category: 'Skincare',
        price: 29.99,
        description: 'Laisse la peau douce, lisse et éclatante',
        image: 'images/toner.jpg'
    },
    {
        id: 'skincare-005',
        name: 'Crème Solaire',
        category: 'Skincare',
        price: 34.99,
        description: 'Protège votre peau',
        image: 'images/solar.jpg'
    }
];

class ProductManager {
    constructor(products) {
        this.products = products;
        this.filteredProducts = [...products];
        this.currentPage = 1;
        this.productsPerPage = 12;

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
                <img src="${product.image}" alt="${product.name}" loading="lazy">
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
