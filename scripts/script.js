'use strict';
import * as keepItSecret from './apiKey.js';
let newsSearch;
let articles = [];
let response;
let json;
let newsStories = '';

//first async call on body load to get top world stories
const request = async () => {
  json = null;
  response = await fetch(
        `http://newsapi.org/v2/top-headlines?` +
        'country=us&' +
        'apiKey=${keepItSecret.keepItSafe}');
  json = await response.json();
  articles = await json.articles;
  console.log(articles);
  return articles;
}

//on load of body
const onPageLoad = async () => {
  await request().then( () => {populateCards(articles)});;
}

window.onload = onPageLoad();


const searchRequest = async event => {
  event.preventDefault()
  newsStories = event.target.newsSearch.value;
  json = null;
  response = await fetch(`http://newsapi.org/v2/everything?q=${newsStories}&apiKey=${keepItSecret.keepItSafe}`);
  json = await response.json();
  articles = await json.articles;
  //setting title of stories section
  searchInput.innerHTML = `${newsStories} Top Stories`;
}

//async event handler on form submit to get searched for stories
let searchRequestHandler = async () => {
  await searchRequest(event).then( () => {populateCards(articles)});
}

let searchForm = document.querySelector('form.searchWrapper');
searchForm.addEventListener('submit', searchRequestHandler);

const searchInput = document.querySelector('#searchInput');
const cardContainer = document.querySelector('#cardContainer');

//dynamic card insertion function
const populateCards = articles => {
  cardContainer.innerHTML = ``;
  articles.forEach( article => {
    let card = document.createElement('div');
    card.setAttribute('class', 'newsCardWrapper');
    card.innerHTML = `
        <article class='newsCard'>
          <header class='newsCard_header'>${article.title}</header>
          <div class='newsCard_content'>
            <a href='${article.url}'> 
              <img src='${article.urlToImage}' alt='Link To Story Image: ${article.urlToImage}' height='243' width='350'>
            </a>
          </div>
        </article>
      `;
      cardContainer.append(card);
    });
  }

