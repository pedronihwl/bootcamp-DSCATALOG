import React, { useEffect, useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import { ProductCard, SearchInput } from "../../core/components";
import { admin } from "../../core/styles";
import { getApi } from "../../services";

interface Props {
    setScreen: Function;
}

const Product: React.FC<Props> = (props) => {
    const { setScreen } =  props
    const [search, setSearch] = useState('')
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false)

   const getProducts = async () => {
       setIsLoading(true)
       const res = await getApi.get('/products?size=6')
       setIsLoading(false)
       setProducts(res.data.content)
   }

    useEffect(() => {
        getProducts()

    },[])

    const data = search.length > 0 ? products.filter(p => p.name.toLowerCase().includes(search.toLowerCase())) : products

    return <ScrollView contentContainerStyle={admin.container} >
        <TouchableOpacity style={admin.addButton} onPress={() =>  setScreen('productForm')}>
            <Text style={admin.addButtonText}>ADICIONAR</Text>
        </TouchableOpacity>
        <SearchInput search={search} setSearch={setSearch} placeholder="Nome do produto"/>
        {isLoading ? <ActivityIndicator size="large"/> :
            data.map(product => (
                <ProductCard {... product} key={product.id} role="admin"/>
            ))
        }
    </ScrollView>

}

export default Product;