import { type BasicUser } from "../types/user";

const KEYS = {
  token: "X-User-Token",
  userId: "X-User-Id",
  userEmail: "X-User-Email",
  userProfileId: "X-User-Profile-Id",
} as const;

export const authStorage = {
  getToken: () => localStorage.getItem(KEYS.token),
  getUserId: () => localStorage.getItem(KEYS.userId),
  getUserEmail: () => localStorage.getItem(KEYS.userEmail),
  getUserProfileId: () => localStorage.getItem(KEYS.userProfileId),

  set: (token: string, user: BasicUser) => {
    localStorage.setItem(KEYS.token, token);
    localStorage.setItem(KEYS.userId, user.id.toString());
    localStorage.setItem(KEYS.userEmail, user.email);
    localStorage.setItem(KEYS.userProfileId, user.profile_id.toString());
  },

  clear: () => {
    localStorage.removeItem(KEYS.token);
    localStorage.removeItem(KEYS.userId);
    localStorage.removeItem(KEYS.userEmail);
    localStorage.removeItem(KEYS.userProfileId);
  },

  getUser: (): BasicUser | null => {
    const id = localStorage.getItem(KEYS.userId);
    const email = localStorage.getItem(KEYS.userEmail);
    const profileId = localStorage.getItem(KEYS.userProfileId);

    if (!id || !email || !profileId) return null;

    return {
      id: parseInt(id, 10),
      email,
      profile_id: parseInt(profileId, 10),
    };
  },
};
