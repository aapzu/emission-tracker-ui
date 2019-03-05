import React, { useState } from 'react'
import { func, object } from 'prop-types'
import Autosuggest from 'react-autosuggest'
import { getCountries } from '../../utils/api'

import styles from './search.pcss'

const Icon = () => (
    <svg className={styles.icon} version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 13 14">
        <path
            fill="#999999"
            d="M9 6.5q0-1.445-1.027-2.473t-2.473-1.027-2.473 1.027-1.027 2.473 1.027 2.473 2.473 1.027 2.473-1.027
            1.027-2.473zM13 13q0 0.406-0.297 0.703t-0.703 0.297q-0.422 0-0.703-0.297l-2.68-2.672q-1.398 0.969-3.117 0.969-1.117
            0-2.137-0.434t-1.758-1.172-1.172-1.758-0.434-2.137 0.434-2.137 1.172-1.758 1.758-1.172 2.137-0.434 2.137 0.434 1.758
            1.172 1.172 1.758 0.434 2.137q0 1.719-0.969 3.117l2.68 2.68q0.289 0.289 0.289 0.703z"
        />
    </svg>
)

const InputContainer = (inputProps) => (
    <div className={styles.inputContainer}>
        <input className={styles.input} {...inputProps} />
        <Icon />
    </div>
)

InputContainer.propTypes = {
    inputProps: object,
}

const Search = ({ onChange }) => {
    const [value, setValue] = useState('')
    const [countries, setCountries] = useState([])

    const onSuggestionsFetchRequested = ({ value: newVal }) => {
        setCountries([])
        getCountries(newVal)
            .then(({ data }) => setCountries(data.map((d) => d.name)))
    }
    const onSuggestionsClearRequested = () => setCountries([])
    const getSuggestionValue = (c) => c
    const renderSuggestion = (c) => c
    const onInputChange = (e, { newValue }) => {
        setValue(newValue)
    }
    const onSuggestionSelected = (e, { suggestion }) => {
        onChange(suggestion)
        setValue('')
    }
    const onBlur = () => {
        setValue('')
    }

    return (
        <div className={styles.search}>
            <Autosuggest
                suggestions={countries}
                onSuggestionsFetchRequested={onSuggestionsFetchRequested}
                onSuggestionsClearRequested={onSuggestionsClearRequested}
                getSuggestionValue={getSuggestionValue}
                renderSuggestion={renderSuggestion}
                onSuggestionSelected={onSuggestionSelected}
                onBlur={onBlur}
                renderInputComponent={InputContainer}
                focusInputOnSuggestionClick={false}
                theme={styles}
                inputProps={{
                    value,
                    placeholder: 'Search for a country',
                    onChange: onInputChange,
                }}
            />
        </div>
    )
}

Search.propTypes = {
    onChange: func,
}

export default Search
