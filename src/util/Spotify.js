import dotenv from dotenv
dotenv.config({path: `../../.env.${process.env.NODE_ENV}`})
let accessToken;
const CLIENT_ID = process.env.CLIENT_ID;
const redirectURL = "http://localhost:3000/";

const Spotify = {
  getAccessToken() {
    if (accessToken) {
      return accessToken;
    }
    const URL = window.location.href;
    const accessTokenMatch = URL.match(/access_token=([^&]*)/);
    const expiresInMatch = URL.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      accessToken = accessTokenMatch[1];
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => (accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
      return accessToken;
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${this.CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${this.redirectURL}`;
    }
  },

  async search(term) {
    const accessToken = Spotify.getAccessToken();
    const response = await fetch(
      `https://api.spotify.com/v1/search?type=track&q=${term}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    const data = await response.json();
    if (!data.tracks) {
      return [];
    }
    return data.tracks.items.map((track) => ({
      id: track.id,
      name: track.name,
      artist: track.artists[0].name,
      album: track.album.name,
      uri: track.uri,
    }));
  },

  savePlaylist(name, trackURIs) {
    if (!(name && trackURIs)) {
      return;
    }
  },
};

export default Spotify;
