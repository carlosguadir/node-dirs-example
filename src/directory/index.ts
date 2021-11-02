import { readStorageFile, writeStorageFile } from './storage/storage'
import { findDir } from './utils'

export const createDir = ( path: string, value: undefined | Record<string, unknown> = {} ) => {
  const directories = readStorageFile()
  const directoryPath = path.split( '/' )
  const newDirName = directoryPath.pop() as string
  const { message, subdirs } = findDir( directories, directoryPath.join( `/` ) || newDirName )
  if ( message && directoryPath.length > 0 ) {
    return `Cannot find ${path} - ${ message }`
  }
  subdirs[ newDirName ] = value
  writeStorageFile( directories )
}

export const deleteDir = ( path: string ) => {
  const directories = readStorageFile()
  const directoryPath = path.split( '/' )
  const deleteDirName = directoryPath.pop() as string
  const { message, subdirs } = findDir( directories, directoryPath.join( `/` ) || deleteDirName )
  if ( message ) {
    return `Cannot delete ${path} - ${ message }`
  }
  directoryPath.length <= 0 ? delete directories[ deleteDirName ] : delete subdirs[ deleteDirName ]
  writeStorageFile( directories )
}


export const moveDir = ( paths: string ) => {
  const directoriesMove = paths.trim().split( ' ' )
  if ( directoriesMove.length !== 2 ) {
    return 'Move command is wrong'
  }
  const { subdirs, message } = findDir( readStorageFile(), directoriesMove[0] )
  if ( message ) {
    return `Cannot move ${directoriesMove[0]} - ${ message }`
  }
  const newDirLocation = `${directoriesMove[1]}/${directoriesMove[0].split( '/' ).pop()}`
  deleteDir( directoriesMove[0] )
  createDir( newDirLocation, subdirs )
}

export const listDir = ( output: string = `` ) => {
  const printOutput = ( dirs: Record<string, unknown>, spacer: string = `` ) => {
    Object.getOwnPropertyNames( dirs )
      .sort()
      .forEach( ( dirName: string ) => {
        const subDirs = dirs[dirName] as Record<string, unknown>
        output = output.concat( `${spacer}${dirName}\n` )
        if ( Object.keys( subDirs ).length > 0 ) {
          printOutput( subDirs, `${spacer}  ` )
        }
      } )
  }
  printOutput( readStorageFile() )
  return output.trim()
}