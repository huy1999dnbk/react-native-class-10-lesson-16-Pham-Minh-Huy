/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import { SafeAreaView } from 'react-native';
import AppNavigation from './src/AppNavigation';
import { connect, Provider } from 'react-redux';
import store from './src/redux/store';
export const orangeColor = '#E7421B';
import { Provider as PaperProvider } from 'react-native-paper';

const App = () => {
  return (
    <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
      <PaperProvider>
        <AppNavigation />
      </PaperProvider>
    </SafeAreaView>
  );
};

export default App;
