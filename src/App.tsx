import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MainScreen from './screens/MainScreen';
import {store} from './store';
import {Provider} from 'react-redux';
import NoteScreen from './screens/NoteScreen';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Main">
            <Stack.Screen name="Notes" component={MainScreen} />
            <Stack.Screen
              name="NoteScreen"
              component={NoteScreen}
              options={{
                presentation: 'modal',
                title: 'Note',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
