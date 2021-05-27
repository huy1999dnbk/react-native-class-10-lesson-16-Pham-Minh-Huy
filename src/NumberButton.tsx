import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';

const NumberButton: React.FC<{amount: number; increaseAmount: () => void}> = ({
  amount,
  increaseAmount,
}) => {
  return (
    <View style={{margin: 20}}>
      <TouchableOpacity
        style={{borderWidth: 1, backgroundColor: 'red'}}
        onPress={increaseAmount}>
        <Text style={{fontWeight: 'bold', color: 'white', textAlign: 'center'}}>
          Click to increase
        </Text>
      </TouchableOpacity>
      <Text style={{fontSize: 40, textAlign: 'center'}}>{amount}</Text>
    </View>
  );
};
export default React.memo(NumberButton);
