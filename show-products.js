//to get objects from localStorage:
const products = JSON.parse(localStorage.getItem("products"));
console.log(products)

function generateStars(rating) { //rating parameter - number 0-5
    const fullStar = `<i class="bi bi-star-fill"></i>`,
        halfStar = `<i class="bi bi-star-half"></i>`,
        emptyStar = '<i class="bi bi-star"></i>';

    let dynamicHTML ="";
    const countOfFullStars = Math.floor(rating), //is the integer part (Math.floor) of the number (rating)
            halfStarShouldExist = rating - countOfFullStars >= 0.5, //True/False: if part of the number is greater than 0.50, then 4 and a half starts are displayed
            emptyStarCount =  halfStarShouldExist ? 4-countOfFullStars : 5-countOfFullStars  //Bolean: if (halfStarShouldExist) is true, then 4(countOfFullStars), otherwise if half star is not added then from 5-(countOfFullStars)

    //add stars to dynamicHTML
    for (let i=0; i<countOfFullStars; i++) dynamicHTML+=fullStar;
    if (halfStarShouldExist) dynamicHTML+= halfStar;
    for (let i =0; i<emptyStarCount; i++) dynamicHTML+= emptyStar;
    return dynamicHTML;
}

function showProducts() {
	let dynamicHTML = "";
	for (const product of products) {
        //Current (product) is in (products) object. Refer with $ to current product.
		dynamicHTML += 
        //Math.round- fill number
        //toFixed(2) - 2 numbers after coma
        `<hr />
        <div class="product">
            <div class="product-image">
                <span class="discount"> - ${Math.round(product.discountPrecentage)} %</span>
                <img src="${product.thumbnail}" alt="product image" class="product-img"/>
            </div>

            <div class="product-details">
                <h3 class="product-title">${product.title}</h3>
                <span class="stars">${generateStars(product.rating)}</span>
                <p class="product-description">${product.description}</p>
            </div>

            <div class="product-price">
                <div class="price"><strong> $${(product.price * ((100 - product.discountPrecentage) / 100)).toFixed(2)}</strong><sup class="older-price">$${product.price.toFixed(2)}</sup></div>
                <button class="add-to-cart">Add to Cart</button>
            </div>
        </div>`;
	}
   //Add dynamicHTML to the element with class container:
   document.querySelector(".container").innerHTML = dynamicHTML;
}

showProducts(); 


