import React from 'react'
import axios from 'axios'
// import { Grid } from "gridjs"
// import "gridjs/dist/theme/mermaid.css"


export default class Table extends React.Component{
      constructor(props){
            super(props)
            this.state={
                  dataArray:[]
            }
            this.getData = this.getData.bind(this)
            this.grid = this.grid.bind(this)
      }
      componentDidMount(){ this.getData()}
      async getData(){
            const url = 'https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json'
            const {data} = await axios.get(url)
             this.setState({
                  dataArray: userData
            })
      }
      grid(){
            console.log('this is data', this.state.dataArray)
            
      }
      render (){
            return( 
                  <div>
                        {this.grid()
                        }
                  </div>
            )
      }
}