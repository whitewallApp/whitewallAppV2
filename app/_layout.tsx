import { Stack } from "expo-router";
import CustomHeader from "../app/custom/Header";

export default function RootLayout() {
  return (
    <Stack
        screenOptions={{
          header: (props) => <CustomHeader {...props} />,
        }}
        initialRouteName="index"
      >
      {/* <Stack.Screen name="index" options={{}} />
      <Stack.Screen name="collections" options={{}} />
      <Stack.Screen name="images" options={{}} />
      <Stack.Screen name="imageViewer" options={{title: "Set Wallpaper"}} />
      <Stack.Screen name="settings" options={{}} /> */}
    </Stack>
  );
}
