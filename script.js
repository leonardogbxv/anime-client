const btn = document.getElementById('anime-search');
btn.addEventListener('click', searchAnime);

function searchAnime() {
  const results = document.getElementById('results');
  const input = document.getElementById('anime-input').value;

  const url = 'https://kitsu.io/api/edge/anime/' + input;
  console.log(input);
  const xhr = new XMLHttpRequest();
  
  xhr.open('GET', url, true);
  
  xhr.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200) {
      const resObj = JSON.parse(xhr.responseText);
      console.log(resObj);
  
      const img = resObj.data.attributes.coverImage.original;
      
      console.log(img);
      const text = resObj.data.attributes.synopsis;
      const title = resObj.data.attributes.canonicalTitle;
      
      results.innerHTML = `<h3 class="mb-3">Anime: ${title}</h3>`;
      results.innerHTML += `<img class="img-fluid" src="${img}" alt="${title}">`;
      results.innerHTML += `<p class="mt-3">${text}</p>`;
    }
  }
  
  xhr.send();
}

// const synopsis = data.attributes.synopsis;
// const startDate = data.attributes.startDate;
// const endDate = data.attributes.endDate;
// const titles = data.attributes.titles;
// const canonicalTitle = data.attributes.canonicalTitle;
// const coverImage = data.attributes.coverImage.original;
// const posterImage = data.attributes.posterImage.large;