'use strict'
const utils  = require('../utils.js')
const fs = require('fs')

const errmsg = require('../errmsg.js').errmsg
const list = require('./list.js').list


/*** current status ***/
class Current {
  constructor(defopt = "next") {
    this._onplay = ""
    this._option = "next"
    this._choices = ["rand", "loop", "next", "book"]
  }

  get onplay()  { return this._onplay }
  get option()  { return this._option }
  get choices() { return this._choices }

  set onplay(name) {
    if (utils.exist(name, list.name)) this._onplay = name
  }
  set option(name) {
    if (utils.exist(name, this._choices)) this._option = name
  }

  setonplay(name) {
    if (utils.exist(name, list.name)) {
      this._onplay = name
      return name  }
    console.log('setonplay says:',
      name,  errmsg.no_nm_plli)
    return false  }

  setoption(name) {
    if (utils.exist(name, this._choices)) {
      this._option = name
      return name  }
    console.log('setoption says:',
      name,  errmsg.not_opt)
      return false  }

  

}


const current = new Current()


module.exports = { current : current }
