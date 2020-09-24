export const SPOTIFY_API_AUTH_URL = "https://accounts.spotify.com/api";
export const SPOTIFY_API_URL = "https://api.spotify.com/v1";
export const SPOTIFY_API_BASIC_TOKEN = btoa(
  `${process.env.VUE_APP_SPOTIFY_CLIENT_ID}:${process.env.VUE_APP_SPOTIFY_CLIENT_SECRET}`
);
