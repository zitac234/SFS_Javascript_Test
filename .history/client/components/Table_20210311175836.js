import React from 'react'
import axios from 'axios'
import { Grid } from "gridjs"


export default class Table extends React.Component{
      // constructor(props){
      //       super(props)
      //       this. getData = this.getData.bind(this)
      // }
       getData(){
            const url = 'https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json'
            return  fetch(url)
      }

      render (){
            let  data
            (async () => {
                  data = await this.getData()
                  return data
            })()
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