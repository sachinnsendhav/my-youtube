import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons"; // Import your desired icons
import { Users } from "../../services";
import { Button } from "react-native-paper";

const UsersScreen = () => {
  const navigation = useNavigation();
  const [usersData, setUsersData] = useState([]);
  const [loading, setLoading] = useState(false);
  let token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2QiOnsidG9rZW4iOiIiLCJfaWQiOiI2NTlmYzg2N2ViMjM0ZThjYzYzZGU0N2MiLCJmaXJzdE5hbWUiOiJTYWNoaW4iLCJsYXN0TmFtZSI6IlNlbmRoYXYiLCJlbWFpbCI6InNhY2hpbi5zZW5kaGF2QGNvZGVzcXVhcmV0ZWNoLmNvbSIsInBob25lTnVtYmVyIjo5NjkxMzE3NTY2LCJwYXNzd29yZCI6IiQyYiQxMCRyZXI4Y1pyNGwvYlgyUE5qNTVFOWEubmR1OFB3cGlYVTg1RGFVOWh4WVFuZDlEL3dNcGg4cSIsInJvbGUiOiJhZG1pbiIsIl9fdiI6MH0sImlhdCI6MTcwNTY1NTY2OSwiZXhwIjoxNzA2OTUxNjY5fQ.Rynysfe7dPSix0SDoEmHlW8Lp3E6NrR2lHKkwa1lhN4";
  useEffect(() => {
    getusers();
  }, []);

  const getusers = async () => {
    setLoading(true);
    try {
      const data = await Users.getAllUSerByParents(token);
      setUsersData(data?.data);
    } catch (err) {
      console.error("Error fetching user data -------:", err);
    }
    setLoading(false);
  };

  const deleteUser = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this user?"
    );
    if (confirmDelete) {
      try {
        // Replace the following line with your actual delete user logic
        await fetch(`https://api.example.com/users/${id}`, {
          method: "DELETE",
        });
        const newArray = usersData.filter((item) => item._id !== id);
        setUsersData(newArray);
        alert("User deleted!");
      } catch (error) {
        console.error("Error deleting user:", error);
        // Handle error as needed
      }
    }
  };
  console.log(usersData, "usersData");
  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.userItem}
      onPress={() => navigation.navigate("UserDetails", { userId: item._id })}
    >
      <View style={styles.box}>
        <Text style={styles.userName}>
          {item.firstName} {item.lastName}
        </Text>
        <Text style={styles.text}>Username - {item.userName}</Text>
        <Text style={styles.text}>password - {item.password}</Text>
        {/* Add more user details or customize as needed */}
        <View style={styles.actionIcons}>
          <Button style={styles.btn}>
            {" "}
            <Text style={styles.buttonText}> View </Text>
          </Button>
          <Button style={styles.btn}>
            {" "}
            <Text style={styles.buttonText}> Update</Text>{" "}
          </Button>
          <Button style={styles.btn}>
            {" "}
            <Text style={styles.buttonText}> Delete </Text>
          </Button>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Button style={styles.btn}>
        <Text style={styles.buttonText}>Create New User</Text>
      </Button>
      <FlatList
        data={usersData}
        keyExtractor={(user) => user._id.toString()}
        renderItem={renderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  box: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10, 
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 14,
  },
  userItem: {
    padding: 16,
    border: 1,
    borderColor: "#ddd",
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  text: {
    fontSize: 14,
    fontWeight: "400",
  },
  actionIcons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },
  btn: {
    backgroundColor: "#d40652",
    borderRadius: 10,
  },
  buttonText: {
    fontWeight: "semibold",
    color: "#ffffff",
  },
});

export default UsersScreen;
