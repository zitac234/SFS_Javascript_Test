import React from 'react'
import axios from 'axios'
export default class Table extends React.Component{
      constructor(props){
            super(props)
            this.state={
                  data:[],
                  checkboxes:[],
                  numbersRow: 0,
                  isLoading: false,
                  checkedBalance:[],
                  headerCheckbox:false
            }
            this.getRow = this.getRow.bind(this)
            this.addRow = this.addRow.bind(this)
            this.deleteRow = this.deleteRow.bind(this)
            this.getHeader = this.getHeader.bind(this)
            this.checkAllBoxes = this.checkAllBoxes.bind(this)
            this.checkSingleBox = this.checkSingleBox.bind(this)
            this.getDataBalance = this.getDataBalance.bind(this)
            this.AdjustRowNumber = this.AdjustRowNumber.bind(this)
      }
      async componentDidMount(){ 
            const url = 'https://raw.githubusercontent.com/StrategicFS/Recruitment/master/data.json'
            const {data} = await axios.get(url)
             this.setState({
                  data,
                  isLoading: true
            })
            const checkboxes = [...document.getElementsByClassName('checkbox')]
            this.setState({ checkboxes})
            this.checkAllBoxes()
            this.AdjustRowNumber()
      }
      checkAllBoxes(){
            const allCheckbox = document.getElementById('allCheckbox')  
            allCheckbox.addEventListener('click', (event)=>{
                  const headerCheckbox = !this.state.headerCheckbox
                  this.setState({headerCheckbox})
                  const checkboxes = this.state.checkboxes.forEach(box => box.checked = this.state.headerCheckbox)
                  this.setState({checkboxes})
                  this.checkSingleBox()
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
                  if(i === 0){ 
                        txtInput.classList.add(...classNamesToAdd)
                        txtInput.addEventListener('click',this.checkSingleBox)
                  }
                  if (i === 1)txtInput.style="text-transform:uppercase" 
                  if(i === 2 || i === 3)txtInput.style='text-transform: capitalize'
                  cell.appendChild(txtInput)  
            }
            const cellBalance = [...document.getElementsByClassName('addedBalance')]
            const addedRowCheckbox = [...document.getElementsByClassName('addedcheckbox')]
            for(let i = 0; i < cellBalance.length; i++){
                  cellBalance[i].addEventListener('change', (event)=>{
                        addedRowCheckbox[i].setAttribute('name', `rows${index+1}`)
                        addedRowCheckbox[i].setAttribute('value', event.target.value)
                  })
            }
            const checkboxes = [...document.querySelectorAll(".checkbox, .addedcheckbox")]
            this.setState({checkboxes })
            this.AdjustRowNumber()
      }
      deleteRow(){
            const table = document.getElementById('table')
            let lastIndex = this.state.checkedBalance.length-1
            let deleteBalance
            let index = [...table.rows].length-1
            let cell = table.rows[index].cells[5]
           deleteBalance = (cell.querySelector(".addedBalance"))? cell.children[0].value :  table.rows[index].cells[5].innerHTML
           if(Number(this.state.checkedBalance[lastIndex].replace(',', '')) === Number(deleteBalance.replace(',', ''))) { 
                 const checkedBalance = this.state.checkedBalance.slice(0,-1)
                 this.setState({checkedBalance})
            }
            console.log('this is state delete ', this.state.checkedBalance)
            if(index !== 0)table.deleteRow(index)
           this.AdjustRowNumber()
      }
      AdjustRowNumber(){
            const numbersRow = (document.getElementsByTagName('tr').length)-1
            this.setState({numbersRow})
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
            console.log('this is state before', this.state.checkboxes)
            const checkboxes = const checkedBalance = this.state.checkboxes.filter(box => box.checked)
            const checkedBalance = this.state.checkboxes.filter(box => box.checked).map(box => box.value)
            this.setState({checkedBalance})
            console.log('this is state after ', this.state.checkedBalance)
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
                             if(num === 5 || num === 4)user[key] = user[key].toLocaleString('en-US', { minimumFractionDigits: 2 })
                        return  (num === 5)?<td key={num} className='databalance'>{user[key]}</td> :<td key={num}>{user[key]}</td>
                       }
                 })}</tr>
            }))
      }
      getDataBalance(){
            let totalBalance  = 0
          if(this.state.checkedBalance.length ){
            totalBalance =   this.state.checkedBalance.map(num => {
                  let element = Number(num.replace(',', ''))
                  return (isNaN(element))? 0 : element
            }).reduce( ( sum, num) => sum + num , 0) 
          }
            return totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })
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
                              <div id= 'total'><p>TOTAL <span>${this.getDataBalance()}</span></p></div>
                              <div id='amountRows'><p id='totalRow'>ROWS:{this.state.numbersRow}</p> <p id='totalchecked'>CHECKED ROWS: {this.state.checkedBalance.length}</p></div>
                              <button type='button' id='buttonAdd' onClick={() =>this.addRow()}>ADD</button>
                              <button type='button' id='buttonRemove' onClick={() =>this.deleteRow()}>REMOVE</button>
                        </div>
                  )
            }
      }
}