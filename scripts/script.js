const pageTitle      = document.querySelector('.header-title');
const categories     = document.getElementsByClassName('category');
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

        const amountContanier = document.createElement('div');
        amountContanier.classList.add('kart-item-amount-container');
        infoContainer.appendChild(amountContanier);

        const subButton = document.createElement('span');
        subButton.classList.add('kart-item-sub');
        subButton.innerText = '-';
        subButton.id = `remove-${item.id}`
        subButton.addEventListener('click', takeOneUnityAway);
        amountContanier.appendChild(subButton);
        
        const itemAmount = document.createElement('span');
        itemAmount.classList.add('kart-item-amount');
        itemAmount.innerText = item.amount;
        amountContanier.appendChild(itemAmount);

        const addButton = document.createElement('span');
        addButton.classList.add('kart-item-add');
        addButton.innerText = '+';
        addButton.id = `add-${item.id}`;
        addButton.addEventListener('click', addToKart);
        amountContanier.appendChild(addButton);

        const itemPrice = document.createElement('p');
        itemPrice.classList.add('kart-item-price');
        const price = item.price * item.amount;
        itemPrice.innerText = `R$ ${price.toFixed(2)}`;
        infoContainer.appendChild(itemPrice);

        const removeItem = document.createElement('div');
        removeItem.classList.add('kart-item-remove');
        removeItem.id = `delete-${item.id}`;
        removeItem.innerText = 'X';
        itemContainer.appendChild(removeItem);

        removeItem.addEventListener('click', removeFromKart);
    })

    updateFooterValues();
}

// Atualiza os valores do footer do carrinho
function updateFooterValues() {
    const amountSlot = document.getElementById('kart-quantity');
    const priceSlot = document.getElementById('kart-total');

    const itemsAmount = cart.reduce ((acc, curr) => acc + curr.amount, 0);

    const itemsTotal = cart.reduce ((acc, curr) => acc + curr.price * curr.amount, 0)

    amountSlot.innerText = itemsAmount;
    priceSlot.innerText = `R$ ${itemsTotal.toFixed(2)}`;
}

// Adiciona item no carrinho
function addToKart(evt) {
    const productId = evt.target.id.split('-')[1];
    const productAlreadyInCart = cart.find(product => product.id == productId);

    if (!productAlreadyInCart) {
        const selectedProduct = products.find(product => product.id == productId);
        selectedProduct.amount = 1;
        cart.push(selectedProduct);
    } else {
        productAlreadyInCart.amount++;
    }

    createCartsItem();
}

// Remove item do carrinho
function removeFromKart(evt) {
    const itemId = evt.target.id.split('-')[1];
    const itemIndex = cart.findIndex(item => item.id == itemId);
    cart.splice(itemIndex, 1);
    createCartsItem();
}

function takeOneUnityAway (evt) {
    const itemId = evt.target.id.split('-')[1];
    const itemInCart = cart.find(item => item.id == itemId);

    if (itemInCart.amount === 1) return;
    itemInCart.amount--;
    createCartsItem();

}

// Chama as funções que fazem as criações iniciais (vitrine e carrinho vazio) 
createProducts(products);
createCartsItem();


// Caso a busca pelo input ou categoria não encontre nenhum produto,
// essa função colocará a mensagem de "nada foi encontrado, ..."
function showHideMessageForEmptyShop(shopList) {
    if (shopList.length === 0) {
        emptyShop.classList.remove('hidden');
    } else {
        emptyShop.classList.add('hidden');
    }
}



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
    showHideMessageForEmptyShop(filteredProducts);
}

searchButton.addEventListener('click', filterItems)


// Quando a pesquisa não retorna nada, o "clicar aqui" do texto vai 
// reconstruir a vitrine no formato original.
rebuildShop.addEventListener('click', () => {
    searchInput.value = '';
    filterItems();
});


// Filtra os itens da loja através das categorias no Header da página.
function filterByCategory(evt) {
    const selectedCategory = evt.target.innerText.toLowerCase();
    let selectedItems = [];

    if (selectedCategory === 'todos') {
        selectedItems = products;
    } else {
        selectedItems = products.filter(product => product.category.toLowerCase() === selectedCategory);
    }

    createProducts(selectedItems);
    showHideMessageForEmptyShop(selectedItems);
    highlighSelectedCategory(evt.target);
}

function highlighSelectedCategory(selectedCategory) {
    for (let i = 0; i < categories.length; i++) {
        categories[i].classList.remove('selected-category');
    }

    selectedCategory.classList.add('selected-category');
}


// Adiciona o eventListener nos itens do header.
function eventListenerOnHeaderCategories () {
    for (let i = 0; i < categories.length; i++) {
        categories[i].addEventListener('click', filterByCategory)
    }
}

eventListenerOnHeaderCategories ();


