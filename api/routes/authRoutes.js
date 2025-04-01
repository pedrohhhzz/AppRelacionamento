import express from 'express';
import { signup, login, logout } from '../controllers/authController.js';
import { protectRoute } from "../middleware/auth.js"; 

const router = express.Router();


router.post("/signup", signup);
router.post("/login", login); 
router.post("/logout", logout); 

// Rota para obter as informações do usuário logado
router.get("/me", protectRoute, (req, res) => { // Corrigido para /api/me
    res.send({
        success: true,
        user: req.user,
    });
});

export default router;
