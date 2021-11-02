export interface FindDir {
  message?: string | undefined
  position?: number | undefined
  subdirs: Record<string, unknown>
}

export const findDir = ( dirs: Record<string, unknown>, pathDir: string ): FindDir => {
  const data: FindDir = { subdirs: dirs }
  for ( const [ position, recursiveDir ] of pathDir.split( '/' ).entries() ) {
    const findingDir = Object
      .keys( data.subdirs as Object )
      .find( ( keyDir: string ) => keyDir === recursiveDir ) as string
    data.subdirs = ( data.subdirs[findingDir] || data.subdirs ) as Record<string, unknown>
    if ( ! findingDir ) {
      data.position = position
      data.message = `${recursiveDir} does not exist`
      break
    }
  }
  return data
}