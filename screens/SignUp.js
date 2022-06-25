import React from "react";
import {
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import firebase from "firebase";
import db from "../config";
export default class SignUp extends React.Component {
  signUp = () => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((userCredential) => {
        alert("User created!");

        db.collection("Vendors").add({
          email: this.state.email,
          shopName: this.state.shopName,
          address: this.state.address,
          contactNumber: this.state.contactNumber,
        });

        this.props.navigation.replace("Home");
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage);
      });
  };
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      confirmPassword: "",
      name: "",
      shopName: "",
      address: "",
      contactNumber: "",
    };
  }
  render() {
    return (
      <ImageBackground
        source={require("../assets/bg.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <View style={{ flex: 1 }}>
          <ScrollView>
            <Image
              source={require("../assets/logonobg.png")}
              style={{
                width: "150%",
                height: 250,
                marginTop: "20%",
                alignSelf: "center",
                resizeMode: "contain",
              }}
            />

            <Text
              style={{
                fontSize: 22,
                fontWeight: "bold",
                marginLeft: "5%",
                fontFamily: "bold",
              }}
            >
              Sign Up
            </Text>

            <View
              style={{
                flexDirection: "row",
                width: "90%",
                alignSelf: "center",
                marginTop: 30,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Feather name="at-sign" size={20} color="grey" />
              <TextInput
                style={{
                  width: "90%",
                  height: 30,
                  borderBottomWidth: 1,
                  paddingLeft: 10,
                  borderBottomColor: "grey",
                }}
                placeholder="Email ID"
                onChangeText={(val) => {
                  this.setState({ email: val });
                }}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                width: "90%",
                alignSelf: "center",
                marginTop: 30,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AntDesign name="lock" size={20} color="grey" />
              <TextInput
                style={{
                  width: "90%",
                  height: 30,
                  borderBottomWidth: 1,
                  paddingLeft: 10,
                  borderBottomColor: "grey",
                }}
                placeholder="Password"
                onChangeText={(val) => {
                  this.setState({ password: val });
                }}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                width: "90%",
                alignSelf: "center",
                marginTop: 30,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AntDesign name="lock" size={20} color="grey" />
              <TextInput
                style={{
                  width: "90%",
                  height: 30,
                  borderBottomWidth: 1,
                  paddingLeft: 10,
                  borderBottomColor: "grey",
                }}
                placeholder="Confirm Password"
                onChangeText={(val) => {
                  this.setState({ confirmPassword: val });
                }}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                width: "90%",
                alignSelf: "center",
                marginTop: 30,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AntDesign name="lock" size={20} color="grey" />
              <TextInput
                style={{
                  width: "90%",
                  height: 30,
                  borderBottomWidth: 1,
                  paddingLeft: 10,
                  borderBottomColor: "grey",
                }}
                placeholder="ShopName"
                onChangeText={(val) => {
                  this.setState({ shopName: val });
                }}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                width: "90%",
                alignSelf: "center",
                marginTop: 30,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AntDesign name="lock" size={20} color="grey" />
              <TextInput
                style={{
                  width: "90%",
                  height: 30,
                  borderBottomWidth: 1,
                  paddingLeft: 10,
                  borderBottomColor: "grey",
                }}
                placeholder="ContactNumber"
                onChangeText={(val) => {
                  this.setState({ contactNumber: val });
                }}
              />
            </View>

            <View
              style={{
                flexDirection: "row",
                width: "90%",
                alignSelf: "center",
                marginTop: 30,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <AntDesign name="lock" size={20} color="grey" />
              <TextInput
                style={{
                  width: "90%",
                  height: 30,
                  borderBottomWidth: 1,
                  paddingLeft: 10,
                  borderBottomColor: "grey",
                }}
                placeholder="Address"
                onChangeText={(val) => {
                  this.setState({ address: val });
                }}
              />
            </View>
            <TouchableOpacity
              style={{
                backgroundColor: "#ed647b",
                width: "90%",
                height: 40,
                marginTop: 30,
                borderRadius: 10,
                alignSelf: "center",
                justifyContent: "center",
                alignItems: "center",
              }}
              onPress={() => {
                if (
                  this.state.email &&
                  this.state.password &&
                  this.state.confirmPassword &&
                  this.state.shopName &&
                  this.state.address &&
                  this.state.contactNumber
                ) {
                  if (this.state.password === this.state.confirmPassword) {
                    this.signUp();
                  } else {
                    alert("Passwords dont match");
                  }
                } else {
                  alert("Please enter all the details!");
                }
              }}
            >
              <Text
                style={{ fontSize: 18, color: "white", fontFamily: "bold" }}
              >
                Sign Up
              </Text>
            </TouchableOpacity>

            <Text
              style={{
                alignSelf: "center",
                marginTop: 30,
                color: "grey",
                fontFamily: "regular",
              }}
            >
              Already have an account?
              <Text
                style={{
                  color: "blue",
                  fontWeight: "bold",
                  fontFamily: "semibold",
                }}
                onPress={() => {
                  this.props.navigation.replace("Login");
                }}
              >
                {" "}
                Login
              </Text>{" "}
            </Text>
          </ScrollView>
        </View>
      </ImageBackground>
    );
  }
}
