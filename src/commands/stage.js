
function doStage (cmd) {
  console.log(`Run stage ${cmd}`)
}

export {doStage}

export default function (program) {
  program
    .command('stage <cmd>')
    .description('Specify the stage action (ls|add|rm)')
    .action(doStage)
}
