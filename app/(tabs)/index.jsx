import React, { useEffect } from 'react';
import { Image, StatusBar, useColorScheme, View } from 'react-native';
import { scale } from 'react-native-size-matters';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CLDarkBase, CLLightBase } from '@/utils/colors';
import { useNavigation } from '@react-navigation/native';
import Animated from 'react-native-reanimated';
import tw from 'twrnc';

export default function Index() {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();

  useEffect(() => {
    const checkToken = async () => {
      try {
        const token = JSON.parse(await AsyncStorage.getItem('tokens'));
        if (token) {
          // Jika token ada, navigasi ke /home
          navigation.navigate('home');
        } else {
          // Jika token tidak ada, navigasi ke /login
          navigation.navigate('login');
        }
      } catch (error) {
        console.error('Error fetching token', error);
      }
    };

    checkToken();
  }, [navigation]);

  return (
    <>
      <StatusBar
        barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor={colorScheme === 'light' ? CLLightBase : CLDarkBase}
      />
      <View style={tw`h-full overflow-hidden`}>
        <Animated.View
          style={[tw`absolute -top-[400px] -left-40 rounded-full`]}>
          <Image
            style={{ width: scale(300), height: scale(300) }}
            source={require('@/assets/images/ellipse.png')}
          />
        </Animated.View>
        <Animated.View
          style={[tw`absolute -bottom-[400px] -right-28 rounded-full`]}>
          <Image
            style={{ width: scale(200), height: scale(200) }}
            source={require('@/assets/images/ellipse.png')}
          />
        </Animated.View>

        {/* Content */}
        <View style={tw`min-h-full z-20`}>
          <View style={tw`flex flex-1 justify-center items-center`}>
            <Image
              style={tw`w-40 h-40`}
              source={require('@/assets/images/react-logo.png')}
            />
          </View>
        </View>
      </View>
    </>
  );
}
