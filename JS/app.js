const loadData = async () =>{
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url)
    const data = await res.json()
    displayData(data.data.news_category)
}

const displayData = newsPaper =>{
    newsPaper.forEach(news => {
        // console.log(news);
        const newsContainer = document.getElementById('news-container');
        const newsList = document.createElement('li');
        newsList.classList.add('nav-item');
        newsList.innerHTML = `
        <a onclick="newsdetails('${news.category_id}')" class="nav-link active" aria-current="page">${news.category_name}</a>
        `
        newsContainer.appendChild(newsList);
    });
}

const newsdetails = async(id)=>{
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    const res = await fetch(url);
    const data = await res.json();
    displayNewsDetails(data.data);
    tonggleSpiner(true);
}

const displayNewsDetails = details =>{
    const newsContainer = document.getElementById('news-details');
    newsContainer.textContent = "";
    const totalResult = document.getElementById('total-news');
    if(details.length>0){
        totalResult.classList.remove('d-none')
        totalResult.innerHTML =`
        <p> Total News Found: ${details.length} </p>
        `
    }
    else{
        totalResult.classList.add('d-none');
    }
    details.forEach(detail =>{
        console.log(detail);
        
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('card','mb-4');
        newsDiv.innerHTML = `
        <div class="row g-0">
            <div class="col-md-4">
                <img src="${detail.thumbnail_url}" class="img-fluid rounded-start w-75 h-100" alt="...">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                <h5 class="card-title">${detail.title}</h5>
                <p class="card-text">${detail.details.slice(0,200)}...</p>
                <img src="${detail.author.img}" class="img-fluid h-25 w-25 rounded-circle" alt="...">
                <small class="text-muted pe-5">${detail.author.name}</small>
                <i class="fa-regular fa-eye"><small class="text-muted ps-1 pe-3">${detail.total_view}</small></i>
                <i class="fa-regular fa-star-half-stroke"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star"></i>
                <i class="fa-regular fa-star pe-5"></i>
                <button onclick = "loadNewsModal('${detail._id}')" type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#newsDetails">
                Show Details
                </button>
                </div>
            </div>
        </div>
        `
        newsContainer.appendChild(newsDiv);
       
    })
    tonggleSpiner(false);
}

const tonggleSpiner = isLoading =>{
    const loader = document.getElementById('loader');
    if (isLoading) {
        loader.classList.remove('d-none')
    }
    else{
        loader.classList.add('d-none');
    }
}

const loadNewsModal = async(newsId)=>{
    const url = `https://openapi.programming-hero.com/api/news/${newsId}`
    const res = await fetch(url);
    const data = await res.json();
    displayNewsModal(data.data[0]);
}

const displayNewsModal = modalDetails =>{
    console.log(modalDetails);
    const newsTitle = document.getElementById('newsDetailsLabel');
    newsTitle.innerText = modalDetails.title;
    const newsBody = document.getElementById('modal-detail');
    newsBody.innerHTML = `
    <img src="${modalDetails.image_url}" class="img-fluid rounded-start w-100 h-100" alt="...">
    <p>${modalDetails.details}</p>
    `
}


loadData();