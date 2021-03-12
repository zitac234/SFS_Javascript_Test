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
            const userData = data.map(user => Object.values(user).slice(1))
             this.setState({
                  dataArray: userData
            })
      }
      grid(){
            console.log('this is data', this.state.dataArray)
            return (
                  <table>
                        <tr>
                              <th>
                              Creditor
                              </th>
                              <th>
                              First Name
                              </th>
                              <th>
                              Last Name
                              </th>
                              <th>
                                    Min Pay%
                              </th>
                              <th>
                                    Balance
                              </th>
                        </tr>
                  {this.state.dataArray.forEach(user =>  <tr> {user.forEach(info => <td>{info}</td>)}</tr>)
                  </table>
            )
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