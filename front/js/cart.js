const cart = []

retrieveItemsFromCache ()
cart.forEach((item) => displayItem(item))
/*
altTxt: "Photo d'un canapé rose, une à deux place"
color: "Pink"
id: "a557292fe5814ea2b15c6ef4bd73ed83"
imageUrl: "http://localhost:3000/images/kanap04.jpeg"
price: 1499
quantity: 6
name: ma
*/
function retrieveItemsFromCache () {
const numberOfItems = localStorage.length
for (let i = 0; i < numberOfItems; i++) {
    const item = localStorage.getItem(localStorage.key(i))  || ""
    const itemObjet = JSON.parse(item)
cart.push(itemObjet)
}
}

function displayItem(item) {
    const article = makeArticle (item)
    const imageDiv = makeImageDiv(item)
    article.appendChild (imageDiv)
    const cardItemContent = makeCartContent (item) 
    article.appendChild (cardItemContent)
    displayArticle (article)
    displayTotalPrice  ()
}

function displayTotalPrice () {
    const totalPrice = document.querySelector ("#totalPrice")
    const total = cart.reduce ((total, item) => total + item.price * item.quantity, 0)
    totalPrice.textContent = total

}

function makeCartContent (item) {
    const cardItemContent = document.createElement ("div")
    cardItemContent.classList.add ("cart__item__content")

    const description=  makeDescription(item)
    const settings = makeSettings(item)

    cardItemContent.appendChild (description)
    cardItemContent.appendChild (settings)
    return cardItemContent
   
}


function makeSettings (item){
    const settings = document.createElement ("div")
    settings.classList.add ("cart__item__content__settings")

    addQuantityToSettings (settings, item)
    addDeleteToSettings (settings)
    return settings


}

function addDeleteToSettings (settings){
    const div = document.createElement("div")
    div.classList.add("cart__item__coontent__settings__delete")
    const p = document.createElement("p")
    p.textContent = "supprimer"
    div.appendChild(p)
    settings.appendChild(div)
}

function addQuantityToSettings (settings, item) {
    const quantity = document.createElement ("div")
    quantity.classList.add ("cart__item__content__settings__quantity")
    const p = document.createElement ("p")
    p.textContent =  "Qté : "
    quantity.appendChild(p)
    const input  = document.createElement ("input")
    input.type = "number"
    input.classList.add ("itemQuantity")
    input.name = "itemQuantity"
    input.min = "1"
    input.max = "100"
    input.value = item.quantity
    quantity.appendChild (input)
    settings.appendChild (quantity)




}

function makeDescription (item){
     const description = document.createElement ("div")
    description.classList.add ("cart__item__content__description")

    const h2 = document.createElement ("h2")
    h2.textContent = item.name
    const p = document.createElement ("p")
    p.textContent = item.color
    const p2 = document.createElement ("p")
    p2.textContent = item.price + "€"

    description.appendChild (h2)
    description.appendChild (p)
    description.appendChild (p2)

  return description
}


function displayArticle (article){
    document.querySelector ("#cart__items").appendChild(article)
}

function makeArticle (item){
    const article = document.createElement ("article")
    article.classList.add ("cart__item")
    article.dataset.id = item.id
    article.dataset.color = item.color
    return article
}
function makeImageDiv(item) {
    const div = document.createElement ("div")
    div.classList.add("cart__item__img")

    const image = document.createElement('img')
    image.src = item.imageUrl
    image.alt = item.altTxt
    div.appendChild(image)
    return div
}