import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const NewsItem = ({ item, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.card}>
    {item.image ? (
      <Image source={{ uri: item.image }} style={styles.image} />
    ) : null}
    <View style={styles.content}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.source}>{item.source?.name}</Text>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 12,
    overflow: "hidden",
  },
  image: { width: "100%", height: 180 },
  content: { padding: 10 },
  title: { fontSize: 16, fontWeight: "bold" },
  source: { color: "#888", marginTop: 10 },
});

export default NewsItem;
