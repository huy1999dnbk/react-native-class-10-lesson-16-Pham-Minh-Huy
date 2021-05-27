import React, { createContext, useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Login from './screen/Login';
import Survey from './screen/survey';
import Survey2 from './screen/survey2';
import Answers from './screen/Answers';
import { createStackNavigator } from '@react-navigation/stack';
import { UserContext } from './context/UserContext';
import Home from './screen/Home';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect, Provider } from 'react-redux';
import store from './redux/store';
import { changeUser } from './redux/action/UserAction';

const Stack = createStackNavigator();

const AppNavigation: React.FC<{ user: any, changeUser: (data: any) => void }> = ({ user, changeUser }) => {
  // useEffect(() => {
  //   AsyncStorage.getItem('username')
  //     .then(value => {
  //       console.log(value);
  //       changeUser({
  //         username: value,
  //         password: '',
  //       });
  //     })
  //     .catch(e => console.log(e));
  // }, []);
  console.log(user)
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {!user.username ? (
          <Stack.Screen name="Login" component={Login} />
        ) : (
          <>
            <Stack.Screen name="Survey" component={Survey} />
            <Stack.Screen name="Survey2" component={Survey2} />
            <Stack.Screen name="Answers" component={Answers} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const mapStateToProps = (state: any) => {
  const { userReducer } = state;
  return { user: userReducer };
};

export default connect(mapStateToProps, { changeUser: changeUser })(AppNavigation);
