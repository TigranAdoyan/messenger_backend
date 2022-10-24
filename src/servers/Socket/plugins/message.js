class MessagePlugin {
   static async onSendMessage(data) {
      MongoClients.message.create({
         senderId: this.user.id,
         receiverId: data.receiverId,
         receiverType: data.receiverType,
         content: {
            text: data.msg,
         }
      })

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