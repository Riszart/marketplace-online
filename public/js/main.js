"use strict"
dataMark.forEach(element=>{
  const article = document.createElement('article')
  article.classList.add('item-shop')
  const img = document.createElement('img')
  img.setAttribute('src', `${element.image}`)
  const p  = document.createElement('p')
  p.innerText = element.name
  article.append(img,p)
  containerShopLogo.appendChild(article)
})
async function getCategoryIndex(){
	const {categories} = await getAll()
	categories.forEach(element=>{
    const article = document.createElement('article')
    article.classList.add('item-shop')
    const img = document.createElement('img')
    img.setAttribute('src', `${element.imge_category}`)
    const p  = document.createElement('p')
    p.innerText = element.name
    article.append(img,p)
    containerCategoryLogo.appendChild(article)
	})
}
async function showProduct(){
	const {products} = await getAll()
  let count = 1
	products.forEach((element)=>{
    if(count <= 5){
      const article = document.createElement('article');
      article.classList.add('products-index__show');
      const item = `
      <section class="products-index__image"><img src="${element.image}" alt=""></section>
      <section class="products-index__mark"><p></p></section>
      <section class="products-index__name"><p>${element.title}</p></section>
      <section class="products-index__price"><span>$</span><span>${element.price}</span></section>
      `;
      article.innerHTML = item;
      containerProductItems.appendChild(article);
      count++
    }
	})
}
showProduct()
getCategoryIndex()