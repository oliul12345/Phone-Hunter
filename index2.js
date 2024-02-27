const loadData = async (searchPhone = "iphone", isShowAll) => {
  const res = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${searchPhone}`
  );
  const data = await res.json();
  const phone = data.data;
  showPhones(phone, isShowAll);
};

/////   display the phones in the browser

const showPhones = (phone, isShowAll) => {
  // console.log(phone)
  const getPhoneContainer = document.getElementById("phone-container");
  ////  show all related work
  if (!isShowAll) {
    phone = phone.slice(0, 9);
  }

  ////   show all button
  const showBtn = document.getElementById("show-btn");
  if (phone.length >= 9 && !isShowAll) {
    showBtn.classList.remove("hidden");
  } else {
    showBtn.classList.add("hidden");
  }

  /////      empty the container after search one
  getPhoneContainer.innerHTML = "";

  phone.map((singlePhone) => {
    loadingSpinner(false); /////  loading spinner parameter
    console.log(singlePhone);
    const div = document.createElement("div");
    div.innerHTML = `
        <div class="card  bg-gray-500 text-black shadow-xl">
           <figure><img class = "w-3/5 rounded-xl" src=${singlePhone.image} alt="Shoes" /></figure>
            <div class="card-body">
               <h2 class="card-title">${singlePhone.brand}</h2>
               <p>${singlePhone.phone_name}</p>
            <div class="card-actions justify-center">
            <button onclick="handleDetails('${singlePhone.slug}');my_modal_1.showModal()" class="btn btn-primary">Show Details</button>
          </div>
        </div>
      </div>
        `;

    // onclick="handleDetails('${singlePhone.slug}'এখানে যদি সিংগাল কোটেশোন না দেই এরোর খাওয়া লাগবে।
    getPhoneContainer.appendChild(div);
  });
};

///   handle show details related work  ////

const handleDetails = async (id) => {
  const detailsDataLoad = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const res = await detailsDataLoad.json();
  const data = res.data;
  console.log(data);

  ///  show the modal information in details phone
  const getModalId = document.getElementById("my_modal_1");
  getModalId.innerHTML = "";
  const div = document.createElement("div");
  div.innerHTML = `
  <div class="modal-box">
        <img src=${data.image} alt="">
          <p class="py-4">${data.name}</p>
          <p class="py-4">${data.mainFeatures.memory}</p>
          <p class="py-4">${data.mainFeatures.chipSet}</p>
          <p class="py-4">${data.mainFeatures.displaySize}</p>
            <h3 class="font-bold text-lg">${data.slug}</h3>
            <p class="py-4">${data.releaseDate ? data.releaseDate : 'mor kono data nai'}</p>
            <div class="modal-action">
              <form method="dialog">
                <!-- if there is a button in form, it will close the modal -->
                <button class="btn">Close</button>
              </form>
            </div>
          </div>
  `;
  getModalId.appendChild(div);
};

/////  search related work is here below

const searchWork = (isShowAll) => {
  ///  isShowAll show all parameter
  loadingSpinner(true); ////   spinner parameter
  const getInputId = document.getElementById("search-input").value;
  console.log(getInputId);
  loadData(getInputId, isShowAll);
};

//////   loading spinner
const loadingSpinner = (isLoading) => {
  const getSpinnerId = document.getElementById("spinner-loading");
  if (isLoading) {
    getSpinnerId.classList.remove("hidden");
  } else {
    getSpinnerId.classList.add("hidden");
  }
};

/////     show all the phone in show all button
const handleShowAllBtn = () => {
  searchWork(true);
};
loadData();
