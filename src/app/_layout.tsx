import { Stack } from "expo-router";
import "../../global.css";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Meditations" }} />
      <Stack.Screen
        name="meditation/[id]"
        options={{ headerShown: false, animation: "fade_from_bottom" }}
      />
    </Stack>
  );
}
