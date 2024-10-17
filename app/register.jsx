import React, { useState } from "react";
import { Text, View, TextInput, Image, SafeAreaView, TouchableOpacity, StatusBar, Alert, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import tw from "twrnc";
import { useNavigation } from "expo-router";

export default function Register() {
    const [username, setUsername] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [password, setPassword] = useState("");
    const [retypePassword, setRetypePassword] = useState("");
    const backImage = require("../assets/images/backImage.png");
    const navigation = useNavigation();

    const onHandleRegister = () => {
        // Handle Register logic (without Firebase)
        if (username !== "" && firstname !== "" && lastname !== "" && password !== "" && password === retypePassword) {
            console.log("Register success");
            // Add your register logic here
        } else {
            Alert.alert("Register error", "Please enter all fields correctly and make sure the passwords match");
        }
    };

    return (
        <KeyboardAvoidingView
            style={tw`flex-1`}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={tw`flex-1 bg-white`}>
                    <Image source={backImage} style={tw`absolute top-0 w-full h-80`} />
                    <View style={tw`absolute bottom-0 w-full h-[700px] bg-white rounded-t-3xl`} />
                    <SafeAreaView style={tw`flex-1 justify-center mx-8`}>
                        <Text style={tw`text-4xl font-bold text-orange-500 text-center my-8`}>Register</Text>

                        <TextInput
                            style={tw`bg-gray-200 h-14 mb-5 text-lg rounded-xl px-4`}
                            placeholder="Enter username"
                            autoCapitalize="none"
                            value={username}
                            onChangeText={(text) => setUsername(text)}
                        />

                        <TextInput
                            style={tw`bg-gray-200 h-14 mb-5 text-lg rounded-xl px-4`}
                            placeholder="Enter firstname"
                            autoCapitalize="words"
                            value={firstname}
                            onChangeText={(text) => setFirstname(text)}
                        />

                        <TextInput
                            style={tw`bg-gray-200 h-14 mb-5 text-lg rounded-xl px-4`}
                            placeholder="Enter lastname"
                            autoCapitalize="words"
                            value={lastname}
                            onChangeText={(text) => setLastname(text)}
                        />

                        <TextInput
                            style={tw`bg-gray-200 h-14 mb-5 text-lg rounded-xl px-4`}
                            placeholder="Enter password"
                            autoCapitalize="none"
                            autoCorrect={false}
                            secureTextEntry={true}
                            value={password}
                            onChangeText={(text) => setPassword(text)}
                        />

                        <TextInput
                            style={tw`bg-gray-200 h-14 mb-5 text-lg rounded-xl px-4`}
                            placeholder="Retype password"
                            autoCapitalize="none"
                            autoCorrect={false}
                            secureTextEntry={true}
                            value={retypePassword}
                            onChangeText={(text) => setRetypePassword(text)}
                        />

                        <TouchableOpacity style={tw`bg-orange-500 h-14 rounded-xl justify-center items-center mt-10`} onPress={onHandleRegister}>
                            <Text style={tw`text-white font-bold text-lg`}>Register</Text>
                        </TouchableOpacity>

                        <View style={tw`mt-5 flex-row items-center justify-center mb-8`}>
                            <Text style={tw`text-gray-600 font-semibold`}>Already have an account? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('login')}>
                                <Text style={tw`text-orange-500 font-semibold`}>Login</Text>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                    <StatusBar barStyle="light-content" />
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}
