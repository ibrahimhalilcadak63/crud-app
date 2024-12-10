//* Düzenleme Seçenekleri
let editFlag = false; //* Düzenleme modunda olup olmadığını belirtir.
let editElement;
let editID = ""//*Düzenleme yapılan öğenin benzersiz kimliği
//* Gerekli html elementlerini seçme
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const list = document.querySelector(".grocery-list");
const alert = document.querySelector(".alert");
console.log(alert);
const submitBtn = document.querySelector(".submit-btn");
const clearBtn = document.querySelector(".clear-btn");




//! Fonksiyonlar
//*Ekrana bildirim bastıracak fonksiyondur.
const displayAlert = (text,action) => {
    alert.textContent = text;//* alert classlı etiketin içerisini dışarıdan gönderilen parametre ile değiştirdik.
    alert.classList.add(`alert-${action}`);//*p etiketine dinamik class ekledik.

    setTimeout(()=>{
        alert.textContent = "";//*alert etiketinin içerisini boş stringe çevirdik.
        alert.classList.remove(`alert-${action}`);//* Eklediğiniz classı kaldırdık.
    },2000);
   
};
const setBackToDefault = () => {
    grocery.value = "";
    editFlag = false;
    editID = "";
    submitBtn.textContent = "Ekle";

};
//*Varsayılan değerlere dönderir.
const addItem = (e) => {
    e.preventDefault(); //* Formun gönderilme olayında sayfanın yenilenmesini engeller.
    const value = grocery.value; //* Inputun içerisine girilen değeri aldık.
    const id = new Date().getTime().toString();//* Benzersiz bir id oluşturduk.
   

  //* Eğer inputun içerisi boş değilse ve düzenleme modunda değilse
    if (value !== "" && !editFlag) {
    const element = document.createElement("article"); //*Yeni bir article öğesi oluşturur.
    console.log(element);
   let Attr = document.createAttribute("data-id"); //*Yeni bir veri kimliği oluştur.
   Attr.value = id;
   element.setAttributeNode(Attr); //* Oluşturduğumuz id yi data özellik olarak set ettik.
   element.classList.add("grocery-item"); //* article etiketine class ekledik.
   console.log(element);
   element.innerHTML = ` <p class="title">${value}</p>
   <div class="btn-container">
       <button type="button" class="edit-btn">
           <i class="fa-solid fa-pen-to-square"></i>
           
       </button>
       <button type="button" class="delete-btn">
           <i class="fa-solid fa-trash"></i>
       </button>
   </div>`;
    //*Oluşturduğumuz bu butonlara olay izleyicileri ekleyebilmemiz için seçtik.
   const deleteBtn = element.querySelector(".delete-btn");
   deleteBtn.addEventListener("click", deleteItem);
   const editBtn = element.querySelector(".edit-btn");
   editBtn.addEventListener("click", editItem);
   list.appendChild(element); //* Oluşturduğumuz "article" etiketini html'e ekledik.
   displayAlert("Başariyla Eklenildi", "success");
   //*Varsayılan değerlere dönderecek fonksiyon
    editLocalStorage(editID,value);
    setBackToDefault();
    
    }else if (value !== "" && editFlag){
        editElement.innerHTML = value; //*Güncelleyeceğimiz elemanın içeriğini değiştirdik.
        
    };
    displayAlert("Başariyla Değiştirildi","success");
    setBackToDefault();

};
//*Silme butonuna tıklanıldığında çalışır.
const deleteItem = (e) =>{
    const element = e.target.parentElement.parentElement.parentElement;//*Sileceğimiz etikete kapsayıcıları yardımı ile ulaştık.
    const id = element.dataset.id;
    console.log(element);
    list.removeChild(element);//* Bulduğumuz article etiketini list alanı içerisinden kaldırdık.
    displayAlert("Başarıyla Kaldırıldı","danger");//*Ekrana gönderdiğimiz parametrelere göre bildirim bastırır.
    
};
//*Yerel depodan id sine göre silme işlemi
const removeFromLocalStorage = (id) => {
    let items = getLocalStorage();
    items.filter((item) => (items.id !==id));
    localStorage.setItem("list", JSON.stringify(items));
  
}; 
const editItem = (e)=>{
   const element = e.target.parentElement.parentElement.parentElement;
   editElement = e.target.parentElement.parentElement.previousElementSibling;//*Düzenleme yaptığımız etiketi seçtik.
   grocery.value = editElement.innerText;
   editFlag = true;
   editID = element.dataset.id; //*Düzenlenen öğenin kimliğini gönderdik

   submitBtn.textContent = "Düzenle";//* Edit botonuna tıklanıldığında ekle butonu düzenle olarak değişir.

};
const clearItems = () => {
    const items = document.querySelectorAll(".grocery-item");
    
    //*Listede article etiketi var mı
    if (items.length>0){
        items.forEach((item)=> list.removeChild(item));//*ForEach ile dizi içerisinde bulunan her bir elemanı dönüp, her bir öğeyi listeden kaldırdık.
   
    }
    
    displayAlert("Liste Boş", "danger");
    localStorage.removeItem("list");
    
   
};
//*Yerel Depoya öğe ekleme işlemi
const addToLocalStorage = (id,value)=>{
   const grocery = (id, value);
   let items= getLocalStorage();
   items.push(grocery);
   console.log(items);
   localStorage.setİtem("list", JSON.stringify(items));
};
//*Yerel depodan öğeleri alma işlemi
function getLocalStorage(){
    return localStorage.getItem("list")
    ? JSON.parse(localStorage.getItem("list"))
    :[];
};
//*Yerel depodan id'sine göre silme işlemi
const removeFromLocalStorage => {

};

const editLocalStorage = (id, value) => {
    let items = getLocalStorage();

    items = items.map((item) => {
        if (item.id === id) {
            item.value = value;
        }
        return item;
    });
    localStorage.setItem("list", JSON.stringify(items));
}
//*Gönderilen id ve value ye sahip bir öğe oluşturan fonksiyon
const createListİtem = (id, value) => {
    const element = document.createElement("article"); //*Yeni bir article öğesi oluşturur.
    console.log(element);
   let Attr = document.createAttribute("data-id"); //*Yeni bir veri kimliği oluştur.
   Attr.value = id;
   element.setAttributeNode(Attr); //* Oluşturduğumuz id yi data özellik olarak set ettik.
   element.classList.add("grocery-item"); //* article etiketine class ekledik.
   console.log(element);
   element.innerHTML = ` <p class="title">${value}</p>
   <div class="btn-container">
       <button type="button" class="edit-btn">
           <i class="fa-solid fa-pen-to-square"></i>
           
       </button>
       <button type="button" class="delete-btn">
           <i class="fa-solid fa-trash"></i>
       </button>
   </div>`;
    //*Oluşturduğumuz bu butonlara olay izleyicileri ekleyebilmemiz için seçtik.
   const deleteBtn = element.querySelector(".delete-btn");
   deleteBtn.addEventListener("click", deleteItem);
   const editBtn = element.querySelector(".edit-btn");
   editBtn.addEventListener("click", editItem);
   list.appendChild(element); //* Oluşturduğumuz "article" etiketini html'e ekledik.
   displayAlert("Başarıyla Eklenildi", "success");
};
const setupItem = () =>{
   let items = getLocalStorage();
   console.log(items);
   if (items.length>0){
    items.forEach((item) =>{
        createListItem(item,id, item,value);
    });
   };
};
//! Olay İzleyicileri
//* Form gönderildiğinde addItem fonksiyonu çalışır.
form.addEventListener("submit", addItem);
clearBtn.addEventListener("click", clearItems);
window.addEventListener("DOMContentLoaded", setupItem);
