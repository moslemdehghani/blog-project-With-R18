import React from 'react'
import Shimmer from './Shimmer'
import SkeletonElemet from './SkeletonElemet'

const SkeletonPost = () => {
  return (
    <div className='skeleton-wrapper'>
         <div className="skeleton-post">
              <SkeletonElemet type="img" />
              <SkeletonElemet type="title" />
              <SkeletonElemet type="button" />
         </div>
         <Shimmer />
    </div>
  )
}

export default SkeletonPost