import React, { useState } from "react";
import { Text, View, _View } from "react-native";
import Tabbar from "../core/components/Tabbar";
import { theme } from "../core/styles";
import Category from "./Admin/Category";
import Product from "./Admin/Product";
import ProductForm from "./Admin/ProductForm";
import User from "./Admin/User";

const Dashboard: React.FC = () => {
    const [screen, setScreen] = useState('products')

    return <View>
        <Tabbar screen={screen} setScreen={setScreen} />
        {screen === 'products' && <Product setScreen={setScreen}/>}
        {screen === 'categories' && <Category/>}
        {screen === 'users' && <User/>}
        {screen === 'productForm' && <ProductForm setScreen={setScreen}/>} 
    </View>

}

export default Dashboard;