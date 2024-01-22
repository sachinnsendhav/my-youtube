import React, { useState } from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Image,
  TextInput,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import axios from "axios";
import { RadioButton } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Auth } from "../services";

const LoginScreen = ({ onLoginSuccess }) => {
  const [userName, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [checked, setChecked] = useState("User");

  const handleLogin = async () => {
    console.log("user")
    // await AsyncStorage.removeItem("token");
    // await AsyncStorage.removeItem("userObjectId");
    // await AsyncStorage.removeItem("role")
    try {
      const data = {
        userName: userName,
        password: password,
      };

      let response;
      if (role === "user") {
        response = await Auth.userLogin(data);
      } else if (role === "admin") {
        const adminData = {
          email: userName, // Assuming the admin uses email as a username
          password: password,
        };
        response = await Auth.login(adminData);
      }

      console.log("resp------", response);


      if (response && response.data) {
        const userObjectId = response.data.userData._id;
        const userFirstName = response.data.userData.firstName;
        const userLastName = response.data.userData.lastName;
        const userUserName = response.data.userData.userName;
        const userPlayListId = response.data.userData.playList;
        const userParentFirstName = response.data.userData.parentfirstName;
        const userParentLastName = response.data.userData.parentLastName;
        const userRole = response.data.userData.role;
        console.log(userRole,"userRole")

        // if (userObjectId !== undefined && userObjectId !== null) {
        //   await AsyncStorage.setItem("userObjectId", userObjectId);
        // } else {
        //   console.warn("Attempted to store undefined value in AsyncStorage.");
        //   // Handle the case where userObjectId is undefined.
        // }

        await AsyncStorage.setItem("userObjectId", userObjectId);
        await AsyncStorage.setItem("userFirstName", userFirstName);
        await AsyncStorage.setItem("userLastName", userLastName);
        await AsyncStorage.setItem("userUserName", userUserName);
        // await AsyncStorage.setItem("userParentFirstName", userParentFirstName);
        // await AsyncStorage.setItem("userParentLastName", userParentLastName);
        await AsyncStorage.setItem("role", userRole);
        await AsyncStorage.setItem(
          "userPlayListId",
          JSON.stringify(userPlayListId)
        );

        const tokenGet = response.data.token;
        await AsyncStorage.setItem("token", tokenGet);
        const getttingAsyncToken = await AsyncStorage.getItem("token");

        // Assuming your API returns a success status
        if (response.status === 200) {
          // If login successful, trigger the onLoginSuccess callback
          onLoginSuccess();
          Alert.alert("Login Successful", "You have successfully logged in.");
        } else {
          // If login fails, show an error message
          Alert.alert("Login Failed", "Invalid credentials. Please try again.");
        }
      } else {
        // Handle the case where response or response.data is undefined
        Alert.alert("Login Failed", "Invalid credentials. Please try again.");
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "An error occurred while logging in");
    }
  };

  const parentLogin = async () => {
    console.log("parent");

    // await AsyncStorage.removeItem("token");
    // await AsyncStorage.removeItem("userObjectId");
    // await AsyncStorage.removeItem("role")
    try {
      const adminData = {
        email: userName, // Assuming the admin uses email as a username
        password: password,
      };
     const response = await Auth.login(adminData);
      console.log(response);

      
      if (response && response.data) {
        const userObjectId = response.data.userData._id;
        const userUserName = response.data.userData.email;
        const userParentFirstName = response.data.userData.firstName;
        const userParentLastName = response.data.userData.lastName;
        const userRole = response.data.userData.role;

      await AsyncStorage.setItem("userParentFirstName", userParentFirstName);
      await AsyncStorage.setItem("userUserName",userUserName)
      await AsyncStorage.setItem("userParentLastName", userParentLastName);
      await AsyncStorage.setItem("role", userRole);

      await AsyncStorage.setItem("token",  response.data.token);
        // const getttingAsyncToken = await AsyncStorage.getItem("token");
      
         // Assuming your API returns a success status
         if (response.status === 200) {
          // If login successful, trigger the onLoginSuccess callback
          onLoginSuccess();
          Alert.alert("Login Successful", "You have successfully logged in admin.");
        } else {
          // If login fails, show an error message
          Alert.alert("Login Failed", "Invalid credentials. Please try again.");
        }
      } else {
        // Handle the case where response or response.data is undefined
        Alert.alert("Login Failed", "Invalid credentials. Please try again.");
      }

    } catch (err) {
      console.log(err);
      Alert.alert("Error", "An error occurred while logging in admin");
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: "https://www.colorhexa.com/9370db.png" }}
        style={styles.backgroundImage}
      >
        <View style={styles.logoContainer}>
          <Image
            source={{
              uri: "https://bootdey.com/img/Content/avatar/avatar3.png",
            }}
            style={styles.logo}
          />
        </View>
        <View style={styles.formContainer}>
          <View style={styles.radioButton}>
            <RadioButton
              value="User"
              status={checked === "User" ? "checked" : "unchecked"}
              onPress={() => {
                setChecked("User");
                setRole("user");
              }}
            />
            <Text>User</Text>
            <RadioButton
              value="Admin"
              status={checked === "Admin" ? "checked" : "unchecked"}
              onPress={() => {
                setChecked("Admin");
                setRole("admin");
              }}
            />
            <Text>Admin</Text>
          </View>
          <View style={styles.card}>
            <TextInput
              placeholder="Username"
              style={styles.input}
              value={userName}
              onChangeText={setUsername}
            />
          </View>
          <View style={styles.card}>
            <TextInput
              placeholder="Password"
              secureTextEntry={true}
              style={styles.input}
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <TouchableOpacity
            style={styles.loginButton}
            onPress={role === "user" ? handleLogin : parentLogin}
          >
            <Text style={styles.loginButtonText}>Log In</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  backgroundImage: {
    flex: 1,
    resizeMode: "cover",
  },
  logoContainer: {
    alignItems: "center",
    marginTop: 160,
  },
  logo: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  formContainer: {
    marginHorizontal: 20,
    marginTop: 50,
    padding: 20,
    borderRadius: 10,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
    padding: 10,
  },
  input: {
    height: 30,
    paddingHorizontal: 10,
    borderBottomColor: "#B0C4DE",
  },
  loginButton: {
    backgroundColor: "#7B68EE",
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  radioButton: {
    flexDirection: "row",
  },
});

export default LoginScreen;
