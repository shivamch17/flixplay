(function () {
        window.onload = function() {
            switch(sessionStorage.getItem("onpage")) {
                case "m":
                  ml();
                  break;
                case "s":
                  sl();
                  break;
                case "r":
                  searchee();
                  break;
                default:
                  home();
              }
          };

    let currentPage = 1;

    const API_KEY = 'api_key=1cf50e6248dc270629e802686245c2c8';
    const BASE_URL = 'https://api.themoviedb.org/3';
    const API_URL_m = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
    const API_URL_s = BASE_URL + '/discover/tv?sort_by=popularity.desc&'+API_KEY;
    const IMG_URL = 'https://image.tmdb.org/t/p/w200';
    const searchURL = BASE_URL + '/search/movie?'+API_KEY;

    const movieDiv = document.querySelector('#movie-container');
    const seriesDiv = document.querySelector('#series-container');
    const headerEl = document.querySelector('.header');
    const movieL = document.querySelector('#movies-list');
    const tvshowsL = document.querySelector('#tvshows-list');
    const livetvL = document.querySelector('#livetv-list');
    const loaderEl = document.querySelector('.loader');
    const logoEl = document.querySelector('.navbar-brand');
    const loadBtn= document.querySelector('#load-more');
    const detailsDisplay= document.querySelector('.details-display');
    const h2EL= document.getElementsByClassName('h2');
    const playerOpen =document.querySelector('#playeropen');
    const searchEl = document.getElementById('search-field');
    const searchBtn = document.querySelector('#searchbtn');
    const closeBtn = document.querySelector('#btnClose');
    const iFrame = document.querySelector('#iframe');
    
    // const keywordInterval=setInterval(() => {
    //     console.log(searchEl.value);
    // }, 800);

    // searchEl.addEventListener('click', () => {
    //     keywordInterval;
    // });

    closeBtn.addEventListener('click', ()=>{
        iFrame.remove();
    });
    
    searchBtn.addEventListener('click', () => {
        console.log(searchEl.value);
        searchee(searchURL+'&query='+searchEl.value);
    });

    let URL = '';
    movieL.addEventListener('click', ml);
    function ml() {
        URL = API_URL_m;
        currentPage=1;
        seriesDiv.innerHTML='';
        movieDiv.innerHTML='';
        loadQuotes();
        sessionStorage.setItem("onpage", "m");
        headerEl.children[0].innerText='MOVIES';
        loadBtn.classList.remove('show');
        h2EL[0].classList.add('hidden');
        h2EL[1].classList.add('hidden');
    }
    tvshowsL.addEventListener('click', sl);
    function sl() {
        URL = API_URL_s;
        currentPage=1;
        seriesDiv.innerHTML='';
        movieDiv.innerHTML='';
        loadQuotes();
        sessionStorage.setItem("onpage", "s");
        headerEl.children[0].innerText='TV SHOWS';
        loadBtn.classList.remove('show');
        h2EL[0].classList.add('hidden');
        h2EL[1].classList.add('hidden');
    }
    logoEl.addEventListener('click', home);
    function home() {
        currentPage=1;
        seriesDiv.innerHTML='';
        movieDiv.innerHTML='';
        loadQuotesHome();
        sessionStorage.setItem("onpage", "h");
        headerEl.children[0].innerText='HOME';
        loadBtn.classList.remove('show');
        h2EL[0].classList.remove('hidden');
        h2EL[1].classList.remove('hidden');
    }
    function searchee(urrr) {
        URL=urrr;
        currentPage=1;
        seriesDiv.innerHTML='';
        movieDiv.innerHTML='';
        loadQuotes();
        sessionStorage.setItem("onpage", "r");
        headerEl.children[0].innerText='SEARCH RESULTS';
        loadBtn.classList.remove('show');
        h2EL[0].classList.add('hidden');
        h2EL[1].classList.add('hidden');
    }
    
    const fetcher = (url) => {
    fetch(url)
    .then(response => response.json())
    .then(data => {
        showLoader();
        setTimeout(() => {
        try {
            showQuotes(data.results);
        } catch (error) {
            console.log(error.message);
        } finally {
            hideLoader();
        }
    }, 200);
    });
};
    const loadQuotesHome = () => {
        fetcher(API_URL_m);
        fetcher(API_URL_s);
        fetcher(API_URL_m+'&page=2');
        fetcher(API_URL_s+'&page=2');
    };

    const getQuotes = async () => {
       
        const API_URL = `${URL}&page=${currentPage}`;
        currentPage++;
        const response = await fetch(API_URL);
        // handle 404
        if (!response.ok) {
            throw new Error(`An error occurred: ${response.status}`);
        }
        return await response.json();
    }

    // show the quotes
    const showQuotes = (data) => {
        var i = 0;
        (function loopIt(i) {
            const {title, poster_path, vote_average, overview, id,name} = data[i];
          setTimeout(function(){
              // your code handling here
              const El = document.createElement('div');
              if(name) //series 
              {
              El.classList.add('series');
                El.innerHTML = `
                <span class="rating ${getColor(vote_average)}">${vote_average}</span>
                <img src="${poster_path? IMG_URL+poster_path: "http://via.placeholder.com/1080x1580" }" alt="${title}" class ="poster" id="${id}">
                <span class="name">${name}</span>
           `
           seriesDiv.appendChild(El);
              }
              else{ // movie 
                El.classList.add('movie');
                El.innerHTML = `
                   <span class="rating ${getColor(vote_average)}">${vote_average}</span>
                   <img src="${poster_path? IMG_URL+poster_path: "http://via.placeholder.com/1080x1580" }" alt="${title}" class ="poster" id="${id}">
                   <span class="name">${title}</span>
              `  
              movieDiv.appendChild(El);

              }
              document.getElementById(id).addEventListener('click', () => {
                  detailsDisplay.click();
                  sessionStorage.setItem('player-id',id);
                  details(id);
                })
              if(i < data.length - 1)  loopIt(i+1)
            }, 10);
        })(i)
        if(sessionStorage.getItem("onpage")!="h")
            loadBtn.classList.add('show');
    };

    const hideLoader = () => {
        loaderEl.classList.remove('show');
    };
    const showLoader = () => {
        loaderEl.classList.add('show');
    };
    // load quotes
    const loadQuotes = async () => {
        // show the loader
        showLoader();
        // 0.5 second later
        setTimeout(async () => {
            try {
                    // call the API to get quotes
                    const response = await getQuotes();
                    // show quotes
                    showQuotes(response.results);
            } catch (error) {
                console.log(error.message);
            } finally {
                hideLoader();
            }
        }, 150);
    };

    function getColor(vote) {
        if(vote>= 7){
            return 'green'
        }else if(vote >= 5){
            return "orange"
        }else{
            return 'red'
        }
    }

    window.addEventListener('scroll', () => {
        const {
            scrollTop,
            scrollHeight,
            clientHeight
        } = document.documentElement;

        if ((scrollTop + clientHeight >= scrollHeight -5) && sessionStorage.getItem("onpage")!='h'){
            loadQuotes();
        }
    }, {
        passive: false
    });


    const element = document.getElementById("load-more");
    element.addEventListener("click", loadQuotes);


    const details = (id)=> {
    const cmodalBody=document.getElementById("modalBody1")
    cmodalBody.innerHTML='';
    var urls ='';
    var type='s';
    if(sessionStorage.getItem("onpage")=="m"){
        urls ='https://api.themoviedb.org/3/movie/'+id+'?api_key=1cf50e6248dc270629e802686245c2c8&language=en-US';
        type='m';
    }
    else urls ='https://api.themoviedb.org/3/tv/'+id+'?api_key=1cf50e6248dc270629e802686245c2c8&language=en-US';
    const cmodalheaderEL=document.getElementById('exampleModalToggleLabel');
    fetch(urls)
        .then(response => response.json())
        .then(data => {
            const {genres,id,imdb_id,title,runtime,overview,poster_path,release_date,vote_average,name,episode_run_time,first_air_date} = data
            const El=document.createElement("div");
            El.classList.add('cmodalbody');
            if(type=='m'){
                cmodalheaderEL.innerHTML=`<h1>${title}</h1>`;
                El.innerHTML =`
            <div><img src="https://image.tmdb.org/t/p/w200${poster_path}" class="cmodal-img"></div>
            <div class="info">
                <div><b><i>TMDB/IMDB ID: </i></b>${id}/${imdb_id}</div>
                <div><b><i>Plot Summary: </i></b>${overview}</div>
                <div><b><i>Genre: </i></b>${genres[0].name}</div>
                <div><b><i>Rating: </i></b>${vote_average}</div>
                <div><b><i>Runtime: </i></b>${runtime}m</div>
                <div><b><i>Release Date: </i></b>${release_date}</div>
            </div>`
            }
            else{
                cmodalheaderEL.innerHTML=`<h1>${name}</h1>`;
                El.innerHTML =`
            <div><img src="https://image.tmdb.org/t/p/w200${poster_path}" class="cmodal-img"></div>
            <div class="info">
                <div><b><i>TMDB ID: </i></b>${id}</div>
                <div><b><i>Plot Summary: </i></b>${overview}</div>
                <div><b><i>Genre: </i></b>${genres[0].name}</div>
                <div><b><i>Rating: </i></b>${vote_average}</div>
                <div><b><i>Runtime: </i></b>${episode_run_time}m</div>
                <div><b><i>First Air Date: </i></b>${first_air_date}</div>
            </div>`
            }
            
        cmodalBody.appendChild(El);
    }); 
};
    const player = () => {
        var id = sessionStorage.getItem('player-id');
    const cmodalBody1 = document.getElementById("modalBody2");
    cmodalBody1.innerHTML ='';
    const El = document.createElement("div");
    El.classList.add("modal-player");
    if(sessionStorage.getItem("onpage")=="m")
    El.innerHTML=`<iframe id="iframe" src="https://autoembed.to/movie/tmdb/${id}" width="100%" height="400px" frameborder="0" allowfullscreen></iframe>`
    else if(sessionStorage.getItem("onpage")=="s")
    El.innerHTML=`<iframe id="iframe" src="https://autoembed.to/tv/tmdb/${id}-1-1" width="100%" height="400px" frameborder="0" allowfullscreen></iframe>`
    cmodalBody1.appendChild(El);
};
    playerOpen.addEventListener('click', () => {
        player();
    });
    
})();