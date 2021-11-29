const initialState = { favoriteFilm: [] }

function toggleFavorite (state = initialState, action) {
    let nextState
    switch (action.type) {
        case 'TOGGLE_FAVORITE':
            const favoriteFilmIndex = state.favoriteFilm.findIndex(item => item.id === action.value.id)
            if(favoriteFilmIndex !== -1 ) {
                nextState = {
                    ...state,
                    favoriteFilm: state.favoriteFilm.filter((item, index) => index !== favoriteFilmIndex)
                }
            }else {
                //add 
                nextState = {
                    ...state,
                    favoriteFilm: [...state.favoriteFilm, action.value]
                  } 

            }
            return nextState || state
            
        default:
            return state
    }
}

export default toggleFavorite 