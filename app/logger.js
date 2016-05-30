import chalk from 'chalk';


export function error(err){
  console.log(chalk.red(`Error - ${err}`));
}

export function success(msg){
  console.log(chalk.green(`Success - ${msg}`));
}
