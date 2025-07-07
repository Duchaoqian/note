import fs, { PathLike } from "fs"
export function makedir (dirpath:PathLike, menuPath:string){
    let p = fs.readdirSync(dirpath)
    p = p.filter(item=>{
        return !(/^index\.md$/i.test(item)) && /\.md$/i.test(item)
    })
    let list =  p.map(item=>{
        let text = item.replace(/\.md$/!, '')
        return  { text, link: menuPath +  text }
    })
    
    return list

}