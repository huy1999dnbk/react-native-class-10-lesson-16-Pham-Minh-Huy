import React, {useState, useContext} from 'react';
import {View, Text, Button, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {connect} from 'react-redux';
import {changeAnswer} from "../redux/action/answerAction";

const data = [
  '1. Từ 1 - 30 tuổi',
  '2. Từ 31 - 40 tuổi',
  '3. Từ 41 - 50 tuổi',
  '4. Từ 51 - 60 tuổi',
  '5. Trên 60 tuổi',
];

const Survey: React.FC<{answers: any, changeAnswer: (data: any) => void}> = ({answers, changeAnswer}) => {
  const {survey1Answer} = answers;
  const navigation = useNavigation();
  const handleCheckBox = (arrange: number) => {
    const isChecked = survey1Answer.find(item => item === data[arrange]);
    let updatedAnswers = {};
    if (!isChecked) {
      //option not chosen
      const array = [...survey1Answer, data[arrange]];
      updatedAnswers = {...answers, survey1Answer: array};
    } else {
      //option was chosen
      updatedAnswers = {
        ...answers,
        survey1Answer: survey1Answer.filter(item => item != data[arrange]),
      };
    }
      changeAnswer(updatedAnswers);
  };

  return (
    <View style={{flex: 1}}>
      <Text style={{textAlign: 'center'}}>Câu 1:</Text>
      <Text>Độ tuổi của quý khách:</Text>
      <View>
        {data.map((item, index) => {
          const isChecked = survey1Answer.find(item => item === data[index]);
          return (
            <View
              key={index}
              style={{flexDirection: 'row', alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => handleCheckBox(index)}
                style={{
                  width: 30,
                  height: 30,
                  borderWidth: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {isChecked && <Text>V</Text>}
              </TouchableOpacity>
              <Text>{item}</Text>
            </View>
          );
        })}
      </View>
      <View>
        <Button
          title="Prev"
          color="yellow"
          onPress={() => navigation.goBack()}
        />
        <Button
          title="Next"
          color="green"
          onPress={() => navigation.navigate('Survey2')}
        />
      </View>
    </View>
  );
};

const mapStateToProps = (state: any) => {
  const {answerReducer} = state;
  return {answers: answerReducer};
};
export default connect(mapStateToProps, {changeAnswer: changeAnswer})(Survey);
