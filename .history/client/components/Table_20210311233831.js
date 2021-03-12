import React from 'react'
import axios from 'axios'
// friday
// make css better
// add checker box
// add functionality check top check all
// add button 
//  remove button
// --------saturday morning or over weekend-------
// css style
// ----- monday and tuesday ----------
// css style again and host on heroku 
// make video
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
            const headers = ['Creditor', 
                  <th >Frist Name</th>,
                  <th >Last Name</th>,
                  <th >Min Pay%</th>,
                  <th >Balance</th>]
            return header.map((info, index) => <th key={index} className='header'>{info.toUpperCase()}</th>)
      }
      getRow(){
           const keys = Object.keys(this.state.data[0]).slice(1)
            return (this.state.data.map((user, index) =>{
                 return  <tr key={index}>{keys.map((key, num)=>{
                       return (<td key={num}>{user[key]}</td>)
                 })}</tr>
            }))
      }
      render (){
            const {data} = this.state
            if(!this.state.isLoading){
                  return <div id= 'lodaing'> Loading . . .</div>
            }else{
                  return(  
                        <table>
                              <thead>
                                    <tr >{this.getHeader()}</tr>
                              </thead>
                              <tbody>
                                    {this.getRow()}
                              </tbody>
                        </table>
                  )
            }
      }
}