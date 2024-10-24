import React from 'react';
import Lottie from 'lottie-react-native';
import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { scale } from 'react-native-size-matters';

const CustomAlert = ({
    show,
    type = 'warning',
    title,
    desc,
    onPressOk,
    onPressCancel,
    onPressOkText = 'Selesai',
    onPressCancelText = 'Batal',
}) => {
    let icon = '';
    let titleAlert = '';

    switch (type) {
        case 'warning':
            icon = require('@/assets/lottie/lottie-warning.json');          
            titleAlert = 'Peringatan';
            break;
        case 'success':
            icon = require('@/assets/lottie/lottie-success.json');
            titleAlert = 'Berhasil';
            break;
        case 'error':
            icon = require('@/assets/lottie/lottie-error.json');
            titleAlert = 'Gagal';
            break;
        case 'loading':
            icon = require('@/assets/lottie/lottie-loading.json');
            titleAlert = 'Tunggu Sebentar';
            break;
        default:
            break;
    }

    const renderAlert = () => (
        <View style={styles.overlay}>
            <Animated.View
                entering={FadeInDown}
                exiting={FadeOutDown}
                style={styles.alertContainer}
            >
                <View style={styles.iconContainer}>
                    <Lottie
                        style={styles.icon}
                        source={icon}
                        autoPlay={true}
                    />
                    <Text style={styles.title}>
                        {title || titleAlert}
                    </Text>
                    <Text style={styles.description}>
                        {desc}
                    </Text>
                </View>
                <View style={styles.buttonContainer}>
                    {onPressCancel && (
                        <TouchableOpacity
                            onPress={onPressCancel}
                            activeOpacity={0.8}
                            style={[
                                styles.button,
                                styles.cancelButton,
                                onPressOk ? styles.buttonHalfWidth : styles.buttonFullWidth,
                            ]}
                        >
                            <Text style={styles.buttonText}>
                                {onPressCancelText}
                            </Text>
                        </TouchableOpacity>
                    )}
                    {onPressOk && (
                        <TouchableOpacity
                            onPress={onPressOk}
                            activeOpacity={0.8}
                            style={[
                                styles.button,
                                styles.okButton,
                                onPressCancel ? styles.buttonHalfWidth : styles.buttonFullWidth,
                            ]}
                        >
                            <Text style={styles.buttonText}>
                                {onPressOkText}
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            </Animated.View>
        </View>
    );

    if (show === true || typeof show === 'string') {
        return renderAlert();
    }

    return null;
};

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    alertContainer: {
        backgroundColor: '#fff',
        borderRadius: 16,
        padding: 20,
        borderWidth: 0.2,
        borderColor: '#000',
        width: 300,
        marginHorizontal: 10,
        elevation: 1,
    },
    iconContainer: {
        alignItems: 'center',
        minWidth: '75%',
    },
    icon: {
        width: scale(100),
        height: scale(100),
    },
    title: {
        fontSize: scale(12),
        color: '#000',
        textAlign: 'center',
    },
    description: {
        fontSize: scale(10),
        color: '#000',
        textAlign: 'center',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    button: {
        borderRadius: 12,
        padding: 10,
        alignItems: 'center',
    },
    cancelButton: {
        backgroundColor: '#f00',
    },
    okButton: {
        backgroundColor: '#f97316',
    },
    buttonHalfWidth: {
        width: '40%',
        marginHorizontal: 5,
    },
    buttonFullWidth: {
        width: '100%',
    },
    buttonText: {
        fontSize: scale(10),
        color: '#fff',
    },
});

export default CustomAlert;
