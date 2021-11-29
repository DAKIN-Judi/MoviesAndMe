import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { getFilmsImage } from '../API/TMDBApi'
 
class FilmItems extends React.Component {

    constructor(props) {
        super(props)
        
    }

    _checkFavoriteFilm() {
        if(this.props.isFavorite) {
            return (
                <Image style={styles.favoriteFilmIcon} source={require('../assets/ic_favorite.png')}/>
            )
        }
    }

    render() {
        const {film, displayDetailForFilm } = this.props

        return (
            <TouchableOpacity
             style={styles.mainContainer}
             onPress={ () => displayDetailForFilm(film.id)}
             >
                
                <Image style={styles.imageContainer} source={{uri: getFilmsImage(film.poster_path)}} />
                
                <View style={styles.filmInfoContainer}>
                    
                    <View style={styles.filmTitleAndVote} >
                        {this._checkFavoriteFilm()}
                        <Text style={styles.filmTitle}>{film.title}</Text>
                        <Text style={styles.filmVote}>{film.vote_average}</Text>
                    </View>

                    <View style={styles.filmViewDesc} >
                        <Text style={styles.filmDesc} numberOfLines={6}>{film.overview}</Text>
                    </View>
                    
                    <View style={styles.filmViewDate}>
                        <Text style={styles.filmDate}> Sortie le {film.release_date}</Text>
                    </View>
                </View>
                
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({

    mainContainer: {
        flexDirection: 'row',
        height: 180,
        margin: 3,
    },

    imageContainer: {
        flex: 1,
    },

    filmInfoContainer: {
        padding: 7,
        margin: 5,
        flex: 2,
        flexDirection: 'column',
    },

    filmTitleAndVote: {
        flexDirection: 'row',
        alignContent: 'space-between',
        marginBottom: 15,
        flex: 1,
    },

    filmViewDate: {
        flex: 1,
    },

    filmViewDesc: {
        flex: 2,
    },

    filmTitle: {
        flexWrap: 'wrap',
        flex: 2,
        fontWeight: 'bold',
        fontSize: 16,
    },

    filmVote: {
        flex: 1,
    },

    filmDesc: {
        textAlign: 'justify',
    },

    filmDate: {
        padding: 10,
        textAlign: 'right'
    },

    favoriteFilmIcon: {
        width: 20,
        height: 20,
    }
})


export default FilmItems

