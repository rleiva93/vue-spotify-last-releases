import axios from "axios";

const API_AUTH_URL = "https://accounts.spotify.com/api";
const API_URL = "https://api.spotify.com/v1";
const basicToken = btoa(
  `${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`
);

async function getBearerToken() {
  const tokenObject = await axios.post(
    `${API_AUTH_URL}/token`,
    "grant_type=client_credentials",
    {
      headers: {
        Authorization: `Basic ${basicToken}`,
        "Content-Type": "application/x-www-form-urlencoded"
      }
    }
  );

  return tokenObject;
}

async function getNewReleases() {
  const tokenObject = await getBearerToken();
  const bearerToken = tokenObject.data.access_token;

  const newReleases = await axios.get(`${API_URL}/browse/new-releases`, {
    headers: {
      Authorization: `Bearer ${bearerToken}`
    }
  });

  return newReleases;
}

export default getNewReleases;
