const btn = document.getElementById('anime-search');
btn.addEventListener('click', searchAnime,false);

function searchAnime() {
  const results = document.getElementById('results');
  const inputValue = document.getElementById('anime-input').value;

  const url = 'https://kitsu.io/api/edge/anime?filter[text]=' + inputValue;
  console.log(inputValue);
  const xhr = new XMLHttpRequest();
  
  xhr.open('GET', url, true);
  
  xhr.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
      const resObj = JSON.parse(xhr.responseText);
      console.log(resObj);
  
      const { attributes } = resObj.data[0];
      const img = attributes.coverImage && attributes.coverImage.original ? attributes.coverImage.original : attributes.posterImage.large;
      const synopsis = attributes.synopsis;
      const title = attributes.canonicalTitle;
      const engTitle = attributes.titles.en;
      const romTitle = attributes.titles.en_jp;
      const jpTitle = attributes.titles.ja_jp;
      const startDate = attributes.startDate;
      const endDate = attributes.endDate;
      const status = attributes.status;
      const episodeCount = attributes.episodeCount;
      const showType = attributes.showType;
      
      results.innerHTML = `<h5 class="mb-0">Anime: ${title}</h5>`;
      results.innerHTML += `<h6 class="mb-0 text-muted font-weight-light">Romanized: ${romTitle}</h6>`;
      results.innerHTML += `<h6 class="mb-3 text-muted font-weight-light">Japanese: ${jpTitle}</h6>`;
      results.innerHTML += `<img class="mb-3 img-fluid" src="${ img ? img : '' }" alt="${title}">`;
      results.innerHTML += `<div class=""><strong>Type:</strong> ${showType}</div>`;
      results.innerHTML += `<div class=""><strong>Episodes:</strong> ${episodeCount}</div>`;
      results.innerHTML += `<div class=""><strong>Aired:</strong> ${startDate} ${endDate == null ? '' :  `to ${endDate}` }</div>`;
      results.innerHTML += `<div class="mb-3"><strong>Status:</strong> ${status.toUpperCase()}</div>`;
      results.innerHTML += `<h5 class="mb-2">Synopsis:</h5>`;
      results.innerHTML += `<p class="mb-2">${synopsis}</p>`;
    }
  }
  
  xhr.send();
}