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
let newMovie = {
    // "title": "Percy Jackson & The Lightning Thief",
    // "author": {
    //     "firstName": "Rick",
    //     "lastName": "Riordan"
    // }
};
let postOptions = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(),
}

$('#addMovie').click( (e) => {
e.preventDefault()
    fetch("https://quiet-purring-yellowhorn.glitch.me/movies", postOptions)
        // .then(resp => resp.json())
        // .then(book => console.log(book));
        .then(getMovies);
})

getMovies()