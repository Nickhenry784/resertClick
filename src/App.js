import React from 'react';
import 'react-native-gesture-handler';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

import HomeScreen from './screens/Home';
import Buy from './screens/Buy';
import Play from './screens/Play';
import Play2 from './screens/Play2';

import {store, persistor} from './redux/store';
import {LogBox} from 'react-native';

const Stack = createStackNavigator();

LogBox.ignoreAllLogs();

export default function App() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="BUY"
              component={Buy}
              options={{title: 'Buy Turns'}}
            />
            <Stack.Screen
              name="Play"
              component={Play}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="Play2"
              component={Play2}
              options={{headerShown: false}}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}