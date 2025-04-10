import { Text, View, FlatList } from "react-native";
import { meditations } from "@/data";
import { Meditation } from "@/types";
import MeditationListItem from "@/components/MeditationListItem";

const meditation = meditations[0];

export default function HomeScreen() {
  return (
    <FlatList
      data={meditations}
      contentContainerClassName="gap-8 p-3 bg-white"
      renderItem={({ item }) => <MeditationListItem meditation={item} />}
    />
  );
}
