import { 
  View, 
  StyleSheet, 
  TouchableOpacity,
  Text, Dimensions, 
  ImageBackground,
  FlatList, 
  Image, 
  Alert  } from "react-native";
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import { images } from "../assets";

const windowWidth = Dimensions.get('screen').width;
const windowHeight = Dimensions.get('screen').height;
const numCol = 5;

const Play = ({navigation, route}) => {

  const {list} = route.params;
  const [score, setScore] = useState(0);
  const [heart, setHeart] = useState(3);
  const [index, setIndex] = useState(0);
  const [oneItem, setOneItem] = useState(null);
  const [indexItem, setIndexItem] = useState(null);
  const [play, setPlay] = useState(true);


  const onClickBackButton = () => {
    navigation.navigate("Home");
  }

  const onClickItem = (ind) => {
    list[ind].click = true;
    if(index === 0){
      setIndex(1);
      setOneItem(list[ind]);
      setIndexItem(ind);
    }else{
      setIndex(0);
      if(oneItem.image === list[ind].image){
        setScore(score + 10);
      }else if(heart > 0){
        setHeart(heart - 1);
        list[ind].click = false;
        list[indexItem].click = false;
      } else if(heart === 0){
        setPlay(false);
      }
    }
  }


  return (
    <ImageBackground style={appStyle.homeView} source={images.background1}>
      <View style={appStyle.appBar}>
        <Text style={appStyle.scoreStyle}>{`Score: ${score}`}</Text>
        <Text style={appStyle.scoreStyle}>{`Heart: ${heart}`}</Text>
      </View>
      <View style={appStyle.playView}>
        <FlatList 
          data={list}
          scrollEnabled={false}
          numColumns={numCol}
          style={{paddingHorizontal: 10}}
          renderItem={({item, index}) => (
              <TouchableOpacity key={item.id} onPress={() => onClickItem(index)}>
                <Image source={!item.click ? images.icon : item.image} style={appStyle.itemStyle} />
              </TouchableOpacity>
          )}
        />
      </View>
      {!play && 
        <View style={appStyle.scoreView}>
          <ImageBackground source={images.popup} style={appStyle.popupImage}>
            <Text style={appStyle.timeStyle}>{score}</Text>
            <TouchableOpacity onPress={onClickBackButton}>
                <Image source={images.back} style={appStyle.backStyle} />
              </TouchableOpacity>
          </ImageBackground>
        </View>}
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
  playView:{
    flex: 0.7,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  appBar: {
    flex: 0.1,
    width: '100%',
    paddingHorizontal: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  scoreView: {
    position: 'absolute',
    top: '0%',
    left: '0%',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  scoreStyle: {
    fontSize: windowWidth > 640 ? 30 : 25,
    color: 'white',
    fontWeight: 'bold',
  },
  timeStyle: {
    fontSize: windowWidth > 640 ? 60 : 40,
    color: 'white',
    fontWeight: 'bold',
    marginTop: windowHeight * 0.15,
  },
  itemStyle: {
    width: windowWidth * 0.1,
    height: windowWidth * 0.1,
    resizeMode: 'contain',
    margin: 10,
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
  popupImage: {
    width: windowWidth * 0.7,
    height: windowHeight * 0.3,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backStyle: {
    width: windowWidth * 0.4,
    height: windowWidth * 0.2,
    resizeMode: 'contain',
  },
});

export default Play;