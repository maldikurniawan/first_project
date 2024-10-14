import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import tw from 'twrnc';

export default function Message() {
  const navigation = useNavigation();
  const friends = [
    { id: '1', name: 'Alice' },
    { id: '2', name: 'Bob' },
    { id: '3', name: 'Charlie' },
    { id: '4', name: 'Diana' },
    { id: '5', name: 'Ethan' },
  ];

  const renderFriend = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('chat', { friendId: item.id })}
      style={tw`bg-white border border-gray-300 rounded-lg p-4 m-2`}
    >
      <Text style={tw`text-lg`}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={tw`flex-1 bg-gray-100`}>
      <Text style={tw`text-2xl font-bold p-4 mt-10`}>Daftar Teman</Text>
      <FlatList
        data={friends}
        renderItem={renderFriend}
        keyExtractor={(item) => item.id}
        style={tw`flex-1`}
      />
    </View>
  );
};