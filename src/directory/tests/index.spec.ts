import { createDir, deleteDir, listDir, moveDir } from '../index'
import { readStorageFile } from '../storage/storage'
import { seedDirStorage } from './seed'

beforeEach( () => seedDirStorage() )

describe( 'directory', () => {
  test( 'createDir testing', () => {
    expect( readStorageFile() ).toEqual( {
      fruits: { apple: { fuji: {} }, orange: {} },
      vegetables: {}, grains: {}
    } )
  } )

  test( 'createDir nested dirs testing', () => {
    createDir( 'photos/nested/dir/again' )
    createDir( 'grains/nested/dir/again' )
    createDir( 'fruits/apple/fuji/nested/deep/dir' )
    expect( readStorageFile() ).toEqual( {
      fruits: {
        apple: {
          fuji: {
            nested: { deep: { dir: {} } }
          }
        },
        orange: {}
      },
      photos: { nested: { dir: { again: {} } } },
      vegetables: {},
      grains: {
        nested: { dir: { again: {} } }
      }
    } )
  } )

  test( 'deleteDir testing', () => {
    deleteDir( 'fruits/apple/fuji' )
    deleteDir( 'fruits/orange' )
    deleteDir( 'grains' )
    expect( readStorageFile() ).toEqual( {
      fruits: { apple: {} },
      vegetables: {}
    } )
  } )
  test( 'moveDir testing', () => {
    createDir( 'grains/squash' )
    moveDir( 'grains/squash vegetables' )
    createDir( 'foods' )
    moveDir( 'grains foods' )
    moveDir( 'fruits foods' )
    moveDir( 'vegetables foods' )
    expect( readStorageFile() ).toEqual( {
      foods: {
        grains: {},
        fruits: { apple: { fuji: {} }, orange: {} },
        vegetables: { squash: { } }
      }
    } )
  } )

  test( 'listDir testing', () => {
    expect( listDir() ).toEqual( `fruits\n  apple\n    fuji\n  orange\ngrains\nvegetables` )
  } )
} )