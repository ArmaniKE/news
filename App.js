import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  ActivityIndicator,
  Linking,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

const API_URL =
  "https://gnews.io/api/v4/search?q=example&lang=en&country=us&max=10&apikey=2e6e71b39f01e838d61606c7fbf26397";

function HomeScreen({ navigation }) {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((json) => {
        setArticles(json.articles);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={articles}
        keyExtractor={(item, index) => String(index)}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate("Article", { article: item })}
          >
            {item.image && (
              <Image source={{ uri: item.image }} style={styles.cardImage} />
            )}
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDesc}>
              {item.description?.substring(0, 60)}…
            </Text>
            <Text style={styles.cardDate}>
              {new Date(item.publishedAt).toLocaleDateString()}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

function ArticleScreen({ route }) {
  const { article } = route.params;
  return (
    <View style={styles.container}>
      {article.image && (
        <Image source={{ uri: article.image }} style={styles.detailImage} />
      )}
      <Text style={styles.detailTitle}>{article.title}</Text>
      <Text style={styles.detailDate}>
        {new Date(article.publishedAt).toLocaleString()}
      </Text>
      <Text style={styles.detailContent}>
        {article.content || article.description}
      </Text>
      <TouchableOpacity
        onPress={() => {
          Linking.openURL(article.url);
        }}
        style={styles.openButton}
      >
        <Text style={styles.openButtonText}>Open original article</Text>
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "News Blog" }}
        />
        <Stack.Screen
          name="Article"
          component={ArticleScreen}
          options={{ title: "Article" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 15, backgroundColor: "#fff" },
  card: {
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    overflow: "hidden",
  },
  cardImage: { width: "100%", height: 200 },
  cardTitle: { fontSize: 18, fontWeight: "bold", padding: 10 },
  cardDesc: { fontSize: 14, color: "#555", padding: 10 },
  cardDate: { fontSize: 12, color: "#999", padding: 10 },
  detailImage: { width: "100%", height: 250 },
  detailTitle: { fontSize: 22, fontWeight: "bold", marginVertical: 10 },
  detailDate: { fontSize: 14, color: "#999" },
  detailContent: { fontSize: 16, lineHeight: 22, marginVertical: 10 },
  openButton: {
    padding: 10,
    backgroundColor: "#0066cc",
    borderRadius: 5,
    alignItems: "center",
  },
  openButtonText: { color: "#fff", fontSize: 16 },
});
