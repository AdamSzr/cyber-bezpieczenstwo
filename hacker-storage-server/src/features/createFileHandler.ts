import fs, { constants } from 'fs/promises'

type FileDriveStorageReturnTypeBase = {
  fileOk: boolean
}

export type FileHandlerProps = {
  pathToFile: string
}

type FileDriveStorageReturnType = {
  readFile: (() => Promise<string>) | undefined
  writeToFile: ((data:string) => Promise<void> ) | undefined
  createAndWrite: ((data:string) => Promise<void>) | undefined
} & FileDriveStorageReturnTypeBase

export async function createFileDriveHandler({ pathToFile,  }:FileHandlerProps): Promise< FileDriveStorageReturnType > {

  if (!pathToFile || !pathToFile.startsWith( `public` )) {
    throw new Error( `Can't save file outside 'public' directory` )
  }

  const fileStatistics = await fs.stat( pathToFile ).catch( () => null )
  const fileOk = await fs.access( pathToFile, constants.R_OK | constants.W_OK ).then( () => true ).catch( () => false )

  const writeToFile = (data:string) => {
    console.log( `[SiteMapXML] Writing data to file`, { pathToXml:pathToFile } )
    return fs.writeFile( pathToFile, data )
  }

  const createAndWrite = (data:string) => {
    try {
      const lastIndexOfSlash = pathToFile.lastIndexOf( `/` )
      const directoryPath = pathToFile.substring( 0, lastIndexOfSlash )

      return fs.mkdir( directoryPath, { recursive:true } )
        .then( directoryPath => {
          if (directoryPath) console.log( `[SiteMapXML] Created directory `, { directoryPath } )
          return writeToFile( data )
        } )
    }
    catch (error) {
      console.log( `fs-error -->`, { error } )
      return Promise.resolve()
    }
  }

  if (fileStatistics == null || fileOk == false) {
    return { fileOk, createAndWrite, readFile:undefined, writeToFile:undefined }
  }

  return { fileOk, readFile:() => fs.readFile( pathToFile, `utf-8` ), writeToFile, createAndWrite:undefined }
}
