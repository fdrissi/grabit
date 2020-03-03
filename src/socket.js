const sio = require('socket.io');

const User = require('./models/User');


module.exports = (server, expressSession) => {
  const users = {};

  const io = sio.listen(server, {
    pingInterval: 60000,
    pingTimeout: 60000,
  });

  // express session middleware
  io.use((socket, next) => {
    expressSession(socket.request, socket.request.res, next);
  });

  // authenticate socket connection
  io.use((socket, next) => {
    if (socket.request.session.passport && socket.request.session.passport.user) {
      next();
    }
    next(new Error('Authentication error'));
  });

  io.on('connection', (socket) => {
    // save connected user socket id
    const { user: userId } = socket.request.session.passport;
    socket.userId = userId; // eslint-disable-line no-param-reassign

    // manage users with multiple socket ids
    if (users[userId] && users[userId].indexOf(socket.id) === -1) {
      users[userId].push(socket.id);
    } else users[userId] = [socket.id];

    // update driver location
    socket.on('updateLocation', async (coords) => {
      try {
        const { longitude, latitude } = coords;
        const filter = { _id: socket.userId };
        const update = { location: { type: 'Point', coordinates: [longitude, latitude] } };

        await User.findOneAndUpdate(filter, update);
      } catch (error) {
        console.log(error);
      }
    });

    // Driver new order
    socket.on('newOrder', async (data) => {
      const { order, driver } = data;
      const { _id: driverId } = driver;

      console.log(driverId, users, users[driverId]);
      if (users[driverId]) {
        console.log("emit");
        io.sockets.to(users[driverId][0]).emit('newOrder', order);
      }
    });

    // Driver accepted order
    socket.on('orderAccepted', async (customer) => {
      const { _id: customerId } = customer;

      console.log(customerId, users, users[customerId]);
      if (users[customerId]) {
        console.log("emit");
        io.sockets.to(users[customerId][0]).emit('orderAccepted', null);
      }
    });

    // user diconnected
    socket.on('disconnect', () => {
      const { userId: id } = socket;
      // user close tab or entirely disconnected
      if (users[id]) {
        if (users[id].length > 1) {
          users[id].splice(users[id].indexOf(id), 1);
        } else {
          delete users[id];
        }
      }
    });
  });
};
