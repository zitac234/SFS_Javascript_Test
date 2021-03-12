import React from 'react'
import axios from 'axios'
import ReactTable from "react-table"


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
                  dataArray: data
            })
      }
      grid(){
           const columns =[{
                 Header: 'Creditor',
                 accessor: 'creditorName'
           }, {
                 Header: 'First Name', 
                 accessor: 'firstName'
           }, {
                 Header: 'Last Name', 
                 accessor: 'lastName'
           }, {
                 Header: ' Minumum Payment',
                  accessor: 'minPaymentPercentage'
           }, {
                 Header: 'Balance', 
                 accessor:'balance'
           }]
           return (
                 <ReactTable data={this.state.dataArray} columns={columns} />
           )
      }
      render (){
            console.log('this is data', this.sta)
            return( 
                  <div>
                        {this.grid()
                        }
                  </div>
            )
      }
}