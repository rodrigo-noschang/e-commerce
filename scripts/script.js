const pageTitle      = document.querySelector('.header-title');
const productList    = document.querySelector('.shop-list-container');
const emptyShop      = document.querySelector('.nothing-found-container');
const rebuildShop    = document.querySelector('.back-to-shop');
const searchButton   = document.querySelector('.search-trigger');
const searchInput    = document.querySelector('.search-input');
const cartEmpty      = document.querySelector('.empty-kart-container');
const cartList       = document.querySelector('.kart-list-container');
const cartListFooter = document.querySelector('.kart-footer-container');

// Cria os itens da vritrine 
function createProducts(products) {
    productList.innerHTML = '';

    products.forEach(product => {
        const productContainer = document.createElement('li');
        productContainer.classList.add('shop-item-container');
        productList.appendChild(productContainer);

        const productFigure = document.createElement('figure');
        productFigure.classList.add('shop-item-figure');
        productContainer.appendChild(productFigure);

        const productImage = document.createElement('img');
        productImage.src = product.image;
        productImage.alt = 'Shop Item';
        productFigure.appendChild(productImage);

        const infoContainer = document.createElement('div');
        infoContainer.classList.add('item-info-container');
        productContainer.appendChild(infoContainer);

        const category = document.createElement('p');
        category.classList.add('shop-item-category');
        category.innerText = product.category;
        infoContainer.appendChild(category);
        
        const productName = document.createElement('h3');
        productName.classList.add('shop-item-name');
        productName.innerText = product.name;
        infoContainer.appendChild(productName);

        const description = document.createElement('p');
        description.classList.add('shop-item-description');
        description.innerText = product.description;
        infoContainer.appendChild(description);

        const price = document.createElement('p');
        price.classList.add('shop-item-price');
        price.innerText = `R$ ${product.price.toFixed(2)}`;
        infoContainer.appendChild(price);

        const buy = document.createElement('button');
        buy.classList.add('shop-item-buy');
        buy.innerText = 'Adicionar ao Carrinho';
        buy.id = `product-${product.id}`;
        infoContainer.appendChild(buy);

        buy.addEventListener('click', addToKart)
    })
}

// Cria os itens no carrinho
function createCartsItem() {
    if (cart.length === 0) {
        cartEmpty.classList.remove('hidden');
        cartList.classList.add('hidden');
        cartListFooter.classList.add('hidden');
    } else {
        cartEmpty.classList.add('hidden');
        cartList.classList.remove('hidden');
        cartListFooter.classList.remove('hidden');
    }

    cartList.innerHTML = '';

    cart.forEach((item, index) => {
        const itemContainer = document.createElement('li');
        itemContainer.classList.add('kart-list-item');
        cartList.appendChild(itemContainer);

        const itemFigure = document.createElement('figure');
        itemFigure.classList.add('kart-list-figure');
        itemContainer.appendChild(itemFigure);

        const itemImage = document.createElement('img');
        itemImage.classList.add('kart-list-image');
        itemImage.src = item.image;
        itemFigure.appendChild(itemImage);

        const infoContainer = document.createElement('div');
        infoContainer.classList.add('kart-item-info-container');
        itemContainer.appendChild(infoContainer);

        const itemName = document.createElement('h3');
        itemName.classList.add('kart-item-name');
        itemName.innerText = item.name;
        infoContainer.appendChild(itemName);

        const itemPrice = document.createElement('p');
        itemPrice.classList.add('kart-item-price');
        itemPrice.innerText = `R$ ${item.price.toFixed(2)}`;
        infoContainer.appendChild(itemPrice);

        const itemRemove = document.createElement('button');
        itemRemove.classList.add('kart-item-remove');
        itemRemove.innerText = 'Remover produto';
        itemRemove.id = `cart-${index}`;
        infoContainer.appendChild(itemRemove);

        itemRemove.addEventListener('click', removeFromKart);
    })

    updateFooterValues();
}

// Atualiza os valores do footer do carrinho
function updateFooterValues() {
    const amountSlot = document.getElementById('kart-quantity');
    const priceSlot = document.getElementById('kart-total');

    const itemsAmount = cart.length;
    const itemsTotal = cart.reduce((acc, curr) => acc + curr.price, 0);

    amountSlot.innerText = itemsAmount;
    priceSlot.innerText = `R$ ${itemsTotal.toFixed(2)}`;
}

// Adiciona item no carrinho
function addToKart(evt) {
    const productId = evt.target.id.split('-')[1];
    const selectedProduct = products.filter(product => product.id == productId);
    cart.push(selectedProduct[0]);
    
    createCartsItem();

}

// Remove item do carrinho
function removeFromKart(evt) {
    const cartIndex = evt.target.id.split('-')[1];
    cart.splice(cartIndex, 1);
    createCartsItem();
}

// Chama as funções que fazem as criações iniciais (vitrine e carrinho vazio) 
createProducts(products);
createCartsItem();

// Filtra os itens da vritrine baseado no que o usuário digitar no input
function filterItems() {
    const inputValue = searchInput.value.trim().toLowerCase();
    
    const filteredProducts = products.filter( product => {
        return (
            product.name.toLowerCase().includes(inputValue) || 
            product.description.toLowerCase().includes(inputValue) || 
            product.category.toLowerCase().includes(inputValue)
        )
    })

    createProducts(filteredProducts);

    if (filteredProducts.length === 0) {
        emptyShop.classList.remove('hidden');
    } else {
        emptyShop.classList.add('hidden');
    }
    
    
}

searchButton.addEventListener('click', filterItems)


// Quando a pesquisa não retorna nada, o "clicar aqui" do texto vai 
// reconstruir a vitrine no formato original.
rebuildShop.addEventListener('click', () => {
    searchInput.value = '';
    filterItems();
});