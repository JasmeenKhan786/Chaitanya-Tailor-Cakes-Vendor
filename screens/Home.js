import * as React from "react";
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import firebase from "firebase";
import db from "../config";

//#82CFE2 #42CBE0 - blue

//#F5CCDC #DC6585 - pink

export default class Home extends React.Component {
  constructor() {
    super();
    this.state = {
      orders: [],
    };
  }

  getData = async () => {
    var response = await db
      .collection("Orders")
      .where("vendorDetails.email", "==", firebase.auth().currentUser.email)
      .get();
    //Map functions - arrays

    response.docs.map((a) => {
      var temp = this.state.orders;
      var data = a.data();
      data.id = a.id;
      temp.push(data);
      this.setState({ orders: temp });
    });
  };

  componentDidMount() {
    this.getData();
  }
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#F5CCDC" }}>
        <ScrollView>
          <View
            style={{
              flexDirection: "row",
              marginTop: "10%",
              marginHorizontal: "5%",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Text
              style={{ fontSize: 22, fontWeight: "bold", fontFamily: "bold" }}
            >
              Home
            </Text>
            <TouchableOpacity
              onPress={() => {
                firebase
                  .auth()
                  .signOut()
                  .then(() => {
                    this.props.navigation.replace("Login");
                  })
                  .catch((error) => {
                    alert("Something went wrong");
                  });
              }}
            >
              <MaterialIcons name="logout" size={24} color="black" />
            </TouchableOpacity>
          </View>

          <View
            style={{
              width: "90%",
              height: 150,
              alignSelf: "center",
              backgroundColor: "#fff",
              marginTop: 20,
              marginBottom: 20,
              borderRadius: 10,
              flexDirection: "row",
              alignItems: "center",
              elevation: 10,
              shadowColor: "black",
              shadowOpacity: 0.5,
              shadowRadius: 5,
            }}
          >
            <Image
              source={require("../assets/b.png")}
              style={{ width: "40%", height: "80%", resizeMode: "contain" }}
            />
            <Text
              style={{
                fontSize: 17,
                width: "55%",
                textAlign: "center",
                color: "#42CBE0",
                fontWeight: "bold",
                fontFamily: "bold",
              }}
            >
              Boost your cake business with Tailor Cakes
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              marginTop: 20,
              marginHorizontal: "5%",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Text
              style={{
                fontSize: 20,
                fontWeight: "500",
                fontFamily: "medium",
              }}
            >
              Recent Orders
            </Text>
            <Text
              style={{ color: "grey", fontFamily: "light" }}
              onPress={() => {
                this.props.navigation.navigate("Orders");
              }}
            >
              See all{" "}
            </Text>
          </View>

          <Text
            style={{
              marginHorizontal: "5%",
              color: "grey",
              fontSize: 16,
              marginVertical: 10,
            }}
          >
            We provide{" "}
            <Text style={{ fontWeight: "500", fontFamily: "regular" }}>
              Quality . Love . Perfection . Personalization
            </Text>{" "}
            at
            <Text style={{ color: "#42CBE0", fontWeight: "bold" }}>
              {" "}
              Tailor{" "}
            </Text>
            <Text style={{ color: "#DC6585", fontWeight: "bold" }}>Cakes </Text>
          </Text>

          <ScrollView>
            {this.state.orders.length === 0 ? (
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
              this.state.orders.map((a) => {
                return (
                  <View
                  key={a.id}
                    style={{
                      width: "90%",
                      marginVertical: 10,
                      backgroundColor: "white",
                      borderRadius: 10,
                      alignSelf: "center",
                      paddingVertical: 10,
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        marginHorizontal: "5%",
                        justifyContent: "space-between",
                        marginTop: 10,
                      }}
                    >
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "500",
                          fontFamily: "regular",
                        }}
                      >
                        {a.nameOnCake}
                      </Text>
                      <Text
                        style={{
                          backgroundColor: "#82CFE2",
                          padding: 6,
                          borderRadius: 10,
                          color: "white",
                          fontFamily: "regular",
                        }}
                      >
                        {a.deliveryDate}
                      </Text>
                    </View>
                    <Text
                      style={{
                        color: "grey",
                        marginHorizontal: "5%",
                        fontFamily: "regular",
                      }}
                    >
                      {a.deliveryAddress}
                    </Text>

                    <Text
                      style={{
                        color: "grey",
                        marginHorizontal: "5%",
                        marginTop: 5,
                        fontFamily: "regular",
                      }}
                    >
                      {a.occasion} -
                      <Text
                        style={{
                          color: "#DC6585",
                          marginHorizontal: "5%",
                          fontWeight: "bold",
                          fontFamily: "regular",
                        }}
                      >
                        {a.theme}
                      </Text>
                    </Text>

                    <Text
                      style={{
                        marginHorizontal: "5%",
                        alignSelf: "flex-end",
                        color: "#42CBE0",
                        fontWeight: "bold",
                        fontFamily: "regular",
                      }}
                    >
                      {a.cakesweight}
                    </Text>
                  </View>
                );
              })
            )}
          </ScrollView>
        </ScrollView>
      </View>
    );
  }
}
