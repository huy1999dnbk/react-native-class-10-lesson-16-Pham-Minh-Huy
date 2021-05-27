import React from 'react';
import {Text, View} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {connect} from 'react-redux';
import {changeAnswer, resetAnswer} from '../redux/action/answerAction';

const Answers: React.FC<{answers: any; resetAnswer: Function}> = ({
  answers,
  resetAnswer,
}) => {
  const navigation = useNavigation();
    return (
    <View>
      <View>
        <Text>Đáp án đã chọn:</Text>
        <Text>survey1 : </Text>
        <Text>{answers.survey1Answer.join(',')}</Text>
        <Text>survey2 : </Text>
        <Text>{answers.survey2Answer.join(',')}</Text>
      </View>
      <Text
        onPress={() => {
            resetAnswer();
            navigation.navigate('Survey');
        }}>
        reset answer
      </Text>
    </View>
  );
};

const mapStateToProps = (state: any) => {
  const {answerReducer} = state;
  return {answers: answerReducer};
};
export default connect(mapStateToProps, {resetAnswer: resetAnswer})(Answers);
