import express from 'express';
import {config,getGlobbedPaths} from './config';
import path from 'path';

export default function(){
  let app = express();

  initServerRoutes(app);
  return app;
}

function initServerRoutes(app){
  let routes = getGlobbedPaths(config.files.routes);
  routes.forEach((route)=> {
    require(path.resolve(route)).default(app);
  });
}
