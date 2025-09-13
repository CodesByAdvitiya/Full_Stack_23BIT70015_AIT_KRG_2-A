
const products = [
  { name: "Laptop", category: "electronics", price: 999 },
  { name: "Wireless Mouse", category: "electronics", price: 49 },
  { name: "T-Shirt", category: "clothing", price: 25 },
  { name: "Jeans", category: "clothing", price: 78 },
  { name: "Headphones", category: "electronics", price: 199 },
  { name: "The Great Gatsby", category: "books", price: 15 },
  { name: "Learning JavaScript", category: "books", price: 40 }
];


const filterSelect = document.getElementById('filter');
const productsContainer = document.getElementById('products-container');

/**
 * Renders a list of products to the DOM.
 * @param {Array} productsToRender - The array of product objects to display.
 */
function renderProducts(productsToRender) {
    
  if (productsToRender.length === 0) {
    productsContainer.innerHTML = '<p>No products found for this category.</p>';
    return;
  }

  productsContainer.innerHTML = productsToRender.map(p => `
    <div class="product">
      <h3>${p.name}</h3>
      <p class="price">₹${p.price}</p>
      <p class="category">${p.category}</p>
    </div>
  `).join('');
}


filterSelect.addEventListener('change', (event) => {
  const selectedCategory = event.target.value;

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(p => p.category === selectedCategory);

  renderProducts(filteredProducts);
});

document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
});