import React from 'react'
import axios from 'axios'
import { Grid } from "gridjs"

export default class Table extends React.Component{
      constructor(props){
            super(props)
            this. getData = this.getData.bind(this)
      }
      await getData(){

            let {data} = await axios.get('https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json')
            return data
      }

      render (){
            return this.getData
      }
}