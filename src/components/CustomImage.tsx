import React from 'react';
import {
  StyleSheet,
  Image,
  View,
} from 'react-native';

const CustomImage = ({ imageUrl ,isAvatar=false}:{imageUrl:string,isAvatar:boolean}) => (
    <>
    {isAvatar && !imageUrl ? <View style={[styles.avatar, { backgroundColor: 'red' }]} ></View>:
    <Image source={{ uri: imageUrl }} style={isAvatar ? styles.avatar : styles.imageMessage} />}
      
      </>
      
  );

  const styles = StyleSheet.create({
   
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 20,
      marginRight: 10,
    },
   
    imageMessage: {
      width: 200,
      height: 150,
      borderRadius: 8,
      marginVertical: 5,
    },
   
  });

export default CustomImage;