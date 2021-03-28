import * as React from 'react';
import {
    Text,
    View,
    Image,
    TouchableOpacity,
    StyleSheet
} from 'react-native';
import * as Permissions from "expo-permissions";
import {BarCodeScanner} from "expo-barcode-scanner";
  
  export default class ScanScreen extends React.Component {

      constructor() {
        super();
        this.state = {
            hasCameraPermissions: null,
            scanned: false,
            scanData: "",
            buttonState: "normal"
        }
    }

    getCameraPermissions = async() => {
        const {status} = await Permissions.askAsync(Permissions.CAMERA);
        this.setState({
            hasCameraPermissions: status === "granted",
            buttonState: "clicked",
            scanned: false
        })
    }

    handleBarCodeScanner = async ({type, data}) => {
        this.setState({
            scanned: true,
            scanData: data,
            buttonState: "normal"
        })
    }

      render() {
          const hasCameraPermissions = this.state.hasCameraPermissions;
          const scanned = this.state.scanned;
          const buttonState = this.state.buttonState;
          if (buttonState === "clicked" && hasCameraPermissions) {
            return(
                <BarCodeScanner style = {StyleSheet.absoluteFillObject} 
                onBarCodeScanned = {scanned ? undefined : this.handleBarCodeScanner}/>
            )
          }

          else {
            return(
                <View style = {styles.container}>

                    <Image source={require("../assets/camera.jpg")}/>
                    <Text style = {styles.buttonText}> Bar Code Scanner </Text>
                    <Text style = {styles.displayText}> {
                        hasCameraPermissions === true ? this.state.scanData: "Request Camera Permissions"
                    } </Text>
                    <TouchableOpacity style = {styles.scanButton} onPress = {this.getCameraPermissions}> 
                       <Text style = {styles.buttonText}>Scan QR code</Text>
                  </TouchableOpacity>
                  </View>
                )
          }
      }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
    displayText:{
      fontSize: 15,
      textDecorationLine: 'underline'
    },
    scanButton:{
      backgroundColor: '#2196F3',
      padding: 10,
      margin: 10
    },
    buttonText:{
      fontSize: 20,
    }
  });