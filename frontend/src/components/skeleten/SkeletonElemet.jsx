import React from 'react'
import "./skeleten.css"
const SkeletonElemet = ({type}) => {

     const classes = `skeleton ${type}`

  return (
    <div className={classes}>
         
    </div>
  )
}

export default SkeletonElemet