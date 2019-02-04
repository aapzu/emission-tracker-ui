// @flow

import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Select } from 'antd'

import styles from './search.pcss'

type Props = {
    onChange: (string) => void,
}

const Search = ({ onChange }: Props) => {
    const [countries, setCountries] = useState([])

    // Only ~300 options, we can pre-load them here to get a faster search
    useEffect(() => {
        axios.get('http://localhost:3000/countries')
            .then(({ data }) => setCountries(data.map((d) => d.name)))
    }, [])

    return (
        <div className={styles.search}>
            <Select
                showSearch
                style={{
                    width: '100%',
                }}
                placeholder="Search"
                onSelect={onChange}
            >
                {countries.map((c) => (
                    <Select.Option
                        value={c}
                        key={c}
                    >
                        {c}
                    </Select.Option>
                ))}
            </Select>
        </div>
    )
}

export default Search
