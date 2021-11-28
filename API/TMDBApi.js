const API_TOKEN = "40403031890065ed4dc1971051b87cb5";

export function getFilmsFromApiWithSearchedText(text, page) {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key='+ API_TOKEN + '&language=fr-Fr&query=' + text + '&include_adult=false&page=' + page;
    return fetch(url)
            .then((response) => response.json())
            .catch((error)=> console.log(error))
}

export function getFilmsImage(name) {
    return 'https://image.tmdb.org/t/p/w300' + name
}

export function getFilmDetailFromApi(id) {
    const url = 'https://api.themoviedb.org/3/movie/'+ id +'?api_key=' + API_TOKEN + '&language=fr-Fr'

    return fetch(url)
            .then((response) => response.json())
            .catch((error)=> console.log(error))
}

