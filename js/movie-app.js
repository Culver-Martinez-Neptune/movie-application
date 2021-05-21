'use strict'

// quiet-purring-yellowhorn

// Can use for the loading animation/message
// let loader = `<div class="boxLoading"></div>`;
// document.getElementById('movieResult').innerHTML = loader;
$(document).ready(function () {
    const getMovies = () => {
        $('#container').html(`<div id="loop" class="center"></div>
<div id="bike-wrapper" class="center">
  <div id="bike" class="centerBike"></div>
</div>`)
        setTimeout(() => {
            fetch('https://quiet-purring-yellowhorn.glitch.me/movies')
                .then(response => response.json())
                .then(movies => {
                    $('#container').html('')
                    console.log(movies)
                    for (let movie of movies) {
                        // let htmlStr = `<img src="${movie.poster}"> <h1>${movie.title}</h1><p>by: ${movie.director}</p><p>Rating: ${movie.rating}</p>`;
                        // htmlStr += `<button id="delete-${movie.id}" class="btn btn-primary deleteMovie">Delete</button>`;
                        // htmlStr += `<button id="edit-${movie.id}" class="btn btn-primary editMovie">Edit Movie</button><br>`;

                        // create form to edit movie

                        let htmlStr = `<div class="card"  style="width: 18rem;">`;
                        htmlStr += `<img class="card-img-top" src="${movie.poster}" id="posters" alt="Card image cap">`
                        htmlStr += ` <div class="card-body">`
                        htmlStr += ` <h5 class="card-title">${movie.title}</h5>`
                        htmlStr += `<p class="card-director">Directed by: ${movie.director}</p>`
                        htmlStr += `<p class="card-rating">${movie.rating} out of 5 stars</p>`
                        htmlStr += `<div class="d-flex justify-content-between align-items-center"><button id="edit-${movie.id}" data-value="${movie.id}" class="btn btn-primary editMovie">Edit Movie</button>`;
                        htmlStr += `<span id="delete-${movie.id}"><i class="fas fa-trash-alt" id="trash"></i></span></div>`;
                        htmlStr += `</div>`
                        htmlStr += `</div>`


                        htmlStr += `<div id="editCurrentMovie-${movie.id}"  style="display: none">`
                        htmlStr += `<h3>Edit this movie</h3>`
                        htmlStr += `<form id="editForm"><div class="form-group">`;
                        htmlStr += `<label for="edit-title-${movie.id}">Edit Movie Title</label>`;
                        htmlStr += `<input value="${movie.title}" type="text" class="form-control" id="edit-title-${movie.id}" aria-describedby="emailHelp" placeholder='${movie.title}'></div>`;
                        htmlStr += `<div><label for="edit-director-${movie.id}">Edit Movie Director</label>`;
                        htmlStr += `<input value="${movie.director}" type="text" class="form-control" id="edit-director-${movie.id}" aria-describedby="emailHelp" placeholder="${movie.director}">
    </div>`;
                        htmlStr += `<label for="edit-rate-${movie.id}">Edit the Rating</label>`;
                        htmlStr += `<select id="edit-rate-${movie.id}" class="form-select" aria-label="Default select example">`;
                        htmlStr += `<option>Rate your title</option>`;
                        htmlStr += `<option value="1">One</option>`;
                        htmlStr += `<option value="2">Two</option>`;
                        htmlStr += `<option value="3" selected="selected">Three</option>`;
                        htmlStr += `<option value="4">Four</option>`;
                        htmlStr += `<option value="5">Five</option>`;
                        htmlStr += `</select>`;
                        htmlStr += `<button id="save-${movie.id}" data-value="${movie.id}" class="btn btn-primary">Save</button></form></div>`
                        $('#container').append(htmlStr)



                        //delete movie button
                        $(`#delete-${movie.id}`).click(function () {
                            fetch(`https://quiet-purring-yellowhorn.glitch.me/movies/${movie.id}`, deleteOptions).then(getMovies)
                        })
                        //Edit movie button
                        $(`#edit-${movie.id}`).click(function () {
                            $(`#editCurrentMovie-${movie.id}`).css('display', 'inline');
                        })

                        // let newTitle = $('#edit-title').val();
                        // console.log('new title' + newTitle)

                        // let editId = $(this).attr('data-value');
                        // console.log('edit id' + editId);

                        $(`#save-${movie.id}`).click(function (e) {
                            e.preventDefault();
                            let patchThis = {
                                "title": $(`#edit-title-${movie.id}`).val(),
                                // "title": newTitle,
                                "director": $(`#edit-director-${movie.id}`).val(),
                                "rating": $(`#edit-rate-${movie.id}`).val()
                            }

                            let patchOptions = {
                                method: 'PATCH',
                                headers: {
                                    'Content-Type': 'application/json',
                                },
                                //sending the info as json string
                                body: JSON.stringify(patchThis),
                            };
                            fetch(`https://quiet-purring-yellowhorn.glitch.me/movies/${movie.id}`, patchOptions).then(getMovies);
                        })
                    }

                    let deleteOptions = {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    }

                }).then (function () {

            });
        }, 2500)

    }


    $('#addMovie').on("click", (e) => {
        e.preventDefault();
        let movieT = $('#movie-title').val()
        fetch(`http://www.omdbapi.com/?apikey=${MOVIE_API_TOKEN}&t=${movieT}`)
            .then(resp => resp.json())
            .then(data =>{
                let poster = data.Poster;
                console.log(poster)

        let newMovie = {
            poster: poster,
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

        fetch("https://quiet-purring-yellowhorn.glitch.me/movies", postOptions).then(getMovies);
            // .then(resp => resp.json())
            // .then(movies => console.log(movies));

            });

    });

    getMovies()
    //







});