import React from "react";
import {
  Text,
  View,
  ScrollView,
} from "react-native";
import firebase from "firebase";
//main axis - justifyContent
//cross axis - alignItems

//alignSelf, justifyContent, alignItems, margin and padding
export default class Loading extends React.Component {
  componentDidMount(){
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.replace('Home')
      } else {
        this.props.navigation.replace('Login')
      
      }
    });
  }
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
            <Text>Loading Screen</Text>
        </ScrollView>
      </View>
    );
  }
}
