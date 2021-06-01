import axios from 'axios';
import { stubTrue } from 'lodash';
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Dimensions, Image, TouchableOpacity,Button } from 'react-native';
import config from '../config/config';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
const { width, height } = Dimensions.get('window');
import { Modal, Portal, Provider } from 'react-native-paper';
import CustomInput from '../CustomInput';
import { showHelpOnFail } from 'yargs';
type itemPro = {
    id: string,
    name: string,
    avatar: string,
    cost: string,
    description: string
}

const Products: React.FC = () => {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [visible, setVisible] = useState(false)
    const [nameProduct,setNameProduct] = useState('')
    const [imgProduct,setImgProduct] = useState('')
    const [costProduct,setCostProduct] = useState('')
    const [desProduct,setDesProduct] = useState('')

    const showModal = () => {
        setVisible(true)
    }

    const hideModal = () => {
        setVisible(false)
    }

    const getData = () => {
        setIsLoading(true)
        axios({
            method: 'GET',
            url: config.PRODUCT
        }).then(res => {
            setData(res.data)
            setIsLoading(false)
        }).catch(e => console.log(e))
    }

    const handleDelete = (id: string) => {
        axios({
            method: 'DELETE',
            url: config.DELETE + `${id}`
        }).then(res => {
            getData()
        })
    }

    const handleSubmit = () => {
        setIsLoading(true)
        axios({
            method: 'POST',
            url: config.ADD_PRODUCT, 
            data:{
                name:nameProduct,
                avatar:imgProduct,
                cost: Number(costProduct),
                description: desProduct
            }
        }).then(res=> {
            setVisible(false)
            getData()
        })
    }

    useEffect(() => {
        getData()
    }, [])

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
                    <Text style={{ fontSize: 22 }}>{item.description.length > 45 ? item.description.substr(0, 45) + '...' : item.description}</Text>
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
    if (isLoading) {
        return <ActivityIndicator color="red" size="large" />
    }
    return (
        <Provider>
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <FlatList
                    data={data}
                    numColumns={1}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => <ItemProduct item={item} />}
                />
                <View style={{ position: 'absolute', left: 10, bottom: 10, width: 50, height: 50, borderRadius: 25, backgroundColor: 'green',justifyContent:'center',alignItems:'center' }}>
                    <TouchableOpacity onPress={showModal}>
                        <FontAwesomeIcon icon={faPlus} color="white" />
                    </TouchableOpacity>
                </View>
                <Portal>
                    <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={{backgroundColor:'white',padding:20,margin:10}}>
                        <CustomInput
                            label="Ten san pham"
                            value={nameProduct}
                            placeholder="moi nhap vao ten san pham"
                            onChange={nameProduct => setNameProduct(nameProduct)} 
                        />
                        <CustomInput
                            label="Link anh san pham"
                            value={imgProduct}
                            placeholder="moi nhap vao link anh san pham"
                            onChange={imgProduct => setImgProduct(imgProduct)} 
                        />
                        <CustomInput
                            label="Gia san pham"
                            value={costProduct}
                            placeholder="moi nhap vao gia san pham"
                            onChange={costProduct => setCostProduct(costProduct)} 
                        />
                        <CustomInput
                            label="Mo ta san pham"
                            value={desProduct}
                            placeholder="moi nhap vao mo ta san pham"
                            onChange={desProduct => setDesProduct(desProduct)} 
                        />
                        <Button title="submit" color="black" onPress={handleSubmit} />
                    </Modal>
                </Portal>
            </View>
        </Provider>
    )
}

export default Products