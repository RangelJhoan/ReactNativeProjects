import { StatusBar } from "expo-status-bar";
import { View } from "react-native";
import { Main } from "./components/Main";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
  return (
    <SafeAreaProvider className="w-full">
      <View className="w-full">
        <StatusBar style="auto" />
        <Main />
      </View>
    </SafeAreaProvider>
  );
}
