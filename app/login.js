import React, { useState } from "react";
import { Text, View, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert } from "react-native";
import tw from "twrnc"; // Import twrnc

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const backImage = require("../assets/images/backImage.png");

    const onHandleLogin = () => {
        // Handle login logic (without Firebase)
        if (email !== "" && password !== "") {
            console.log("Login success");
            // Add your login logic here (e.g., API call)
        } else {
            Alert.alert("Login error", "Please enter valid email and password");
        }
    };

    return (
        <View style={tw`flex-1 bg-white`}>
            <Image source={backImage} style={tw`absolute top-0 w-full h-80`} />
            <View style={tw`absolute bottom-0 w-full h-3/4 bg-white rounded-t-3xl`} />
            <SafeAreaView style={tw`flex-1 justify-center mx-8`}>
                <Text style={tw`text-4xl font-bold text-orange-500 text-center mb-8`}>Log In</Text>
                <TextInput
                    style={tw`bg-gray-200 h-14 mb-5 text-lg rounded-xl px-4`}
                    placeholder="Enter email"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    textContentType="emailAddress"
                    autoFocus={true}
                    value={email}
                    onChangeText={(text) => setEmail(text)}
                />
                <TextInput
                    style={tw`bg-gray-200 h-14 mb-5 text-lg rounded-xl px-4`}
                    placeholder="Enter password"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    textContentType="password"
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                />
                <TouchableOpacity style={tw`bg-orange-500 h-14 rounded-xl justify-center items-center mt-10`} onPress={onHandleLogin}>
                    <Text style={tw`text-white font-bold text-lg`}>Log In</Text>
                </TouchableOpacity>
                <View style={tw`mt-5 flex-row items-center justify-center`}>
                    <Text style={tw`text-gray-600 font-semibold`}>Don't have an account? </Text>
                    <TouchableOpacity>
                        <Text style={tw`text-orange-500 font-semibold`}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
            <StatusBar barStyle="light-content" />
        </View>
    );
}
