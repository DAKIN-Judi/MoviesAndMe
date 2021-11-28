import React from "react";
import { StyleSheet, View, Text, Image, ActivityIndicator, ScrollView } from "react-native";
import { getFilmDetailFromApi, getFilmsImage } from '../API/TMDBApi'

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

    _displayFilm() {
        const film = this.state.film
        if (film != undefined) {
            return (
                <ScrollView style={styles.scrollViewContainer}>

                    {/* <Text>{film.title}</Text> */}
                    <Image style= { styles.image } source={{ uri: getFilmsImage(film.backdrop_path) }} />

                    <Text style={styles.filmTitle}>{film.title}</Text>
                    
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

    render() {
        const idFilm = this.props.route.params.idFilm

        return (
            <View style={styles.mainContainer}>
                {this._displayFilm()}
                {this._displayLoading()}
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
    }
})


export default FilmDetail