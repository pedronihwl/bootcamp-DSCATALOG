import { useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Image, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { doLogout, isAuthenticated } from "../../services";
import drawer from '../assets/menu.png'
import { nav, text } from "../styles";


const Navbar: React.FC = () => {
    const [show, setShow] = useState(false)
    const [authenticated, setAuthenticated] = useState(false)
    const navigation = useNavigation()
    const route = useRoute()

    const handleNavigate = (path: any) => {
        if(path) {
            setShow(false)
            navigation.navigate(path)
        }

        setShow(false)
    }

    const isLogged = async () => {
        const bool = await isAuthenticated()
        console.log('LOGADO?' + bool)
        if(bool){
            setAuthenticated(true)
        } else {
            setAuthenticated(false)
        }
    }

    useEffect(() => {
        isLogged()
    },[])

    return <>
        {authenticated ? <TouchableOpacity style={nav.logout} onPress={() => { doLogout(); navigation.navigate('Login') }}>
            <Text style={text.textLogout}> SAIR</Text>
            </TouchableOpacity> : (<TouchableOpacity activeOpacity={0.8} onPress={() => setShow(!show)}>
        <Image source={drawer} style={nav.drawer} />
        {
            show ? (<View style={nav.options}>
                <TouchableOpacity style={nav.option} onPress={() => handleNavigate('Home')} >
                    <Text style={[nav.textOption, route.name === "Home" ? nav.active : null]}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={nav.option} onPress={() => handleNavigate('Catalog')}>
                    <Text style={[nav.textOption, route.name === "Catalog" ? nav.active : null]}>Catálogo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={nav.option} onPress={() => handleNavigate('Dashboard')}>
                    <Text style={[nav.textOption, route.name === "Dashboard" ? nav.active : null]}>Dashboard</Text>
                </TouchableOpacity>
                <TouchableOpacity style={nav.option} onPress={() => handleNavigate('Login')}>
                    <Text style={[nav.textOption, route.name === "Login" ? nav.active : null]}>Login</Text>
                </TouchableOpacity>
            </View>) : null
        }
    </TouchableOpacity>)}
    </>
}

export default Navbar;