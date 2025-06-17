// src/composables/api.js
import { ref } from "vue";

let ApiUrl = ref(null);
let ApiKey = ref(null);

export const healthCheck = async () => {
  const apiUrl = getApiUrl();
  try {
    const response = await fetch(`${apiUrl}/_health`);
    return response.status === 204;
  } catch (error) {
    console.error("Error checking API health:", error);
    throw error;
  }
};

export const getApiUrl = () => {
  if (!ApiUrl.value) {
    ApiUrl.value = process.env.VUE_APP_API_URL;
  }
  return ApiUrl.value;
};

export const getApiKey = () => {
  if (!ApiKey.value) {
    const apiAuth = process.env.VUE_APP_API_AUTH;
    ApiKey.value = apiAuth === "key" && process.env.VUE_APP_API_KEY ? `&api-key=${process.env.VUE_APP_API_KEY}` : "";
  }
  return ApiKey.value;
};

export const fetchData = async (endpoint, options = {}) => {
  const apiUrl = getApiUrl();
  const apiKey = getApiKey();

  try {
    const response = await fetch(`${apiUrl}/api/${endpoint}${apiKey}`, options);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    return await response.json();
  } catch (error) {
    console.error(`Error fetching data from ${endpoint}:`, error);
    throw error;
  }
};

export const getImageUrl = (image) => {
  const apiUrl = getApiUrl();
  const apiKey = getApiKey();
  return `${apiUrl}${image.url}?${apiKey}`;
};
