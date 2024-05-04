

let parentDiv=document.querySelector(".categories") 

const productList = document.querySelector('.products');
const basketList = document.querySelector('.list');
export let renderCategory=(dat)=>{
  dat.forEach((element)=>{
    let divEl=document.createElement("div")
    divEl.classList.add("ktg")
    divEl.innerHTML=`
            <img src=${element.image} alt="">
            <span>${element.name}</span>
                `
    parentDiv.appendChild(divEl)            
  });
}

export function renderProducts(products) {
  products.forEach((product) => {
    
      // div oluşturma
      const productCard = document.createElement('div');
      // gerekli class atamasını yapma
      productCard.className = 'product';
      // kartın içeriğini belirleme
      productCard.innerHTML = `
            <img src=${product.images[0]} />
            <p>${product.title}</p>
            <p>${product.category.name}</p>
            <div class="product-info">
              <p>${product.price} $</p>
              <button id="add-btn" data-id=${product.id}>Sepete Ekle</button>
            </div>      
      `;
      //   elemanı html'e gönderme
      productList.appendChild(productCard);
    });
}
// ürünü ekran basma fonksiyonu
export function renderBasketItem(product) {
  const basketItem = document.createElement('div');

  basketItem.classList.add('list-item');

  basketItem.innerHTML = `
   <img src=${product.images[0]} />
   <h2>${product.title}</h2>
   <h2>${product.price}</h2>
   <p>Miktar: ${product.amount}</p>
   <button id="del-button" data-id=${product.id}>sil</button>
  `;

  basketList.appendChild(basketItem);
}
