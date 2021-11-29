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
        <NavigationContainer>
            <stackNavigator.Navigator initialRouteName='Rechercher'>
            
                <stackNavigator.Screen name='Rechercher' component={Search}
                    options={{title: 'Rechercher'}}
                />

                <stackNavigator.Screen name='Details' component={FilmDetail}
                    options={{title: 'Details'}}
                />
            </stackNavigator.Navigator>
        </NavigationContainer>
    )
}

const MoviesTabNavigator = createBottomTabNavigator()

function MainTabNavigator () {
    return (
        <NavigationContainer>
            <MoviesTabNavigator.Navigator screenOptions= {{
                tabBarShowLabel: false,
                tabBarActiveBackgroundColor: '#DDDDDDDD'
            
            }}>
            <MoviesTabNavigator.Screen 
                
                name='Rechercher' 
                component={Search}
                options={{
                    title: 'Rechercher',
                    tabBarIcon: ()=> {
                        return <Image 
                        style={styles.favoriteImage} 
                        source={require('../assets/ic_search.png')}/>
                    }
                }}
            />

            <MoviesTabNavigator.Screen 
                name='Favoris'
                component={Favorite}
                options={{
                    title: 'Favoris', 
                    tabBarIcon: ()=> {
                        return <Image 
                        style={styles.favoriteImage} 
                        source={require('../assets/ic_favorite.png')}/>
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