import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, ImageSourcePropType, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { admin, text, theme } from "../styles";

interface Props {
    id: Number,
    name: String,
    imgUrl: ImageSourcePropType,
    price: Number,
    role?: String
}



const ProductCard: React.FC<Props> = ({ id, name, imgUrl, price, role }) => {
    const nav = useNavigation()

    return (<TouchableOpacity style={theme.productCard} onPress={() => nav.navigate("ProductDetails", { id })}>
        <Image source={{ uri: imgUrl }} style={{ width: 140, height: 140, margin: 6 }}/>
        <View style={theme.productDescription}>
            <Text style={text.productName}>{name}</Text>
            <View style={theme.productPrice}>
                <Text style={text.currency}>R$</Text>
                <Text style={text.productValue}>{price}</Text>
            </View>
        </View>

        {role === 'admin' && (
            <View style={admin.buttonContainer} >
                <TouchableOpacity style={admin.editBtn}>
                    <Text style={admin.editText}>EDITAR</Text>
                </TouchableOpacity>
                <TouchableOpacity style={admin.deleteBtn}>
                    <Text style={admin.deleteText}>EXCLUIR</Text>
                </TouchableOpacity>
            </View>
        )}
    </TouchableOpacity>)

}

export default ProductCard;