import { LinearGradient } from "expo-linear-gradient";
import { useMemo } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from "react-native";
import { Movie } from "../types/movie";

interface HeroBannerProps {
  movie: Movie;
}

// Calcula la altura responsiva del hero segun la pantalla.
export const getHeroHeight = (screenHeight: number) => screenHeight * 0.7;

// Genera estrellas visuales segun la calificacion de la pelicula.
const renderStars = (stars: number) => {
  const filled = Math.round(stars);
  return "★".repeat(filled) + "☆".repeat(Math.max(0, 5 - filled));
};

// Muestra la pelicula destacada con fade inferior tipo mask-image.
export function HeroBanner({ movie }: HeroBannerProps) {
  const { width, height } = useWindowDimensions();

  const heroHeight = useMemo(() => getHeroHeight(height), [height]);

  const imageScale = width < 380 ? 1.24 : width < 430 ? 1.18 : 1.14;
  const titleSize = width < 380 ? "text-2xl" : "text-3xl";

  return (
    <View style={{ width: "100%", height: heroHeight }}>
      <ImageBackground
        source={{ uri: movie.image_url }}
        style={styles.image}
        imageStyle={{
          width,
          height: heroHeight,
          transform: [{ scale: imageScale }],
        }}
        resizeMode="cover"
      >
        <View style={{ flex: 1 }} />
      </ImageBackground>

      <LinearGradient
        pointerEvents="none"
        colors={[
          "rgba(0, 0, 0, 0)",
          "rgba(244, 244, 245, 0.55)",
          "rgba(244, 244, 245, 1)",
        ]}
        locations={[0, 0.62, 1]}
        style={styles.bottomMask}
      />

      <View className="mb-5" style={[styles.content, { paddingBottom: Math.max(18, height * 0.026) }]}>
        <Text className={`text-center font-bold text-black ${titleSize}`}>
          {movie.title}
        </Text>
        <Text className="text-center text-lg text-black">
          {movie.year} • {movie.genre}
        </Text>
        <Text className="text-center text-2xl text-yellow-300">
          {renderStars(movie.stars)}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    ...StyleSheet.absoluteFill,
    width: "100%",
    height: "100%",
  },
  content: {
    ...StyleSheet.absoluteFill,
    zIndex: 2,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  bottomMask: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: "18%",
    zIndex: 1,
  },
});
