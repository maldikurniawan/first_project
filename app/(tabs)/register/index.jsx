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
    const [username, setUsername] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [password, setPassword] = useState("");
    const [retypePassword, setRetypePassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false); // State for password visibility
    const [isRetypePasswordVisible, setIsRetypePasswordVisible] = useState(false); // State for retype password visibility
    const navigation = useNavigation();

    const onHandleRegister = () => {
        if (username !== "" &&
            firstname !== "" &&
            lastname !== "" &&
            password !== "" &&
            password === retypePassword
        ) {
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
                    <Image source={require('@/assets/images/backImage.png')} style={tw`absolute top-0 w-full h-80`} />
                    <View style={tw`absolute bottom-0 w-full h-14/15 bg-white rounded-t-3xl`} />
                    <SafeAreaView style={tw`flex-1 justify-center mx-8`}>
                        <Text style={tw`text-4xl font-bold text-orange-500 text-center mb-4 mt-12`}>Register</Text>

                        <View>
                            <Text style={tw`text-gray-700 font-semibold mb-1`}>Username</Text>
                            <TextInput
                                style={tw`bg-gray-200 text-lg rounded-xl p-2 mb-4`}
                                autoCapitalize="none"
                                value={username}
                                onChangeText={(text) => setUsername(text)}
                            />
                        </View>

                        <View>
                            <Text style={tw`text-gray-700 font-semibold mb-1`}>Firstname</Text>
                            <TextInput
                                style={tw`bg-gray-200 text-lg rounded-xl p-2 mb-4`}
                                autoCapitalize="words"
                                value={firstname}
                                onChangeText={(text) => setFirstname(text)}
                            />
                        </View>

                        <View>
                            <Text style={tw`text-gray-700 font-semibold mb-1`}>Lastname</Text>
                            <TextInput
                                style={tw`bg-gray-200 text-lg rounded-xl p-2 mb-4`}
                                autoCapitalize="words"
                                value={lastname}
                                onChangeText={(text) => setLastname(text)}
                            />
                        </View>

                        <View>
                            <Text style={tw`text-gray-700 font-semibold mb-1`}>Password</Text>
                            <View style={tw`flex-row items-center`}>
                                <TextInput
                                    style={tw`bg-gray-200 text-lg rounded-xl p-2 flex-1`}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    secureTextEntry={!isPasswordVisible} // Use state for visibility
                                    value={password}
                                    onChangeText={(text) => setPassword(text)}
                                />
                                <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                                    <Ionicons name={isPasswordVisible ? "eye-off" : "eye"} size={24} color="gray" style={tw`absolute right-3 -top-3`} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View>
                            <Text style={tw`text-gray-700 font-semibold mb-1 mt-4`}>Retype Password</Text>
                            <View style={tw`flex-row items-center`}>
                                <TextInput
                                    style={tw`bg-gray-200 text-lg rounded-xl p-2 flex-1`}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    secureTextEntry={!isRetypePasswordVisible} // Use state for visibility
                                    value={retypePassword}
                                    onChangeText={(text) => setRetypePassword(text)}
                                />
                                <TouchableOpacity onPress={() => setIsRetypePasswordVisible(!isRetypePasswordVisible)}>
                                    <Ionicons name={isRetypePasswordVisible ? "eye-off" : "eye"} size={24} color="gray" style={tw`absolute right-3 -top-3`} />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <TouchableOpacity style={tw`bg-orange-500 p-2 rounded-xl justify-center items-center mt-10`} onPress={onHandleRegister}>
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