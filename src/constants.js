// import React from 'react'

export const CONSTANTS = {
    trim: (str) => {
        if (str.length > 400) {
            let array = str.split('')
            str = array.splice(0, 200)
            str.push('...')
            str = str.join('')
        }
        return str
    },
    trimLink: (str) => {
        if (str.length > 50) {
            let array = str.split('')
            str = array.splice(0, 35)
            str.push('...')
            str = str.join('')
        }
        return str
    }
}


