'use strict'

// quiet-purring-yellowhorn

// Can use for the loading animation/message
// let loader = `<div class="boxLoading"></div>`;
// document.getElementById('movieResult').innerHTML = loader;

const getMovies = () => {
    $('#container').html('loading')
    setTimeout(() => {
        fetch('https://quiet-purring-yellowhorn.glitch.me/movies')
            .then(response => response.json())
            .then(movies => {
                console.log(movies)
                let htmlStr = '';
                for(let movie of movies){
                    htmlStr = `${htmlStr}<h1>${movie.title}</h1><p>by: ${movie.director}</p>`
                }
                $('#container').html(htmlStr)
            });
    }, 3000)

}

getMovies()