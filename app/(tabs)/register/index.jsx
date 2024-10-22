import React from "react";
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
import { API_URL_register } from '@/constants';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export default function Index() {
    const navigation = useNavigation();
    const formik = useFormik({
        initialValues: {
            username: '',
            first_name: '',
            last_name: '',
            password: '',
            retypePassword: '',
        },
        validationSchema: Yup.object().shape({
            username: Yup.string().required('Username is required'),
            first_name: Yup.string().required('Firstname is required'),
            last_name: Yup.string().required('Lastname is required'),
            password: Yup.string().required('Password is required'),
            retypePassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
        }),
        onSubmit: async (values) => {
            try {
                const response = await fetch(API_URL_register, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        username: values.username,
                        first_name: values.first_name,
                        last_name: values.last_name,
                        password: values.password,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();
                console.log("Register success", data);
                navigation.navigate("home");

            } catch (error) {
                Alert.alert("Register error", "There was an error during registration.");
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
                    <View style={tw`absolute bottom-0 w-full h-14/15 bg-white rounded-t-3xl`} />
                    <SafeAreaView style={tw`flex-1 justify-center mx-8`}>
                        <Text style={tw`text-4xl font-bold text-orange-500 text-center mb-4 mt-12`}>Register</Text>

                        <View style={tw`mb-4`}>
                            <Text style={tw`text-gray-700 font-semibold mb-1`}>Username</Text>
                            <TextInput
                                style={tw`bg-gray-200 text-lg rounded-xl p-2 mb-1`}
                                autoCapitalize="none"
                                value={formik.values.username}
                                onChangeText={formik.handleChange('username')}
                                onBlur={formik.handleBlur('username')}
                            />
                            {formik.touched.username && formik.errors.username && (
                                <Text style={tw`text-red-500`}>{formik.errors.username}</Text>
                            )}
                        </View>

                        <View style={tw`mb-4`}>
                            <Text style={tw`text-gray-700 font-semibold mb-1`}>Firstname</Text>
                            <TextInput
                                style={tw`bg-gray-200 text-lg rounded-xl p-2 mb-1`}
                                autoCapitalize="words"
                                value={formik.values.first_name}
                                onChangeText={formik.handleChange('first_name')}
                                onBlur={formik.handleBlur('first_name')}
                            />
                            {formik.touched.first_name && formik.errors.first_name && (
                                <Text style={tw`text-red-500`}>{formik.errors.first_name}</Text>
                            )}
                        </View>

                        <View style={tw`mb-4`}>
                            <Text style={tw`text-gray-700 font-semibold mb-1`}>Lastname</Text>
                            <TextInput
                                style={tw`bg-gray-200 text-lg rounded-xl p-2 mb-1`}
                                autoCapitalize="words"
                                value={formik.values.last_name}
                                onChangeText={formik.handleChange('last_name')}
                                onBlur={formik.handleBlur('last_name')}
                            />
                            {formik.touched.last_name && formik.errors.last_name && (
                                <Text style={tw`text-red-500`}>{formik.errors.last_name}</Text>
                            )}
                        </View>

                        <View style={tw`mb-4`}>
                            <Text style={tw`text-gray-700 font-semibold mb-1`}>Password</Text>
                            <View style={tw`flex-row items-center`}>
                                <TextInput
                                    style={tw`bg-gray-200 text-lg rounded-xl p-2 flex-1`}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    secureTextEntry={!formik.values.isPasswordVisible}
                                    value={formik.values.password}
                                    onChangeText={formik.handleChange('password')}
                                    onBlur={formik.handleBlur('password')}
                                />
                                <TouchableOpacity onPress={() => formik.setFieldValue('isPasswordVisible', !formik.values.isPasswordVisible)}>
                                    <Ionicons name={formik.values.isPasswordVisible ? "eye-off" : "eye"} size={24} color="gray" style={tw`absolute right-3 -top-3`} />
                                </TouchableOpacity>
                            </View>
                            {formik.touched.password && formik.errors.password && (
                                <Text style={tw`text-red-500`}>{formik.errors.password}</Text>
                            )}
                        </View>

                        <View>
                            <Text style={tw`text-gray-700 font-semibold mb-1 mt-4`}>Retype Password</Text>
                            <View style={tw`flex-row items-center`}>
                                <TextInput
                                    style={tw`bg-gray-200 text-lg rounded-xl p-2 flex-1`}
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    secureTextEntry={!formik.values.isRetypePasswordVisible}
                                    value={formik.values.retypePassword}
                                    onChangeText={formik.handleChange('retypePassword')}
                                    onBlur={formik.handleBlur('retypePassword')}
                                />
                                <TouchableOpacity onPress={() => formik.setFieldValue('isRetypePasswordVisible', !formik.values.isRetypePasswordVisible)}>
                                    <Ionicons name={formik.values.isRetypePasswordVisible ? "eye-off" : "eye"} size={24} color="gray" style={tw`absolute right-3 -top-3`} />
                                </TouchableOpacity>
                            </View>
                            {formik.touched.retypePassword && formik.errors.retypePassword && (
                                <Text style={tw`text-red-500`}>{formik.errors.retypePassword}</Text>
                            )}
                        </View>

                        <TouchableOpacity
                            style={tw`bg-orange-500 p-2 rounded-xl justify-center items-center mt-10`}
                            onPress={formik.handleSubmit} // Submit form with Formik
                        >
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
