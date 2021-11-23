const API_TOKEN = "40403031890065ed4dc1971051b87cb5";

export function getFilmsFromApiWithSearchedText(text) {
    const url = 'https://api.themoviedb.org/3/search/movie?api_key='+ API_TOKEN + '&language=fr-Fr&query=' + text + '&include_adult=true';
    return fetch(url)
            .then((response) => response.json())
            .catch((error)=> console.log(error))
}

export function getFilmsImage(name) {
    return 'https://image.tmdb.org/t/p/w300' + name
}

