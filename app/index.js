import chalk from 'chalk';

import {config} from './config';
import expressInit from './express';

export function start(){
  let app = expressInit();
  app.listen(config.port,config.host,()=>{
    console.log('--');
    console.log(chalk.green(`Server running on port ${config.port}`));
  });
}
