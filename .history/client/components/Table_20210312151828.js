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
            this.addBalance = this.addBalance.bind(this)
            this.addRow = this.addRow.bind(this)
      }
      async componentDidMount(){ 
            const url = 'https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json'
            const {data} = await axios.get(url)
             this.setState({
                  data, 
                  isLoading: true
            })
      }
      addBalance(){
            return this.state.data.reduce( ( sum, { balance} ) => sum + balance , 0)  
      }
      addRow(){
            const table = document.getElementById('table')
            const addButton = document.getElementById('buttonAdd')
            let index = this.state.data.length
            addButton.addEventListener('click', (event)=>{
                  const row = table.insertRow(index+1)
                  const cell_A = row
            })
      }
      getHeader(){
            const headers = ['Creditor', 'Frist Name','Last Name','Min Pay%','Balance']
            return headers.map((info, index) => <th key={index} className='header'>{info.toUpperCase()}</th>)
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
            console.log(this.state.data.length)
            if(!this.state.isLoading){
                  return <div id= 'lodaing'> Loading . . .</div>
            }else{
                  return(  
                        <div>
                              <table id= 'table'>
                                    <thead>
                                          <tr >{this.getHeader()}</tr>
                                    </thead>
                                    <tbody>
                                          {this.getRow()}
                                    </tbody>
                              </table>
                              <div id= 'total'><p>Total <span>${this.addBalance()}</span></p></div>
                              <button type='button' id='buttonAdd'>ADD</button>
                              <button type='button' id='buttonRemove'>REMOVE</button>
                        </div>
                  )
            }
      }
}