import axios from "axios";
import { ParentProfile } from "./types";

const getCookie = (name: string): string => {
  if (typeof window === "undefined") return "";
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop()?.split(";").shift() || "";
  return "";
};

export const parentService = {
  getParentProfile: async (parentId: string): Promise<ParentProfile> => {
    const token = getCookie("accessToken");

    const response = await axios.get(
      `http://localhost:5000/api/v1/parents/${parentId}`,
      {
        headers: {
          Authorization: token ? `Bearer ${token}` : "",
        },
        withCredentials: true,
      },
    );

    // فحص آمن: إذا كان السيرفر يغلف البيانات داخل حقل data أو parent، وإلا يرجع الاستجابة مباشرة
    const result = response.data?.data || response.data?.parent || response.data;
    
    return result;
  },
};