import { useEffect, useState, useLayoutEffect } from "react";
import {
  View,
  FlatList,
  ActivityIndicator,
  Button,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import { fetchNews } from "../api/newsApi";
import NewsItem from "../components/NewsItem";

const CATEGORIES = [
  { key: "breaking-news", label: "Все" },
  { key: "world", label: "Мир" },
  { key: "business", label: "Бизнес" },
  { key: "technology", label: "Технологии" },
  { key: "sports", label: "Спорт" },
  { key: "politics", label: "Политика" },
];

const HomeScreen = ({ navigation }) => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState("breaking-news");

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button title="⭐" onPress={() => navigation.navigate("Favorites")} />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    loadNews(category);
  }, [category]);

  const loadNews = async (cat) => {
    setLoading(true);
    const data = await fetchNews(cat);
    setNews(data);
    setLoading(false);
  };

  if (loading) {
    return (
      <ActivityIndicator size="large" style={{ justifyContent: "center" }} />
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ padding: 10 }}
      >
        {CATEGORIES.map((c) => (
          <TouchableOpacity
            key={c.key}
            onPress={() => setCategory(c.key)}
            style={{
              paddingVertical: 6,
              paddingHorizontal: 14,
              marginRight: 8,
              borderRadius: 20,
              backgroundColor: category === c.key ? "#007BFF" : "#ddd",
            }}
          >
            <Text style={{ color: category === c.key ? "#fff" : "#000" }}>
              {c.label}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

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
