import React from 'react'
// import axios from 'axios'
import { Grid } from "gridjs"


export default class Table extends React.Component{
      constructor(props){
            super(props)
            
            this. getData = this.getData.bind(this)
      }
       getData(){
            const url = 'https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json'
           const d =  fetch(url)
           return d
      }

      render (){
            const data = this.getData()
            console.log('this is data', data)
            return(  null  
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