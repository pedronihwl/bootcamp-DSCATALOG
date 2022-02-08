import React, { useEffect, useState } from "react";
import { Image, Text, View, ViewPagerAndroidComponent } from "react-native";
import { TextInput, TouchableOpacity } from "react-native-gesture-handler";
import { text, theme } from "../core/styles";

import eyesOpened from '../core/assets/eyes-opened.png'
import eyesClosed from '../core/assets/eyes-closed.png'
import arrow from '../core/assets/arrow.png'
import { makeLogin } from "../services";
import { useNavigation } from "@react-navigation/native";


const Login: React.FC = () => {
    const [hidePassword, setHidePassword] = useState(true)
    const [userInfo, setUserInfo] = useState({
        username: '',
        password: ''
    })
    const navigation = useNavigation()

    const handleLogin = async () => {
       await makeLogin(userInfo)
       navigation.navigate('Dashboard')
    }

    return <View style={theme.container}>
        <View style={theme.loginCard}>
            <Text style={text.textLoginTitle}>Login</Text>
            <View>
                <TextInput value={userInfo.username} onChangeText={text => setUserInfo({ ... userInfo, username: text })} placeholder="Email" autoCapitalize="none" keyboardType="email-address" style={theme.textInputLogin}/>
                <View style={theme.passwordGroup}>
                    <TextInput placeholder="Senha" secureTextEntry={hidePassword} value={userInfo.password} onChangeText={text => setUserInfo({ ... userInfo, password: text })} autoCapitalize="none"/>
                    <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
                        <Image source={hidePassword ?  eyesOpened : eyesClosed}/>
                    </TouchableOpacity>
                </View>
            </View>
            <TouchableOpacity style={theme.primaryButton} activeOpacity={0.8} onPress={() => handleLogin()}>
                <View>
                    <Text style={text.primaryText}>Fazer Login</Text>
                </View>
                <View style={theme.arrowContainer}>
                    <Image source={arrow}/>
                </View>
            </TouchableOpacity>
        </View>
    </View>

}

export default Login;