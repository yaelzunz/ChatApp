import React, { useEffect } from "react";
import { View, TouchableOpacity, Image, StyleSheet, SafeAreaView, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import colors from "../colors";
import { Entypo } from "@expo/vector-icons";
import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { AntDesign } from "@expo/vector-icons";



const Home = () => {
  const navigation = useNavigation();


  const onSignOut = () => {
    signOut(auth).catch((error) => console.log(error));
  };



  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <FontAwesome
          name="search"
          size={24}
          color={colors.gray}
          style={{ marginLeft: 15 }}
        />
      ),
      // headerRight: () => (
      //   <Image
      //     source={pandaImage}
      //     style={{
      //       width: 40,
      //       height: 40,
      //       marginRight: 15,
      //     }}
      //   />
      // ),
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginRight: 10,
          }}
          onPress={onSignOut}
        >
          <AntDesign
            name="logout"
            size={24}
            color={colors.gray}
            style={{ marginRight: 10 }}
          />
        </TouchableOpacity>
      ),

    });
  }, [navigation]);

  return (
  <SafeAreaView style={styles.container}>
  <View style={{flexDirection: 'column', width: '100%', justifyContent: 'flex-start'}}>

      <Text style={styles.Text}> Welcome back {auth?.currentUser?.displayName}</Text>

    </View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Chat")}
        style={styles.chatButton}
      >
        <Entypo name="chat" size={24} color={colors.lightGray} />
      </TouchableOpacity>

       {/* <TouchableOpacity
        onPress={() => navigation.navigate("Map")}
        style={styles.mapButton}
      >
        <FontAwesome name="map-marker" size={24} color="black" />
      </TouchableOpacity> */}

     </SafeAreaView>

  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "flex-end",
    backgroundColor: "#fff",
  },
  chatButton: {
    backgroundColor: colors.primary,
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.9,
    shadowRadius: 8,
    marginRight: 20,
    marginBottom: 20,
  },

  mapButton: {
    backgroundColor: "#ffe4c4",
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.9,
    shadowRadius: 8,
    marginRight: 20,
    marginBottom: 50,
  },

  Button:{
    backgroundColor:'#0782F9',
    width:'60%',
    padding:15,
    borderRadius:10,
    alignContent:'center',
    marginTop:40,

  },
  Text:{
    marginTop:120,
    fontSize: 40,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.7,
    fontWeight: 'bold',
    alignSelf: 'center'
  }
});

