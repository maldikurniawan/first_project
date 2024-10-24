import { View, Text, Image, TouchableOpacity, Alert } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

export default function Akun() {
  const navigation = useNavigation();

  // Fungsi untuk menghapus token access dan refresh
  const handleLogout = async () => {
    try {
      // Hapus token dari AsyncStorage
      await AsyncStorage.removeItem('user');
      await AsyncStorage.removeItem('tokens');

      // Navigasi ke halaman login setelah logout
      navigation.replace('login'); // Asumsikan Anda memiliki halaman Login
    } catch (error) {
      Alert.alert('Logout failed', 'There was a problem logging out.');
    }
  };

  return (
    <View style={tw`flex-1 items-center justify-center bg-gray-100 p-4`}>
      <Image
        source={{ uri: 'https://picsum.photos/200' }}
        style={tw`w-32 h-32 rounded-full mb-4`}
      />
      <Text style={tw`text-2xl font-bold mb-2`}>John Doe</Text>
      <Text style={tw`text-lg text-gray-600`}>Email: johndoe@example.com</Text>
      <Text style={tw`text-lg text-gray-600 mb-4`}>Phone: +1234567890</Text>

      {/* Tambahkan Button dengan Icon */}
      <TouchableOpacity
        style={tw`flex-row items-center bg-orange-500 text-white gap-2 font-bold p-3 rounded-lg`}
        onPress={handleLogout}
      >
        <MaterialIcons name="logout" size={24} color="white" />
        <Text style={tw`text-xl font-bold text-white`}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
