import React from 'react';
import { Text } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { styles } from '../utils/Stylesheet';

export default function CustomHeader({ navigation, route, options }) {
  return (
    <SafeAreaView style={styles.headerContainer}>
        <Text>Hello</Text>
    </SafeAreaView>
  );
};