const events = {
   send_message: 'send_message'
};

class Message {
   _namespace = 'message';

   _handlersBinding = {
      [events.send_message]: this.onSend.name,
   };

   constructor() {}

   onSend(payload) {
      console.log(payload);
   }
}

module.exports = Message;
