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

}

const displayNewsDetails = details =>{
    details.forEach(detail =>{
        console.log(detail);
        const newsContainer = document.getElementById('news-details');
        // newsContainer.innerHTML = "";
        const newsDiv = document.createElement('div');
        newsDiv.classList.add('row');
        newsDiv.innerHTML = `
        <div class="col-md-4">
            <img src="${detail.thumbnail_url}" class="img-fluid rounded-start" alt="...">
        </div>
        <div class="col-md-8">
            <div class="card-body">
            <h5 class="card-title">${detail.title}</h5>
            <p class="card-text">${detail.details.slice(0,200)}...</p>
            <img src="${detail.author.img}" class="img-fluid h-25 w-25 rounded-circle" alt="...">
            <small class="text-muted pe-5">${detail.author.name}</small>
            <i class="fa-regular fa-eye"><small class="text-muted ps-2">${detail.total_view}</small></i>
            
            </div>
        </div>
        `;
        newsContainer.appendChild(newsDiv);
    })
}

loadData();