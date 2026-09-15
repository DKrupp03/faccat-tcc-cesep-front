import api from "@/shared/api/client";
import type { Room, RoomsResponse } from "@/shared/types/room";

const RoomsService = {
  async getRooms(): Promise<RoomsResponse> {
    const response = await api.get("/rooms");
    return response.data;
  },

  // Envia a lista completa: o backend exclui as ausentes, renomeia as com id e
  // cria as sem id, tudo numa transação.
  async syncRooms(rooms: Partial<Room>[]): Promise<RoomsResponse> {
    const response = await api.put("/rooms/sync", { rooms });
    return response.data;
  },
};

export default RoomsService;
