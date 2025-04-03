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

            const res = await axiosInstance.post("/api/auth/signup", signupData);
            set({ authUser: res.data.user });

            toast.success("Conta criada com sucesso");
        } catch (error) {
            console.error("Erro na requisição:", error);
            toast.error(error.response?.data?.message || "Algo está errado");
        } finally {
            set({ loading: false });
        }
    },

    login: async (loginData) => {
        try {
            set({ loading: true });

            const res = await axiosInstance.post("/api/auth/login", loginData);
            set({ authUser: res.data.user });

            toast.success("Conta logada com sucesso");
        } catch (error) {
            console.error("Erro na requisição:", error);
            toast.error(error.response?.data?.message || "Algo está errado");
        } finally {
            set({ loading: false });
        }
    },

    logout: async () => {
        try {
            const res = await axiosInstance.post("/api/auth/logout");
            if (res.status === 200) set({ authUser: null });
        } catch (error) {
            toast.error(error.response?.data?.message || "Algo deu errado");
        }
    },

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/api/auth/me");
            set({ authUser: res.data.user, checkingAuth: false });
        } catch (error) {
            set({ authUser: null, checkingAuth: false });
            console.error("Erro ao verificar autenticação:", error);
        }
    }
}));
