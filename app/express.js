import express from 'express';
import {config,getGlobbedPaths} from './config';
import path from 'path';
import morgan from 'morgan';

export default function(){
  let app = express();
  initLogger(app);
  initServerRoutes(app);
  return app;
}

function initLogger(app){
  app.use(morgan('dev'));
}

function initServerRoutes(app){
  let routes = getGlobbedPaths(config.files.routes);
  routes.forEach((route)=> {
    require(path.resolve(route)).default(app);
  });
}
