import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MainStackNavigator from './Navigation/Navigation';
import { Provider } from 'react-redux';
import Store from './Store/ConfigureStore';

export default function App() {

  return (
    <Provider store= { Store } >
      <MainStackNavigator />
    </Provider>
    
  )
}


const styles = StyleSheet.create({
  container: {
  },
});
