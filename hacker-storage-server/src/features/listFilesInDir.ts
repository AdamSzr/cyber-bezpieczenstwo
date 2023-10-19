import fs from 'fs';
import path from 'path';

export function listFilesInDirectory(directoryPath: string) {
  try{
    const files = fs.readdirSync(directoryPath);

    return files.map( e => {
        const filePath = path.join(directoryPath,e)
        const stats = fs.statSync(filePath);
        return {
            filePath:e,
            type:stats.isFile()?"file":'dir',
            url: `http://adam.main.pc:3000/api/victims?file=${e}`
        }
    } )
  }catch(e){
    return (e as any).message
  }
}