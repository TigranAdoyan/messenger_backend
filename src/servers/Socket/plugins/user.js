class UserPlugin {
   static async syncData() {
      const userId = this.user.id;

      let [subscribers, subscriptions, messages, groups] = await Promise.all([
         MysqlMessengerClients.User.findSubscribers(userId),
         MysqlMessengerClients.User.findSubscriptions(userId),
         MongoClients.message.getByUser(userId),
         MongoClients.group.getByUser(userId)
      ]);

      const relatedUsers = subscribers.concat(subscriptions).unique();

      messages = messages.map(messages => {
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

      this.emit(socketServer.events.message.server["server:sync"], messages);
   }
}

module.exports = UserPlugin;