import React from 'react'
import axios from 'axios'
// import { Grid } from "gridjs"


export default class Table extends React.Component{
      constructor(props){
            super(props)
            this. getData = this.getData.bind(this)
      }
      async getData(){
            // const url = 'https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json'
            let {data} = await axios.get('https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json')
            console.log('this is data', data)
            return data

      }

      render (){
            this
            return(
                  null
                  // <div>{this.getData}</div>
            )
      }
}