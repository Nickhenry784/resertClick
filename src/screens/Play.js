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
const imageData = [images.el1, images.el2,images.el3,images.el4,images.el5,images.el6,images.el7,images.el8,images.el9,images.el10,images.el11,images.el12,images.el13,images.el14,images.el15];

const Play = () => {
  const navigation = useNavigation();
  const [score, setScore] = useState(0);
  const [listItem, setListItem] = useState(null);
  const [time, setTime] = useState(30);

  useEffect(() => {
    const list = [];
    for (let index = 0; index < imageData.length; index++) {
      const element = {
        id: index + 1,
        image: imageData[index],
        click: false,
      };
      const element1 = {
        id: index + 16,
        image: imageData[index],
        click: false,
      };
      list.push(element);
      list.push(element1);
    }
    for (let index = 0; index < list.length; index++) {
      const element = list[index];
      const i = Math.random() * 29;
      list.splice(index, 1);
      list.splice(i,0, element);
    }
    setListItem(list);
    console.log(listItem);
  }, []);

  useEffect(() => {
    const timeOut = setTimeout(() => {
      if (time > 0){
        setTime(time - 1);
      }
      if(time === 0){
        navigation.navigate("Play2", {list: listItem});
      }
    }, 1000);
    return () => {
      clearTimeout(timeOut);
    }
  },[time]);

  const onClickBackButton = () => {
    navigation.goBack();
  }

  const onClickStartButton = () => {
    navigation.navigate("Play2", {list: listItem});
  }


  return (
    <ImageBackground style={appStyle.homeView} source={images.background1}>
      <View style={appStyle.appBar}>
        <Text style={appStyle.scoreStyle}>{`Score: ${score}`}</Text>
      </View>
      <View style={appStyle.playView}>
        <Text style={appStyle.timeStyle}>{`Time: ${time}`}</Text>
        <FlatList 
          data={listItem}
          scrollEnabled={false}
          numColumns={numCol}
          style={{paddingHorizontal: 10}}
          renderItem={({item}) => (
            <Image source={item.image} style={appStyle.itemStyle} />
          )}
        />
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
    justifyContent: 'flex-start',
  },
  turnView: {
    flexDirection: 'row',
    width: windowWidth * 0.15,
    marginRight: 10,
    height: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scoreStyle: {
    fontSize: windowWidth > 640 ? 30 : 25,
    color: 'white',
    fontWeight: 'bold',
  },
  timeStyle: {
    fontSize: windowWidth > 640 ? 30 : 25,
    color: 'white',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  turnText: {
    fontSize: windowWidth > 640 ? 30 : 25,
    color: 'blue',
    fontWeight: 'bold',
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

export default Play;