import React, { useState } from "react";
import { View, Text, TextInput, Button, TouchableOpacity,Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Auth } from "../../services";
import { CheckBox } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ParentSignUpScreen = ({onLoginSuccess, setIsLogInScreen}) => {
  const navigation = useNavigation();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const validateForm = () => {
    const error = {};
    if (firstName === "") {
      error.firstName = "Please enter First Name";
    }
    if (lastName === "") {
      error.lastName = "Please enter Last Name";
    }
    if (email === "") {
      error.email = "Please enter email address";
    }
    if (password === "") {
      error.password = "Please enter valid password";
    }
    if (phone === "") {
      error.phone = "Please enter Phone Number";
    }
    if (otp === "") {
      error.otp = "Please enter Otp Number";
    }
    setErrors(error);
    return Object.keys(error).length === 0 && agreedToTerms;
  };

  const handleLogin =  () => {
      setIsLogInScreen(true)
    navigation.navigate("Login");
  }
  const registerParents = async () => {
    console.log("got it")
    setLoading(true);
    if (validateForm()) {
      const data = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        userPassword: password,
        phoneNumber: phone,
        otp: Number(otp),
      };

      console.log(data,"dataaaa")

      try {
        const result = await Auth.register(data);
        console.log("aaya kya",result)

        if (result && result.data) {
          const userObjectId = result.data.userData._id;
          const userUserName = result.data.userData.email;
          const userParentFirstName = result.data.userData.firstName;
          const userParentLastName = result.data.userData.lastName;
          const userRole = result.data.userData.role;
  
          await AsyncStorage.setItem("userParentFirstName", userParentFirstName);
          await AsyncStorage.setItem("userUserName", userUserName);
          await AsyncStorage.setItem("userParentLastName", userParentLastName);
          await AsyncStorage.setItem("role", userRole);
          await AsyncStorage.setItem("token", result.data.token);
          console.log("result.status", result.status);
          if (result.status === 200) {
            onLoginSuccess();
            Alert.alert(
              "Register Successful",
              "You have successfully register in admin."
            );
          } else {
            console.log("result.status", result.status);
  
            Alert.alert("register Failed", "Invalid credentials. Please try again.");
          }
        } else {
          console.log("result.status", result.status);
          Alert.alert("register Failed", "Invalid credentials. Please try again.");
        }

        // if (result?.status === 200) {

          // navigation.navigate("Login");
        // }
      } catch (err) {
        console.log(err, "error");
      }
    }
    setLoading(false);
  };

  const sendOtp = async () => {
    setLoading(true);
    if (email !== "") {
      const data = {
        email: email,
      };
      try {
        const result = await Auth.generateOtp(data);
        // Handle result if needed
      } catch (err) {
        console.log(err, "error");
      }
    } else {
      alert("Please enter Email Address");
    }
    setLoading(false);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", padding: 16 }}>
      <Text
        style={{
          fontSize: 24,
          fontWeight: "bold",
          marginBottom: 16,
          color: "#333",
        }}
      >
        Parents - Sign Up
      </Text>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <TextInput
          style={{
            flex: 1,
            marginRight: 8,
            padding: 10,
            borderBottomWidth: 1,
            borderColor: "#ccc",
          }}
          placeholder="First Name"
          value={firstName}
          onChangeText={(text) => setFirstName(text)}
        />
        <TextInput
          style={{
            flex: 1,
            marginLeft: 8,
            padding: 10,
            borderBottomWidth: 1,
            borderColor: "#ccc",
          }}
          placeholder="Last Name"
          value={lastName}
          onChangeText={(text) => setLastName(text)}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <TextInput
          style={{
            flex: 1,
            marginRight: 8,
            padding: 10,
            borderBottomWidth: 1,
            borderColor: "#ccc",
          }}
          placeholder="Email"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          style={{
            flex: 1,
            marginLeft: 8,
            padding: 10,
            borderBottomWidth: 1,
            borderColor: "#ccc",
          }}
          placeholder="Password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <TextInput
          style={{
            flex: 1,
            marginRight: 8,
            padding: 10,
            borderBottomWidth: 1,
            borderColor: "#ccc",
          }}
          placeholder="Phone"
          value={phone}
          onChangeText={(text) => setPhone(text)}
        />
        <TextInput
          style={{
            flex: 1,
            marginLeft: 8,
            padding: 10,
            borderBottomWidth: 1,
            borderColor: "#ccc",
          }}
          placeholder="Otp"
          value={otp}
          onChangeText={(text) => setOtp(text)}
        />

        <TouchableOpacity
          onPress={() => sendOtp()}
          style={{
            backgroundColor: "#ffc34a",
            padding: 10,
            borderRadius: 5,
            marginVertical: 10,
          }}
        >
          <Text
            style={{ color: "white", textAlign: "center", fontWeight: "bold" }}
          >
            Send OTP
          </Text>
        </TouchableOpacity>
      </View>

      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}
      >
        <CheckBox
          checked={agreedToTerms}
          onPress={() => setAgreedToTerms(!agreedToTerms)}
          containerStyle={{ margin: 0, padding: 0 }}
        />
        <Text style={{ marginLeft: 8 }}>
          I agree to the terms and condition
        </Text>
      </View>

      <TouchableOpacity
        onPress={() => registerParents()}
        disabled={loading}
        style={{
          backgroundColor: loading ? "gray" : "#ffc34a",
          padding: 10,
          borderRadius: 5,
          marginVertical: 10,
        }}
      >
        <Text
          style={{ color: "white", textAlign: "center", fontWeight: "bold" }}
        >
          Sign Up
        </Text>
      </TouchableOpacity>

      <Text style={{ color: "#555", textAlign: "center", marginTop: 10 }}>
        Already have an account?{" "}
        <Text
        //   onPress={() =>{ navigation.navigate("Login"),setIsLogInScreen(true)}} 
        onPress={() => handleLogin()}

        // Replace 'SignIn' with your sign-in screen name
          style={{ color: "blue", textDecorationLine: "underline" }}
        >
          Sign in
        </Text>
      </Text>
    </View>
  );
};

export default ParentSignUpScreen;
