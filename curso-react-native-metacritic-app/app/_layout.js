import { Pressable, View } from "react-native";
import { Link, Stack } from "expo-router";
import { Logo } from "../components/Logo";
import { CircleInfoIcon } from "../components/Icons";

export default function Layout() {
  return (
    <View className="flex-1">
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "black" },
          headerTintColor: "white",
          headerTitle: "",
          headerLeft: () => {
            return <Logo className="mx-2" />;
          },
          headerRight: () => (
            <Link className="mx-2" asChild href="/about">
              <Pressable>
                <CircleInfoIcon color="white" />
              </Pressable>
            </Link>
          ),
        }}
      />
    </View>
  );
}
