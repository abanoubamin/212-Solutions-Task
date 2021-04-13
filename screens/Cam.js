"use strict";
import React, { PureComponent } from "react";
import { StyleSheet, View, PermissionsAndroid, Platform } from "react-native";
import { RNCamera } from "react-native-camera";
import { TemporaryDirectoryPath } from "react-native-fs";
import CameraRoll from "@react-native-community/cameraroll";
import { launchImageLibrary } from "react-native-image-picker";
import ImagePicker from "react-native-image-picker";

class Cam extends PureComponent {
  render() {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={(ref) => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          playSoundOnCapture={true}
          androidCameraPermissionOptions={{
            title: "Permission to use camera",
            message: "We need your permission to use your camera",
            buttonPositive: "Ok",
            buttonNegative: "Cancel",
          }}
          androidRecordAudioPermissionOptions={{
            title: "Permission to use audio recording",
            message: "We need your permission to use your audio",
            buttonPositive: "Ok",
            buttonNegative: "Cancel",
          }}
          onGoogleVisionBarcodesDetected={({ barcodes }) => {
            console.log(barcodes);
          }}
        />
      </View>
    );
  }

  hasAndroidPermission = async () => {
    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === "granted";
  };

  savePicture = async (uri) => {
    if (Platform.OS === "android" && !(await this.hasAndroidPermission())) {
      return;
    }
    CameraRoll.save(uri, { album: "212solutions" })
      .then((res) => {
        console.log("done", res);

        launchImageLibrary(
          { mediaType: "photo", path: uri + "/212solutions/" },
          (response) => {
            console.log("done", response);

            // let option = {
            //   title: "Select Image",
            //   customButtons: [
            //     {
            //       name: "customOptionKey",
            //       title: "Choose Photo from Custom Option",
            //     },
            //   ],
            //   storageOptions: {
            //     skipBackup: true,
            //     path: "images",
            //   },
            // };
            // ImagePicker.showImagePicker(option, (response) => {
            //   console.log("Response = ", response);

            //   if (response.didCancel) {
            //     console.log("User cancelled image picker");
            //   } else if (response.error) {
            //     console.log("ImagePicker Error: ", response.error);
            //   } else if (response.customButton) {
            //     console.log("User tapped custom button: ", response.customButton);
            //   } else {
            //     const source = { uri: response.uri };

            //     // You can also display the image using data:
            //     // const source = { uri: 'data:image/jpeg;base64,' + response.data };
            //   }
            // });
          }
        );
      })
      .catch((error) => console.log("error", error));
  };

  takePicture = async () => {
    if (this.camera) {
      const options = {
        quality: 0.5,
        base64: true,
        // path: TemporaryDirectoryPath + "/212solutions",
      };
      const data = await this.camera.takePictureAsync(options);
      console.log(data.uri);

      await this.savePicture(data.uri);
    }
  };

  componentDidMount() {
    setTimeout(this.takePicture, 1000);
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "black",
  },
  preview: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
});

export default Cam;
