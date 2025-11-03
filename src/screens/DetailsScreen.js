import { View, Text, Image, StyleSheet, Button, Linking } from "react-native";

const DetailsScreen = ({ route }) => {
  const { article } = route.params;

  return (
    <View style={styles.container}>
      {article.image && (
        <Image source={{ uri: article.image }} style={styles.image} />
      )}
      <Text style={styles.title}>{article.title}</Text>
      <Text style={styles.desc}>{article.description}</Text>
      <Button
        title="Открыть источник"
        onPress={() => Linking.openURL(article.url)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 12 },
  image: { width: "100%", height: 220, borderRadius: 8 },
  title: { fontSize: 20, fontWeight: "bold", marginVertical: 20 },
  desc: { fontSize: 16, color: "#333", marginBottom: 20 },
});

export default DetailsScreen;
