import {ping,healthcheck} from '../controllers/service.server.controller';

export default function(app){
  app.route('/ping').get(ping);
  app.route('/healthcheck').get(healthcheck);
}
