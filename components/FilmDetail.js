import { StyleSheet, Share, View, Text, Image, ActivityIndicator, ScrollView, TouchableOpacity, Platform } from "react-native"
import React from "react"

import { getFilmDetailFromApi, getFilmsImage } from '../API/TMDBApi'
import { connect } from 'react-redux'

class FilmDetail extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            film: undefined,
            isLoading: true,
        }
    }

    componentDidMount() {
        getFilmDetailFromApi(this.props.route.params.idFilm).then(
            data => {
                this.setState({
                    film: data,
                    isLoading: false
                })
            }
        )
    }

    _toggleFavorite() {
        const action = { type: 'TOGGLE_FAVORITE', value: this.state.film }
        this.props.dispatch(action)
    }

    componentDidUpdate() {
    }

    _shareFilm() {
        const { film } =this.state
        Share.share({ title:  film.title, message: film.overview})
    }

    _displayFloatingActionButton() {
        const { film } = this.state
        if(tilm != undefined && Platform.OS == 'android') {
            <TouchableOpacity
                style={styles.floatingActionButtonShare}
                onPress={this._shareFilm()}
                >

                <Image
                    source={{uri: require('')}}
                    style={styles.shareImage}
                />

            </TouchableOpacity>
        }
    }

    _displayFilm() {
        const film = this.state.film
        if (film != undefined) {
            return (
                <ScrollView style={styles.scrollViewContainer}>

                    {/* <Text>{film.title}</Text> */}
                    <Image style= { styles.image } source={{ uri: getFilmsImage(film.backdrop_path) }} />

                    <Text style={styles.filmTitle}>{film.title}</Text>
                    
                    <TouchableOpacity style={styles.favoriteView} onPress={ () => this._toggleFavorite() }>
                        {this._displayFavoriteImage()}
                    </TouchableOpacity>

                    <Text style={styles.filmOverview} > {film.overview} </Text>
                    <Text style={styles.defaultText} > Sortie le {film.release_date} </Text>
                    <Text style={styles.defaultText} > Note : {film.vote_average} </Text>
                    <Text style={styles.defaultText} > Nombre de vote : {film.vote_count} </Text>
                    <Text style={styles.defaultText} > Budget : {film.budget} </Text>
                    <Text style={styles.defaultText} > Genre(e) : { } </Text>
                    <Text style={styles.defaultText} > Companie(s) : {film.production_companies.map(function(company) {
                        return company.name
                    }).join(' / ') } </Text>


                </ScrollView>
            )
        }
    }

    _displayLoading() {
        if (this.state.isLoading) {
            return (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size='large' color="#0000ff" />
                </View>
            )
        }
    }

    _displayFavoriteImage() {
        var sourceImage = require('../assets/ic_favorite_border.png')
        if(this.props.favoriteFilm.findIndex(item=> item.id === this.state.film.id) !== -1) {
            sourceImage = require('../assets/ic_favorite.png')
        }

        return (
            <Image style={styles.favoriteImage} source={sourceImage}/>
        )
    }

    render() {
        return (
            <View style={styles.mainContainer}>
                {this._displayFilm()}
                {this._displayLoading()}
                {this._displayFloatingActionButton()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
    },

    loadingContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },

    scrollViewContainer: {
        flex: 1,
        flexDirection: 'column'
    },

    filmImage: {
        flex: 1,
    },

    filmInfo: {
        flex: 2,
    },

    filmTitle: {
        fontWeight: 'bold',
        fontSize: 31,
        textAlign: 'center',
        flexWrap: 'wrap',
        margin: 3,
    },

    filmOverview: {
        fontStyle: 'italic',
        padding: 5,
        margin: 5,
    },

    image: {
        height: 169,
        margin: 9
    },

    defaultText: {
        marginLeft: 5,
        marginRight: 5,
        marginTop: 5
    },

    favoriteView: {
        alignItems: 'center',
    },

    favoriteImage: {
        width: 40,
        height: 40,
    },

    floatingActionButtonShare: {
        position: 'absolute',
        width: 60,
        height: 60,
        right: 30,
        bottom: 30,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },

    shareImage: {
        width: 30,
        height: 30,
    }
})

const mapStateToProps = (state) => {
    
    return {
        favoriteFilm: state.favoriteFilm
    }
}

export default connect(mapStateToProps)(FilmDetail)