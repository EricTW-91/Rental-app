import React from 'react'

const Category = (props) => {
  return (
    <div>
      {props.match.params.sort}
    </div>
  )
}

export default Category
