import React from 'react'
import axios from 'axios'
// make checkbox functional  before 4
// render how many rows checked b4 4:30
// render how many rows be4 4:30
// refactor refactor refactor be4 7pm

export default class Table extends React.Component{
      constructor(props){
            super(props)
            this.state={
                  headerCheckbox:false,
                  data:[],
                  databalance:[],
                  addedBalance: [],
                  checkedBalance:[],
                  isLoading: false
            }
            this.checkSingleBox = this.checkSingleBox.bind(this)
            this.getRow = this.getRow.bind(this)
            this.addRow = this.addRow.bind(this)
            this.deleteRow = this.deleteRow.bind(this)
            this.getHeader = this.getHeader.bind(this)
            this.checkAllBoxes = this.checkAllBoxes.bind(this)
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
            const  addedBalance = [...document.getElementsByClassName('addedBalance')]
            let table = document.getElementById('table')
            if([...table.rows].slice(11))
            this.setState({
                  addedBalance
            })
            this.checkAllBoxes()
      }
      checkAllBoxes(){
            const allCheckbox = document.getElementById('allCheckbox')
            const checkboxes = [...document.getElementsByClassName('checkbox')]
            console.log('this is checkedboxes', document.querySelectorAll("checkbox, addedcheckbox"))

            allCheckbox.addEventListener('click', (event)=>{
                  const headerCheckbox = !this.state.headerCheckbox
                  this.setState({
                        headerCheckbox
                  })
                  checkboxes.forEach(box => box.checked = this.state.headerCheckbox)
                  this.checkSingleBox()
            })
          
      }
      totalBalance(newBalanace){
           this.setState({
            addedBalance: [...this.state.addedBalance, newBalanace]
           })
      }
      addRow(){
            let classNamesToAdd = ['checkbox', 'addedcheckbox']
            let table = document.getElementById('table')
            let index = [...table.rows].length-1
            const row = table.insertRow(index+1)
            for(let i = 0; i < 6; i++){
                  let cell=  row.insertCell(i)
                  const txtInput  = document.createElement("input")
                  txtInput.type  = (i === 0)? 'checkbox' :  'text'
                  if(i === 5) txtInput.className += 'addedBalance'
                  if(i === 0) txtInput.classList.add(...classNamesToAdd)
                  if (i === 1)txtInput.style="text-transform:uppercase" 
                  cell.appendChild(txtInput)     
            }
            const cellBalance = [...document.getElementsByClassName('addedBalance')]
            const addedRowCheckbox = [...document.getElementsByClassName('addedcheckbox')]
            console.log('')
            for(let i = 0; i < cellBalance.length; i++){
                  cellBalance[i].addEventListener('change', (event)=>{
                        addedRowCheckbox[i].setAttribute('name', `rows${index+1}`)
                        addedRowCheckbox[i].setAttribute('value', event.target.value)
                        this.totalBalance(event.target.value)
                  })
            }
            this.checkAllBoxes()
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
            return  headers.map((info, index) => {
                 if (index === 0 ){
                 return <th key={index} className='header'><input type="checkbox" id="allCheckbox" ></input></th> 
            }else{
                  return <th key={index} className='header'>{info.toUpperCase() }</th>
            }
      })
      }
      checkSingleBox(){
            let boxes = [...document.getElementsByClassName('checkbox')]
            const checkedBalance = boxes.filter(box => box.checked).map(box => box.value)
            this.setState({
                  checkedBalance
            })
            console.log('this is boxes', checkedBalance)
      }
      getRow(){
           const keys = Object.keys(this.state.data[0])
            return (this.state.data.map((user, index) =>{
                 return  <tr key={index}>{keys.map((key, num)=>{
                       let rowBalance = user[keys[5]]
                       if(num === 0){
                             let Inputname = `row${index}`
                        return <td key={num} ><input type="checkbox" className="checkbox" name = {Inputname }  value={rowBalance} onClick={()=>this.checkSingleBox()}></input></td> 
                       }else{
                        return  (num === 5)?<td key={num} className='databalance'>{user[key]}</td> :<td key={num}>{user[key]}</td>
                       }
                 })}</tr>
            }))
      }
      getDataBalance(){
            // const checkedbox = [...document.getElementsByClassName('checkbox')]
            // console.log(checkedbox.filter(box => box.value))
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