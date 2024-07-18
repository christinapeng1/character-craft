import { useVoice } from "@humeai/voice-react";
import React from "react";
import { useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { emotionColorMap } from "./EmotionColors";

type EmotionScore = {
  name: string;
  value: number;
};

export default function Emotions() {
  const { messages } = useVoice();
  const [topEmotions, setTopEmotions] = useState<EmotionScore[]>([]);
  const [currentTop3Emotions, setCurrentTop3Emotions] = useState<
    [name: string, value: number][]
  >([]);

  //set top overall top emotions
  useEffect(() => {
    const latestMessage = messages[messages.length - 1];
    if (latestMessage.type === "user_message" && latestMessage.models.prosody) {
      const scoresArray: EmotionScore[] = Object.entries(
        latestMessage.models.prosody.scores)
      .map(([name, value]) => ({name, value: Number(value)}))
      .sort((a, b) => (b.value as number) - (a.value as number));
      const topEmotion = scoresArray[0];
      
      setTopEmotions((prevTopEmotions) => {
        const TopEmotionsArr = [ ...prevTopEmotions];
        const emotionIndex = TopEmotionsArr.findIndex(
          (emotion) => emotion.name === topEmotion.name
        );

        if (emotionIndex > -1) {
          TopEmotionsArr[emotionIndex].value += topEmotion.value;
        } else {
          TopEmotionsArr.push(topEmotion);
        }

        return TopEmotionsArr;
        });
    }
  }, [messages]);

  //set current top 3 emotions the user is experiencing
  useEffect(() => {
    const latestMessage = messages[messages.length - 1];
    if (latestMessage.type === "user_message" && latestMessage.models.prosody) {
      const scoresArray: [string, number][] = Object.entries(
        latestMessage.models.prosody.scores
      );
      scoresArray.sort((a, b) => (b[1] as number) - (a[1] as number));
      const top3Scores = scoresArray.slice(0, 3);
      setCurrentTop3Emotions(top3Scores);
      console.log(currentTop3Emotions);
    }
  }, [messages]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={30} height={30}>
        <Pie
          data={topEmotions}
          isAnimationActive={true}
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={80}
          fill="#8884d8"
          paddingAngle={5}
          dataKey="value"
        >
          {topEmotions.map((emotion) => (
            <Cell
              key={`cell-${emotion}`}
              fill={emotionColorMap[emotion.name]}
            />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
