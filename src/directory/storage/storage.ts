import { existsSync, readFileSync, writeFileSync } from 'fs'
import { join } from 'path'

import { STORAGE_FILE } from '../../utils/constants'

const writeStorageFile = ( json: Record<string, unknown> ) => {
  writeFileSync(
    join( __dirname, STORAGE_FILE ),
    JSON.stringify( json, null, 4 ),
    'utf8'
  )
}

const readStorageFile = () => {
  const storagePath = join( __dirname, STORAGE_FILE )
  if ( ! existsSync( storagePath ) ) {
    writeStorageFile( {} )
  }
  const storageData = readFileSync(
    storagePath, { encoding: 'utf8' }
  )
  return JSON.parse( storageData )
}

export { readStorageFile, writeStorageFile }