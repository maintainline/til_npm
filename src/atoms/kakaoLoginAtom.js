import { atom } from "recoil";

export const KakaoLoginAtom = atom({
  key: "KakaoLoginAtom",
  default: { id: "", nickname: "", thumbnail_image_url: "", email: "" },
});
