import { Text } from "react-native";
import { Link, router, useLocalSearchParams } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { meditations } from "@/data";

export default function MeditationDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { top } = useSafeAreaInsets();

  const meditation = meditations.find((m) => m.id === Number(id));

  if (!meditation) {
    return <Text>Meditation not found</Text>;
  }

  return (
    <SafeAreaView>
      <Text className="text-3xl mt-3">{meditation?.title}</Text>

      <AntDesign
        onPress={() => router.back()}
        className="absolute right-4"
        style={{ top: top + 16 }}
        name="closecircleo"
        size={24}
        color="black"
      />
    </SafeAreaView>
  );
}
