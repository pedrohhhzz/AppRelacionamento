import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectRoute = async (req, res, next) => {
    try {
        const token = req.cookies.jwt;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Não autorizado - Nenhum token fornecido"
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
            return res.status(401).json({
                success: false,
                message: "Não autorizado - Usuário não encontrado"
            });
        }

        req.user = currentUser;

        next();
    } catch (error) {
        console.log("Erro no middleware de autenticação", error);

        if (error instanceof jwt.JsonWebTokenError) {
            return res.status(401).json({
                success: false,
                message: "Não autorizado - Token inválido"
            });
        }

        if (error instanceof jwt.TokenExpiredError) {
            return res.status(401).json({
                success: false,
                message: "Não autorizado - Token expirado"
            });
        }

        res.status(500).json({
            success: false,
            message: "Erro no servidor"
        });
    }
};