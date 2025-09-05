import { router, useLocalSearchParams } from "expo-router";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Card } from "react-native-paper";
import { styles } from "./utils/Stylesheet";
import { API_KEY, BASE_URL } from "./utils/api";

export default function Images() {
    const { collection, imageString } = useLocalSearchParams();
    const images = JSON.parse(imageString);

    return (
        <ScrollView contentContainerStyle={styles.scollview}>
            {Object.keys(images).map((image: any, index) => (
                <View key={image} style={styles.cardWrapper}>
                    <TouchableOpacity
                        style={{ flex: 1 }}
                        onPress={() =>
                            router.navigate({ pathname: "/imageViewer", params: { imageName: image, imageString: JSON.stringify(images[image]) } })
                        }
                    >
                        <Card style={styles.card}>
                            <Card.Title title={image} titleStyle={styles.card_title}/>
                            <Card.Cover source={{ uri: BASE_URL + images[image]["thumbnail"] + "?apikey=" + API_KEY }} style={styles.card_img}/>
                            {/* <Text>{collection}</Text> */}
                        </Card>
                    </TouchableOpacity>
                </View>
            ))}
        </ScrollView>
    );
}
