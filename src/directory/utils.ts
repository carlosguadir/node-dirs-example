export interface FindDir {
  message?: string | undefined
  subdirs: Record<string, unknown>
}

export const findDir = ( dirs: Record<string, unknown>, pathDir: string ): FindDir => {
  const data: FindDir = { subdirs: dirs }
  pathDir.split( '/' ).forEach( ( recursiveDir: string ) => {
    const findingDir = Object
      .keys( data.subdirs as Object )
      .find( ( keyDir: string ) => keyDir === recursiveDir ) as string
    data.subdirs = ( data.subdirs[findingDir] || dirs ) as Record<string, unknown>
    if ( ! findingDir ) {
      data.message = `${recursiveDir} does not exist`
      return true
    }
  } )
  return data
}