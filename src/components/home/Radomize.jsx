import React, { useState, useEffect } from 'react';
import usePropertiesContext from '../../context/Properties';
import PropertyCard from './PropertyCard';

const Randomize = () => {
    const { searchResult } = usePropertiesContext();
    const showCount = 6;
    
    const [propertiesArr, setPropertiesArr] = useState([]);

    function randomNum(data) {
        if (data.length !== 0) {
            let nums = new Set();
            while (nums.size !== showCount) {
                let randNum = Math.floor(Math.random() * data.length);
                nums.add(randNum);
            }

            return [...nums];
        }
    }

    useEffect(() => {
        if (searchResult && searchResult.length !== 0) {
            let arr = new Array
            randomNum(searchResult).map(num => {
                arr.push(searchResult[num])
            })
            setPropertiesArr(arr)
        }
    }, [searchResult])

    return propertiesArr.length === 0 ? (
        <div>loading</div>
    ) : (
        propertiesArr.map(obj => {
            return <PropertyCard key={obj.id} data={obj} />
        })
    )
        
}
 
export default Randomize;