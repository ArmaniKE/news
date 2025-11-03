import { useEffect, useState } from "react";
import { View, FlatList, ActivityIndicator } from "react-native";
import { fetchNews } from "../api/newsApi";
import NewsItem from "../components/NewsItem";

const HomeScreen = ({ navigation }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadNews();
  }, []);

  const loadNews = async () => {
    const data = await fetchNews();
    setNews(data);
    setLoading(false);
  };

  if (loading) {
    return (
      <ActivityIndicator size="large" style={{ justifyContent: "center" }} />
    );
  }

  return (
    <View style={{ padding: 10 }}>
      <FlatList
        data={news}
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

export default HomeScreen;
