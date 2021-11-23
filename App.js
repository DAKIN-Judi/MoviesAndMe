import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Search from './components/Search';

export default function App() {
  return (
    <View style={styles.container}>
      <Search/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
  },
});
