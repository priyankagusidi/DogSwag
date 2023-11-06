import MultiSelect from "react-multiple-select-dropdown-lite"
import React, { useState } from 'react';
import  'react-multiple-select-dropdown-lite/dist/index.css'
export default function select({value,setValue,data}){
   

  const  handleOnchange  = val  => {
    setValue(val)
  }


  console.log(value)


  return (
    <div>
      <div className= ''>
        <MultiSelect
          options={data}
          instanceId= "postType"
          placeholder= "Breed"
          defaultValue={value}
          onChange={handleOnchange}
          noOptionsMessage={() => "No breed found..."}
          isMulti
          isSearchable
          styles={{
            dropdownIndicator:()=>({
                display:"none"
            }),
            // ClearIndicator:()=>({
            //     color : "red"
            //  }),
            control : (baseStyles, state) =>({
                ...baseStyles,
                borderTop : "none",
                borderLeft : "none",
                borderRight : "none",
                borderRadius : "none",
            }),
            multiValueRemove : (baseStyles, state)=>({
                ...baseStyles,
                color: state.isFocused ? "red" : "gray",
                
            })
          }}
          
        />
      </div>

    </div>
  );

}