import { createDir } from '../index'
import { writeStorageFile } from '../storage/storage'

export const seedDirStorage = () => {
  writeStorageFile( {} )
  createDir( 'fruits' )
  createDir( 'vegetables' )
  createDir( 'grains' )
  createDir( 'fruits/apple' )
  createDir( 'fruits/apple/fuji' )
  createDir( 'fruits/orange' )
}