'use strict'
const errmsg = require('../errmsg.js').errmsg
const utils  = require('../utils.js')
const fs = require('fs')



/*** Volume ***/
class Volume {
  constructor (def = 0.1) {
    this._def = def
    this._vol = def
  }

  get def() { return this._def }
  get volume() { return this._vol }

  /* these setter are completely deleted soon. */
  set def(dbl) {
    if (utils.isVolume(dbl)) {
      this._def = dbl
      this._vol = dbl
    }
  }
  set volume(dbl) {
    if (utils.isVolume(dbl)) {
      this._vol = dbl
    }
  }

  setdefault (dbl) {
    let tmpvol = utils.isVolume(dbl)
    if (tmpvol) {
      this._def = tmpvol
      this._vol = vol
      return tmpvol  }
    console.log('setdefault says:'
      , dbl,  errmsg.not_volume  )
    return false  }

  setvolume (dbl) {
    let tmpvol = utils.isVolume(dbl)
    if (tmpvol) {
      this._vol = tmpvol
      return tmpvol  }
    console.log('setvolume says:'
      , dbl,  errmsg.not_volume  )
   return false  }  

  reset () {
    this._vol = this._def
    return this._vol
  }

  times (times) {
    let tmptime = typeof times === "String" ? parseFloat(times): times
    let tmpvol = this._vol * tmptime
    if (utils.isVolume(tmpvol)) {
      return tmpvol
    }
  }
}


const volume = new Volume()


module.exports = { volume : volume }

