import { readStorageFile } from '../storage/storage'
import { findDir } from '../utils'
import { seedDirStorage } from './seed'

beforeEach( () => seedDirStorage() )

describe( 'utils', () => {
  test( 'find dir', () => {
    expect( findDir( readStorageFile(), `fruits` ) ).toEqual( {
      subdirs: {
        apple: { fuji: {} },
        orange: {}
      }
    } )
    expect( findDir( readStorageFile(), `fruits/mango` ) ).toEqual(
      expect.objectContaining( { message: `mango does not exist` } )
    )
    expect( findDir( readStorageFile(), `photos/mango/reflejo` ) ).toEqual(
      expect.objectContaining( { message: `photos does not exist` } )
    )
  } )
} )