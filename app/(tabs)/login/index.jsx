import React, { useState } from "react";
import {
    Text,
    View,
    TextInput,
    Image,
    SafeAreaView,
    TouchableOpacity,
    StatusBar,
    Alert,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import tw from "twrnc";
import { useNavigation } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

export default function Index() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const navigation = useNavigation();

    const onHandleLogin = () => {
        // Handle login logic
        if (email !== "" && password !== "") {
            console.log("Login success");
            // Add your login logic here
        } else {
            Alert.alert("Login error", "Please enter valid email and password");
        }
    };

    return (
        <KeyboardAvoidingView
            style={tw`flex-1`}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={tw`flex-1 bg-white`}>
                    <Image source={require('@/assets/images/backImage.png')} style={tw`absolute top-0 w-full h-80`} />
                    <View style={tw`absolute bottom-0 w-full h-7/8 bg-white rounded-t-3xl`} />
                    <SafeAreaView style={tw`flex-1 justify-center mx-8`}>
                        <Text style={tw`text-4xl font-bold text-orange-500 text-center mb-4`}>Login</Text>

                        <View>
                            <Text style={tw`text-gray-700 font-semibold mb-1`}>Email</Text>
                            <TextInput
                                style={tw`bg-gray-200 text-lg rounded-xl p-2 mb-4`}
                                autoCapitalize="none"
                                autoFocus={true}
                                value={email}
                                onChangeText={(text) => setEmail(text)}
                            />
                        </View>

                        <View>
                            <Text style={tw`text-gray-700 font-semibold mb-1`}>Password</Text>
                            <TextInput
                                style={tw`bg-gray-200 text-lg rounded-xl p-2 mb-4`}
                                autoCapitalize="none"
                                autoCorrect={false}
                                secureTextEntry={!isPasswordVisible} // Use state for visibility
                                value={password}
                                onChangeText={(text) => setPassword(text)}
                            />
                            <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                                <Ionicons name={isPasswordVisible ? "eye-off" : "eye"} size={24} color="gray" style={tw`absolute right-3 -top-12`} />
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={tw`bg-orange-500 p-2 rounded-xl justify-center items-center mt-10`} onPress={onHandleLogin}>
                            <Text style={tw`text-white font-bold text-lg`}>Login</Text>
                        </TouchableOpacity>

                        <View style={tw`mt-5 flex-row items-center justify-center`}>
                            <Text style={tw`text-gray-600 font-semibold`}>Don't have an account? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('register')}>
                                <Text style={tw`text-orange-500 font-semibold`}>Register</Text>
                            </TouchableOpacity>
                        </View>
                    </SafeAreaView>
                    <StatusBar barStyle="light-content" />
                </View>
            </ScrollView>
        </KeyboardAvoidingView >
    );
}
