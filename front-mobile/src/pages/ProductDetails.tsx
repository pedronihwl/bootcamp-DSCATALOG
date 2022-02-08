import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, Image, Text } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { getApi } from "../services";

import leftArrow from '../core/assets/left-arrow.png'
import { text, theme } from "../core/styles";
import { useNavigation } from "@react-navigation/native";

const ProductDetails: React.FC = ({ route: { params: { id }}}) => {
    const [isLoading, setIsLoading] = useState(false)
    const nav = useNavigation()
    const [product, setProduct] = useState({
        id: null,
        name: null,
        description: null,
        price: null,
        imgUrl: null,
        date: null,
        categories: []
    })

   const getProduct = async () => {
       setIsLoading(true)
       const res = await getApi.get(`/products/${id}`)
       setIsLoading(false)
       setProduct(res.data)
   }

   useEffect(() => {
       getProduct()

   },[])

    return (<View style={theme.container}>
            { isLoading ? <ActivityIndicator size="large"/> : (<View style={theme.detailCard}>
                <TouchableOpacity style={theme.goBackContainer} onPress={() => nav.goBack()}>
                    <Image source={leftArrow}/>
                    <Text style={text.goBackText}>VOLTAR</Text>
                </TouchableOpacity>
                <View style={theme.productImageContainer}>
                    <Image source={{ uri: product.imgUrl }} style={{height: 220, width: 220}}/>
                </View>
                <Text style={text.productDetailName}>{product.name}</Text>
                <View style={theme.productPrice}>
                    <Text style={text.currency}>R$</Text>
                    <Text style={text.productValue}>{product.price}</Text>
                </View>
                <ScrollView style={theme.scrollTextContainer}>
                    <Text style={text.productDescription}>{product.description}</Text>
                </ScrollView>
            </View>)}
        </View>
    )
}

export default ProductDetails;