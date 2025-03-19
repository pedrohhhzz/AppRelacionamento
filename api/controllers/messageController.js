import Message from "../models/Message.js"

export const sendMessage = async(req, res) => {
    try {
        const { content, receiverId } = req.body;

        const newMessage = await Message.create({
            sender: req.user.id,
            receiver: receiverId,
            content,
        });

        // mensagem em tempo real => socket.io

        res.status(201).json({
            success: true,
            message: newMessage, 
        });
    } catch (error) {
        console.log("Erro em sendMessage:", error);

        res.status(500).json({
            success: false,
            message: "Erro no servidor interno",
        });
    }


}

export const getConversation = async (req, res) =>{
    try {
        const { userId } = req.params; // Captura o userId da URL

        const messages = await Message.find({
            $or: [
                { sender: req.user._id, receiver: userId },
                { sender: userId, receiver: req.user._id }
            ]
        }).sort("createdAt");

        res.status(200).json({
            success: true,
            messages
        });

    } catch (error) {
        console.log("Error in getConversation", error);
        res.status(500).json({
            success: false,
            message: "erro no server interno"
        });

    }

};