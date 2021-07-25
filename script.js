let selectedRow = null;

const employees = []

const store = JSON.parse(localStorage.getItem('employees'));

if (store){
  for(let i=0; i< store.length; i+=1){
    const employee = store[i]
    employees.push(employee)
  }
}

for(let i=0; i< employees.length; i+=1){
  const employee = employees[i]
  employee['id'] = i
  insertNewRecord(employee)
}


function onFormSubmit() {
   if(validate()){
     const employee = setupEmployee();
     if(selectedRow === null){
        insertNewRecord(employee)
     }
     else{
        updateRecord(employee)
     }
     reset();
    }
}

function setupEmployee() {
    const newEmployee = {};
    newEmployee['fullName'] = document.getElementById('fullName').value;
    newEmployee['empCode'] = document.getElementById('empCode').value;
    newEmployee['salary'] = document.getElementById('salary').value;
    newEmployee['city'] = document.getElementById('city').value;
    employees.push(newEmployee)
    localStorage.setItem('employees', JSON.stringify(employees))
    return newEmployee
}

function insertNewRecord(data) {
  const table = document.getElementById('employeeList').getElementsByTagName('tbody')[0]
  const newRow = table.insertRow(table.length);
  newRow.setAttribute('id', data.id)
  
  const cell1 = newRow.insertCell(0);
  cell1.innerHTML = data.fullName

  const cell2 = newRow.insertCell(1);
  cell2.innerHTML = data.empCode

  const cell3 = newRow.insertCell(2);
  cell3.innerHTML = data.salary

  const cell4 = newRow.insertCell(3);
  cell4.innerHTML = data.city

  const cell5 = newRow.insertCell(4)
  cell5.innerHTML = `<a onClick=onEdit(this)>Edit</a>
                     <a onClick=onDelete(this)>Delete</a>`
}

function reset(){
   const resetform = document.querySelector('form')
   resetform.reset()
   selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement
    document.getElementById('fullName').value = selectedRow.cells[0].innerHTML;
    document.getElementById('empCode').value = selectedRow.cells[1].innerHTML;
    document.getElementById('salary').value = selectedRow.cells[2].innerHTML;
    document.getElementById('city').value = selectedRow.cells[3].innerHTML;
}

function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.fullName
    selectedRow.cells[1].innerHTML = formData.empCode
    selectedRow.cells[2].innerHTML = formData.salary
    selectedRow.cells[3].innerHTML = formData.city
}

function deleteEmployee(id){
  for(let i=0; i< employees.length; i+=1){
    const employee = employees[i]
    if(employee.id === id){
      employees.splice(i, 1)
      return
    }
  }
}

function onDelete(td) {
  if(confirm('are you sure')){
    const row = td.parentElement.parentElement
    const id = parseInt(row.getAttribute('id'), 10)
    deleteEmployee(id)
    row.remove();
    localStorage.setItem('employees', JSON.stringify(employees))
  }
}

function validate() {
    let isValid = true;
    if(document.querySelector('#fullName').value===''){
        isValid = false;
        document.getElementById('fullNameValidationError').classList.remove('hide')
    }else {
        isValid = true;
        if(!document.querySelector('#fullNameValidationError').classList.contains('hide'))
           document.querySelector('#fullNameValidationError').classList.add('hide')
    }
    return isValid
}


