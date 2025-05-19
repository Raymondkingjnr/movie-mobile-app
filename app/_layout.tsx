import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "react-native";
import "./global.css";

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar hidden={true} />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="movies/[id]" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaProvider>
  );
}
