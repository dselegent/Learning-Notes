import fs from 'fs'
import path from 'path'

let dirPath = __dirname.split('/').slice(0, -2).join('/')
const sidebar = {}
fs.readdirSync(path.resolve(dirPath, 'notes')).forEach(notes => {
  let noteObj = {
    text: '',
    children: [],
  }
  noteObj.text = notes + '学习笔记'
  let notePath = path.resolve(dirPath, 'notes', notes)
  fs.readdirSync(notePath).forEach(note => {
    let name = note.split('.')[0].slice(0, 2)
    let oldPath = notePath + `\\${note}`
    let newPath = notePath + `\\${name}.md`
    if (oldPath !== newPath) fs.renameSync(oldPath, newPath)
    noteObj.children.push(`/notes/${notes}/${name}.md`)
  })
  sidebar[`/notes/${notes}`] = [noteObj]
})

export default sidebar
