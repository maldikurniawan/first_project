import { useNavigation } from 'expo-router';
import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

export default function Index() {
  const navigation = useNavigation();
  return (
    <View style={tw`flex-1 bg-gray-100 justify-center items-center p-6`}>
      {/* Header Section */}
      <View style={tw`mb-8`}>
        <Text style={tw`text-4xl font-bold text-orange-800 text-center`}>Welcome to Our App!</Text>
        <Text style={tw`text-lg text-orange-600 mt-2 text-center`}>Experience the best service we offer</Text>
      </View>

      {/* Main Content */}
      <View style={tw`mb-12`}>
        <Text style={tw`text-xl text-gray-700 text-center`}>
          Enjoy seamless functionality, real-time updates, and a fantastic user experience!
        </Text>
      </View>

      {/* Call to Action Button */}
      <TouchableOpacity 
        style={tw`bg-orange-500 p-4 rounded-full shadow-lg`}
        onPress={() => navigation.navigate('login')}
      >
        <Text style={tw`text-white text-lg font-semibold  mx-2`}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}
