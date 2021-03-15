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
                  databalance:[],
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
            const  databalance = [...document.getElementsByClassName('databalance')].map(data => data.innerHTML)
            this.setState({
                  databalance 
            })
            console.log(this.state.databalance)
            const  addedBalance = [...document.getElementsByClassName('addedBalance')]
            let table = document.getElementById('table')
            if([...table.rows].slice(11))
            this.setState({
                  addedBalance
            })
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
            for(let i = 0; i < cellBalance.length; i++){
                  cellBalance[i].addEventListener('change', (event)=>{
                        this.totalBalance(event.target.value)
                  })
            }
      }
      deleteRow(){
            const table = document.getElementById('table')
            let index = [...table.rows].length-1
            table.deleteRow(index)
            const addedBalance = this.state.addedBalance.slice(0, -1)
            this.setState({
                  addedBalance
            })
            if(this.state.addedBalance.length === 0){
                  this.setState({
                        databalance: [...this.state.databalance].slice(0,-1)
                  })
            }
      }
      getHeader(){
            const headers = ['Checkbox','Creditor', 'Frist Name','Last Name','Min Pay%','Balance']
            const checkboxHeader = document.createElement("input")
            checkboxHeader.setAttribute("type", "checkbox");
            const tableHeader = headers.map((info, index) => {
                 return(index === 0 )? <input type="checkbox" id="allcheckerbo" name="vehicle1" value="Bike"></input>
                  <th key={index} className='header'>{info.toUpperCase() }</th>

      })
           return tableHeader
      }
      getRow(){
           const keys = Object.keys(this.state.data[0]).slice(1)
            return (this.state.data.map((user, index) =>{
                 return  <tr key={index}>{keys.map((key, num)=>{
                     return  (num === 4)?<td key={num} className='databalance'>{user[key]}</td> :<td key={num}>{user[key]}</td>
                 })}</tr>
            }))
      }
      getDataBalance(){
            let totalBalance = 0
          const dataBalance = this.state.databalance.map(data => Number(data)).reduce( ( sum, balance ) => sum + balance , 0)  
          if(this.state.addedBalance){
            totalBalance = this.state.addedBalance.map(num => Number(num)).reduce( ( sum, num) => sum + num , 0) 
          }
          return (totalBalance + dataBalance)
      }
      render (){
            const {data} = this.state
            if(!this.state.isLoading){
                  return <div id= 'loading'> Loading . . .</div>
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
                              <div id= 'total'><p>Total <span>${this.getDataBalance()}</span></p></div>
                              <button type='button' id='buttonAdd' onClick={() =>this.addRow()}>ADD</button>
                              <button type='button' id='buttonRemove' onClick={() =>this.deleteRow()}>REMOVE</button>
                        </div>
                  )
            }
      }
}