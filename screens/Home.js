import React, { useRef } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { RNCamera } from "react-native-camera";

const Home = (props) => {
  const camRef = useRef();

  const takePicture = async (camRef) => {
    if (camRef) {
      const options = { quality: 0.5, base64: true };
      const data = await camRef.takePictureAsync(options);
      console.log(data.uri);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => props.navigation.navigate("Cam")}
      >
        <Icon name="camera" size={50} color="#900" />
        <RNCamera
          ref={camRef}
          captureAudio={false}
          type={RNCamera.Constants.Type.back}
          ratio={"4:4"}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
});

export default Home;
