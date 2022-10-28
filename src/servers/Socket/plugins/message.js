class MessagePlugin {
    static async syncApp(socket) {
        const userId = socket.user.id;

        const relatedUsers = await MysqlMessengerClients.User.findRelatedUsers(userId);

        const relatedUsersMessages = await Promise.all(relatedUsers.map(user => {
            return MongoClients.message.getUserMessages(userId, user.id);
        }));

        const data = [];

        relatedUsersMessages.forEach((messages, index) => {
            if (messages.length > 0) {
                data.push({
                    user: relatedUsers[index],
                    messages,
                })
            }
        });

        // debugger;

        data.sort((a, b) => {
            // debugger;
            return a.messages[a.messages.length - 1].sentAt > b.messages[a.messages.length - 1].sentAt
        });

        socket.emit(socketEvents.server.sync_app, data);
    }

    static async connectUserToChatRooms(socket) {
        const userId = socket.user.id;
        const groups = await MongoClients.group.getByUser(userId);

        socket.join(userId.toString());

        groups.forEach(group => {
           socket.join(group._id)
        });
    }

    static async sendMessage(socket, data) {
        debugger;
        const message = MongoClients.message.create({
            senderId: socket.user.id,
            receiverId: data.receiverId,
            receiverType: data.receiverType,
            content: {
                text: data.msg,
            }
        });

        if (message.receiverType === 'user') {
            socket.to(message.receiverId.toString()).emit(socketEvents.server.send_message, message);
        }


        // const message = await MongoClients.message.create({
        //    senderId: socket.user.id,
        //    receiverId,
        //    receiverType,
        //    content: {
        //       text: msg
        //    }
        // })

    }
}

module.exports = MessagePlugin;