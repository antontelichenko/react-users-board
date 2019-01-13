import React from 'react'
import spinner from './spinner.gif'

export default () => {
  return (
    <div>
      <img src={spinner} alt='...loading' style={{margin:'auto', display:'block',width:'200px'}}/>
    </div>
  )
}
