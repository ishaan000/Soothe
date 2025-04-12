import { Text } from "react-native";
import { Link, router, useLocalSearchParams } from "expo-router";
import AntDesign from "@expo/vector-icons/AntDesign";
import { SafeAreaView } from "react-native-safe-area-context";
import { meditations } from "@/data";
import { View, Pressable } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import Feather from "@expo/vector-icons/Feather";
import Slider from "@react-native-community/slider";

export default function MeditationDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const meditation = meditations.find((m) => m.id === Number(id));

  if (!meditation) {
    return <Text>Meditation not found</Text>;
  }

  return (
    <SafeAreaView className="bg-orange-400 flex-1 p-3">
      {/*Page Content*/}
      <View className="flex-1">
        {/*Top part*/}
        <View className="flex-1">
          {/*Header*/}
          <View className="flex-row items-center justify-between p-10">
            <AntDesign name="infocirlceo" size={24} color="black" />

            <View className="bg-zinc-800 p-2 rounded-md">
              <Text className="text-zinc-200 font-semibold">
                Todays's meditation
              </Text>
            </View>

            <AntDesign
              onPress={() => router.back()}
              name="close"
              size={26}
              color="black"
            />
          </View>
          <Text className="text-3xl mt-10 text-center font-semibold text-zinc-800">
            {meditation?.title}
          </Text>
        </View>

        {/*Play/Pause Button*/}
        <Pressable className="bg-zinc-800 self-center w-24 aspect-square rounded-full items-center justify-center">
          <FontAwesome6 name="pause" size={24} color="snow" />
        </Pressable>

        {/*Bottom part*/}
        <View className="flex-1">
          {/*Footer Player*/}
          <View className="p-5 mt-auto gap-5">
            <View className="flex-row justify-between">
              <Feather name="airplay" size={24} color="black" />
              <MaterialCommunityIcons
                name="cog-outline"
                size={24}
                color="#3A3937"
              />
            </View>
            {/*Playback Bar*/}
            <View>
              <Slider
                style={{ width: "100%", height: 40 }}
                value={0.5}
                onSlidingComplete={(value) => console.log(value)}
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor="#3A3937"
                maximumTrackTintColor="#3A393755"
                thumbTintColor="#3A3937"
              />
              <View className="flex-row justify-between">
                <Text className="text-zinc-800 font-semibold">0:00</Text>
                <Text className="text-zinc-800 font-semibold">1:00</Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
