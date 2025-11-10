export const fetchNews = async (category = "breaking-news") => {
  const API_URL = `https://gnews.io/api/v4/top-headlines?topic=${category}&lang=en&country=us&max=10&apikey=2e6e71b39f01e838d61606c7fbf26397`;

  try {
    const response = await fetch(API_URL);
    const json = await response.json();
    console.log("API:", json);
    return json.articles || [];
  } catch (error) {
    console.error("Ошибка загрузки новостей:", error);
    return [];
  }
};
