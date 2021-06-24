const url = 'http://localhost:5000/api/people';
const tbody = document.querySelector('.tbody');
const closeBtn = document.querySelector('.close-btn');
const addBtn = document.getElementById('addBtn');
const editBtn = document.getElementById('editBtn');
const searchBtn = document.getElementById('searchBtn');
const createBtn = document.getElementById('createBtn');
const searchInput = document.getElementById('searchInput');
const popap = document.getElementById('popap');
const nameValue = document.getElementById('nameValue');
const lastNameValue = document.getElementById('lastNameValue');
const inputPhone = document.getElementById('inputPhone');
const inputEmail = document.getElementById('inputEmail');
const inputCompany = document.getElementById('inputCompany');
const inputPosition = document.getElementById('inputPosition');
const inputAge = document.getElementById('inputAge');
const inputGender = document.getElementById('inputGender');
const inputMarried = document.getElementById('inputMarried');
const inputCountry = document.getElementById('inputCountry');
const inputTown = document.getElementById('inputTown');
const popupInput = document.querySelectorAll('.popap-input');
let curentData;


let output = '';
const renderMainTable = (data) => {
    curentData = data;
    data.forEach(people => {
        output += `                
            <tr data-id=${people._id}>
                <td id="inputName">${people.name}</td>
                <td id="inputLastName">${people.lastName}</td>
                <td id="inputPhone">${people.phone}</td>
                <td id="inputEmail">${people.email}</td>
                <td id="inputCompany">${people.company}</td>
                <td id="inputPosition">${people.position}</td>
                <td id="inputAge">${people.age}</td>
                <td id="inputGender">${people.gender}</td>
                <td id="inputMarried">${people.married}</td>
                <td id="inputCountry">${people.country}</td>
                <td id="inputTown">${people.town}</td>
                <td >${people._id}</td>
                <td><a class="main-btn" id="delete-people">Delete</a></td>
                <td><a class="main-btn" id="edit-people">Edit</a></td>
            </tr>
            `
    });
    tbody.innerHTML = output;
}


//Get people
//Method: GET
fetch(url)
    .then(res => res.json())
    .then(data => renderMainTable(data));

tbody.addEventListener('click', (e) => {
    e.preventDefault();
    let deleteBtnPress = e.target.id == 'delete-people';
    let editBtnPress = e.target.id == 'edit-people';
    let id = e.target.parentElement.parentElement.dataset.id;

    // DELETE
    if (deleteBtnPress) {
        fetch(`${url}/${id}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(() => location.reload())
    }

    // EDIT
    if (editBtnPress) {
        popap.style.display = 'block';
        addBtn.style.display = 'none';
        editBtn.style.display = 'block';
        const tr = e.target.parentElement.parentElement;
        const name = tr.querySelector('#inputName');
        const lastName = tr.querySelector('#inputLastName');
        const phone = tr.querySelector('#inputPhone');
        const email = tr.querySelector('#inputEmail');
        const company = tr.querySelector('#inputCompany');
        const position = tr.querySelector('#inputPosition');
        const age = tr.querySelector('#inputAge');
        const gender = tr.querySelector('#inputGender');
        const married = tr.querySelector('#inputMarried');
        const country = tr.querySelector('#inputCountry');
        const town = tr.querySelector('#inputTown');

        nameValue.value = name.innerHTML;
        lastNameValue.value = lastName.innerHTML;
        inputPhone.value = phone.innerHTML;
        inputEmail.value = email.innerHTML;
        inputCompany.value = company.innerHTML;
        inputPosition.value = position.innerHTML;
        inputAge.value = age.innerHTML;
        inputGender.value = gender.innerHTML;
        inputMarried.value = married.innerHTML;
        inputCountry.value = country.innerHTML;
        inputTown.value = town.innerHTML;
    }

    editBtn.addEventListener('click', () => {
        fetch(`${url}/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: nameValue.value,
                lastName: lastNameValue.value,
                phone: inputPhone.value,
                email: inputEmail.value,
                company: inputCompany.value,
                position: inputPosition.value,
                age: inputAge.value,
                gender: inputGender.value,
                married: inputMarried.value,
                country: inputCountry.value,
                town: inputTown.value
            })
        })
            .then(res => res.json())
            .then(() => location.reload())
    })

})

//Create people
//Method: POST
addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: nameValue.value,
            lastName: lastNameValue.value,
            phone: inputPhone.value,
            email: inputEmail.value,
            company: inputCompany.value,
            position: inputPosition.value,
            age: inputAge.value,
            gender: inputGender.value,
            married: inputMarried.value,
            country: inputCountry.value,
            town: inputTown.value
        })
    })
        .then(res => res.json())
        .then(data => {

            const dataArr = [];
            dataArr.push(data);
            renderMainTable(dataArr);
        });

    popap.style.display = 'none';
})

//search
searchBtn.addEventListener('click', () => {
    let seachResult = [];
    curentData.forEach((people) => {
        if (searchInput.value.toLowerCase() === people.name.toLowerCase()) {
            seachResult.push(people)
        }
    })
    if (seachResult.length > 0) {
        output = ''
        renderMainTable(seachResult)
    } else {
        searchInput.value = 'No match'
    }
})

//close popap
closeBtn.addEventListener('click', () => {
    popap.style.display = 'none';
})

//open popap
createBtn.addEventListener('click', () => {
    addBtn.style.display = 'block';
    editBtn.style.display = 'none';
    popap.style.display = 'block';
    popupInput.forEach((item) => {
        item.value = '';
    })
})