import { Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import tw from 'twrnc';

export default function Chat() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const sendMessage = () => {
        if (message.trim()) {
            setMessages((prevMessages) => [
                ...prevMessages,
                { id: prevMessages.length + 1, text: message },
            ]);
            setMessage('');
        }
    };

    const renderMessage = ({ item }) => (
        <View style={tw`bg-orange-200 rounded-lg p-2 m-2`}>
            <Text style={tw`text-lg`}>{item.text}</Text>
        </View>
    );

    return (
        <View style={tw`flex-1 bg-gray-100`}>
            <FlatList
                data={messages}
                renderItem={renderMessage}
                keyExtractor={(item) => item.id.toString()}
                style={tw`flex-1 p-4`}
                contentContainerStyle={tw`pb-20 mt-10`}
            />
            <View style={tw`flex-row items-center p-2 gap-2`}>
                <TextInput
                    style={tw`flex-1 border border-gray-300 rounded-lg p-2`}
                    placeholder="Type your message..."
                    value={message}
                    onChangeText={setMessage}
                />
                <Feather name="send" size={24} color="orange" onPress={sendMessage} />
            </View>
        </View>
    )
}