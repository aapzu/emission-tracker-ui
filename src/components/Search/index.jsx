import React, { useState, useEffect } from 'react'
import { func } from 'prop-types'
import axios from 'axios'
import { Select } from 'antd'

import styles from './search.pcss'
/* eslint-disable */
const Search = ({ onChange, onPerCapitaChange: onPerCapitaChangeProp }) => {
    const [countries, setCountries] = useState([])
    const [perCapita, setPerCapita] = useState(false)

    // Only ~300 options, we can pre-load them here to get a faster search
    useEffect(() => {
        axios.get('http://localhost:3000/countries')
            .then(({ data }) => setCountries(data.map((d) => d.name)))
    }, [])

    const onPerCapitaChange = (e) => {
        const val = !!e.currentTarget.checked
        onPerCapitaChangeProp(val)
        setPerCapita(val)
    }

    console.log(perCapita)

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
            <input
                type="checkbox"
                checked={perCapita}
                onChange={onPerCapitaChange}
            /> Per capita
        </div>
    )
}

Search.propTypes = {
    onChange: func,
    onPerCapitaChange: func,
}

export default Search
