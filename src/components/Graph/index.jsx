import React, { useState, useEffect } from 'react'
import { string, bool } from 'prop-types'
import axios from 'axios'

import {
    VictoryChart,
    VictoryAxis,
    VictoryLine,
    VictoryTheme,
    VictoryZoomContainer,
} from 'victory'

const Graph = ({ country, perCapita }) => {
    const [populations, setPopulations] = useState([])
    const [emissions, setEmissions] = useState([])
    const [emissionsPerCapita, setEmissionsPerCapita] = useState([])
    const [populationsLoading, setPopulationsLoading] = useState(false)
    const [emissionsLoading, setEmissionsLoading] = useState(false)
    const [zoomDomain, setZoomDomain] = useState([])

    useEffect(() => {
        if (country) {
            setEmissionsLoading(true)
            setPopulationsLoading(true)
            axios.get(`http://localhost:3000/emissions?country=${country}`)
                .then(({ data }) => {
                    setEmissionsLoading(false)
                    setEmissions(data.sort((a, b) => a.year - b.year))
                })
            axios.get(`http://localhost:3000/emissions?country=${country}&perCapita=true`)
                .then(({ data }) => {
                    setEmissionsLoading(false)
                    setEmissionsPerCapita(data.sort((a, b) => a.year - b.year))
                })
            axios.get(`http://localhost:3000/populations?country=${country}`)
                .then(({ data }) => {
                    setPopulationsLoading(false)
                    setPopulations(data.sort((a, b) => a.year - b.year))
                })
        }
    }, [country])

    console.log(populationsLoading)
    console.log(emissionsLoading)
    console.log(perCapita)

    const populationData = populations.filter((p) => p.value).map(({ year, value }) => ({
        x: new Date(year),
        y: parseFloat(value),
    }))

    const emissionData = (perCapita ? emissionsPerCapita : emissions).filter((p) => p.value).map(({ year, value }) => ({
        x: new Date(year),
        y: parseFloat(value),
    }))

    console.log(populationData)

    return (
        <VictoryChart
            theme={VictoryTheme.material}
            scale={{
                x: 'time',
            }}
            containerComponent={
                <VictoryZoomContainer
                    zoomDimension="x"
                    zoomDomain={zoomDomain}
                    onZoomDomainChange={setZoomDomain}
                />
            }
        >
            <VictoryLine data={emissionData} />
            <VictoryAxis />
            <VictoryAxis dependentAxis />
        </VictoryChart>
    )
}

Graph.propTypes = {
    country: string,
    perCapita: bool,
}

export default Graph
