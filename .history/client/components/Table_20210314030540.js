import React from 'react'
import axios from 'axios'
import { Event } from '@material-ui/icons'
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
                  addedBalance: [],
                  isLoading: false
            }
            this.getRow = this.getRow.bind(this)
            this.addRow = this.addRow.bind(this)
            this.deleteRow = this.deleteRow.bind(this)
            this.getHeader = this.getHeader.bind(this)
            this.totalBalance = this.totalBalance.bind(this)
            this.getDataBalance = this.getDataBalance.bind(this)
      }
      async componentDidMount(){ 
            const url = 'https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json'
            const {data} = await axios.get(url)
             this.setState({
                  data,
                  isLoading: true
            })
            const  addedBalance = [...document.getElementsByClassName('addedBalance')]
            let table = document.getElementById('table')
            if([...table.rows].slice(11))
            this.setState({
                  addedBalance
            })
            console.log('this is addedBalance', this.state.addedBalance)
      }
      totalBalance(newBalanace){
           this.setState({
            addedBalance: [...this.state.addedBalance, newBalanace]
           })
      }
      addRow(){
            let table = document.getElementById('table')
            let index = [...table.rows].length-1
            const row = table.insertRow(index+1)
            for(let i = 0; i < 5; i++){
                  let cell=  row.insertCell(i)
                  const txtInput  = document.createElement("input")
                  txtInput.type = 'text'
                  if(i === 4) txtInput.className += 'addedBalance'
                  if (i === 0)txtInput.style="text-transform:uppercase" 
                  cell.appendChild(txtInput)     
            }
            const cellBalance = [...document.getElementsByClassName('addedBalance')]
            let newBalanace
            for(let i = 0; i < cellBalance.length; i++){
                  cellBalance[i].addEventListener('change', (event)=>{
                        
                  })
            }
      }
      deleteRow(){
            const table = document.getElementById('table')
            let index = [...table.rows].length-1
            table.deleteRow(index)
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
      getDataBalance(){
           return  this.state.data.reduce( ( sum, { balance} ) => sum + balance , 0)  
      }
      render (){
            const {data} = this.state
            if(!this.state.isLoading){
                  return <div id= 'loading'> Loading . . .</div>
            }else{ 
                  console.log('this is addBalance', this.state.addedBalance)
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
                              <div id= 'total'><p>Total <span>${this.getDataBalance()}</span></p></div>
                              <button type='button' id='buttonAdd' onClick={() =>this.addRow()}>ADD</button>
                              <button type='button' id='buttonRemove' onClick={() =>this.deleteRow()}>REMOVE</button>
                        </div>
                  )
            }
      }
}