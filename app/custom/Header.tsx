import { Ionicons } from '@expo/vector-icons';
import { getHeaderTitle } from '@react-navigation/elements'; // Useful for getting the default title
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, TouchableOpacity } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from '../utils/Stylesheet';
import { API_KEY, BASE_URL, fetchBranding } from '../utils/api';

export default function CustomHeader({ navigation, route, options }) {
  const title = getHeaderTitle(options, route.name);

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState<Boolean>(true);
  
  useEffect(() => {
    const hello = fetchBranding(API_KEY).then(response => {
      setData(response)
      setLoading(false);
    })
  }, []);

  return (
    <SafeAreaView style={styles.headerContainer}>
        {title != "index" &&
            <TouchableOpacity
                style={styles.backbutton}
                onPress={() => {
                    router.back();
                }}>
                <Ionicons name="arrow-back" size={24} color={styles.backbutton.color}/>
            </TouchableOpacity>
        }

        {loading ? (
            <ActivityIndicator size={"large"}/>
          ) : (
            <Image 
              source={{
                uri: BASE_URL + data["appHeading"] + "?apikey=" + API_KEY,
              }}
              style={styles.header_img}
            />
          )
        }
    </SafeAreaView>
  );
};