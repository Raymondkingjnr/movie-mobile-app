import SearchBar from "@/components/search-bar";
import { icons } from "@/constants/icons";
import { images } from "@/constants/images";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import useFetch from "@/services/useFetch";
import { fetchMovies } from "@/services/api";
import MovieCard from "@/components/movie-card";
import { getTrendingMovies } from "@/services/app-write";
import TrendingCard from "@/components/TrendingCard";

export default function Index() {
  const router = useRouter();

  const {
    data: movies,
    loading,
    error,
  } = useFetch(() => fetchMovies({ query: "" }));

  const {
    data: trendingMovie,
    loading: trendingLoading,
    error: trendingError,
  } = useFetch(getTrendingMovies);

  return (
    <View className=" flex-1 bg-primary">
      <Image source={images.bg} className=" absolute w-full z-0" />

      <ScrollView
        className=" flex-1 px-5"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ minHeight: "100%", paddingBottom: 10 }}
      >
        <Image source={icons.logo} className=" w-12 h-10 mt-20 mb-5 mx-auto" />

        {loading || trendingLoading ? (
          <ActivityIndicator
            size={"large"}
            color={"#0000ff"}
            className=" mt-10 self-center"
          />
        ) : error || trendingError ? (
          <Text className=" text-lg text-white font-bold mt-5 mb-3">
            {" "}
            Error: {error?.message}{" "}
          </Text>
        ) : (
          <View className=" flex-1 ">
            <SearchBar
              placeholder="Search for a movie"
              onPress={() => router.push("/search")}
            />

            {trendingMovie && (
              <View>
                <Text className="text-lg text-white font-bold mb-3 mt-6">
                  Trending Movies
                </Text>
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  className="mb-4 mt-3"
                  data={trendingMovie}
                  contentContainerStyle={{
                    gap: 26,
                  }}
                  renderItem={({ item, index }) => (
                    <TrendingCard movie={item} index={index} />
                  )}
                  keyExtractor={(item) => item.movie_id.toString()}
                  ItemSeparatorComponent={() => <View className="w-4" />}
                />
              </View>
            )}
            <Text className=" text-lg text-white font-bold mt-5 mb-3">
              Latest Movie
            </Text>
            <FlatList
              data={movies}
              keyExtractor={(item) => item.id}
              numColumns={3}
              columnWrapperStyle={{
                justifyContent: "flex-start",
                gap: 20,
                paddingRight: 5,
                paddingBottom: 5,
                marginBottom: 10,
              }}
              className="mt-2 pb-32"
              scrollEnabled={false}
              renderItem={({ item }) => <MovieCard {...item} />}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}
