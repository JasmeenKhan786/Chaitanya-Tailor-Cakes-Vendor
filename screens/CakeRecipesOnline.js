import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {  View } from 'react-native';
import { WebView } from 'react-native-webview';

const Recipes = 'https://www.bakingmad.com/recipes';
const GOOGLE = 'https://www.google.com/';

export default function Calculator() {
  return (
    <View style={{ flex: 1, backgroundColor: '#F5CCDC' }}>
      <View style={{ width: '100%', height: '100%' }}>
        <WebView source={{ uri: Recipes  }} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
