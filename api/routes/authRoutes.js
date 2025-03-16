import express from 'express'
import { signup, login, logout } from '../controllers/authController';

const router = express.Router();



//USAR POSTMAN


router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.get("/me", protectRoute, (req,res) => {
    res.send({
        success: true,
        user: req.user,
    });

} ); 



export default router;