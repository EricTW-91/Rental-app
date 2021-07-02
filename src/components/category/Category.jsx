import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import usePropertiesContext from '../../context/Properties';
import CategoryItem from './CategoryItem';
import './Category.scss';

const Category = () => {
  const { setCityName, searchResult } = usePropertiesContext();
  const { sort } = useParams();

  useEffect(() => {
    sort && setCityName(sort);
  },[sort])

  return (
    <div className="Category-wrapper">
      {
        searchResult && (
          searchResult.map(property => (
            <CategoryItem key={property.id} {...property} />
          ))
        )
      }
    </div>
  )
}

export default Category
