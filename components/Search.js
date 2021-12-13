import React from 'react'
import { StyleSheet, View, Button, TextInput, FlatList, Text, ActivityIndicator } from 'react-native'
import films from '../Helpers/filmsData';
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'
import { connect } from 'react-redux'
import FilmList from './FilmList';

class Search extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            films: [],
            isLoading: false
        }

        this.searchedText = ''
        this.page = 0
        this.totalPage = 0

        this._loadFilms = this._loadFilms.bind(this)
    }

    _loadFilms() {
        this.setState({ isLoading: true })
        if (this.searchedText.length > 0) {
            getFilmsFromApiWithSearchedText(this.searchedText, this.page + 1)
                .then(data => {
                    this.page = data.page
                    this.totalPage = data.total_pages
                    this.setState({
                        films: [...this.state.films, ...data.results],
                        isLoading: false
                    })
                })
        }
    }

    _searchFilms() {
        this.page = 0
        this.totalPage = 0
        this.setState({
            films: []
        }, () => {
            this._loadFilms()
        })

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

    _searchTextInputChanged(text) {
        this.searchedText = text
    }

    render() {
        return (

            <View style={styles.searchContainerMain} >
                <View style={styles.searchContainer}>
                    <TextInput onSubmitEditing={() => this._searchFilms()} onChangeText={(text) => this._searchTextInputChanged(text)} style={styles.textInput} placeholder='Titre du film' />
                    <Button style={styles.searchButton} title='Rechercher' onPress={() => this._searchFilms()} />
                </View>

                <FilmList 
                    films={this.state.films}
                    loadFilms={this._loadFilms}
                    page={this.page}
                    totalPage={this.totalPage}
                    navigation={this.props.navigation}
                />
                {this._displayLoading()}

            </View>
        );
    };
}

const styles = StyleSheet.create({

    searchContainer: {
        flexDirection: 'row',
    },

    textInput: {
        flex: 2,
        margin: 5,
        height: 40,
        borderWidth: 1,
        paddingLeft: 5,
        borderColor: '#000010'
    },

    searchButton: {
        flex: 1,
    },

    loadingContainer: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 300,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    },

    searchContainerMain: {
    }
})

const mapStateToProps = (state) => {
    return {
        favoriteFilm: state.favoriteFilm
    }
}

export default connect(mapStateToProps)(Search)
