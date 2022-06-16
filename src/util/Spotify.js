require("dotenv").config();

class Spotify {
  constructor() {
    this.CLIENT_ID = process.env.CLIENT_ID;
    this.redirectURL = "http://localhost:3000/";
    this.accessToken = "";
    this.getAccessToken = this.getAccessToken.bind(this);
  }

  getAccessToken = () => {
    if (this.accessToken) {
      return this.accessToken;
    }
    const URL = window.location.href;
    this.accessToken = URL.match(/access_token=([^&]*)/);
    const expiresIn = URL.match(/expires_in=([^&]*)/);
    window.setTimeout(() => (this.accessToken = ""), expiresIn * 1000);
    window.history.pushState("Access Token", null, "/");
    window.location = `https://accounts.spotify.com/authorize?client_id=${this.CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${this.redirectURL}`;
  };

  search = async (term) => {
    this.getAccessToken();
    const response = await fetch(
      `https://api.spotify.com/v1/search?type=track&q=${term}`,
      {
        headers: { Authorization: `Bearer ${accessToken}` },
      }
    );
    const data = response.json();
    if (!data) {
      return [];
    }
    return data;
  };
}

module.exports = Spotify;
