import React from "react";
import {Text, View} from "react-native";
import {useRoute} from '@react-navigation/native';

const User: React.FC = () => {
    const {params} = useRoute();
    console.log(params);
    return (
        <View>
            <Text>This is user</Text>
        </View>
    )
}

export default User;
