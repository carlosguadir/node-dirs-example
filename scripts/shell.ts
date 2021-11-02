/* eslint-disable @typescript-eslint/no-unused-vars,no-console */
import inquirer from 'inquirer'
import yargs, { Argv } from 'yargs'

import { createDir, deleteDir, listDir, moveDir } from '../src/directory'
import { writeStorageFile } from '../src/directory/storage/storage'

const commands: Record<string, ( ( arg: string ) => unknown ) | ( ( path: string, value?: undefined | Record<string, unknown> ) => unknown ) > = {
  CREATE: createDir,
  LIST: listDir,
  MOVE: moveDir,
  DELETE: deleteDir
}

const robotCommands = `
CREATE fruits
CREATE vegetables
CREATE grains
CREATE fruits/apples
CREATE fruits/apples/fuji
LIST
CREATE grains/squash
MOVE grains/squash vegetables
CREATE foods
MOVE grains foods
MOVE fruits foods
MOVE vegetables foods
LIST
DELETE fruits/apples
DELETE foods/fruits/apples
LIST`

yargs( process.argv.slice( 2 ) )
  .usage( `Usage: $0 <command>` )
  .command( 'shell', 'Directory shell', ( { argv: { robot } }: Argv ) => {
    writeStorageFile( {} )
    const executeCommand = ( commandLine: string, printCommand: boolean = false ) => {
      const actionCommand = commandLine.split( ` ` )[0].trim().toUpperCase()
      const action = commands[ actionCommand ]
      const args = actionCommand !== 'LIST' ? commandLine
        .slice( commandLine.indexOf( ` ` ), commandLine.length )
        .trim() : ``
      if ( action ) {
        const response = action( args )
        if ( printCommand ) console.info( commandLine )
        if ( response ) console.info( response )
      } else {
        console.error( `Command not found` )
      }
    }
    if ( ! robot ) {
      const demandCommand = () => {
        inquirer.prompt( [
          {
            type: 'input',
            name: 'command',
            message: `shellDir$ `,
          }
        ] ).then( ( { command }: { command: string } ) => {
          executeCommand( command )
          demandCommand()
        } )
      }
      demandCommand()
    } else {
      const commands = robotCommands.trim().split( `\n` )
      for ( const commandLine of commands ) {
        if ( commandLine.trim() ) {
          executeCommand( commandLine.trim(), true )
        }
      }
    }
  } )
  .option( 'r', { type: 'boolean', description: 'Execute command lines on list' } )
  .alias( 'r', 'robot' )
  .epilog( `Epam Adventure` )
  .argv