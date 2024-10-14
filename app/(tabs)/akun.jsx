import { View, Text, Image } from 'react-native';
import React from 'react';
import tw from 'twrnc';

export default function Akun() {
  return (
    <View style={tw`flex-1 items-center justify-center bg-gray-100 p-4`}>
      <Image
        source={{ uri: 'https://picsum.photos/200' }}
        style={tw`w-32 h-32 rounded-full mb-4`}
      />
      <Text style={tw`text-2xl font-bold mb-2`}>John Doe</Text>
      <Text style={tw`text-lg text-gray-600`}>Email: johndoe@example.com</Text>
      <Text style={tw`text-lg text-gray-600`}>Phone: +1234567890</Text>
    </View>
  );
}
