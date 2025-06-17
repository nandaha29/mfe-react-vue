import axios from 'axios';

const API_URL = 'http://10.63.22.74:1337/api';
const BASE_URL = 'http://10.63.22.74:1337';

// Transform article data to Vue format
const transformArticle = (strapiArticle, index) => {
  const id = strapiArticle.id || index;
  const title = strapiArticle.title || `Article ${index + 1}`;
  const description = strapiArticle.description || 'No description';
  const author = strapiArticle.author || 'Anonymous';
  const publishedAt = strapiArticle.publishedAt || strapiArticle.date || new Date().toISOString();
  
  // Handle content
  let content = '';
  if (strapiArticle.content) {
    const header = strapiArticle.content.header || '';
    const text = strapiArticle.content.text || '';
    content = header ? `${header}\n\n${text}` : text;
  }
  
  // Calculate read time
  const wordCount = content.split(' ').length;
  const readTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;

  // Handle image
  let imageUrl = 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=300&fit=crop';
  if (strapiArticle.image && strapiArticle.image.url) {
    imageUrl = `${BASE_URL}${strapiArticle.image.url}`;
  }

  // Handle category
  let categoryName = 'Uncategorized';
  if (strapiArticle.category && strapiArticle.category.name) {
    categoryName = strapiArticle.category.name;
  }

  return {
    id,
    title,
    description,
    content,
    image: imageUrl,
    category: categoryName,
    readTime,
    author,
    publishedAt,
    link: `/blog/article/${id}`
  };
};

export const getLatestArticles = async (limit = 3) => {
  try {
    const response = await axios.get(`${API_URL}/articles?populate=*&sort=publishedAt:desc`);
    
    if (!response.data?.data) {
      return [];
    }

    return response.data.data
      .slice(0, limit)
      .map(transformArticle);
  } catch (error) {
    console.error('Error fetching articles:', error);
    return [];
  }
};
