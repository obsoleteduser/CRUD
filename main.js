const root = document.getElementById('root')
const URL = 'https://northwind.vercel.app/api/suppliers'
const compNameInput = document.querySelector('.company-name')
const contNameInput = document.querySelector('.contact-name')
const contTitleInput = document.querySelector('.contact-title')
const submitButton = document.querySelector('.submit')
const table = document.querySelector('table')

const data = {
    companyName: compNameInput.value,
    contactName: contNameInput.value,
    contactTitle: contTitleInput.value
}

window.addEventListener('load', () => {
    getTable(URL, root)
})

compNameInput.addEventListener('input', (event) => {
    data.companyName = event.target.value
})

contNameInput.addEventListener('input', (event) => {
    data.contactName = event.target.value
})

contTitleInput.addEventListener('input', (event) => {
    data.contactTitle = event.target.value
})

submitButton.addEventListener('click', () => {
    createPost(URL, data)
})

const getTable = async (URL, mountPoint) => {

    const response = await fetch(URL)
    const data = await response.json()

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
        removeButton.classList.add('remove')
        removeButton.textContent = "remove"
        tr.append(tdCompName)
        tr.append(tdContName)
        tr.append(tdContTitle)
        tr.append(removeButton)
        table.appendChild(tr)



        removeButton.addEventListener('click', async (event) => {
            event.stopImmediatePropagation()
            event.stopPropagation()
            document.querySelector('table').innerHTML = ''
            let id = event.target.parentNode.getAttribute('key')
            await deletePOST(URL, id)

        })





        tr.addEventListener('click', (event) => {
            event.stopPropagation()
                event.stopImmediatePropagation()
            compNameInput.value = tr.querySelectorAll('td')[0].textContent
                contNameInput.value = tr.querySelectorAll('td')[1].textContent
                contTitleInput.value = tr.querySelectorAll('td')[2].textContent 
            submitButton.removeEventListener('click', () => { createPost(URL, data) })
            submitButton.textContent = "Edit"
            submitButton.addEventListener('click', (event) => {
                event.stopPropagation()
                event.stopImmediatePropagation()
                
                editPost(URL, {
                    id: key,
                    companyName: compNameInput.value,
                    contactName: contNameInput.value,
                    contactTitle: contTitleInput.value
                }, +key)
            })


            console.log(tr)
            let key = tr.getAttribute('key')


        })





    });

    mountPoint.append(table)
}



const createPost = async (URL, data) => {
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


const editPost = async (URL, data, id) => {
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




const deletePOST = async (URL, id) => {
    await fetch(`${URL}/${id}`, {
        method: 'DELETE'
    })
    document.querySelector('table').innerHTML = ''
    getTable(URL, root)
}













