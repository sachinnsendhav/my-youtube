import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RazorpayCheckout from 'react-native-razorpay';
import { Subscription } from '../../services'; // Assuming this is the file where you exported your Subscription service

const ParentProfileScreen = () => {
  const [userParentFirstName, setUserParentFirstName] = useState('');
  const [userParentLastName, setUserParentLastName] = useState('');
  const [subscriptionPlans, setSubscriptionPlans] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const asyncUserParentFirstName = await AsyncStorage.getItem('userParentFirstName');
      const asyncUserParentLastName = await AsyncStorage.getItem('userParentLastName');

      setUserParentFirstName(asyncUserParentFirstName || '');
      setUserParentLastName(asyncUserParentLastName || '');

      const token = await AsyncStorage.getItem('token');
      const subscriptionPlansResponse = await Subscription.getSubscriptionPlans(token);
      const plans = subscriptionPlansResponse.data || [];
      setSubscriptionPlans(plans);
    };
    fetchData();
  }, []);

  const handleSubscriptionPurchase = async (amount, subscriptionId) => {
    try {
      const token = await AsyncStorage.getItem('token');
  
      const options = {
        description: 'Subscription Plan Purchase',
        image: 'https://your-image-url.png',
        currency: 'INR',
        key: 'rzp_test_5FcvK0MsUDGkTa',
        amount: amount * 100,
        name: 'MyYoutube',
        prefill: {
          email: 'test123@gmail.com',
          contact: '8989786464',
          name: `${userParentFirstName} ${userParentLastName}`,
        },
        theme: { color: '#800000' },
      };
  
      RazorpayCheckout.open(options).then(async (data) => {
        const body = {
          paymentId: data.razorpay_payment_id,
          amount: amount,
          subscriptionId: subscriptionId,
        };
        const result = await Subscription.placeOrder(body, token);
        console.log(result);
  
        // Show success alert
        Alert.alert('Payment Success', 'Your payment was successful.');
  
      }).catch((error) => {
        console.log(error);
        Alert.alert('Payment Failed', 'Please try again later.');
      });
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'An error occurred. Please try again later.');
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={require('../../assets/my-yt.png')} style={styles.profileImage} />
        <Text style={styles.fullNameText}>{`${userParentFirstName} ${userParentLastName}`}</Text>
      </View>
      <Text style={styles.title}>Subscription Plans</Text>
      <View style={styles.plansContainer}>
        {subscriptionPlans.map((plan) => (
          <TouchableOpacity
            key={plan._id}
            style={styles.planCard}
            onPress={() => handleSubscriptionPurchase(plan.subscriptionPrice, plan._id)}
          >
            <Text style={styles.planType}>{plan.planType}</Text>
            <Text style={styles.planDescription}>{plan.description}</Text>
            <Text style={styles.planAmount}>{plan.subscriptionPrice} &#8377;</Text>
            <View style={styles.buyButton}>
              <Text style={styles.buyButtonText}>Buy Now</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  card: {
    backgroundColor: '#54b6f7',
    borderRadius: 15,
    padding: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 65,
    marginBottom: 20,
  },
  fullNameText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  plansContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  planCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    width: '48%',
    height: 250,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  planType: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  planDescription: {
    fontSize: 14,
    marginBottom: 5,
    color: '#333',
  },
  planAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#007bff',
  },
  buyButton: {
    backgroundColor: '#007bff',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  buyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ParentProfileScreen;



