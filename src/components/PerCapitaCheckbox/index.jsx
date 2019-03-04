import React from 'react'
import { bool, func } from 'prop-types'

import styles from './perCapitaCheckBox.pcss'

const PerCapitaCheckbox = ({ perCapita, onChange }) => {
    const onPerCapitaChange = (e) => {
        const val = !!e.currentTarget.checked
        onChange(val)
    }
    return (
        <div className={styles.perCapitaCheckbox}>
            <span className={styles.text}>
                Per capita
            </span>
            <div className={styles.checkbox}>
                <input
                    type="checkbox"
                    id="checkbox"
                    checked={perCapita}
                    onChange={onPerCapitaChange}
                />
                <label htmlFor="checkbox" />
            </div>
        </div>
    )
}

PerCapitaCheckbox.propTypes = {
    perCapita: bool,
    onChange: func,
}

export default PerCapitaCheckbox
