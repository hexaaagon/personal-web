import { EventEmitter } from "../helpers";
import {
  ClientWebSocketResponse,
  ConnectionResponse,
  DiscordResponse,
  ErrorResponse,
  isSpotifyLyricsData,
  SpotifyLyricsData,
  SpotifyResponse,
} from "@/shared/types/social";

export interface SocialWebsocketOptions {
  userId: string;
  heartbeatInterval?: number;
  socketUrl?: string;
}

export class SocialWebsocket extends EventEmitter<{
  connected: [ConnectionResponse];
  error: [ErrorResponse];
  discord: [DiscordResponse];
  spotify: [SpotifyResponse];
  "spotify-lyrics": [SpotifyLyricsData];
}> {
  private socket: WebSocket;
  private heartbeat: NodeJS.Timeout | null = null;
  private closed: boolean = false;
  public loading: boolean;
  public readonly userId: string;
  public readonly heartbeatInterval: number;
  public readonly socketUrl: string;

  constructor(options: SocialWebsocketOptions) {
    super();

    this.loading = true;
    this.userId = options.userId;
    this.heartbeatInterval = options.heartbeatInterval || 30_000;
    this.socketUrl = options.socketUrl || `wss://api.hexaa.sh/personal/social`;

    this.socket = new WebSocket(this.socketUrl);

    this.socketConnnect();
  }

  public close() {
    clearInterval(this.heartbeat ? this.heartbeat : 0);
    this.socket.close();
    this.closed = true;
  }

  private socketConnnect() {
    this.socket.addEventListener("open", () => {
      setInterval(() => {
        this.socket.send(
          JSON.stringify({
            type: "heartbeat",
          }),
        );
      }, this.heartbeatInterval);
    });

    this.socket.addEventListener("message", (event: MessageEvent<string>) => {
      const socketData: ClientWebSocketResponse = JSON.parse(event.data);

      switch (socketData.type) {
        case "connected":
          this.emit("connected", socketData as ConnectionResponse);
          break;
        case "error":
          this.emit("error", socketData as ErrorResponse);
          break;
        case "discord":
          this.emit("discord", socketData as DiscordResponse);
          break;
        case "spotify":
          if (isSpotifyLyricsData(socketData.data)) {
            this.emit("spotify-lyrics", socketData.data as SpotifyLyricsData);
          } else {
            this.emit("spotify", socketData as SpotifyResponse);
          }
          break;
        default:
          // Optionally handle unknown types
          break;
      }
      this.loading = false;
    });

    this.socket.addEventListener("close", () => {
      if (!this.closed) this.socketConnnect();
    });
  }
}
