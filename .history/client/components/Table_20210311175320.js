import React from 'react'
import axios from 'axios'
import { Grid } from "gridjs"


export default class Table extends React.Component{

       getData(){
            const url = 'https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json'
            return  fetch(url)
      }

      render (){

            // const data = this.getData()
            console.log('this is data', data)
            return(    
                  <div>
                        {
                            new gridjs.Grid({
                                  columns: ["Creditor", "First Name", "Last Name", "Min Pay%", "Balance"]
                            })  
                        }
                  </div>
            )
      }
}