import React from 'react'
import axios from 'axios'
import ReactTable from "react-table"

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
export default class Table extends React.Component{
      constructor(props){
            super(props)
            this.state={
                  data:{},
                  isLoading: false
            }
            this.getKey = this.getKey.bind(this)
      }
      async componentDidMount(){ 
            const url = 'https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json'
            const {data} = await axios.get(url)
             this.setState({
                  data, 
                  isLoading: true
            })
      }
      render (){
            const {data} = this.state
            if(!this.state.isLoading){
                  {console.log('this is data from if', data)}
                  return <div> Loading . . .</div>
            }else{
                  {console.log('this is data from else', data)}
                  return(  
                        <div>
                            <ReactTable data={this.state.data} columns={columns} />
                        </div>
                  )
            }
      }
}