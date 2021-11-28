import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Search from '../components/Search'
import FilmDetail from '../components/FilmDetail'

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

export default MainStackNavigator