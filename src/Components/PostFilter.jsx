import React from 'react'
import MySelect from './UI/Select/MySelect';
import MyInput from './UI/Input/MyInput';

export default function PostFilter({filter, setFilter}) {
  return (
    <div>
      <MyInput
        placeholder='Search...'
        value={filter.query}
        onChange={e => setFilter({...filter, query: e.target.value})}
      />
      <MySelect
        value={filter.sort}
        onChange={selectedSort => setFilter({...filter, sort: selectedSort})}
        defaultValue='Sort'
        option={[
          { value: 'title', name: 'By name' },
          { value: 'body', name: 'By discription' },

        ]}
      />
    </div>
  )
}
