import React, { useState } from "react";
import {
    Text,
    View,
    TextInput,
    Image,
    SafeAreaView,
    TouchableOpacity,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    ActivityIndicator,
} from "react-native";
import tw from "twrnc";
import { useNavigation } from "expo-router";
import { Ionicons } from '@expo/vector-icons';
import { API_URL_login } from '@/constants';
import axios from "axios";
import Swal from 'sweetalert2';
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Index() {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false); // Add loading state
    const navigation = useNavigation();
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

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
            try {
                const response = await axios.post(API_URL_login, {
                    username: values.username,
                    password: values.password,
                });
                console.log(response)

                if (response.request.status === 200) {
                    Toast.fire({
                        icon: "success",
                        title: "Signed in uccessfully"
                    });
                    navigation.navigate("home");
                } else {
                    Toast.fire({
                        icon: "success",
                        title: "Signed in failed"
                    });
                }
            } catch (error) {
                Toast.fire({
                    icon: "success",
                    title: "Signed in failed"
                });
            }
        },
    });

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

                        {/* Username Input */}
                        <View style={tw`mb-4`}>
                            <Text style={tw`text-gray-700 font-semibold mb-1`}>Username</Text>
                            <TextInput
                                style={tw`bg-gray-200 text-lg rounded-xl p-2 mb-1`}
                                autoCapitalize="none"
                                value={formik.values.username}
                                onChangeText={formik.handleChange("username")}
                                onBlur={formik.handleBlur("username")}
                            />
                            {formik.touched.username && formik.errors.username && (
                                <Text style={tw`text-red-500`}>{formik.errors.username}</Text>
                            )}
                        </View>

                        {/* Password Input */}
                        <View>
                            <Text style={tw`text-gray-700 font-semibold mb-1`}>Password</Text>
                            <TextInput
                                style={tw`bg-gray-200 text-lg rounded-xl p-2 mb-1`}
                                autoCapitalize="none"
                                secureTextEntry={!isPasswordVisible}
                                value={formik.values.password}
                                onChangeText={formik.handleChange("password")}
                                onBlur={formik.handleBlur("password")}
                            />
                            <TouchableOpacity onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
                                <Ionicons name={isPasswordVisible ? "eye-off" : "eye"} size={24} color="gray" style={tw`absolute right-3 -top-12`} />
                            </TouchableOpacity>
                            {formik.touched.password && formik.errors.password && (
                                <Text style={tw`text-red-500`}>{formik.errors.password}</Text>
                            )}
                        </View>

                        {/* Submit Button */}
                        <TouchableOpacity
                            style={tw`bg-orange-500 p-2 rounded-xl justify-center items-center mt-10`}
                            onPress={formik.handleSubmit}
                            disabled={loading} // Disable button while loading
                        >
                            {loading ? (
                                <ActivityIndicator size="small" color="white" /> // Show loading indicator
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
    );
}
