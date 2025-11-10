import { View, FlatList, Text } from "react-native";
import { useFavorites } from "../context/FavoritesContext";
import NewsItem from "../components/NewsItem";

const FavoritesScreen = ({ navigation }) => {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Пока нет избранных новостей</Text>
      </View>
    );
  }

  return (
    <View style={{ padding: 10 }}>
      <FlatList
        data={favorites}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <NewsItem
            item={item}
            onPress={() => navigation.navigate("Details", { article: item })}
          />
        )}
      />
    </View>
  );
};

export default FavoritesScreen;
