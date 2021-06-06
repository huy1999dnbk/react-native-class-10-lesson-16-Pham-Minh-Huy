import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { View, Text, Button, ActivityIndicator, Alert } from 'react-native';
import CustomInput from '../CustomInput';
import { useDispatch, useSelector } from 'react-redux'
import { addData } from '../redux/action/productAction';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';
import config from '../config/config';

const CreatePro: React.FC = () => {
    const navigation = useNavigation();
    const queryClient = useQueryClient();
    const [nameProduct, setNameProduct] = useState('')
    const [imgProduct, setImgProduct] = useState('')
    const [costProduct, setCostProduct] = useState('')
    const [desProduct, setDesProduct] = useState('')
    const mutation = useMutation(newPro => axios.post(config.ADD_PRODUCT, newPro), {
        onSuccess: () => {
            Alert.alert('đã thêm');
            queryClient.invalidateQueries('products');
          
        },
    });

    const handleSubmit = (name:string,img:string,cost:Number,desc:string) => {
        mutation.mutate({
          name: name,
          avatar: img,
          cost: cost,
          description: desc,
        });
        navigation.goBack()
    };
    if (mutation.isLoading) {
        return <ActivityIndicator color="red" size="large" />
    }
    return (
        <View>
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
            <Button title="submit" color="black" onPress={() => handleSubmit(nameProduct, imgProduct, Number(costProduct), desProduct)} />
        </View>
    )
}

export default CreatePro