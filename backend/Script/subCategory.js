async function fetchProducts() {
   const response = await fetch("https://holly-quaint-protest.glitch.me");
   const products = await response.json();
   return products;
}
function displayProducts(products) {
   const productsList = document.getElementById('products-list');
   productsList.innerHTML = "";
}
products.forEach(products => {
   const productCard = document.createElement("div");
   productCard.classList.add('product-card');

   productCard.innerHTML = `
       <img src="${products.image}" alt="${products.name}">
       <h2>${products.name}</h2> 
       <p>${products.description}</p> 
       <div class="Price">$${products.price.toFixed(2)}</div>
       <div class="quantity">Stock:${products.quantity}</div>
       <button class="Update-btn" data-id="${products.id}">Update Price</button>
   `
   products.appendChild(productCard);
});
document.querySelectorAll('Update-btn').forEach(button => {
   button.addEventListener('Click', UpdateProductPrice);
})

function filterProducts(products, minPrice, maxPrice, minQuantity) {
   return products.filter(product => {
      const matchesSearchTerm = products.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesPrice = (product.price >= minPrice && product.price <= maxPrice);
      const matchesQuantity = (product.minQuantity >= minQuantity);

      return matchesPrice && matchesQuantity;
   });
}
async function updateProductPrice(event) {
   const productId = event.target.getAttribute('data-id');
   const newPrice = prompt("Enter the new price for the products:");

   if (!newPrice) return;
   const UpdateProduct = {
      price: parseFloat(newPrice)
   };
   const response = await fetch(`https://holly-quaint-protest.glitch.me/products/${productId}`, {
      method: 'PATCH',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(UpdateProduct)
   });
   if (response.ok) {
      alert('Product price updated sucessfully!');
      const products = await fetchProducts();
      displayProducts(products);
   }
   else {
      alert("Failed to update product price.");
   }
}
document.getElementById('apply-filters').addEventListener('click', async function () {
   const minPrice = parseFloat(document.getElementById('min-Price').value) || 0;
   const maxPrice = parseFloat(document.getElementById('max-price').value) || Infinity;
   const minQuantity = parseInt(document.getElementById('min-quantity').value) || 0;
});
fetchProductsProducts().then(products => {
   displayProducts(products);
});
const productsList = document.getElementById('productList');
const subCategorySelect = document.getElementById('subCategory');
const sortSelect = document.getElementById('sort');
const resetBtn = document.getElementById('resetBtn');
function filterProducts(){
   const selectedSubCategory = subCategorySelect.value;
   let filteredProducts =[...products];
   if(selectedSubCategory){
      filterProducts = filteredProducts.filter(product => product.category ===selectedSubCategory);
   }
   return filterProducts;
}
function sortProducts(products){
   const sortOrder= sortSelect.value;
   if(sortOrder === 'low-to-high'){
      return products.sortOrder((a,b) => a.price - b.price);
   }
   else if(sortOrder ==='high-to-low'){
      return products.sort((a,b) => b.price - a.price);
   }
   return products;
}
//function to render products to the DOM
function renderProducts(){
   // Filter products first
   let filteredProducts = filterProducts();
   //Then, sort the filtered products
   filterProducts = sortProducts(fetchProducts);
   //clear the existing list
   productsList.innerHTML = '';

  if(filterProducts.length === 0){
   productsList.innerHTML = '<li>No products found</li>';
   return;
  } 
  // Display the filters and sorting 
  filterProducts.forEach(product=>{`
   <h3>${product.name}</h3>
   <p>Price: $${product.price}</p>
   <p>category:${product.subCategorySelect}</p>`
   ;
   productsList.appendChild(productItems);
  });
}
//reset the filter and sorting
resetBtn.addEventListener('click',()=>{
   subCategorySelect.value='';
   sortSelect.value = 'low-to-high';
   renderProducts();
});
//Event listener for the filter and sort controls
subCategorySelect.addEventListener('change',renderProducts);
sortSelect.addEventListener('change',renderProducts);
// Initial render of all products
renderProducts();