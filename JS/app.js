const loadData = async () =>{
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    const res = await fetch(url)
    const data = await res.json()
    displayData(data.data.news_category)
}

const displayData = newsPaper =>{
    newsPaper.forEach(news => {
        console.log(news);
        const newsContainer = document.getElementById('news-container');
        const newsList = document.createElement('li');
        newsList.classList.add('nav-item');
        newsList.innerHTML = `
        <a onclick="displayNews('${news.category_id}')" class="nav-link active" aria-current="page">${news.category_name}</a>
        `
        newsContainer.appendChild(newsList);
    });
}

const displayNews = async(id)=>{
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.data);

}



loadData();