import 'react-native-gesture-handler';
import React from 'react';

import {  StatusBar, View } from 'react-native';
import { NavigationContainer,  } from '@react-navigation/native';

import Routes from './routes'

export default function App() {
    return (
        <NavigationContainer>
            <StatusBar barStyle="light-content" backgroundColor="#7159C1" />
            <View style={{ flex: 1, backgroundColor: '#7159C1' }}>
                <Routes />
            </View>
        </NavigationContainer >
    );
}
