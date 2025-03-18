import User from "../models/User.js";
import jwt from "jsonwebtoken";

const signToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });
};

export const signup = async (req, res) => {
    const { name, email, password, age, gender, genderPreference } = req.body;
    try {
        if (!name || !email || !password || !age || !gender || !genderPreference) {
            return res.status(400).json({
                success: false,
                message: "Todos os campos são obrigatórios",
            });
        }

        if (age < 18) {
            return res.status(400).json({
                success: false,
                message: "Você deve ter pelo menos 18 anos",
            });
        }

        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "A senha deve ter pelo menos 6 caracteres",
            });
        }

        const newUser = await User.create({
            name,
            email,
            password,
            age,
            gender,
            genderPreference,
        });

        const token = signToken(newUser._id);

        res.cookie("jwt", token, {
            maxAge: 7 * 24 * 60 * 60 * 1000, 
            httpOnly: true,
            sameSite: "strict", 
            secure: process.env.NODE_ENV === "production",
        });

     

        res.status(201).json({
            success: true,
            user:newUser
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Erro no servidor",
        });
    }
};

export const login = async (req, res) => {
    const{ email, password } = req.body
    try{

        if(!email || !password){
            return res.status.json(400)({
                success: false,
                message: "Todos os campos são obrigatórios"
            });
        }

        const user = await User.findOne({email}).select("+password");

        if(!user || !(await user.matchPassword(password))){
            return res.status(400).json({ 
                success: false,
                message: "Email ou senha inválidos",
            });
        }

        const token = signToken(user._id);

        res.cookie("jwt", token,{
            maxAge: 7 * 24 * 60 * 60 * 1000,
            httpOnly: true,
            sameSite: "strict",
            secure: process.env.NODE_ENV === "production",
        });

        res.status(200).json({
            success: true,
            user,
        });

    } catch(error){
        console.log("Erro no login do controle", error);
        res.status(500).json({ success: false, message:"erro no server"});
    }


};

export const logout = async (req, res) => {
    res.clearCookie("jwt");
    res.status(200).json({ success: true, message: "Saiu" });
};
