import React from 'react'
import { StyleSheet, View, Button, TextInput, FlatList, Text } from 'react-native'
import films from '../Helpers/filmsData';
import FilmItems from './FilmItems';
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'

class Search extends React.Component {


    constructor(props) {
        super(props)
        this.state = {
            films: [],
        }
        
        this.searchedText = ''

    }

    _loadFilms() {
        if(this.searchedText.length > 0) {
            getFilmsFromApiWithSearchedText(this.searchedText).then(data => { this.setState({ films: data.results})})
        }        
    }

    _searchTextInputChanged(text) {
        this.searchedText = text
    }

    render() {
        return (

            <View >
                <View style={styles.searchContainer}>
                    <TextInput onSubmitEditing= {()=> this._loadFilms()} onChangeText={(text)=> this._searchTextInputChanged(text)} style={styles.textInput} placeholder='Titre du film'/>
                    <Button style={styles.searchButton} title='Rechercher' onPress={()=> this._loadFilms() }/>
                </View>
                    
                <FlatList
                data={this.state.films}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({item}) => <FilmItems film={item} />} />
            </View>            
        );
    };    
}

const styles = StyleSheet.create({

    searchContainer: {
        flexDirection: 'row',
        marginTop: 30,
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
    }
})

export default Search