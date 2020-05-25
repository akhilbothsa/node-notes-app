const fs = require('fs')
const yargs = require('yargs')
const notes = require('./notes.js')

yargs.version('1.1.0')

yargs.command({
    command: 'add',
    describe: 'Add Note',
    builder: {
        title: {
            describe: 'Title of note',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Body of the note',
            demandOption: true,
            type: 'string'
        }
    },
    handler(arg){
        notes.addNotes(arg.title, arg.body)
    }
})

yargs.command({
    command: 'remove',
    describe: 'Remove note',
    handler(arg){
        notes.remmoveNote(arg.title)
    },
    builder: {
        title: {
            describe: 'Title of the note',
            type: 'string',
            demandOption: true
        }
    }
})

yargs.command({
    command: 'list',
    describe: 'list notes',
    handler(){
        notes.listNotes()
    }
})

yargs.command({
    command: 'read',
    describe: 'Read notes',
    handler(args){
        notes.readNotes(args.title)
    },
    builder:{
        title: {
            demandOption: true,
            type: 'string',
            describe: 'Title of the note'
        }
    }
})

yargs.parse()