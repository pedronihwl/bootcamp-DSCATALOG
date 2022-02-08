import React from "react";
import { View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { theme } from "../styles";

interface Props {
    placeholder: string;
    search: string;
    setSearch: Function
}

const SearchInput: React.FC<Props> = ({ search, setSearch, placeholder }) => {

    return (<View style={theme.inputContainer}>
        <TextInput style={theme.textInput} placeholder={placeholder} value={search} onChangeText={text => setSearch(text)}/>
    </View>)
}

export default SearchInput;