import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  scollview: {
    flexDirection: "row",
    flexWrap: "wrap",          // allow wrapping to next line
    padding: 8,
    justifyContent: 'space-between'
  },
  card: {
    flex: 1,
    borderRadius: 10,
    overflow: "hidden",
    padding: 5,
    alignItems: "center",
    
  },
  card_title: {
    textAlign: "center",
    width: "100%",
    fontWeight: "normal",
    fontSize: 20
  },
  card_img: {
    width: 180
  },
  cardWrapper: {
    width: "48%",              // 2 per row with some spacing
    marginBottom: 12,
  },

  //header stuff
  headerContainer: {
    // height: 60, // Adjust as needed
    width: "100%",
    paddingTop: 10,        // extra space from the top
    paddingHorizontal: 15, // optional left/right padding
    flexDirection: "row",  // for back button + header image
    alignItems: "center",  // vertically center items
    backgroundColor: "#fff" // optional header background
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  backbutton: {
    // marginRight: 10,
    color: "black"
  },
  header_img: {
    width: "100%",            // full width
    height: 60,               // fixed height, adjust as needed
    resizeMode: "contain",    // preserves aspect ratio
    alignSelf: "center",      // centers image horizontally
  },

  //button stuff
  button_text: {
    color: 'white',
    fontSize: 16,
    fontWeight: "bold"
  },
  button: {
    height: 50,
    backgroundColor: "blue", // blue button
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5, // for Android shadow
  },
  fab_button: {
    // position: "absolute",
    // bottom: 20,
    // right: 20,
    backgroundColor: "#fff"
  }
});