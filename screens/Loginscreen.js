import React from 'react';
import {
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import firebase from 'firebase';
import db from '../config';
export default class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
    };
  }
  login = async () => {
    var response = await db
      .collection('Vendors') 
      .where('email', '==', this.state.email)
      .get();

    if (response.docs.length === 1) {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.state.email, this.state.password)
        .then((userCredential) => {
          alert('Welcome Back!');
          this.props.navigation.replace('Home');
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          alert(errorMessage);
        });
    } else {
      alert('Sorry this is the Vendors App!Please Create Account');
    }
  };
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          source={require('../assets/bg.png')}
          style={{ width: '100%', height: '100%' }}>
          <ScrollView>
            <Image
              source={require('../assets/logonobg.png')}
              style={{
                width: '150%',
                height: 250,
                marginTop: '20%',
                alignSelf: 'center',
                resizeMode: 'contain',
              }}
            />

            <Text
              style={{ fontSize: 20, fontWeight: 'bold', alignSelf: 'center' ,fontFamily:'bold'}}>
              Hello Again
            </Text>
            <Text
              style={{ fontSize: 13, alignSelf: 'center', marginTop: '2%',fontFamily:'medium' }}>
              Boost your cake business with Tailor Cakes..
            </Text>

            <View
              style={{
                flexDirection: 'row',
                width: '90%',
                alignSelf: 'center',
                marginTop: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Feather name="at-sign" size={20} color="grey" />
              <TextInput
                style={{
                  width: '90%',
                  height: 30,
                  borderBottomWidth: 1,
                  paddingLeft: 10,
                  borderBottomColor: 'grey',
                
                }}
                placeholder="Email ID"
                onChangeText={(val) => {
                  this.setState({ email: val });
                }}
              />
            </View>

            <View
              style={{
                flexDirection: 'row',
                width: '90%',
                alignSelf: 'center',
                marginTop: 30,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <AntDesign name="lock" size={20} color="grey" />
              <TextInput
                style={{
                  width: '85%',
                  height: 30,
                  borderBottomWidth: 1,
                  paddingLeft: 10,
                  borderBottomColor: 'grey',
                }}
                placeholder="Password"
                secureTextEntry={true}
                onChangeText={(val) => {
                  this.setState({ password: val });
                }}
              />
              <Feather name="eye-off" size={20} color="grey" />
            </View>

            <Text
              style={{
                marginTop: 10,
                fontWeight: 'bold',
                alignSelf: 'flex-end',
                marginHorizontal: '5%',
                fontFamily:'semibold'
              }}
              onPress={() => {
                this.props.navigation.replace('ForgotPassword');
              }}>
              Forgot Password?
            </Text>

            <TouchableOpacity
              style={{
                backgroundColor: '#ed647b',
                width: '90%',
                height: 40,
                marginTop: 30,
                borderRadius: 10,
                alignSelf: 'center',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => {
                if(this.state.email && this.state.password){
                  this.login();

                }
                else{
                  alert('Please enter all the details!')

                }
              }}>
              <Text style={{ fontSize: 18, color: 'white',fontFamily:'bold' }}>Login</Text>
            </TouchableOpacity>

           

            <Text style={{ alignSelf: 'center', marginTop: 60, color: 'grey' ,fontFamily:'regular'}}>
              New to TailorCakes?
              <Text
                style={{ color: 'blue', fontWeight: 'bold',fontFamily:'medium' }}
                onPress={() => {
                  this.props.navigation.replace('SignUp');
                }}>
                {' '}
                Register Now!!
              </Text>{' '}
            </Text>
          </ScrollView>
        </ImageBackground>
      </View>
    );
  }
}
