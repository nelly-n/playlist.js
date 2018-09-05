'use strict'
const errmsg = require("./errmsg.js").errmsg
const utils = require("./utils.js")
const fs = require('fs')

const volume  = require("./playlist/volume.js").volume
const list    = require("./playlist/list.js").list
const current = require("./playlist/current.js").current



/* Cross functions */
const cutin = (name) => {
  if (utils.exist(name, list.name)) {
    list.cutinbook(name)
    current.setoption("book")
    return name
  }
  console.log(
   "cutin.book says:"
   ,errmsg.no_in_nmli)
  return false  } 

const init = {
  list: (placeormap) => {
    let playobj
    if (typeof placeormap === 'String') {
      let playtext = fs.readFileSync(placeormap, 'utf8')
      playobj = JSON.parse(playtext)  }
    else { playobj = placeormap }
    for (let name in playobj) {
      list.addmusic(name, playobj[name])  }
    return list.name  }

  ,onplay: (name = list.name[0]) => {
    console.log("init.onplay:", list.name)
    return current.setonplay(name)  }

  ,option: (opt = "next") => current.setoption(opt)  }

const opfilter = (name) => {
  return current.setonplay(optionsfn[current.option](name)) }

const catch_then_rand = (name) => {
  console.log(
    "optionsfn.catch_then_rand says:"
    ,errmsg.rd_ch_onp)
  current.setoption("rand")
  return current.setonplay(optionsfn.rand())  }

const optionsfn = {
  /* When a music is done, this functions should be invoked
     to update onplay. */
  rand: (name = "") => {
    /* Set onplay randomly one of all names in list but arg. */
    let tmplist = utils.flickout(name, list.name)
    let tmplen  = tmplist.length
    let rand_tm = Math.floor(Math.random() * 100000)
    let rand = rand_tm % tmplen
    return current.setonplay(tmplist[rand])  }

  ,loop: (name) => {
    /* it's possible that the list would be changed
       asynchronously, so must check it at first. */
    if (utils.exist(name, list.name)) {
      return current.setonplay(name)  }
    console.log(
      "optionsfn.loop says: "
      ,errmsg.no_in_nmli
      ,errmsg.rm_in_play)
    return catch_then_rand(name)  }

  /* Play the next of the current onplay. */
  ,next: (name) => {
    let nidx = list.name.indexOf(name)
    /**/ console.log("list.name in opfn:", list.name)
    if (nidx > -1) {
      let next = nidx + 1
      let nlen  = list.name.length
      if (next < nlen) {
        return current.setonplay(list.name[next])  }
      else {
        return current.setonplay(list.name[0])  }}
    console.log(
      "optionsfn.next says:"
      ,errmsg.no_in_nmli
      ,errmsg.rm_in_play)
    return catch_then_rand(name)  }

  ,book: () => {
    /* Booklist works as LIFO (or karaoke).
       The same reason of loop, checking is a must here. */
    if (list.book.length > 0) {
      let tmponplay = list.getbook()
      if(utils.exist(tmponplay, list.name)) {
        return current.setonplay(tmponplay)  }
      else {
        console.log(
          "optionsfn.book says:"
          ,tmponplay
          ,errmsg.out_books)
        this.book()  }}
    console.log(
      "optionsfn.book says:"
      ,errmsg.out_books
      ,errmsg.no_ch_onp)
    return catch_then_rand()  }}




/*** Exports ***/
module.exports = {
  list: list
  ,current: current
  ,volume: volume
  ,init: init
  ,opfilter: opfilter
  ,cutin: cutin
  ,optionsfn: optionsfn  }
