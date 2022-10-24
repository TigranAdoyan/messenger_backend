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
        })

        socket.emit(socketEvents.server.sync_app, data);
        //
        // let [subscribers, subscriptions, messages, groups] = await Promise.all([
        //     MysqlMessengerClients.User.findSubscribers(userId),
        //     MysqlMessengerClients.User.findSubscriptions(userId),
        //     MongoClients.message.getByUser(userId),
        //     MongoClients.group.getByUser(userId)
        // ]);
        //
        // const relatedUsers = subscribers.concat(subscriptions).unique();
        //
        // messages = messages.map(messages => {
        //     const data = {
        //         messages,
        //     };
        //
        //     if (messages[0].receiverType === 'group') {
        //         data.type = 'group';
        //         data.group = groups.find(({_id}) => _id === messages[0].receiverId);
        //     } else if (messages[0].receiverType === 'user') {
        //         data.type = 'user';
        //         data.user = relatedUsers.find(({id}) => [+messages[0].receiverId, +messages[0].senderId].includes(+id));
        //     }
        //
        //     return data;
        // });
        //
        // socket.emit(socketEvents.server["sync_app"], messages);
    }

    static async connectUserToChatRooms(socket) {
        const userId = socket.user.id;
        const groups = await MongoClients.group.getByUser(userId);

        socket.join(userId.toString());

        groups.forEach(group => {
           socket.join(group._id)
        });
    }

    static async onSendMessage(socket, data) {
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