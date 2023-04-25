import React from 'react'
import {StyleSheet, View} from 'react-native'
import Header from './components/header'
import Truck from './truck'


export default function App() {


  return (
        <View style={styles.container}>
          <Header />
            <View style={styles.content}>
              <Truck />
            </View>
        </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  content: {
    flex: 1
  }
})