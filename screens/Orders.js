import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import db from "../config";
import { Card } from "@rneui/themed";
import { Avatar } from "@rneui/themed";
import { Ionicons } from "@expo/vector-icons";
import firebase from "firebase";

export default class Orders extends React.Component {
  constructor() {
    super();
    this.state = {
      vendors: [],
    };
  }

  getData = async () => {
    var response = await db
      .collection("Orders")
      .where("vendorDetails.email", "==", firebase.auth().currentUser.email)
      .get();
    //Map functions - arrays

    response.docs.map((a) => {
      var temp = this.state.vendors;
      var data = a.data();
      data.id = a.id;
      temp.push(data);
      this.setState({ vendors: temp });
    });
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <ImageBackground style={{ flex: 1, backgroundColor: "#F5CCDC" }}>
        <ScrollView
          contentContainerStyle={styles.scrollArea_contentContainerStyle}
        >
          <View style={styles.scrollArea}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: "15%",
                marginLeft: "5%",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.goBack();
                }}
              >
                <Ionicons name="arrow-back" size={24} color="black" />
              </TouchableOpacity>

              <Text
                style={{
                  fontWeight: "bold",
                  fontSize: 24, 
                  marginLeft: 10,
                  fontFamily: "bold",
                }}
              > 
                Orders
              </Text>
            </View>

            <View style={styles.container}>
              {this.state.vendors.length === 0 ? (
                <Text
                  style={{
                    fontSize: 17,
                    alignSelf: "center",
                    marginTop: 40,
                    color: "grey",
                  }}
                >
                  Your Orders will appear here!
                </Text>
              ) : (
                this.state.vendors.map((b) => {
                  return (
                    <TouchableOpacity
                    key={b.id}
                      onPress={() => {
                        this.props.navigation.navigate("OrdersDetail", {
                          id: b.id,
                        });
                      }}
                    >
                      <Card
                        style={{
                          flex: 0.3,
                          borderWidth: 5,
                          borderRadius: 100,
                        }}
                      >
                        <View
                          style={{
                            flexDirection: "row",
                            width: "100%",
                            height: "100%",
                          }}
                        >
                          <Avatar
                            source={{
                              uri: "https://i.pinimg.com/originals/5d/fa/18/5dfa1809bad2b8c039d90f13798452e8.jpg",
                            }}
                            size={64}
                            rounded
                          />

                          <View style={{ marginLeft: 10 }}>
                            <Text
                              style={{
                                fontWeight: "bold",
                                fontSize: 18,
                                fontFamily: "semibold",
                              }}
                            >
                              {b.nameOnCake}
                            </Text>
                            <Text
                              style={{
                                color: "grey",
                                fontSize: 12,
                                fontFamily: "regular",
                              }}
                            >
                              {b.deliveryDate}
                            </Text>

                            <Text
                              style={{
                                color: "grey",
                                fontSize: 12,
                                fontFamily: "regular",
                              }}
                            >
                              {b.occasion}
                            </Text>
                          </View>
                        </View>
                      </Card>
                    </TouchableOpacity>
                  );
                })
              )}
            </View>
          </View>
        </ScrollView>
      </ImageBackground>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
