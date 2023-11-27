import React from 'react';
import {
  Image,
  ImageBackground,
  View,
  StyleSheet,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';


type LogoProps = {
  navigation: StackNavigationProp<any, 'Logo'>;
};

export default function Logo({navigation}: LogoProps) {
  return (
    <View style={styles.container}>
              <ImageBackground
        source={require('../assets/images/login_img.jpg')}
        style={styles.backgroundImage}>
      <Image
        source={require('../assets/images/logo.png')}
        style={styles.logo}></Image>
        </ImageBackground>
    </View>
  );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center', 
      },
      backgroundImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        justifyContent: 'center', 
        alignItems: 'center', 
      },
      logo: {
        width: 400, 
        height: 200, 
        resizeMode: 'contain',
      },
});
