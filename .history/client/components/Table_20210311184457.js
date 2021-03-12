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
      async getData(){
            const url = 'https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json'
            const {data} = await axios.get(url)
            const userData = data.map(user => Object.values(user).slice(1))
             this.setState({
                  dataArray: userData
            })
      }
      grid(){
            
      }
      render (){
            console.log('this is data', this.state.dataArray)
            return( null
                  // <div>
                  //       {
                  //           new gridjs.Grid({
                  //                 columns: ["Creditor", "First Name", "Last Name", "Min Pay%", "Balance"],
                  //             data:this.state.dataArray
                  //           })  
                  //       }
                  // </div>
            )
      }
}