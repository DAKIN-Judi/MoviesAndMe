import React from "react";
import { View,StyleSheet, Text } from "react-native"; 
import FilmList from "./FilmList";
import { connect } from "react-redux"

class Favorite extends React.Component {

    render() {
        return (
            <View>
                <FilmList
                    isFavoriteList={true}
                    films={this.props.favoriteFilm}
                    page={0}
                    totalPage={0}
                    navigation= {this.props.navigation}
                />
            </View>
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

export default connect(mapStateToProps)(Favorite)