// src/api/Api.js

export const getMatches = async () => {
  try {
    const response = await fetch('https://api.cricapi.com/v1/matches?apikey=660fbdba-4085-4141-ac92-db9a2d955f85&offset=0');
    const data = await response.json();

    if (data && Array.isArray(data.data)) {
      return data.data; // Return matches array
    } else {
      console.error('Invalid data format received from API');
      return [];
    }
  } catch (error) {
    console.error('Error fetching matches:', error);
    throw error; // Throw the error to handle it in the calling function
  }
};

// Fetch match details based on match id
export const getMatchDetails = async (id) => {
  const url = `https://api.cricapi.com/v1/matches/${id}?apikey=660fbdba-4085-4141-ac92-db9a2d955f85`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching match details:', error);
    throw error;
  }
};
