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
import { useAudioPlayer, useAudioPlayerStatus } from "expo-audio";
import AnimatedBackground from "@/components/AnimatedBackground";

import audio from "@assets/meditations/audio1.mp3";

export default function MeditationDetail() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const player = useAudioPlayer(audio);
  const status = useAudioPlayerStatus(player);

  const meditation = meditations.find((m) => m.id === Number(id));

  const formatSeconds = (miliseconds: number) => {
    const minutes = Math.floor(miliseconds / 60000);
    const seconds = Math.floor((miliseconds % 60000) / 1000);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  if (!meditation) {
    return <Text>Meditation not found</Text>;
  }

  return (
    <SafeAreaView className="bg-orange-400 flex-1 p-3">
      <AnimatedBackground />
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
        <Pressable
          onPress={() => (player.playing ? player.pause() : player.play())}
          className="bg-zinc-800 self-center w-24 aspect-square rounded-full items-center justify-center"
        >
          <FontAwesome6
            name={status.playing ? "pause" : "play"}
            size={24}
            color="snow"
          />
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
                value={status.currentTime / status.duration}
                onSlidingComplete={(value) =>
                  player.seekTo(value * status.duration)
                }
                minimumValue={0}
                maximumValue={1}
                minimumTrackTintColor="#3A3937"
                maximumTrackTintColor="#3A393755"
                thumbTintColor="#3A3937"
              />
              <View className="flex-row justify-between">
                <Text className="text-zinc-800 font-semibold">
                  {formatSeconds(status.currentTime)}
                </Text>
                <Text className="text-zinc-800 font-semibold">
                  {formatSeconds(status.duration)}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}
