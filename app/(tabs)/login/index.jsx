import React, { useState } from "react";
import {
    Text,
    View,
    Image,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
    Alert,
} from "react-native";
import tw from "twrnc";
import { useNavigation } from "expo-router";
import { API_URL_login } from '@/constants';
import axios from "axios";
import { useFormik } from "formik";
import * as Yup from "yup";
import { InputField } from '@/components';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [isPasswordVisible, setPasswordVisible] = useState(false);

    const formik = useFormik({
        initialValues: {
            username: "",
            password: "",
        },
        validationSchema: Yup.object().shape({
            username: Yup.string()
                .required("Username is required"),
            password: Yup.string()
                .min(8, "Password must be at least 8 characters")
                .required("Password is required"),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            try {
                const response = await axios.post(API_URL_login, {
                    username: values.username,
                    password: values.password,
                });

                if (response.status === 200) {
                    const { user, tokens } = response.data;

                    // Store access and refresh tokens in AsyncStorage
                    await AsyncStorage.setItem('user', JSON.stringify(user));
                    await AsyncStorage.setItem('tokens', JSON.stringify(tokens));
                    Alert.alert("Success", "Signed in successfully");
                    navigation.navigate("home");
                } else {
                    Alert.alert("Error", "Signed in failed");
                }
            } catch (error) {
                console.error("Login error:", error);
                Alert.alert("Error", "Signed in failed");
            } finally {
                setLoading(false);
            }
        },
    });

    return (
        <SafeAreaView style={tw`flex-1`}>
            <KeyboardAvoidingView
                style={tw`flex-1`}
                behavior="height"
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={tw`flex-1 bg-white`}>
                        <Image source={require('@/assets/images/backImage.png')} style={tw`absolute top-0 w-full h-80`} />
                        <View style={tw`absolute bottom-0 w-full h-7/8 bg-white rounded-t-3xl`} />
                        <SafeAreaView style={tw`flex-1 justify-center mx-8`}>
                            <Text
                                style={[tw`text-4xl font-bold text-orange-500 text-center mb-4 mt-10`, {
                                    textShadowColor: 'black',
                                    textShadowOffset: { width: -1, height: 1 },
                                    textShadowRadius: 1,
                                }]}
                            >
                                Login
                            </Text>

                            {/* Username Input */}
                            <InputField
                                label="Username"
                                value={formik.values.username}
                                onChangeText={formik.handleChange("username")}
                                onBlur={formik.handleBlur("username")}
                                error={formik.touched.username && formik.errors.username}
                            />

                            {/* Password Input */}
                            <View>
                                <InputField
                                    label="Password"
                                    value={formik.values.password}
                                    onChangeText={formik.handleChange("password")}
                                    onBlur={formik.handleBlur("password")}
                                    secureTextEntry={true}
                                    isVisible={isPasswordVisible}
                                    setVisible={() => setPasswordVisible(!isPasswordVisible)}
                                    error={formik.touched.password && formik.errors.password}
                                />
                            </View>

                            {/* Submit Button */}
                            <TouchableOpacity
                                style={tw`bg-orange-500 p-2 rounded-xl justify-center items-center mt-10`}
                                onPress={formik.handleSubmit}
                                disabled={loading}
                            >
                                {loading ? (
                                    <ActivityIndicator size="large" color="white" />
                                ) : (
                                    <Text style={tw`text-white font-bold text-lg`}>Login</Text>
                                )}
                            </TouchableOpacity>

                            <View style={tw`mt-5 flex-row items-center justify-center`}>
                                <Text style={tw`text-gray-600 font-semibold`}>Don't have an account? </Text>
                                <TouchableOpacity onPress={() => navigation.navigate('register')}>
                                    <Text style={tw`text-orange-500 font-semibold`}>Register</Text>
                                </TouchableOpacity>
                            </View>
                        </SafeAreaView>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
