import { Server } from 'socket.io';
import http from 'http';
import { verifyJWTToken } from "../utils";
import SocketController, { ILoginData } from '../controllers/SocketController';


export default ( http: http.Server) => {
  const io = new Server(http);
  const controller = new SocketController();

  async function sleep(millis) {
    return new Promise(resolve => setTimeout(resolve, millis));
}

  io.use((socket, next) => {
    let token = socket.handshake.headers.auth;
    
    token = token?.replace('Bearer ', '');
    verifyJWTToken(token)
      .then((_) => next())
      .catch((_) => next(new Error("Not authorized")))
  });

  io.on('connection', function(socket: any) {
    console.log('Socket connection established  ');

    const userId: string = socket.handshake.auth.user;
    const sessionId: string = socket.handshake.auth.sessionId;

    socket.on('login', async function(data: string) {
      const userData = JSON.parse(data) as ILoginData;
      const response = await controller.login(userData);

      socket.emit('login', response)
    });

    socket.on('configuration:read', async function() {
      const response = await controller.getConfig();
      const json = JSON.stringify(response.data);
      const regex = new RegExp(/.{1,100}/g);
      const partitions = json.match(regex);
      const packetInfo = JSON.stringify({"code": response.code, "message": response.message, "count": partitions!.length});
      io.emit('configuration:data', packetInfo);
      for (let i = 0; i < partitions!.length; i++) {
        io.emit('configuration:data', partitions![i]);
        await sleep(1000);
      }
    });

    socket.on('data:sync', async function() {

    });

    socket.on("disconnect", function (err: any) {

      console.log("Disconnect user  " + socket.userId + "  with err:  " + err);
    });
  });

  return io;
};