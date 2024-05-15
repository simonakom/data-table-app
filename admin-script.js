// Local storage
console.log(localStorage.getItem("products"));
if (!localStorage.getItem("products")) {  //if false, then create a new record in localstorage
    localStorage.setItem("products", JSON.stringify([]));
}
const products = JSON.parse(localStorage.getItem("products"));

//if value is false, numbering is set from 1
if (!localStorage.getItem("currentId")) {
    localStorage.setItem("currentId", "1");
}

let currentId = +localStorage.getItem("currentId")

// Html elements
const dynamicDataElement = document.getElementById("dynamic-data"),
    titleInputElement = document.getElementById("title"),
    priceInputElement = document.getElementById("price"),
    stockInputElement = document.getElementById("stock"),
    brandInputElement = document.getElementById("brand"),
    categoryInputElement = document.getElementById("category"),
    submitButtonElement = document.getElementById("submit"),
    addResult = document.getElementById ("add-result"),

    modalElement = document.getElementById("productInfo"),
    photoElement = document.getElementById("imageUrl"),
    discountElement = document.getElementById("discount"),
    ratingElement = document.getElementById("rating"),
    descriptionElement = document.getElementById("description");

    filterNameElement = document.getElementById ("filterProductName")
    filterBrandElement = document.getElementById ("filterBrand")
    filterPriceFromElement = document.getElementById ("filterPriceFrom")
    filterPriceToElement = document.getElementById ("filterPriceTo")
    filterCategoryElement = document.getElementById ("filterCategory")
    filterDiscountElement = document.getElementById ("filterDiscount")
    filterDescriptionElement = document.getElementById ("filterDescription")
    resetFiltersButton = document.getElementById('resetFilters');

//Filtering:
// if arrey (products) is different for each input
// filterNameElement.onkeyup = (event)=> {
// let productName = filterNameElement.value.toLowerCase();
// const filteredArrey = products.filter((product) => product.title.toLowerCase().includes (productName))
// getTableContents (filteredArrey);
// }

// if Arrey is same for each input
filterNameElement.onkeyup = filter; 
filterBrandElement.onkeyup = filter;
filterPriceFromElement.onkeyup = filter;
filterPriceToElement.onkeyup = filter;
filterDescriptionElement.onkeyup = filter;
filterDiscountElement.onkeyup = filter;
filterCategoryElement.addEventListener('change', filter);

function filter () {
    let productName = filterNameElement.value.toLowerCase();
    let brandName = filterBrandElement.value.toLowerCase();
    let minPrice = +filterPriceFromElement.value;
    let maxPrice = +filterPriceToElement.value;
    let descriptionText =  filterDescriptionElement.value;
    let discountNumber = +filterDiscountElement.value
    let categoryName = filterCategoryElement.value.toLowerCase();

    let filteredArrey = products.filter((product) => product.title.toLowerCase().includes (productName));
    filteredArrey = filteredArrey.filter((product) => product.brand.toLowerCase().includes (brandName));
    filteredArrey = filteredArrey.filter ((product) => product.price >= minPrice);
    if (maxPrice !== 0){
        filteredArrey = filteredArrey.filter ((product) => product.price <= maxPrice);
    }
    filteredArrey = filteredArrey.filter ((product) => product.description.toLowerCase().includes (descriptionText));
    filteredArrey = filteredArrey.filter ((product) => product.discountPercentage >= discountNumber);
    filteredArrey = filteredArrey.filter((product) => {
        return categoryName === 'choose...' || product.category.toLowerCase().includes(categoryName);
        });

    getTableContents (filteredArrey);
    console.log(filteredArray);
}

resetFiltersButton.addEventListener('click', refreshPage);
function refreshPage() {
location.reload();
}
// function resetFilters() {
// // Reset all filter inputs to their default values or empty
// filterNameElement.value = '';
// filterBrandElement.value = '';
// filterPriceFromElement.value = '';
// filterPriceToElement.value = '';
// filterDescriptionElement.value = '';
// filterDiscountElement.value = '';
// filterCategoryElement.value = 'Choose...';

// // Trigger the filter function to apply the reset values
// filter();
// }

// READ 
const getTableContents = (productsArrey) => {
        let dynamicHTML = ``;
    // The current object "product" is taken from the array "products" and the loop repeats 30 times 
    for (const product of productsArrey) {
        //Additional delete button is created (only here) and assigned the delete function. The button provides a reference to the button id to be deleted. The id remains unique always.
        //Additional update button is created (only here) and the setEdit function is assigned to it. When we set editing to a product - then all the actions from the product are moved to the inputes.
            dynamicHTML += `<tr>
                <td class="productId" onclick="showaModal(${product.id})">${product.id}</td>
                <td>${product.title}</td>
                <td>${product.price}</td>
                <td>${product.stock}</td>
                <td>${product.brand}</td>
                <td>${product.category}</td>
                <td>
                    <button class="btn btn-default" id="delete" onclick="deleteProduct(${product.id})"style="margin-bottom: 3px;">Delete</button>
                    <button class="btn btn-default" id="update" onclick="setEdit(${product.id})" style="margin-bottom: 3px;">Update</button>
                </td>
        </tr>`;
    }  
    // enter the result of the cycle into html (console.log ([dynamicDataElement]));
    dynamicDataElement.innerHTML = dynamicHTML; //if add with  += ten "EXAMPLE" row is added
};

getTableContents (products);

//MODAL
const showaModal = (id) => {
    let elementIndex = products.findIndex((value) => value.id === id); //get the index (position) of the element in the array
    const product = products[elementIndex];

    let dynamicHTML = 
    `<div id="modalBody" style="width:100%; height: 100%;"><div style="max-width: 58%; margin: 0 auto">
    <img src="${product.thumbnail}" class="my-3 logoSize rounded-2" alt="Product photo"/>
    <div class="product-details">
        <div class="row">
            <span class="col-lg-3 fw-bold">Discount</span>
            <span class="col-lg-1">${product.discountPercentage}%</span>
        </div>
        <div class="row">
            <span class="col-lg-3 fw-bold">Rating</span>
            <span class="col-lg-9">${product.rating} out of 5 </span>
        </div>
        <div class="row">
            <span class="col-lg-3 fw-bold">Description </span>
            <span class="col-9">${product.description}</span>
        </div>
    </div>
     <div class="d-flex align-items-center justify-content-center">
        <button type="button" class="btn btn-default px-5 my-4" id="submit" onclick="modalElement.close()">Close</button>
     </div>
    </div></div>`;

    modalElement.innerHTML = dynamicHTML;

    //Clicking on the background will open the modal window
    document.querySelector("#modalBody").onclick = (event) => {  //to have two cycles - window/background
        event.stopPropagation();  //to prevent the transfer of the click to the background 
        console.log("clicked on modal window")
    }
    modalElement.showModal();
} 
//Clicking on the modal background:
modalElement.onclick = () => {
    modalElement.close ();
    console.log ("cliclked on modal element")
}

// CREATE
const createNewRecord = (event) => {
//event.PreventDefault - to prevent page from reloading (most often used with forms where button type is not specified: buttin,  because then it automatically becomes submit and reloads)
event.preventDefault(); //console.log (event);
    const newProduct = {
        id: currentId,  //each new element added will have a higher and higher id depending on the id of the last element (until the modal cration id was: products[products.length - 1].id + 1,)
        title: titleInputElement.value,
        description: descriptionElement.value,
        price: + priceInputElement.value, // + convert to numbers
        discountPercentage: +discountElement.value, 
        rating: +ratingElement.value,
        stock: +stockInputElement.value,
        brand: brandInputElement.value,
        category: categoryInputElement.value,
        thumbnail: photoElement.value
};

    // Get input values for validation:
    const title = titleInputElement.value;
    const brand = brandInputElement.value;
    const price = priceInputElement.value;
    const stock = stockInputElement.value;
    const category = categoryInputElement.value;
    const discountPercentage = discountElement.value;
    const rating = ratingElement.value;
    const thumbnail = photoElement.value;
    const description = descriptionElement.value;
    // console.log(title), console.log(price), console.log(stock), console.log(brand), console.log(category)

    // Validations:
    if (!title || !price || !stock || !brand || !category || !discountPercentage || !rating || !thumbnail || !description)  {
        addResult.innerText = (`Please, fill in the complete form! \n Only number should be typed in Price/Stock/Discount/Rating`)
        addResult.style.display = 'block';
        addResult.style.backgroundColor = '#cf7a847f';
        return;
    } else {
        addResult.style.display = 'none';
    }

    if (category == '' || category === 'Choose...') {
        addResult.innerText =  ('Please select a category!');
        addResult.style.display = 'block';
        addResult.style.backgroundColor = '#cf7a847f';
        return;
    } else {
        addResult.style.display = 'none';
    }

    // Validate thumbnail size
    const thumbnailImg = new Image();
    thumbnailImg.onload = function () {
        if (thumbnailImg.width < 500 || thumbnailImg.height < 500 || thumbnailImg.width > 1200 || thumbnailImg.height > 1200) {
            addResult.innerText = "Thumbnail image must be at least 500x500px up to 1200x1200px";
            addResult.style.display = "block";
            addResult.style.backgroundColor = "#cf7a847f";
        } else {
            // Check for duplicate product
            const duplicateProduct = products.find(
                (existingProduct) =>
                    existingProduct.title.toLowerCase() === newProduct.title.toLowerCase() &&
                    existingProduct.price === newProduct.price &&
                    existingProduct.stock === newProduct.stock &&
                    existingProduct.brand.toLowerCase() === newProduct.brand.toLowerCase() &&
                    existingProduct.category === newProduct.category &&
                    existingProduct.discountPercentage === newProduct.discountPercentage &&
                    existingProduct.rating === newProduct.rating &&
                    existingProduct.thumbnail === newProduct.thumbnail &&
                    existingProduct.description === newProduct.description
            );

            if (duplicateProduct) {
                addResult.innerText = "A product with the same details already exists!";
                addResult.style.display = "block";
                addResult.style.backgroundColor = "#cf7a847f";
            } else {
                // Add new product to the "products" array
                products.push(newProduct);
                currentId++;

                // Clear inputs
                titleInputElement.value = "";
                priceInputElement.value = "";
                stockInputElement.value = "";
                brandInputElement.value = "";
                categoryInputElement.value = "";
                photoElement.value = "";
                ratingElement.value = "";
                discountElement.value = "";
                descriptionElement.value = "";

                addResult.innerText = "New element has been successfully added!";
                addResult.style.display = "block";
                addResult.style.backgroundColor = "#76cd7e7f";

                localStorage.setItem("products", JSON.stringify(products));
                localStorage.setItem("currentId", currentId);
                
                getTableContents(products);
            }
        }
    };
    thumbnailImg.onerror = function () {
        addResult.innerText = "Invalid thumbnail image URL.";
        addResult.style.display = "block";
        addResult.style.backgroundColor = "#cf7a847f";
    };
    thumbnailImg.src = thumbnail;
};

submitButtonElement.onclick = createNewRecord;

// DELETE
const deleteProduct = (id) => {
    // Unique/non-repeating ID. to find the location of an item in the array - use findindex. Function("value"- the value of each product): in this function, we search for a product whose id matches the previous id specified in (deleteProducts).
    let elementIndex = products.findIndex(value=>value.id === id);
    // console.log(elementIndex); 
    products.splice(elementIndex,1);

    addResult.style.display = 'block';
    addResult.innerText = 'Selected element has been successfully deleted!';
    addResult.style.backgroundColor = '#76cd7e7f';

    localStorage.setItem("products", JSON.stringify(products));
    getTableContents (products);
};

// UPDATE
// when we are not in update mode (no button pressed) then it is false. When pressed, the mode changes to "true".
let editMode = false; 
let currentProduct;

// Back to Initial state: when the update is complete, revert to the default view
const updateProduct = (event)=> {
    event.preventDefault();

    // Check for duplicates before updating
    const updatedTitle = titleInputElement.value;
    const updatedPrice = +priceInputElement.value;
    const updatedStock = +stockInputElement.value;
    const updatedBrand = brandInputElement.value;
    const updatedCategory = categoryInputElement.value;
    const updatedThumbnail = photoElement.value;
    const updatedRating = +ratingElement.value;
    const updatedDiscountPercentage = +discountElement.value;
    const updatedDescription = descriptionElement.value;

    const duplicateProduct = products.find(
    (existingProduct) =>
        existingProduct.id !== currentProduct &&
        existingProduct.title.toLowerCase() === updatedTitle.toLowerCase() &&
        existingProduct.price === updatedPrice &&
        existingProduct.stock === updatedStock &&
        existingProduct.brand.toLowerCase() === updatedBrand.toLowerCase() &&
        existingProduct.category === updatedCategory &&
        existingProduct.thumbnail === updatedThumbnail &&
        existingProduct.rating === updatedRating &&
        existingProduct.discountPercentage === updatedDiscountPercentage &&
        existingProduct.description === updatedDescription
    );

    if (duplicateProduct) {
        addResult.innerText = `A product with the same details already exists!`;
        addResult.style.display = 'block';
        addResult.style.backgroundColor = '#cf7a847f';
        return;
    }
    
    // Validate thumbnail URL
 const thumbnailImg = new Image();
 thumbnailImg.onerror = function () {
     addResult.innerText = "Invalid thumbnail image URL";
     addResult.style.display = "block";
     addResult.style.backgroundColor = "#cf7a847f";
 };
 thumbnailImg.onload = function () {
     // Check if thumbnail dimensions are within the specified range
     if (thumbnailImg.width < 500 || thumbnailImg.height < 500 || thumbnailImg.width > 1200 || thumbnailImg.height > 1200) {
         addResult.innerText = "Thumbnail image must be at least 500x500px up to 1200x1200px";
         addResult.style.display = "block";
         addResult.style.backgroundColor = "#cf7a847f";
     } else {
         // Continue with update if no duplicate and thumbnail is valid
         // Update product details
         products[currentProduct].title = updatedTitle;
         products[currentProduct].price = updatedPrice;
         products[currentProduct].stock = updatedStock;
         products[currentProduct].brand = updatedBrand;
         products[currentProduct].category = updatedCategory;
         products[currentProduct].thumbnail = updatedThumbnail;
         products[currentProduct].rating = updatedRating;
         products[currentProduct].discountPercentage = updatedDiscountPercentage;
         products[currentProduct].description = updatedDescription;

         // Check for incomplete form
         if (!updatedTitle || !updatedPrice || !updatedStock || !updatedBrand || !updatedCategory || !updatedThumbnail || !updatedRating || !updatedDiscountPercentage || !updatedDescription) {
             addResult.innerText = (`Please, fill in the complete form! \n Only numbers should be typed in Price/Stock/Discount/Rating`);
             addResult.style.display = 'block';
             addResult.style.backgroundColor = '#cf7a847f';
             return;
         }

         // Check for empty category
         if (updatedCategory === '' || updatedCategory === 'Choose...') {
             addResult.innerText = ('Please select a category!');
             addResult.style.display = 'block';
             addResult.style.backgroundColor = '#cf7a847f';
             return;
         }

         // Reset form and display success message
         currentProduct = undefined;
         editMode = false;
         submitButtonElement.onclick = createNewRecord;
         submitButtonElement.innerText = 'Submit';
         submitButtonElement.style.backgroundColor = '#6687b3';

         // Clear form inputs
         titleInputElement.value = "";
         priceInputElement.value = "";
         stockInputElement.value = "";
         brandInputElement.value = "";
         categoryInputElement.value = "";
         photoElement.value = "";
         ratingElement.value = "";
         discountElement.value = "";
         descriptionElement.value = "";

         // Display success message
         addResult.style.display = 'block';
         addResult.innerText = 'Selected element has been successfully updated!';
         addResult.style.backgroundColor = '#76cd7e7f';

         // Update table contents
         getTableContents(products);

         // Update the products array in localStorage
        localStorage.setItem("products", JSON.stringify(products));
     }
 };
 thumbnailImg.src = updatedThumbnail;
};

//Edit state:  updating the element. A certain product will be edited and its id is (id):
const setEdit = (id) => {
    //found the index of this product in the array (by id)
    let elementIndex = products.findIndex(value=>value.id === id);
    //get the product itself (its value). By the index we find which product will be edited
    const product = products[elementIndex]; //console.log(product)
    //to make all the values from the selected product appear in the input
    titleInputElement.value = product.title;
    priceInputElement.value = product.price;
    stockInputElement.value = product.stock;
    brandInputElement.value = product.brand;
    categoryInputElement.value = product.category;
    photoElement.value = product.thumbnail;
    ratingElement.value = product.rating;
    discountElement.value = product.discountPercentage;
    descriptionElement.value = product.description;

    submitButtonElement.innerText = 'Update';
    submitButtonElement.style.backgroundColor = 'rgba(177, 111, 177, 0.805)';
    //assign function to button
    submitButtonElement.onclick = updateProduct;

    //element position in array to edit
    currentProduct = elementIndex; 

    editMode = true; 

    // Scroll to the top of the page
    window.scrollTo(0, 0);
};

// Hide notes when clicked
document.addEventListener("DOMContentLoaded", function () {
    const addResult = document.querySelector('#add-result');

    function hideResult(result) {
        result.style.display = 'none';
    }
    addResult.addEventListener('click', function () {
        hideResult(addResult);
    });
});