import { renderBasketItem, renderCategory, renderProducts } from "./ui.js"


document.addEventListener("DOMContentLoaded",()=>{
  fetchCategory();
  fetchProducts();
})

let fetchCategory=()=>{
  fetch("http://localhost:3000/category")
  .then((res)=>res.json())
  .then((data)=>renderCategory(data))
  .catch((err)=>console.log(err))
}

let globalData = [];

// Ürünler verisini çek
async function fetchProducts() {
  try {
    const res = await fetch("http://localhost:3000/products");
    const data = await res.json();
    globalData = data;

    renderProducts(data);
  } catch (err) {
    console.log(err);
  }
}

// Sepet eklenenleri tutucağımız dizi
let basket = [];
let total = 0;

const modal = document.querySelector('.modal-wrapper');
const sepetBtn = document.querySelector('#sepet-btn');
const closeBtn = document.querySelector('#close-btn');
const basketList = document.querySelector('.list');
const modalInfo = document.querySelector('.total-span');

// sepet butonuna basılma olyını izleme
sepetBtn.addEventListener('click', () => {
  // modalı görünür yapma
  modal.classList.add('active');
  // modalın içerisine sepetteki ürünleri listeleme
  addList();
});

// çarpı butonuna basılma olyını izleme
closeBtn.addEventListener('click', () => {
  // modalı ortadan kaldırdık
  modal.classList.remove('active');
  // spetin içindeki html'i temizle
  basketList.innerHTML = '';
  total = 0;
  modalInfo.textContent = '0';
});

// modal dışında bir yere tıklanma olayını izleme
document.addEventListener('click', (e) => {
  var clickedEl = e.target;
  if (clickedEl.classList.contains('modal-wrapper')) {
    modal.classList.remove('active');
    // spetin içindeki html'i temizle
    basketList.innerHTML = '';
    total = 0;
    modalInfo.textContent = '0';
  }
});

// uygulamadaki bütün tıklanma olylarını izleme
document.body.addEventListener('click', findItem);

// html tarafında tıklnılan elemanı tespit etme
function findItem(e) {
  // tıklanılan eleman
  const ele = e.target;

  // tıklanılan elemanın id si sepete ekle butonu mu kontrol
  if (ele.id === 'add-btn') {
    // id sine sahip olduğumuz ürünü dizi içerisinde bulma
    const selected = globalData.find(
      (product) => product.id == ele.dataset.id
    );
    // eğerki ürünün miktar değeri yoksa 1 e eşitle
    if (!selected.amount) {
      selected.amount = 1;
    }
    addToBasket(selected);
  }
  // tıklanılan eleman sepetteki sil ise
  if (ele.id === 'del-button') {
    // butonun kapsayıcısnı html'den kaldırma
    ele.parentElement.remove();

    // elemanı dizi içerisinde bulma
    const selected = globalData.find((i) => i.id == ele.dataset.id);

    deleteItem(selected);
  }
}

// elemanı sepete göndericek fonksiyon
function addToBasket(product) {
  // sepet'te bu elemandan var mı kontrol etme
  const foundItem = basket.find((item) => item.id == product.id);

  if (foundItem) {
    // eğer ürün sepette varsa bulanan ürünün miktarını artır
    foundItem.amount++;
  } else {
    // eğer ürün sepette yoksa  sepete ekleme
    basket.push(product);
  }
}

// ürünleri sepete aktarma fonksiyonu
function addList() {
  basket.forEach((product) => {
    // ürünü ekran bas
    renderBasketItem(product);
    // toplam fiyatı güncelle
    total += product.price * product.amount;
  });
  // modaldaki toplam fiyatı güncelleme
  console.log(total);
  modalInfo.textContent = total;
}

// ürünü diziden kaldırma
function deleteItem(deletingItem) {
  // id'si silincek elemanın id'sine eşit olmayanları alma
  const filtredData = basket.filter(
    (item) => item.id !== deletingItem.id
  );
  // sepet dizisini güncelleme
  basket = filtredData;

  // toplam fiyatı güncelleme
  total -= deletingItem.price * deletingItem.amount;

  modalInfo.textContent = total;
}

// Sepettki toplamı bulmak için fonksiyon
// function totalPrice() {
//   let totalPrice = 0;

//   for (let i = 0; i < basket.length; i++) {
//     totalPrice += basket[i].price * basket[i].amount;
//   }

//   return totalPrice;
// }

// console.log(TotalPrice());


