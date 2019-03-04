import React, { useState, useEffect } from 'react'
import { string, bool } from 'prop-types'

import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import { getPopulationsByCountry, getEmissionsByCountry } from '../../utils/api'

const Graph = ({ country, perCapita }) => {
    const [populations, setPopulations] = useState([])
    const [emissions, setEmissions] = useState([])
    const [emissionsPerCapita, setEmissionsPerCapita] = useState([])
    const [populationsLoading, setPopulationsLoading] = useState(false)
    const [emissionsLoading, setEmissionsLoading] = useState(false)

    useEffect(() => {
        if (country) {
            setEmissionsLoading(true)
            setPopulationsLoading(true)
            getEmissionsByCountry(country)
                .then(({ data }) => {
                    setEmissionsLoading(false)
                    setEmissions(data.sort((a, b) => a.year - b.year))
                })
            getEmissionsByCountry(country, true)
                .then(({ data }) => {
                    setEmissionsLoading(false)
                    setEmissionsPerCapita(data.sort((a, b) => a.year - b.year))
                })
            getPopulationsByCountry(country)
                .then(({ data }) => {
                    setPopulationsLoading(false)
                    setPopulations(data.sort((a, b) => a.year - b.year))
                })
        }
    }, [country])

    console.log(populationsLoading)
    console.log(emissionsLoading)
    console.log(perCapita)

    const populationData = populations.filter((p) => p.value).map(({ year, value }) => ([
        new Date(year).getTime(),
        parseFloat(value),
    ]))

    const emissionData = (perCapita ? emissionsPerCapita : emissions).filter((p) => p.value).map(({ year, value }) => ([
        new Date(year).getTime(),
        parseFloat(value),
    ]))

    console.log(emissionData)

    const gridColor = '#333333'

    const options = {
        colors: ['#F92672', '#66D9EF', '#A6E22E', '#A6E22E'],
        chart: {
            // backgroundColor: '#272822',
            style: {
                fontFamily: 'IBM Plex Sans',
                color: gridColor,
            },
        },
        subtitle: {
            style: {
                color: '#A2A39C',
            },
            align: 'left',
        },
        legend: {
            align: 'right',
            verticalAlign: 'bottom',
            itemStyle: {
                fontWeight: 'normal',
                color: gridColor,
            },
        },
        title: false,
        xAxis: {
            title: {
                text: 'Year',
            },
            type: 'datetime',
            gridLineDashStyle: 'Dot',
            gridLineWidth: 1,
            gridLineColor: gridColor,
            lineColor: gridColor,
            minorGridLineColor: gridColor,
            tickColor: gridColor,
            tickWidth: 1,
        },
        yAxis: [{
            title: {
                text: 'Population',
            },
            gridLineDashStyle: 'Dot',
            gridLineColor: gridColor,
            lineColor: gridColor,
            minorGridLineColor: gridColor,
            tickColor: gridColor,
            tickWidth: 1,
        }, {
            title: {
                text: perCapita ? 'CO2 Emissions Per Capita' : 'CO2 Emissions',
            },
            gridLineDashStyle: 'Dot',
            gridLineColor: gridColor,
            lineColor: gridColor,
            minorGridLineColor: gridColor,
            tickColor: gridColor,
            tickWidth: 1,
            opposite: true,
        }],
        series: [{
            name: 'Population',
            data: populationData,
        }, {
            name: perCapita ? 'CO2 Emissions Per Capita' : 'CO2 Emissions',
            data: emissionData,
            yAxis: 1,
        }],
        credits: false,
    }

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
        />
    )
}

Graph.propTypes = {
    country: string,
    perCapita: bool,
}

export default Graph
