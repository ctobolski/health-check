import React, { Fragment } from 'react'
import './App.css'
import AppStatus from './components/AppStatus'

const App = ({ environments }) => {
  return (
    <Fragment>
      {environments.map(({ name, apps }, index) => {
        return <Environment name={name} apps={apps} key={index} />
      })}
    </Fragment>
  )
}

const Environment = ({ name, apps }) => {
  const renderApps = apps => {
    return apps.map((app, index) => {
      return (
        <AppStatus
          url={app.url}
          name={app.name}
          interval={app.interval}
          key={index}
        />
      )
    })
  }

  return (
    <div className='environment'>
      <div className='title'>{name}</div>
      <div className='row'>{renderApps(apps)}</div>
    </div>
  )
}

export default App
