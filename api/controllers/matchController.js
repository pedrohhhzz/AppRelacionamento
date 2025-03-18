import User from "../models/User.js";

export const swipeRight = async (req, res) => {
    try {
        const { likedUserId } = req.params;
        const currentUser = await User.findById(req.user.id);
        const likedUser = await User.findById(likedUserId); 

        if (!likedUser) {
            return res.status(404).json({
                success: false,
                message: "Usuário não encontrado",
            });
        }

        if (!currentUser.likes.includes(likedUserId)) { 
            currentUser.likes.push(likedUserId);
            await currentUser.save();

            // Se o outro usuário já tiver curtido o atual, é um match
            if (likedUser.likes.includes(currentUser.id)) {
                currentUser.matches.push(likedUserId);
                likedUser.matches.push(currentUser.id);

                // Salvando os usuários
                await Promise.all([currentUser.save(), likedUser.save()]); // Correção de sintaxe

                // Aqui poderia ser adicionada a lógica de notificação em tempo real com socket.io
            }

            return res.status(200).json({
                success: true,
                user: currentUser,
            });
        }

    } catch (error) {
        console.log("Erro ao arrastar para a Direita", error);

        res.status(500).json({
            success: false,
            message: "Erro interno no servidor",
        });
    }
};

export const swipeLeft = async (req, res) => {
    try {
        const { dislikedUserId } = req.params; 
        const currentUser = await User.findById(req.user.id);

        if (!currentUser.dislikes.includes(dislikedUserId)) { 
            currentUser.dislikes.push(dislikedUserId); 
            await currentUser.save();
        }

        res.status(200).json({
            success: true,
            user: currentUser,
        });
    } catch (error) {
        console.log("Erro ao deslizar para esquerda", error);

        res.status(500).json({
            success: false,
            message: "Erro no servidor interno",
});
    }

};

export const getMatches = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("matches", "name image")
        res.status(200).json({
            success: true,
            matches: user.matches
        })


    } catch (error) {
        console.log("Erro em getMatches", error)
        
        res.status(500).json({
            success: false,
            message: "erro interno no servidor",
        })

    }
};

export const getUserProfiles = async (req, res) => {
    try {
        const currentUser = await User.findById(req.user.id); //Busca no banco de dados o usuário que está fazendo a requisição, usando o req.user.id

        const users = await User.find({
            $and: [
                { _id: { $ne: currentUser.id } },
                { _id: { $nin: currentUser.likes } },
                { _id: { $nin: currentUser.deslikes } },
                { _id: { $nin: currentUser.matches } },
                {
                    gender:
                        currentUser.genderPreference === "both"
                            ? { $in: ["male", "female"] }
                            : currentUser.genderPreference,
                },
                { genderPreference: { $in: [currentUser.gender, "both"] } }
            ],
        });
        res.status(200).json({
            success: true,
            users,
        })
       

    } catch (error) {
        console.log("Erro no getUserProfiles", error);

        res.status(500).json({
            success: false,
            message: "erro no server interno",
        })

    }
};