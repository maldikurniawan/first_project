// CustomInput.js
import React from 'react';
import { Text, TextInput, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import tw from 'twrnc';

const CustomInput = ({
    label,
    value,
    onChangeText,
    onBlur,
    secureTextEntry = false,
    isVisible = false,
    setVisible,
    error,
    ...rest
}) => {
    return (
        <View style={tw`mb-4`}>
            <Text style={tw`text-gray-700 font-semibold mb-1`}>{label}</Text>
            <View style={tw`flex-row items-center`}>
                <TextInput
                    style={tw`bg-gray-200 text-lg rounded-xl p-2 flex-1`}
                    value={value}
                    onChangeText={onChangeText}
                    onBlur={onBlur}
                    secureTextEntry={secureTextEntry && !isVisible}
                    {...rest}
                />
                {secureTextEntry && (
                    <TouchableOpacity onPress={setVisible}>
                        <Ionicons
                            name={isVisible ? "eye-off" : "eye"}
                            size={24}
                            color="gray"
                            style={tw`absolute right-3 -top-3`}
                        />
                    </TouchableOpacity>
                )}
            </View>
            {error && <Text style={tw`text-red-500`}>{error}</Text>}
        </View>
    );
};

export default CustomInput;
