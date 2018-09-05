'use strict'
const assert = require('assert')
const pl = require('../src/cross.js')
const utils = require('../src/utils.js')
const fs = require('fs')
const path = require('path')

/*
  Thanks to Audio Library:
    https://www.youtube.com/channel/UCht8qITGkBvXKsR1Byln-wA
  Those musics are No Copyrigh Music.
*/
const musicmap = {
  "Happy Life" : 
    {"url":"https://www.youtube.com/watch?v=u4PI5p5bI9k"}

  , "Bay Breeze" :
    {"url":"https://www.youtube.com/watch?v=XER8Zg0ExKU",
     "volume":0.9}

  , "Flying High" :
    {"url":"./music/Flying High.mp3"}

  , "Ill Url" :
    {"url":"https://www.notyoutube"}
}

const nomusic = "./music/nomusic.txt"

const reset = () => pl.list.reset()

const restart = () => {
  pl.list.reset()
  pl.init.list(musicmap)
  return true
}
// console.log(utils.isExist(path.resolve(process.cwd(), "./music/Flying High.mp3")))
// => true
// console.log(__dirname)
// => with '/test'
// console.log(process.cwd())
// => without '/test'
// console.log("string" instanceof Object)
// => false


describe('init', () => {
  it('pl.init.list', () => {  assert.deepEqual
    pl.init.list(musicmap),
    ['Happy Life', 'Bay Breeze', 'Flying High']})

  it('pl.init.list, then musics', () => {  assert.deepEqual(
    pl.list.musics,
    {"Happy Life" : 
       {"url":"https://www.youtube.com/watch?v=u4PI5p5bI9k"}
    , "Bay Breeze" :
       {"url":"https://www.youtube.com/watch?v=XER8Zg0ExKU",
       "volume":0.9}
     , "Flying High" :
       {"url":"./music/Flying High.mp3"}}  )})

  it('pl.init.list, then books', () => {  assert.deepEqual(
    pl.list.book,
    []   )})
})



describe('reset', () => {
  it('pl.init.reset()', () => {  assert.equal(
    pl.list.reset(),
    true  )})

  it('pl.init.reset(), then musics', () => {  assert.deepEqual(
    pl.list.musics,
    {}
  )})

  it('pl.init.reset(), then names', () => {  assert.deepEqual(
    pl.list.name,
    []
  )})

  it('pl.init.reset(), then books', () => {  assert.deepEqual(
    pl.list.book,
    []
  )})
})


describe('restart', () => {
  it('restart', () => {  assert.equal(
    restart(),
    true
  )})

  it('pl.init.list', () => {  assert.deepEqual
    // pl.init.list(musicmap),
    pl.list.name,
    ['Happy Life', 'Bay Breeze', 'Flying High']})

  it('pl.init.list, then musics', () => {  assert.deepEqual(
    pl.list.musics,
    {"Happy Life" : 
       {"url":"https://www.youtube.com/watch?v=u4PI5p5bI9k"}
    , "Bay Breeze" :
       {"url":"https://www.youtube.com/watch?v=XER8Zg0ExKU",
       "volume":0.9}
     , "Flying High" :
       {"url":"./music/Flying High.mp3"}}  )})

  it('pl.init.list, then books', () => {  assert.deepEqual(
    pl.list.book,
    []   )})
})



describe('add music ext', () => {
  it('just restart', () => { restart() })

  it('add music with musicext', () => {  assert.equal (
    'Flying High',
    pl.list.addmusic("Flying High", musicmap["Flying High"])   )})
})



describe('utils', () => {
  it('isYoutube true', () => {  assert.equal(
    utils.isYoutube(musicmap["Happy Life"]["url"]),
    true  )})

  it('isYoutube false', () => {  assert.equal(
    utils.isYoutube(musicmap["Ill Url"]["url"]),
    false  )})

  it('isMusic true', () => {  assert.equal(
    utils.isMusic(musicmap["Flying High"]["url"]),
    true  )})

  it('isMusic false', () => {  assert.equal(
    utils.isMusic(nomusic),
    false  )})

  it('isExist true with music', () => {  assert.equal(
    utils.isExist(musicmap["Flying High"]["url"]),
    true  )})

  it('isExist true with text', () => {  assert.equal(
    utils.isExist(nomusic),
    true  )})

  it('isExist false', () => {  assert.equal(
    utils.isExist('./music/noexist.mp3'),
    false  )})

  it('isMusicThere true', () => {  assert.equal(
    utils.isMusicThere(musicmap["Flying High"]["url"]),
    true  )})

  it('isMusicThere false with ill url', () => {  assert.equal(
    utils.isMusicThere(musicmap["Ill Url"]["url"]),
    false  )})

  it('isMusicThere false with a file but of text', () => {  assert.equal(
    utils.isMusicThere(nomusic),
    false  )})

  it('exist true with array', () => {  assert.equal(
    utils.exist("name", ["name"]),
    true  )})

  it('exist true with map', () => {  assert.equal(
    utils.exist("name", {"name": "somethign"}),
    true  )})

  it('exist false', () => {  assert.equal(
    utils.exist("name", "name"),
    false  )})

  it('isVolume true with Float', () => {  assert.equal(
    utils.isVolume(0.9),
    0.9  )})
  
  it('isVolume true with String', () => {  assert.equal(
    utils.isVolume("0.9"),
    0.9  )})

  it('isVolume false with Float', () => {  assert.equal(
    utils.isVolume(2.1),
    false  )})

  it('isVolume false with String', () => {  assert.equal(
    utils.isVolume("2.1"),
    false  )})
})



describe('playlist units', () => {
  
  it('just reset', () => { reset() })

  it('add music', () => { assert.equal(
    pl.list.addmusic("Happy Life", musicmap["Happy Life"]),
    "Happy Life"  )})

  it('add music, url get', () => { assert.equal(
    pl.list.getmusic("Happy Life", "url"),
    musicmap["Happy Life"]["url"]  )})

  it('add music, volume get', () => { assert.equal(
    pl.list.getmusic("Happy Life", "volume"),
    1  )})

  it('add name', () => { assert.equal(
    pl.list.addname("Happy Life"),
    "Happy Life"  )})

  it('add name, get names', () => { assert.deepEqual(
    pl.list.name,
    ["Happy Life"]  )})

  it('add book', () => { assert.equal(
    pl.list.addbook("Happy Life"),
    "Happy Life"  )})

  it('add book, get books', () => { assert.deepEqual(
    pl.list.book,
    ["Happy Life"]  )})

  it('false add name', () => { assert.equal(
    pl.list.addname("Bay Breeze"),
    false  )})

  it('false add name, get names ', () => {  assert.deepEqual(
    pl.list.name,
    ["Happy Life"]  )})

  it('false add book', () => { assert.equal(
    pl.list.addbook("Bay Breeze"),
    false  )})

  it('false add book, get books', () => { assert.deepEqual(
    pl.list.book,
    ["Happy Life"]  )})

  it('false add music', () => { assert.equal(
    pl.list.addmusic("Ill Url", musicmap["Ill Url"]),
    false  )})

  it('false add music, get names', () => { assert.deepEqual(
    pl.list.name,
    ["Happy Life"]  )})

  it('add music with volume', () => { assert.equal(
    pl.list.addmusic("Bay Breeze", musicmap["Bay Breeze"]),
    'Bay Breeze'  )})

  it('add music with volume, get names', () => { assert.deepEqual(
    pl.list.name,
    ["Happy Life", "Bay Breeze"]  )})

  it('add music with volume, get url', () => {   assert.equal(
    pl.list.getmusic("Bay Breeze", "url"),
    musicmap["Bay Breeze"]["url"]  )})

  it('add music with volume, get volume', () => { assert.equal(
    pl.list.getmusic("Bay Breeze", "volume"),
    0.9  )})
})



describe('cutin test', () => {

  it('just restart', () => { restart() })

  it('before do cutin', () => {
    pl.list.addbook("Happy Life")
    pl.list.addbook("Bay Breeze")
    assert.deepEqual(
      pl.list.book,
      ["Happy Life", "Bay Breeze"])
  })

  it('do cutin', () => {  assert.deepEqual(
    pl.list.cutinbook("Bay Breeze"),
    ["Bay Breeze", "Happy Life", "Bay Breeze"]  )})

  it('do cutin, get booktop', () => {assert.equal(
    pl.list.getbook(),
    "Bay Breeze"  )})

  it('do cutin, get restbooks', () => {assert.deepEqual(
    pl.list.book,
    ["Happy Life", "Bay Breeze"]  )})
})



describe('rmfrom test', () => {

  it('just restart', () => { restart() })

  it('rmfrom music', () => { assert.deepEqual(
    pl.list.rmfrom("Bay Breeze", "musics"),
    ["Happy Life", "Flying High"]  )})

  it('rmfrom book', () => { 
    pl.list.addbook("Happy Life")
    pl.list.addbook("Flying High") 
    assert.deepEqual(
      pl.list.rmfrom("Happy Life", "book"),
      ["Flying High"]  )})

  it('rmfrom name', () => {  assert.deepEqual(
    pl.list.rmfrom("Happy Life", "name"),
    ["Flying High"]  )})
})



describe('current', () => {
  it('option change with true', () => { assert.equal(
    pl.current.setoption('loop'),
    "loop"  )})

  it('option change with false', () => { assert.equal(
    pl.current.setoption('notopt'),
    false  )})

  it('onplay change with true', () => {
    restart()
    assert.equal(
      pl.current.setonplay('Happy Life'),
      "Happy Life"  )})

  it('onplay change with false', () => {  assert.equal(
    pl.current.setonplay('notmsc'),
    false  )})
})


describe('volume', () => {
  it('volume change with good float val', () => {  assert.equal (
    pl.volume.setvolume(0.9),
    0.9  )})

  it('volume change with good string val', () => {  assert.equal (
    pl.volume.setvolume("0.9"),
    0.9  )})

  it('volume change with bad float val', () => {  assert.equal (
    pl.volume.setvolume(2),
    false  )})

  it('volume change with bad string val', () => {  assert.equal (
    pl.volume.setvolume("2"),
    false  )})
})



describe('cutin', () => {
  it('cutin with true', () => {
    restart()
    assert.equal(
      pl.cutin("Happy Life"),
      "Happy Life"  )})

  it('cutin with true, then option', () => {  assert.equal(
    pl.current.option,
    "book"  )})

  it('cutin with true, then book', () => {  assert.deepEqual(
    pl.list.book,
    ["Happy Life"]  )})

  it('cutin with false', () => {
    restart()
    assert.equal(
      pl.cutin("Happy"),
      false  )})

  it('cutin with false, then option', () => {  assert.equal(
    pl.current.option,
    "book"  )})

  it('cutin with false, then book', () => {  assert.deepEqual(
    pl.list.book,
    []  )})
})



describe('init onplay/option', () => {
  it('init onplay', () => {
    restart()
    assert.equal(
      pl.init.onplay(),
      "Happy Life"  )})

  it('init onplay, onplay', () => { assert.equal(
    pl.current.onplay,
    "Happy Life" )})

  it('init onplay, with arg', () => {
    restart()
    assert.equal(
      pl.init.onplay("Flying High"),
      "Flying High"  )})

  it('init onplay, with arg, onplay', () => { assert.equal(
    pl.current.onplay,
    "Flying High" )})

})


const randcheck = () => {
  return pl.list.name.indexOf(pl.optionsfn.rand()) > -1  }


describe('optionsfn', () => {
  it('rand', () => {
    restart()
    assert.equal(
      randcheck(),
      true  )})

  it('loop with true', () => {
    restart()
    assert.equal(
      pl.optionsfn.loop("Happy Life"),
      "Happy Life"  )})

  it('loop with false, randcheck', () => {
    restart()
    pl.optionsfn.loop("notexist")
    assert.equal(
      randcheck(),
      true  )})

  it('loop with false, optioncheck', () => { assert.equal(
    pl.current.option,
    "rand"  )})

  it('next with true', () => {
    restart()
    assert.equal(
      pl.optionsfn.next("Happy Life"),
      "Bay Breeze"  )})

  it('next with the last', () => {
    restart()
    assert.equal(
      pl.optionsfn.next("Flying High"),
      "Happy Life"  )})

  it('next with false, randcheck', () => {
    restart()
    pl.optionsfn.next("notexist")
    assert.equal(
      randcheck(),
      true  )})

  it('next with false, optioncheck', () => { assert.equal(
    pl.current.option,
    "rand"  )})

  it('book', () => {
    restart()
    pl.list.addbook("Happy Life")
    assert.equal(
      pl.optionsfn.book(),
      "Happy Life"  )})
  
  it('book with false, randcheck', () => {
    restart()
    pl.optionsfn.book("notexist")
    assert.equal(
      randcheck(),
      true  )})

  it('book with false, optioncheck', () => { assert.equal(
    pl.current.option,
    "rand"  )})
})
