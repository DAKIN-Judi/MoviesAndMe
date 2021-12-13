import React from "react";
import FilmItems from './FilmItems';
import { StyleSheet, FlatList } from 'react-native'
import { connect } from 'react-redux'

class FilmList extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            films: [],
        }
    }

    _displayDetailForFilm = (idFilm) => {
        if(this.props.isFavoriteList != undefined && this.props.isFavoriteList == true) {
            this.props.navigation.navigate('FavoriteFilmDetail', { idFilm: idFilm })
        } else {
            this.props.navigation.navigate('Details', { idFilm: idFilm })
        }
        
    }

    render() {
        return (
            <FlatList
                data={this.props.films}
                keyExtractor={(item) => item.id.toString()}
                extraData={this.props.favoriteFilm}
                onEndReachedThreshold={1}
                onEndReached={() => {
                    if (this.props.page < this.props.totalPage) {
                        this.props.loadFilms()
                    }
                }}
                renderItem={({ item }) => <FilmItems film={item}
                    displayDetailForFilm={this._displayDetailForFilm}
                    isFavorite={this.props.favoriteFilm.findIndex(film => film.id === item.id) !== -1 ? true : false}
                />
                }

            />
        )
    }
}

const styles = StyleSheet.create({

})

const mapStateToProps = (state) => {
    return {
        favoriteFilm: state.favoriteFilm
    }
}

export default connect(mapStateToProps)(FilmList)