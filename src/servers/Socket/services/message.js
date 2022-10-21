const MysqlMessengerClients = require('../../../mysql/messenger');
const RedisClients = require('../../../cores/Redis');
const MongoClients = require('../../../mongo/messenger');

class MessengerService {
    onlineUsers = RedisClients.onlineUsers.client;

    constructor() {
    }

    async syncMessagingData(userId) {
        const [subscribers, subscriptions, {messages, groups}] = await Promise.all([
            MysqlMessengerClients.User.findSubscribers(userId),
            MysqlMessengerClients.User.findSubscriptions(userId),
            MongoClients.message.getByUser(userId),
        ]);

        const relatedUsers = [...subscribers, ...subscriptions];

        return messages.map(messages => {
            const data = {
                messages,
            };

            console.log(messages[0].receiverType);

            if (messages[0].receiverType === 'group') {
                data.type = 'group';
                data.group = groups.find(({_id}) => _id === messages[0].receiverId);
            } else if (messages[0].receiverType === 'user') {
                data.type = 'user';
                data.user = relatedUsers.find(({id}) => [+messages[0].receiverId, +messages[0].senderId].includes(+id));
            }

            return messages;
        });
    }

    setUserOnline(userId, socketId) {
        this.onlineUsers.set(userId, socketId);
    }

    setUserOffline(userId) {
        this.onlineUsers.del(userId);
    }
}

module.exports = new MessengerService();