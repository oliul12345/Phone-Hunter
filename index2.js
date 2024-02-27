

const loadData = async(searchPhone,isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchPhone}`)
    const data = await res.json()
    const phone = data.data;
    showPhones(phone,isShowAll)
  
}


/////   display the phones in the browser

const showPhones = (phone,isShowAll) => {
    // console.log(phone)
    const getPhoneContainer = document.getElementById('phone-container')
     ////  show all related work
     if(!isShowAll){
      phone = phone.slice(0,9);
     }
    

    ////   show all button 
    const showBtn = document.getElementById('show-btn')
    if(phone.length >= 9 && !isShowAll){
      showBtn.classList.remove('hidden')
    }
    else{
      showBtn.classList.add('hidden')
    }
    
    /////      empty the container after search one 
    getPhoneContainer.innerHTML = ''

    phone.map(singlePhone => {
      loadingSpinner(false)  /////  loading spinner parameter
        console.log(singlePhone)
        const div = document.createElement('div')
        div.innerHTML = `
        <div class="card  bg-gray-500 text-black shadow-xl">
           <figure><img class = "w-3/5 rounded-xl" src=${singlePhone.image} alt="Shoes" /></figure>
            <div class="card-body">
               <h2 class="card-title">${singlePhone.brand}</h2>
               <p>${singlePhone.phone_name}</p>
            <div class="card-actions ">
            <button class="btn btn-primary">Buy Now</button>
          </div>
        </div>
      </div>
        `
        getPhoneContainer.appendChild(div)
    })
}


/////  search related work is here below

const searchWork = (isShowAll) => {  ///  isShowAll show all parameter
  loadingSpinner(true) ////   spinner parameter
  const getInputId = document.getElementById('search-input').value; 
  console.log(getInputId)
  loadData(getInputId,isShowAll)
}

//////   loading spinner 
const loadingSpinner = (isLoading) => {
  const getSpinnerId = document.getElementById('spinner-loading');
  if(isLoading){
    getSpinnerId.classList.remove('hidden')
  }
  else{
    getSpinnerId.classList.add('hidden')
  }
}


/////     show all the phone in show all button  
const handleShowAllBtn = () => {
  searchWork(true)
}
