import React from 'react'
import { useState } from 'react'
import GeneralInfo from './components/GeneralInfo'
import Education from './components/Education'
import Experience from './components/Experience'

const App = () => {
  return (
    <>
      <h1 className='head'><a href='#'>CV-GENERATOR APP</a> </h1>
      <GeneralInfo />
      <Education />
      <Experience />
    </>
  )
}

export default App;