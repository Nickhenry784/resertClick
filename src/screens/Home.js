import { 
  View, 
  StyleSheet, 
  TouchableOpacity,
  Text, Dimensions, 
  ImageBackground, 
  Image, 
  Alert  } from "react-native";
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {decrement} from '../redux/pointSlice';
import {useDispatch, useSelector} from 'react-redux';
import { images } from "../assets";

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;

const Home = () => {
  const navigation = useNavigation();

  const points = useSelector(state => state.points);
  const dispatch = useDispatch();


  useEffect(() => {
    console.log(points);
  },[]);

  const onClickStartButton = () => {
    if (points.value === 0) {
      Alert.alert('Please buy more turn');
      return false;
    }
    dispatch(decrement());
    navigation.navigate("Play");
  }


  const onClickTurnButton = () => {
    navigation.navigate("BUY");
  }


  return (
    <ImageBackground style={appStyle.homeView} source={images.background}>
      <View style={appStyle.appBar}>
        <TouchableOpacity onPress={onClickTurnButton}>
          <View style={appStyle.turnView}>
            <Image source={images.icon} style={appStyle.buyImage} />
            <Text style={appStyle.turnText}>{points.value}</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View style={appStyle.bottomView}>
        <TouchableOpacity onPress={onClickStartButton}>
          <Image source={images.start} style={appStyle.createButton} />
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};


export const appStyle = StyleSheet.create({
  homeView: {
    flex: 1,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    resizeMode: 'cover',
  },
  attributeView: {
    flex: 0.1,
    width: '40%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  logoImage: {
    width: windowWidth * 0.4,
    height: windowWidth * 0.4,
    resizeMode: 'cover',
  },
  appBar: {
    flex: 0.1,
    width: '100%',
    paddingTop: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  turnView: {
    flexDirection: 'row',
    width: windowWidth * 0.15,
    marginRight: 10,
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  centerImage: {
    width: windowWidth * 0.4,
    height: windowWidth * 0.4,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreStyle: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
    margin: 8,
  },
  turnText: {
    fontSize: windowWidth > 640 ? 30 : 25,
    fontWeight: 'bold',
    color: 'white',
  },
  tutorialText: {
    marginVertical: 10,
    fontSize: windowWidth > 640 ? 25 : 18,
    color: 'white',
    fontWeight: 'bold',
  },
  labelText: {
    fontSize: windowWidth > 640 ? 60 : 40,
    color: 'white',
    fontWeight: 'bold',
  },
  buyImage: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
  },
  centerView: {
    marginTop: 20,
    flex: 0.85,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  bottomView: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  createButton: {
    width: windowWidth * 0.3,
    height: windowHeight * 0.1,
    resizeMode: 'contain',
  },
  backStyle: {
    width: windowWidth * 0.2,
    height: windowWidth * 0.2,
    resizeMode: 'contain',
  },
});

export default Home;