import React from 'react'
import axios from 'axios'

export default class Table extends React.Component{
      constructor(props){
            super(props)
            this.state={
                  data:[],
                  isLoading: false
            }
            this.getHeader = this.getHeader.bind(this)
            this.getRow = this.getRow.bind(this)
      }
      async componentDidMount(){ 
            const url = 'https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json'
            const {data} = await axios.get(url)
             this.setState({
                  data, 
                  isLoading: true
            })
      }
      getHeader(){
            const header = Object.keys(this.state.data[0]).slice(1)
            return header.map((info, index) => <th key={index}>{info.toUpperCase()}</th>)
      }
      getRow(){
           const keys = Object.keys(this.state.data[0]).slice(1)
            this.state.data.map((user, index) =>{
                 return  <td>keys.map((key, num)=>{
                       return <tr></tr>
                       </td>
                 })
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
                            <table>
                                  <thead>
                                        <tr>{this.getHeader()}</tr>
                                  </thead>
                                  <tbody>
                                        {this.getRow()}
                                  </tbody>
                            </table>
                        </div>
                  )
            }
      }
}