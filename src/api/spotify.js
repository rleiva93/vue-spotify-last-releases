import ApiService from "@/api/api-service";
import {
  SPOTIFY_API_AUTH_URL,
  SPOTIFY_API_BASIC_TOKEN,
  SPOTIFY_API_URL
} from "@/api/config";

function spotifyClientAuth() {
  ApiService.init(SPOTIFY_API_AUTH_URL);
  ApiService.setAuthHeader("Basic", SPOTIFY_API_BASIC_TOKEN);
  return ApiService.post("/token", "grant_type=client_credentials");
}

const spotifyApi = {
  async getNewReleases(offset, limit) {
    const { data: { access_token } } =  await spotifyClientAuth();
    ApiService.init(SPOTIFY_API_URL);
    ApiService.setAuthHeader("Bearer", access_token);
    return ApiService.get("/browse/new-releases", `?offset=${offset}&limit=${limit}`);
  }
};

export default spotifyApi;
