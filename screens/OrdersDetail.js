import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import db from "../config";
import { Feather } from "@expo/vector-icons";
import firebase from "firebase";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { Entypo } from "@expo/vector-icons";

export default class OrdersDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedid: props.route.params.id,
      info: [],
      image: "",
      uploading: "none",
      email: firebase.auth().currentUser.email,
      price: "",
      respone: "",
    };
  }
  getData = async () => {
    var response = await db
      .collection("Orders")
      .doc(this.state.selectedid)
      .get();
    this.setState({ info: response.data() });
  };
  componentDidMount() {
    this.getData();
  }

  selectImage = async (path) => {
    this.setState({ uploading: true });
    const { cancelled, uri } = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!cancelled) {
      this.uploadImage(uri, this.state.email, path);
    }
  };

  uploadImage = async (uri, email, path) => {
    var response = await fetch(uri);

    //binary large objects
    var blob = await response.blob();

    var ref = firebase
      .storage()
      .ref()
      .child(path + email);

    return ref.put(blob).then((response) => {
      this.fetchImage(email, path);
    });
  };

  fetchImage = (email, path) => {
    var storageRef = firebase
      .storage()
      .ref()
      .child(path + email);

    // Get the download URL
    storageRef
      .getDownloadURL()
      .then((url) => {
        this.setState({ image: url, uploading: false });
      })
      .catch((error) => {
        this.setState({ image: "#", uploading: "none" });
      });
  };

  submit = () => {
    db.collection("Orders")
      .doc(this.state.selectedid)
      .update({
        cakeimage: this.state.image,
        price: this.state.price,
        vendorsrespone: this.state.respone,
        status: "Vendor Responded",
      });
    alert("Order Responded Succesfully!!");
  };

  render() {
    var icon;
    if (this.state.uploading === "none") {
      icon = <Entypo name="upload" size={24} color="black" />;
    } else if (this.state.uploading) {
      icon = <ActivityIndicator size={"small"} color="black" />;
    } else {
      icon = <Feather name="check-circle" size={24} color="black" />;
    }
    return (
      <ImageBackground style={{ flex: 1, backgroundColor: "#F5CCDC" }}>
        <ScrollView
          horizontal={false}
          contentContainerStyle={styles.scrollArea_contentContainerStyle}
        >
          <View style={styles.container}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: "5%",
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
                style={{ fontWeight: "bold", fontSize: 24, marginLeft: 10 }}
              >
                Order Detail
              </Text>
            </View>
            <View>
              <View>
                <Text style={styles.shopName}>
                  {this.state.info.nameOnCake}
                </Text>
                <Text style={styles.extraEverything}>
                  Delivery Date: {this.state.info.deliveryDate}
                </Text>
                <Text style={styles.extraEverything}>
                  Cake Flavour: {this.state.info.cakesFlavour}
                </Text>
                <Text style={styles.extraEverything}>
                  Cake Weight: {this.state.info.cakesweight}
                </Text>
                <Text style={styles.extraEverything}>
                  Occasion: {this.state.info.occasion}
                </Text>
                <Text style={styles.extraEverything}>
                  Theme: {this.state.info.theme}
                </Text>
                <Text style={styles.extraEverything}>
                  Additional Information:{" "}
                  {this.state.info.additionalInformation}
                </Text>
                <Image
                  source={{ uri: this.state.info.photocakeimage }}
                  style={{ width: 100, height: 100 }}
                />
              </View>
            </View>
            <View style={styles.rect2}>
              <View style={{ flexDirection: "row" }}>
                <Text>Upload Image Of Cake</Text>
                <TouchableOpacity
                  style={{ marginHorizontal: 20 }}
                  onPress={() => {
                    this.selectImage("photocakeordersImg/");
                  }}
                >
                  {icon}
                </TouchableOpacity>
              </View>

              <TextInput
                placeholder="Price"
                blurOnSubmit={true}
                autoCorrect={false}
                spellCheck={false}
                style={styles.textInput}
                onChangeText={(val) => {
                  this.setState({ price: val });
                }}
              />
              <TextInput
                placeholder="Respone"
                blurOnSubmit={true}
                autoCorrect={false}
                spellCheck={false}
                style={styles.textInput}
                onChangeText={(val) => {
                  this.setState({ respone: val });
                }}
              />

              <TouchableOpacity
                style={{ backgroundColor: "#ed647b", borderRadius:10, padding:5 }}
                onPress={() => {
                  if (
                    this.state.image &&
                    this.state.price &&
                    this.state.respone
                  ) {
                    this.submit();
                  } else {
                    alert("Please fill all the details!");
                  }
                }}
              >
                <Text
                  style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}
                >
                  Submit
                </Text>
              </TouchableOpacity>
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

  scrollArea_contentContainerStyle: {
    height: 726,
    width: 323,
  },

  shopName: {
    color: "#50CBE0",
    fontSize: 23,
    marginTop: 13,
    marginLeft: 20,
    fontFamily: "bold",
  },
  extraEverything: {
    color: "#DC6585",
    marginTop: 10,
    marginLeft: 20,
    fontFamily: "medium",
  },

  rect2: {
    width: 266,
    height: 110,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,1)",
    borderRadius: 24,
    shadowColor: "rgba(0,0,0,1)",
    shadowOffset: {
      width: 5,
      height: 5,
    },
    elevation: 30,
    shadowOpacity: 0.33,
    shadowRadius: 10,
    overflow: "visible",
  },
});
