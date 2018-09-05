'use strict'
const fs = require('fs')
const path = require('path')
const errmsg = require("./errmsg.js").errmsg


/* Youtube or Music.ext checker. */
const youtube_reg = /https:\/\/www\.youtube\.com\/.+/
const music_reg = /.+\.mp3|mp4|wav|3gp|3g2|aac|avi|m2ts|m4a|m4b|m4p|mov|mkv|mka|aiff|aif|aifc|opus|wma|asf/


const recwd = (place) => path.resolve(process.cwd(), place)

const arr_eq = (left, right) => {
  if (!Array.isArray(left)) return false
  if (!Array.isArray(right)) return false
  if (lef.length != right.length) return false
  for (var i = 0, n = a.length; i < n; ++i) {
    if (left[i] !== right[i]) return false  }
  return true  }


const isExist = (file) => {
  let replace = recwd(file)
  try {
    fs.statSync(replace)
    return true  }
  catch (err) {
    if (err.code === 'ENOENT')
    console.log(
      "isExist says:"
      ,replace
      ,errmsg.no_music)
    return false  }}

const isYoutube = (place) => place.match(youtube_reg) ? true : false
const isMusic = (place) => place.match(music_reg) ? true : false

const isMusicThere = (place) => {
  if (!place.match(music_reg))  {
    console.log(
      "isMusicThere says:"
      ,place
      ,errmsg.not_musicext)
    return false  }
  else  return isExist(place)  }

const exist = (name, arr) => {
  if (!(arr instanceof Object)) {
    console.log(
      "exist says:"
      ,arr
      ,"it's neither Array nor Hashmap.")
    return false  }

  if (arr instanceof Array) {
    let ind = arr.indexOf(name)
    if (ind > -1)  return true
    return false  }

  else {
    if (arr[name])  return true
    return false  }}

const flickout = (name, arr) => arr.filter(x => name !== x)


/* Volume */
const isVolume = (maybedbl) => {
  let dbl
  if (typeof maybedbl === String) {
       dbl = parseFloat(maybedbl) }
  else dbl = maybedbl

  if (0 <= dbl && 1 >= dbl)  return dbl

  console.log(
    "volume.isVolume says:"
    ,dbl
    ,errmsg.not_volume)

  return false  }



module.exports = {
  arr_eq: arr_eq,
  recwd: recwd,
  isYoutube: isYoutube,
  isMusic: isMusic,
  isMusicThere: isMusicThere,
  isExist: isExist,
  exist: exist,
  flickout: flickout,
  isVolume: isVolume
}

