import { writeStorageFile } from '../storage/storage'

export const seedDirStorage = () => {
  writeStorageFile( {
    fruits: {
      apple: {
        fuji: {}
      },
      orange: {}
    },
    vegetables: {},
    grains: {}
  } )
}