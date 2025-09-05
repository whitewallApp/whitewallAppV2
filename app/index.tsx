import { router } from 'expo-router';
import { useEffect, useState } from "react";
import { Linking, ScrollView, TouchableOpacity, View } from "react-native";
import { ActivityIndicator, Card, FAB, Portal, Provider } from "react-native-paper";
import { API_KEY, BASE_URL, fetchBranding, fetchData } from "./utils/api";
import { styles } from "./utils/Stylesheet";



export default function Categories() {
  const [data, setData] = useState<any>(null);
  const [menuItems, setMenuItems] = useState<any>(null);
  const [loading, setLoading] = useState<Boolean>(true);
  const [open, setOpen] = useState(false);
  
  useEffect(() => {
    const hello = fetchData(API_KEY).then(response => {
      setData(response)
      setLoading(false);
    })
    const test = fetchBranding(API_KEY).then(response => {
      const menuList = response["menuItems"];
      let menuArray = [];
      menuList.forEach(menuItem => {
        menuArray.push({
          icon: menuItem.icon,
          label: menuItem.title,
          onPress: () => menuPress(menuItem.link)
        })
      });
      menuArray.push({ icon: "tune", label: "Settings", onPress: () => router.navigate("/settings") })
      setMenuItems(menuArray);
    })
  }, []);

  if (loading) return <ActivityIndicator size={"large"}></ActivityIndicator>

  return (
    <Provider>
      <ScrollView contentContainerStyle={styles.scollview}>
        {Object.keys(data).map((category: any, index) => (
          <View key={category} style={styles.cardWrapper}>
            <TouchableOpacity
              style={{flex: 1}}
              onPress={() =>
                router.navigate({pathname: "/collections", params: {category: category, collectionsString: JSON.stringify(data[category].collections) }})
              }
            >
              <Card style={styles.card}>
                <Card.Title title={category} titleStyle={styles.card_title}/>
                <Card.Cover source={{ uri: BASE_URL + data[category]["image"] + "?apikey=" + API_KEY }} style={styles.card_img}/>
                {/* <Text>{category}</Text> */}
              </Card>
            </TouchableOpacity>
          </View>
        ))}
        <Portal>
            <FAB.Group
              open={open}
              icon={open ? "close" : "menu"}   // icon changes when open
              actions={menuItems}
              onStateChange={({ open }) => setOpen(open)}
              onPress={() => {
                if (open) {
                  // optional: do something if FAB is open and main button pressed
                }
              }}
              fabStyle={styles.fab_button}
            />
          </Portal>
      </ScrollView>
    </Provider>
  );
}


const menuPress = (link: string) => {
  Linking.openURL(link).catch(error => {
  })
}