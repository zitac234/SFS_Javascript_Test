import React from 'react'
import axios from 'axios'
import { Grid } from "gridjs"


export default class Table extends React.Component{
      constructor(props){
            super(props)
            this.state={
                  dataArray:[]
            }
            this. getData = this.getData.bind(this)
      }
      async getData(){
            const url = 'https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json'
            const {data} = await axios.get(url)
            console.log('this is data', data)
             this.setState({
                  dataArray:data.map(user => Object.values(user))
            })
      }

      render (){
            this.getData()
            // console.log('this is data', this.state.dataArray)
            return(    null
                  // <div>
                  //       {
                  //           new gridjs.Grid({
                  //                 columns: ["Creditor", "First Name", "Last Name", "Min Pay%", "Balance"]
                  //           })  
                  //       }
                  // </div>
            )
      }
}