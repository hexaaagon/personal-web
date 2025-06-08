import { action, Action, thunk, Thunk } from "easy-peasy";
import { SocialWebsocket } from "../websocket/social";
import {
  DiscordResponse,
  isSpotifySessionData,
  isSpotifyStatusData,
  isSpotifyTrackData,
  ProcessedSpotifyData,
  SpotifyLyricsData,
  SpotifySessionData,
} from "@/shared/types/social";
import store from "./social";

export type SpotifyState = Omit<SpotifySessionData, "type">;

export interface StoreModel {
  discord: DiscordResponse | null;
  spotify: SpotifyState | null;
  lyrics: SpotifyLyricsData | null;

  setDiscord: Action<this, DiscordResponse>;
  setSpotify: Action<this, SpotifyState>;
  setLyrics: Action<this, SpotifyLyricsData>;

  init: Thunk<this, void>;
  socialWS: Thunk<this, void>;
}

const model: StoreModel = {
  discord: null,
  spotify: null,
  lyrics: null,

  setDiscord: action((state, payload) => {
    state.discord = payload;
  }),
  setSpotify: action((state, payload) => {
    state.spotify = payload;
  }),
  setLyrics: action((state, payload) => {
    state.lyrics = payload;
  }),

  init: thunk(async (actions) => {
    actions.socialWS();
  }),
  socialWS: thunk(async (actions) => {
    const social = new SocialWebsocket({
      userId: "465454937267240962",
    });

    social.on("discord", (data) => {
      actions.setDiscord(data);
    });
    social.on("spotify", ({ type: _, ...data }) => {
      if (isSpotifySessionData(data.data)) {
        const { type, ...sessionData } = data.data;
        actions.setSpotify(sessionData);
      } else if (isSpotifyTrackData(data.data)) {
        const { type, ...trackData } = data.data;

        const state = store.getState();
        if (!state.spotify) return;

        actions.setSpotify({
          ...state.spotify,
          ...trackData,
        });
      }
      if (isSpotifyStatusData(data.data)) {
        const state = store.getState();
        if (!state.spotify) return;

        actions.setSpotify({
          ...state.spotify,
          spotify: {
            ...state.spotify.spotify,
            status: {
              ...state.spotify.spotify.status,
              ...data.data.spotify.status,
            } as any,
          },
        });
      } else {
        console.warn("Unknown Spotify data type received:", data.data);
      }
    });
    social.on("spotify-lyrics", (data) => {
      actions.setLyrics(data);
    });

    return social;
  }),
};

export default model;
