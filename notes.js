const fs = require('fs')
const chalk = require('chalk')

const notesMessage = () => {
    return 'This is notes...'
}

const addNotes =  (title, body)=> {
    const notes = loadNotes()

    const duplicateNotes = notes.filter((note) => note.title === title)

    if (duplicateNotes.length === 0) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log('Note added!!')
    } else {
        console.log('Note title already exist!!')
    }
}

const remmoveNote = (title)=>{
    const availableNotes = loadNotes()
    const updatedNotes = availableNotes.filter((note) => note.title != title)
    const deletedNote = availableNotes.filter((note) => note.title === title)
    if (deletedNote.length > 0) {
        saveNotes(updatedNotes)
        console.log(chalk.bgGreen('Note deleted!!'))
    }else {
        console.log(chalk.bgRed('No note with the given title'))
    }

}

const saveNotes = (notes)=> {
    fs.writeFileSync('notes.json', JSON.stringify(notes))
}

const loadNotes = ()=> {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        return JSON.parse(dataBuffer)
    } catch (e) {
        return []
    }
}

const listNotes = ()=>{
    const notes = loadNotes();
    console.log(chalk.white.inverse('Your notes !!'))
    notes.forEach((note)=> console.log(note.title))
}

const readNotes = (title)=>{
    const notes = loadNotes()

    debugger

    const noteFound = notes.find((note)=>note.title === title)

    if(noteFound){
        console.log(chalk.inverse(noteFound.title))
        console.log(noteFound.body)
    }else{
        console.log(chalk.red('No note found!'))
    }
    
}

module.exports = {
    addNotes: addNotes,
    notesMessage: notesMessage,
    remmoveNote: remmoveNote,
    listNotes: listNotes,
    readNotes:readNotes
}