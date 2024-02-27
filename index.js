
const loadPhone = async (searchText) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  );
  const data = await res.json();
  const phones = data.data;
  console.log(data)
  displayPhone(phones);
};


const displayPhone = (phone) => {
  const phoneContainer = document.getElementById("phone-container");
  /////    empty this container 
  phoneContainer.innerHTML = ''
  /////    show all button here is here 
  const btn = document.getElementById('btn-container')
    if(phone.length > 12){
        btn.classList.remove('hidden');
    }else{
        btn.classList.add('hidden');
    }
  phone = phone.slice(0,12)

  phone.map((p) => {
    const div = document.createElement("div");
    console.log(p);
    div.innerHTML = `
        <div class="card  bg-teal-500 text-black shadow-xl">
            <figure><img class = "w-3/5 rounded-xl" src=${p.image} alt="Shoes" /></ figure>
            <div class="card-body">
            <h2 class="card-title">${p.brand}</h2>
            <p>${p.phone_name}</p>
            <div class="card-actions ">
            <button class="btn btn-primary">Buy Now</button>
        </div>
        </div>
      </div>
        `;
        phoneContainer.appendChild(div)
  });
};

const searchPhone = () => {
    const searchField = document.getElementById('search-input');
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText);
}


