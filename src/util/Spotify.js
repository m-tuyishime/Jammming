class Spotify {
  constructor() {
    this.accessToken = "";
    this.CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
    this.URL = window.location.href;
    this.redirectURL = "http://localhost:3001";
  }

  getAccessToken() {
    if (this.accessToken) {
      return this.accessToken;
    }
    const accessTokenMatch = this.URL.match(/access_token=([^&]*)/);
    const expiresInMatch = this.URL.match(/expires_in=([^&]*)/);

    if (accessTokenMatch && expiresInMatch) {
      this.accessToken = accessTokenMatch[1];
      this.headers = { Authorization: `Bearer ${this.accessToken}` };
      const expiresIn = Number(expiresInMatch[1]);
      window.setTimeout(() => (this.accessToken = ""), expiresIn * 1000);
      window.history.pushState("Access Token", null, "/");
      return this.accessToken;
    } else {
      window.location = `https://accounts.spotify.com/authorize?client_id=${this.CLIENT_ID}&response_type=token&scope=playlist-modify-public&redirect_uri=${this.redirectURL}`;
    }
  }

  async search(term) {
    const response = await fetch(
      `https://api.spotify.com/v1/search?type=track&q=${term}`,
      {
        headers: this.headers,
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
  }

  async savePlaylist(name, trackURIs) {
    if (!(name && trackURIs)) {
      return;
    }

    let userId;

    let response = await fetch("https://api.spotify.com/v1/me", {
      headers: this.headers,
    });
    let data = await response.json();
    userId = data.id;
    response = await fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        headers: this.headers,
        method: "POST",
        body: JSON.stringify({ name }),
      }
    );
    data = await response.json();
    const playlistId = data.id;
    response = await fetch(
      `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
      {
        headers: this.headers,
        method: "POST",
        body: JSON.stringify({ uris: trackURIs }),
      }
    );
  }
}

export default Spotify;
