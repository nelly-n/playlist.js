'use strict'
const utils  = require('../utils.js')
const errmsg = require('../errmsg.js').errmsg
const fs = require('fs')



/***　playlist ***/
class List {
  constructor(allow = ["youtube", "music"]) {
    this._a_youtube = allow.indexOf("youtube") > -1
    this._a_music   = allow.indexOf("music") > -1
    this._musics    = {}
    this._name      = []
    this._book      = []
  }

  get musics() { return this._musics }
  get name() { return this._name }
  get book() { return this._book }

  reset () {
    this._musics    = {}
    this._name      = []
    this._book      = []
    return true
  }

  addbook (name) {
    if (utils.exist(name, this._name)) {
      this._book.push(name)
      return name  }
    return false  }

  addname (name) {
    if (utils.exist(name, this._name)) {
      console.log(
        'addname says:'
        ,this._name
        ,errmsg.already_nm)
      return name  }
    if (utils.exist(name, this._musics)) {
      this._name.push(name)
      return name  }
    console.log(
      'addname says:'
      ,name
      ,errmsg.no_in_plli)
    return false  }

  addmusic (name, data) {
    if (utils.exist(name, this._musics)) {
      console.log('addmusic says:',
        name, errmsg.already_nm)
      return name  }
    let well = false
    if ((this._a_youtube && utils.isYoutube(data.url)) ||
        (this._a_music && utils.isMusicThere(data.url)))
      { well = true }
    if (well) {
      this._musics[name] = data
      this._name.push(name)
      return name  }
    console.log('addmusic says:',
      name,
      "it's failure. maybe a problem in youtube-url or filepath.")
    return false  }

  cutinbook (name) {
    this._book.unshift(name)
    return this._book  }

  rmfrom (name, from) {
    const filterset = (name, place) => {
      console.log(this["_" + place])
      this["_" + place] = utils.flickout(name, this["_" + place])
      return true  }

    if (from === "book") {
      console.log('rmfrom book')
      filterset(name, "book")
      return this._book }
    else if (from === "name") {
      console.log('rmfrom name')
      filterset(name, "name")
      filterset(name, "book")
      return this._name }
    else if (from === "musics") {
      console.log('rmfrom musics')
      delete this._musics[name]
      this.rmfrom(name, "name")
      return this._name
    }
  }

  getmusic(name, where) {
    let tmp = this._musics[name][where]
    if (where === "url" && tmp === undefined) {
      console.log(
        'getmusic says:'
        , name, errmsg.no_in_plli)
      return false }
    if (where === "volume" && tmp === undefined) return 1
    return tmp }

  getlast() { return this._name[-1] }

  getbook() { return this._book.shift()  }

}


const ALLOW = ["youtube", "music"]


const list = new List(ALLOW)



module.exports = { list : list }
