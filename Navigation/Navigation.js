import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Image, StyleSheet } from 'react-native'
import Search from '../components/Search'
import FilmDetail from '../components/FilmDetail'
import Favorite from '../components/Favorite'

const stackNavigator = createStackNavigator()

function MainStackNavigator() {
    return (
            <stackNavigator.Navigator initialRouteName='Rechercher'>

                <stackNavigator.Screen name='Rechercher' component={Search}/>

                <stackNavigator.Screen name='Details' component={FilmDetail}
                    options={{ title: 'Details' }}
                />
            </stackNavigator.Navigator>
    )
}

const favoriteStackNavigator = createStackNavigator()

function FavoriteStackNavigator() {
    return (
        <favoriteStackNavigator.Navigator initialRouteName='Favoris'>
            <favoriteStackNavigator.Screen name='Favoris' component={Favorite}/>
            <favoriteStackNavigator.Screen name='FavoriteFilmDetail' component={FilmDetail} options={{ title: 'Details' }}/>
        </favoriteStackNavigator.Navigator>

    )
}

const MoviesTabNavigator = createBottomTabNavigator()

function MainTabNavigator() {
    return (
        <NavigationContainer>

            <MoviesTabNavigator.Navigator screenOptions={{
                tabBarShowLabel: false,
                tabBarActiveBackgroundColor: '#DDDDDDDD',
                headerShown: false
            }} >
                <MoviesTabNavigator.Screen

                    name='Home'
                    component={MainStackNavigator}
                    options={{
                        title: 'Rechercher',
                        tabBarIcon: () => {
                            return <Image
                                style={styles.favoriteImage}
                                source={require('../assets/ic_search.png')} />
                        }
                        
                    }}
                />

                <MoviesTabNavigator.Screen
                    name='Favoris'
                    component={FavoriteStackNavigator}
                    options={{
                        title: 'Favoris',
                        tabBarIcon: () => {
                            return <Image
                                style={styles.favoriteImage}
                                source={require('../assets/ic_favorite.png')} />
                        }
                    }}
                />  

            </MoviesTabNavigator.Navigator>

        </NavigationContainer>

    )
}

const styles = StyleSheet.create({
    favoriteImage: {
        height: 30,
        width: 30,
    }
})

export default MainTabNavigator