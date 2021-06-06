import axios from 'axios';
import { stubTrue } from 'lodash';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Dimensions, Image, TouchableOpacity, Button, Alert } from 'react-native';
import config from '../config/config';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
const { width, height } = Dimensions.get('window');
import { Modal, Portal, Provider } from 'react-native-paper';
import CustomInput from '../CustomInput';
import { showHelpOnFail } from 'yargs';
import { useSelector, useDispatch } from 'react-redux'
import productReducer from '../redux/reducer/productReducer'
import { deleteData, getData } from '../redux/action/productAction';
import { useNavigation } from '@react-navigation/native';
import { useQueryProducts } from '../queryHook/useQueryProducts'
import { LogBox } from 'react-native';
import { useQueryClient, useMutation } from 'react-query';
LogBox.ignoreLogs(['Setting a timer']);
type itemPro = {
    id: string,
    name: string,
    avatar: string,
    cost: string,
    description: string
}

const Products: React.FC = () => {
    const navigation = useNavigation();
    const productQuery = useQueryProducts();
    const queryClient = useQueryClient();



    const mutation = useMutation((id: string) => axios.delete(config.DELETE + `${id}`), {
        onSuccess: () => {
            Alert.alert('Deleted')
            queryClient.invalidateQueries('products')
        }
    })

    const handleDelete = (id:string) => {
        mutation.mutate(id)
    }

    const ItemProduct = ({ item }: { item: itemPro }) => {
        return (
            <View style={{ height: height / 5, backgroundColor: 'white', flexDirection: 'row', borderRadius: 10, margin: 10, overflow: 'hidden', elevation: 10 }}>
                <View style={{ flex: 1 }}>
                    <Image
                        style={{ resizeMode: 'cover', width: '100%', height: '100%' }}
                        source={{
                            uri: `${item.avatar}`
                        }}
                    />
                </View>
                <View style={{ flex: 2, justifyContent: 'center', paddingLeft: 10 }}>
                    <Text style={{ fontSize: 22 }}>{item.name}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Text style={{ fontSize: 24, color: 'red', fontWeight: 'bold' }}>${item.cost}</Text>
                        <TouchableOpacity onPress={() => handleDelete(item.id)}>
                            <FontAwesomeIcon icon={faTrashAlt} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
    if (productQuery.isLoading) {
        return <ActivityIndicator color="red" size="large" />
    }
    return (
        <Provider>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <FlatList
                    data={productQuery?.data?.data || []}
                    numColumns={1}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <ItemProduct item={item} />}
                />
                <View style={{ position: 'absolute', left: 10, bottom: 10, width: 50, height: 50, borderRadius: 25, backgroundColor: 'green', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.navigate('CreatePro')}>
                        <FontAwesomeIcon icon={faPlus} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
        </Provider>
    )
}

export default Products