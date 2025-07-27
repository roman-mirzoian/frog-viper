import { Socket } from "socket.io";

export function getOnlinePlayersId(userNameMap: Record<string, string>) {
  return Object.keys(userNameMap).join(", ");
}

export function getOnlinePlayersName(userNameMap: Record<string, string>) {
  return Object.values(userNameMap);
}

export function getMainViewId(mainViewId: string) {
  return mainViewId;
}

export function getDeviceId(socket: Socket) {
  return socket.handshake.auth.deviceId;
}