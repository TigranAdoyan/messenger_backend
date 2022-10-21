const MysqlMessengerClients = require('../../../mysql/messenger');
const RedisClients = require('../../../cores/Redis');
const MongoClients = require('../../../mongo/messenger');

class MessengerService {
    static async syncMessagingData(userId) {
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

            if (messages[0].receiverType === 'group') {
                data.type = 'group';
                data.group = groups.find(({_id}) => _id === messages[0].receiverId);
            } else if (messages[0].receiverType === 'user') {
                data.type = 'user';
                data.user = relatedUsers.find(({id}) => [+messages[0].receiverId, +messages[0].senderId].includes(+id));
            }

            return data;
        });
    }

    static async getUserGroups(userId) {
        return MongoClients.group.getByUser(userId);
    }

    static setUserOnline(userId, socketId) {
        RedisClients.onlineUsers.client.set(userId, socketId);
    }

    static setUserOffline(userId) {
        RedisClients.onlineUsers.client.del(userId);
    }
}

module.exports = MessengerService;