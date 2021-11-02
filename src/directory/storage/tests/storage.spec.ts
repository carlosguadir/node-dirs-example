import { readStorageFile, writeStorageFile } from '../storage'

describe( 'storage', () => {
  test( 'write read', async () => {
    const data = { hello: 'World!' }
    await writeStorageFile( { hello: 'World!' } )
    expect( await readStorageFile() ).toEqual( data )
    await writeStorageFile( { ...data, new: 'World!' } )
    expect( await readStorageFile() ).toEqual( { ...data, new: 'World!' } )
  } )
} )