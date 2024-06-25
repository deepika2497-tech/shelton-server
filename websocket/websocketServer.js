import { WebSocketServer } from 'ws';
import sportService from '../features/sport/service.js';

const setupWebSocket = (server) => {
  const wss = new WebSocketServer({ server });
  wss.on('connection', (ws) => {
    ws.on('message', async (message) => {
      let messageObj = JSON.parse(message);
      switch (messageObj.action) {
        case "liveMatches":
            const liveMatches = await sportService.getAllLiveMatches(messageObj.sport);
            ws.send(JSON.stringify({ "action": messageObj.action, "data": liveMatches }));
            break;
        case "getAllMatches":
            const allMatches = await sportService.getAllMatches(messageObj.sport);
            ws.send(JSON.stringify({ "action": messageObj.action, "data": allMatches }));
            break;
        default:
          break;
      }
    });
  });
}

export default setupWebSocket;
