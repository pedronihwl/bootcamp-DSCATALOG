import React, { useState } from "react";
import { ActivityIndicator, Image, Modal, Text, View } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";


import arrow from '../../core/assets/left-arrow.png'

interface Props {
    setScreen: Function;
}

const ProductForm: React.FC<Props> = (props) => {
    const { setScreen } = props
    const [loading, setLoading] = useState(false)
    const [edit, setEdit] = useState(false)
    const [showCategories, setShowCategories] = useState(false)

    const [categories, setCategories] = useState([
        {
            id: 3,
            name: "Computador"
        },
        {
            id: 2,
            name: "Computador"
        },
        {
            id: 1,
            name: "Computador"
        },
    ])
    const [product, setProduct] = useState({
        name: null,
        description: null,
        imgUrl: null,
        price: null,
        categories: null
    })

    return <View>
        {
            loading ? <ActivityIndicator size="large"/> : (
                <View>
                    <Modal visible={showCategories} animationType="fade" transparent={true} presentationStyle="overFullScreen">
                        <View>
                            <ScrollView>
                                {categories.map(cat => (
                                    <TouchableOpacity key={cat.id}>
                                        <Text>{cat.name}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                        </View>
                    </Modal>

                    <TouchableOpacity>
                        <Image source={arrow}/>
                        <Text>VOLTAR</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    </View>

}

export default ProductForm;