import React, { useState } from "react";
import {
    Text,
    View,
    Image,
    SafeAreaView,
    TouchableOpacity,
    StatusBar,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Alert,
} from "react-native";
import tw from "twrnc";
import { useNavigation } from "expo-router";
import { API_URL_register } from '@/constants';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';  // Import axios
import { InputField } from '@/components'; // Import the custom input component

export default function Index() {
    const navigation = useNavigation();
    const [isPasswordVisible, setPasswordVisible] = useState(false);
    const [isRetypePasswordVisible, setRetypePasswordVisible] = useState(false);

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
                const response = await axios.post(API_URL_register, {
                    username: values.username,
                    first_name: values.first_name,
                    last_name: values.last_name,
                    password: values.password,
                });

                console.log("Register success", response.data);
                navigation.navigate("home");
            } catch (error) {
                console.error("Register error", error);
                Alert.alert("Register error", "There was an error during registration.");
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
                        <View style={tw`absolute bottom-0 w-full h-14/15 bg-white rounded-t-3xl`} />
                        <SafeAreaView style={tw`flex-1 justify-center mx-8`}>
                            <Text
                                style={[tw`text-4xl font-bold text-orange-500 text-center mb-4 mt-20`, {
                                    textShadowColor: 'black',
                                    textShadowOffset: { width: -1, height: 1 },
                                    textShadowRadius: 1,
                                }]}
                            >
                                Register
                            </Text>

                            <InputField
                                label="Username"
                                value={formik.values.username}
                                onChangeText={formik.handleChange('username')}
                                onBlur={formik.handleBlur('username')}
                                error={formik.touched.username && formik.errors.username}
                            />

                            <InputField
                                label="Firstname"
                                value={formik.values.first_name}
                                onChangeText={formik.handleChange('first_name')}
                                onBlur={formik.handleBlur('first_name')}
                                error={formik.touched.first_name && formik.errors.first_name}
                            />

                            <InputField
                                label="Lastname"
                                value={formik.values.last_name}
                                onChangeText={formik.handleChange('last_name')}
                                onBlur={formik.handleBlur('last_name')}
                                error={formik.touched.last_name && formik.errors.last_name}
                            />

                            <InputField
                                label="Password"
                                value={formik.values.password}
                                onChangeText={formik.handleChange('password')}
                                onBlur={formik.handleBlur('password')}
                                secureTextEntry={true}
                                isVisible={isPasswordVisible}
                                setVisible={() => setPasswordVisible(!isPasswordVisible)}
                                error={formik.touched.password && formik.errors.password}
                            />

                            <InputField
                                label="Retype Password"
                                value={formik.values.retypePassword}
                                onChangeText={formik.handleChange('retypePassword')}
                                onBlur={formik.handleBlur('retypePassword')}
                                secureTextEntry={true}
                                isVisible={isRetypePasswordVisible}
                                setVisible={() => setRetypePasswordVisible(!isRetypePasswordVisible)}
                                error={formik.touched.retypePassword && formik.errors.retypePassword}
                            />

                            <TouchableOpacity
                                style={tw`bg-orange-500 p-2 rounded-xl justify-center items-center mt-6`}
                                onPress={formik.handleSubmit} // Submit form with Formik
                            >
                                <Text style={tw`text-white font-bold text-lg`}>Register</Text>
                            </TouchableOpacity>

                            <View style={tw`mt-5 flex-row items-center justify-center mb-10`}>
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
        </SafeAreaView>
    );
}
