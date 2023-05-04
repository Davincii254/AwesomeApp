import React, { Component } from "react";
import { StyleSheet, View, Image, ImageBackground, Text } from "react-native";

function Second(props) {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../assets/images/post_7.jpeg")}
        resizeMode="cover"
        style={styles.image}
        imageStyle={styles.image_imageStyle}
      >
        <Text style={styles.loremIpsum}>Welcome to the darkside</Text>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  image: {
    width: 360,
    height: 715,
    backgroundColor: "rgba(230, 230, 230,1)",
    marginTop: 25
  },
  image_imageStyle: {},
  loremIpsum: {
    fontFamily: "roboto-500",
    color: "rgba(247,247,247,1)",
    fontSize: 20,
    marginTop: 232,
    marginLeft: 83
  }
});

export default Second;
