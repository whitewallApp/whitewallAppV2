import { router, useLocalSearchParams } from "expo-router";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { Card } from "react-native-paper";
import { API_KEY, BASE_URL } from "./utils/api";
import { styles } from "./utils/Stylesheet";

export default function Collections() {
    const { collection, collectionsString } = useLocalSearchParams();
    const collections = JSON.parse(collectionsString);

    return (
        <ScrollView contentContainerStyle={styles.scollview}>
            {Object.keys(collections).map((collection: any, index) => (
                <View key={collection} style={styles.cardWrapper}>
                    <TouchableOpacity
                        style={{ flex: 1 }}
                        onPress={() =>
                            router.navigate({ pathname: "/images", params: { collection: collection, imageString: JSON.stringify(collections[collection].images) } })
                        }
                    >
                        <Card style={styles.card}>
                            <Card.Title title={collection} titleStyle={styles.card_title} />
                            <Card.Cover source={{ uri: BASE_URL + collections[collection]["image"] + "?apikey=" + API_KEY }} style={styles.card_img}/>
                            {/* <Text>{collection}</Text> */}
                        </Card>
                    </TouchableOpacity>
                </View>
            ))}
        </ScrollView>
    );
}
