import { create } from 'zustand'; 
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
    authUser: null,
    checkingAuth: true,
    loading: false,

    signup: async (signupData) => {
        try {
            set({ loading: true });

            const res = await axiosInstance.post("api/auth/signup", signupData); 
            set({ authUser: res.data.user });

            toast.success("Conta criada com sucesso");
        } catch (error) {
            console.error("Erro na requisição:", error);
            console.error("Resposta do erro:", error.response?.data);

            toast.error(error.response?.data?.message || "Algo está errado");
        } finally {
            set({ loading: false });
        }
    },

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/me");
            set({ authUser: res.data.user, checkingAuth: false });

            console.log("Usuário autenticado:", res.data);
        } catch (error) {
            set({ checkingAuth: false });
            console.error("Erro ao verificar autenticação:", error);
        }
    }
}));
