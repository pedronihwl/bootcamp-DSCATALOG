import React, { useState, useEffect } from 'react'
import { View, Text, ActivityIndicator } from 'react-native';
import { ProductCard, SearchInput } from '../core/components';
import productImg from '../core/assets/product.png'
import { ScrollView } from 'react-native-gesture-handler';
import { theme } from '../core/styles';
import { getApi } from '../services';

const Catalog: React.FC = () => {
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

    return (<ScrollView contentContainerStyle={theme.scrollContainer}>
        <SearchInput placeholder="Insira um nome" search={search} setSearch={setSearch}/>
        {isLoading ? <ActivityIndicator size="large"/> :
            data.map(product => (
                <ProductCard {... product} key={product.id}/>
            ))
        }
    </ScrollView>)
}

export default Catalog;