import type { CommonResponse } from "./common";

export type Room = {
  id: number;
  name: string;
};

export type RoomsResponse = CommonResponse & {
  rooms: Room[];
};
