const root  = document.getElementById('root')
const URL = 'https://northwind.vercel.app/api/suppliers'
const compNameInput = document.querySelector('.company-name')
const contNameInput = document.querySelector('.contact-name')
const contTitleInput = document.querySelector('.contact-title')
const submitButton = document.querySelector('.submit')

const data = {}

compNameInput.addEventListener('input', (event)=>{
    data.companyName = event.target.value
})

contNameInput.addEventListener('input', (event)=>{
    data.contactName  =  event.target.value
})

contTitleInput.addEventListener('input', (event)=>{
    data.contactTitle  =  event.target.value
})

submitButton.addEventListener('click', ()=>{
    createPost(URL, data)
})

const getTable = async (URL, mountPoint) =>{

    const response  = await fetch(URL)
    const data = await response.json()
    const table = document.createElement('table')
    
    data.forEach(element => {
        const tr = document.createElement('tr')
        tr.setAttribute('key', element.id)
        const tdCompName = document.createElement('td')
        tdCompName.innerHTML = element.companyName
        const tdContName = document.createElement('td')
        tdContName.innerHTML = element.contactName
        const tdContTitle = document.createElement('td')
        tdContTitle.innerHTML = element.contactTitle
        const removeButton = document.createElement('button')
        removeButton.textContent = "remove"
        tr.append(tdCompName)
        tr.append(tdContName)
        tr.append(tdContTitle)
        tr.append(removeButton)
        table.appendChild(tr)
    });

    mountPoint.append(table)
}



const createPost = async (URL, data)=>{
   await fetch(URL, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify(data)
    })
    document.querySelector('table').innerHTML = ''
    getTable(URL, root)
}


const editPost = async (URL, data, id)=>{
    await fetch(`${URL}/${id}`, {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "PUT",
          body: JSON.stringify(data)
    })

    document.querySelector('table').innerHTML = ''
    getTable(URL, root)
}





const edit = async()=>{
   await getTable(URL, root)
    document.querySelectorAll('tr')
.forEach(tr=> {
    tr.addEventListener('click', (event)=>{
       compNameInput.value = tr.querySelectorAll('td')[0].textContent
       contNameInput.value = tr.querySelectorAll('td')[1].textContent
       contTitleInput.value = tr.querySelectorAll('td')[2].textContent

       console.log(event.target.key)
       submitButton.addEventListener('click', ()=>{
        editPost(URL, {companyName: compNameInput, contNameInput: contNameInput.value, contactTitle: contTitleInput.value}, event.target.key)
       })
            
    })
})
}

edit()

getTable(URL, root)