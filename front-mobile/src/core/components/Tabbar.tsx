import react from 'react'
import { Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { tab, text } from '../styles';

interface TabProps {
    screen: string;
    setScreen: Function;
}


const Tabbar: React.FC<TabProps> = (props) => {
    const { screen, setScreen } = props;

    const handlePage = (page: string) => {
        setScreen(page)
    }

    return (
        <View style={tab.container}>
            <TouchableOpacity style={[tab.pill, screen === 'products' && tab.pillActive ]} onPress={() => handlePage('products')} activeOpacity={0.8}>
                <Text style={[tab.pillText, screen === 'products' && tab.pillTextActive ]}>Produtos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[tab.pill, screen === 'categories' && tab.pillActive ]} activeOpacity={0.8} onPress={() => handlePage('categories')}>
                <Text style={[tab.pillText, screen === 'categories' && tab.pillTextActive ]}>Categorias</Text>
            </TouchableOpacity>
            <TouchableOpacity style={[tab.pill, screen === 'users' && tab.pillActive ]} activeOpacity={0.8} onPress={() => handlePage('users')}>
                <Text style={[tab.pillText, screen === 'users' && tab.pillTextActive ]}>Usuários</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Tabbar;