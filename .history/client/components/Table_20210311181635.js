import React from 'react'
import axios from 'axios'
import { Grid } from "gridjs"


export default class Table extends React.Component{
      constructor(props){
            super(props)
            this.state={
                  dataArray:[]
            }
      }
      async componentDidMount(){

      }
      async getData(){
            
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