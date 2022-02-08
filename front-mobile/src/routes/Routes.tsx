import React from 'react'
import { Home, Catalog, ProductDetails, Login, Dashboard } from '../pages'

import { createStackNavigator } from '@react-navigation/stack'
import { colors, nav } from '../core/styles';
import { Text } from 'react-native';
import { Navbar } from '../core/components';
const Stack =  createStackNavigator();

const HeaderText: React.FC = () => <Text style={nav.leftText}>DS Catalog</Text>

const Routes: React.FC = () => {

    // .Screen altera só a barra naquela aba e .Navigator altera a barra inteira

    return (
        <Stack.Navigator screenOptions={{
            headerTitle: " ",
            headerStyle: { 
                backgroundColor: colors.primary
            },
            headerLeft: () => <HeaderText />,
            headerRight: () => <Navbar />
        }}>
            <Stack.Screen  name='Home' component={Home}/>
            <Stack.Screen  name='Catalog' component={Catalog}/>
            <Stack.Screen  name='ProductDetails' component={ProductDetails}/>
            <Stack.Screen  name='Login' component={Login}/>
            <Stack.Screen  name='Dashboard' component={Dashboard}/>
        </Stack.Navigator>)

}

export default Routes;