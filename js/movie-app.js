'use strict'

// quiet-purring-yellowhorn

// Can use for the loading animation/message
// let loader = `<div class="boxLoading"></div>`;
// document.getElementById('movieResult').innerHTML = loader;
$(document).ready(function () {
    const getMovies = () => {
        $('#container').html('loading')
        setTimeout(() => {
            fetch('https://quiet-purring-yellowhorn.glitch.me/movies')
                .then(response => response.json())
                .then(movies => {
                    $('#container').html('')
                    console.log(movies)
                    for (let movie of movies) {
                        let htmlStr = `<h1>${movie.title}</h1><p>by: ${movie.director}</p><p>Rating: ${movie.rating}</p>`;
                        htmlStr += `<button id="delete-${movie.id}" class="btn btn-primary deleteMovie">Delete</button>`
                        $('#container').append(htmlStr)
                        $(`#delete-${movie.id}`).click(function () {
                            fetch(`https://quiet-purring-yellowhorn.glitch.me/movies/${movie.id}`, deleteOptions).then(getMovies)
                        })
                    }

                    let deleteOptions = {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }

                });
        }, 1500)

    }
// let newMovie = {
//     title: $('#movie-title').val(),
//     director: $('#movie-director').val()
// };


    $('#addMovie').on("click", (e) => {
        e.preventDefault();

        let newMovie = {
            title: $('#movie-title').val(),
            director: $('#movie-director').val(),
            rating: $("#movie-rate").val()
        };
        console.log("newMovie");
        let postOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newMovie),
        }

        fetch("https://quiet-purring-yellowhorn.glitch.me/movies", postOptions)
            .then(resp => resp.json())
            .then(movies => console.log(movies));

    })

    getMovies()
    //







});