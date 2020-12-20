import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Cart from '../pages/Cart'
import Catalog from '../pages/Catalog'

const Auth = createStackNavigator();

const AuthRoutes = () => (
    <Auth.Navigator initialRouteName='Catalogo' >
        <Auth.Screen
            name="Catalogo"
            component={Catalog}
            options={{
                title: 'Bem-vindo ao E-commerce',
                headerStyle: {
                    backgroundColor: '#7159C1'
                },
                headerTintColor: '#fff'
            }} />
        <Auth.Screen name="Carrinho" component={Cart} />
    </Auth.Navigator>
);

export default AuthRoutes;