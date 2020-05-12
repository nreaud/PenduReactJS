import React from 'react'

const InputCursor = ({list}) => (
    <div>
        <input list="dataList" type="range"/>
        <datalist id="dataList">
            {list.map((item) => <option key={item} label={item} value={item}/>)}
        </datalist>
    </div>
)

export default InputCursor