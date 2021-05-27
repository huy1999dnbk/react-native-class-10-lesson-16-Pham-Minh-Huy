import React, {useContext} from "react";
import {Text, View} from "react-native";
import {useNavigation} from '@react-navigation/native'
import CustomButton from "../CustomButton";
import {UserContext} from "../context/UserContext";
import AsyncStorage from '@react-native-async-storage/async-storage';

const Home: React.FC = () => {
    const navigation = useNavigation();
    const user = useContext(UserContext);

    const logout = () => {
        AsyncStorage.removeItem('userName').then(() => {
            user.setUser({
                name: '',
                password: ''
            })
        })
    }

    return (
        <View>
            <Text>This is home</Text>
            <Text onPress={() => navigation.navigate('User')}>my name is {user.user.name}</Text>
            <CustomButton label={'Logout'} colorCode={'red'} onPress={logout}/>
        </View>
    )
}

export default Home;
