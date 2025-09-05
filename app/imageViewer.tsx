import { ImageBackground } from "expo-image";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { Dimensions, Linking, Text, TouchableOpacity, View } from "react-native";
import ImageZoom from "react-native-image-pan-zoom";
import { ActivityIndicator } from "react-native-paper";
import { setWallpaper } from "react-native-phone-wallpaper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { API_KEY, BASE_URL } from "./utils/api";
import { styles } from "./utils/Stylesheet";

const phonewidth = Dimensions.get("window").width;
const phoneheight = Dimensions.get("window").height;
const framescale = 0.70;

export default function ImageViewer() {
    const { imageName, imageString } = useLocalSearchParams();
    
    const image = JSON.parse(imageString);
    const imageAction = JSON.parse(image["action"])
    

    const [loading, setLoading] = useState<Boolean>(true);
    const [imagePosition, setImagePos] = useState<Object>({});
    return (
        <SafeAreaProvider>
            <View
                style={{
                    width: phonewidth,
                    height: phoneheight,
                    alignItems: "center",
                }}
            >
                <TouchableOpacity style={{
                    ...{
                        width: phonewidth * framescale,
                        marginTop: 30,
                        marginBottom: 30
                    }, ...styles.button}}
                    onPress={() => {
                        if (imageAction.link != "" && imageAction.link != null) {
                            Linking.openURL(imageAction.link).catch(error => {
                            })
                            track("link", imageName);
                        }
                    }}  
                    >
                    <Text style={styles.button_text}>{imageAction.name}</Text>
                </TouchableOpacity>
                <View
                    style={{
                        width: phonewidth * framescale,
                        height: phoneheight * framescale, // rectangle preview area
                        backgroundColor: "black",
                        borderRadius: 5
                    }}
                >
                    <ImageZoom
                        cropWidth={phonewidth * framescale}
                        cropHeight={phoneheight * framescale}
                        imageWidth={image['width'] *((framescale * phoneheight) / image['height'])}
                        imageHeight={phoneheight * framescale}
                        enableCenterFocus={false}
                        style={{borderRadius: 5}}
                        onMove={(element) => { setImagePos(element) }}
                        centerOn={{ x: 0, y: 0, scale: 1, duration: 10}}
                    >
                        <ImageBackground
                                style={{ width: 'auto', height: '100%'}}
                                source={{uri: BASE_URL + image['imagePath'] + "?apikey=" + API_KEY}}
                                onLoad={() => {setLoading(false)}}
                            >
                                {loading ? (
                                    <View style={{ flex: 1, justifyContent: "center"}}>
                                        <ActivityIndicator size={"large"} />
                                    </View>
                                ) : (
                                    <></>
                                )}
                        </ImageBackground>
                    </ImageZoom>

                    <TouchableOpacity 
                        onPress={() => {
                            changeWallpaper(BASE_URL + image["imagePath"] + "?apikey=" + API_KEY, imagePosition, image, imageName)
                            }} 
                            style={{...{
                                position: "absolute",
                                bottom: 20, // distance from bottom
                                left: 20,   // padding from left
                                right: 20,  // padding from rigth
                                paddingVertical: 15, // button height
                                
                            }, ...styles.button}}>
                        <Text style={styles.button_text}>Set Wallpaper</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaProvider>
  );
}

const changeWallpaper = (url: string, imagePosition: Object, image: object, imageName: string) => {
    const imageWidth = image["width"];
    const imageHeight = image["height"];

    const left = Math.floor((((((phoneheight * framescale) / imageHeight) * imageWidth) / 2) - Math.floor(imagePosition.positionX) - ((phonewidth * framescale) / 2)) / ((((phoneheight * framescale) / imageHeight) * imageWidth) / imageWidth));
    const top = 0;
    const right = Math.floor((((((phoneheight * framescale) / imageHeight) * imageWidth) / 2) - Math.floor(imagePosition.positionX) + ((phonewidth * framescale) / 2)) / (((phoneheight * framescale / imageHeight) * imageWidth) / imageWidth));
    const bottom = imageHeight;

    console.log("size: " + imageWidth + "x" + imageHeight);
    console.log("Top: " + left + "x" + top);
    console.log("Bottom: " + right + "x" + bottom);

    track("wallpaper", imageName);
    setWallpaper(url, "3", left.toString(), top.toString(), right.toString(), bottom.toString()).then(result => {});
}

const track = (type: string, imagename: string) => {

    fetch(BASE_URL + "/requests/v1/tracking", 
        {
            method: "POST",
            headers: {
                Accept: 'application/x-www-form-urlencoded',
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: "apikey=" + API_KEY +"&type="+type+"&name="+imagename
        }
    ).then(test => {

    }).catch(error => {

    })
}
