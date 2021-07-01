const url = 'http://localhost:5000/api/people';
const tbody = document.querySelector('.tbody');
const closeBtn = document.querySelector('.close-btn');
const addBtn = document.getElementById('addBtn');
const editBtn = document.getElementById('editBtn');
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

const renderTable = (data) => {
    let output = '';
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

const getRequest = () => {
    fetch(url)
        .then(res => res.json())
        .then(data => renderTable(data));
}

getRequest();

tbody.addEventListener('click', (e) => {
    e.preventDefault();
    let deleteBtnPress = e.target.id == 'delete-people';
    let editBtnPress = e.target.id == 'edit-people';
    let id = e.target.parentElement.parentElement.dataset.id;

    if (deleteBtnPress) {
        fetch(`${url}/${id}`, {
            method: 'DELETE'
        }).then(getRequest());
    }

    if (editBtnPress) {
        popap.style.display = 'block';
        addBtn.style.display = 'none';
        editBtn.style.display = 'block';
        const tr = e.target.parentElement.parentElement;

        nameValue.value = tr.querySelector('#inputName').textContent;
        lastNameValue.value = tr.querySelector('#inputName').textContent;
        inputPhone.value = tr.querySelector('#inputPhone').textContent;
        inputEmail.value = tr.querySelector('#inputEmail').textContent;
        inputCompany.value = tr.querySelector('#inputCompany').textContent;
        inputPosition.value = tr.querySelector('#inputPosition').textContent;
        inputAge.value = tr.querySelector('#inputAge').textContent;
        inputGender.value = tr.querySelector('#inputGender').textContent;
        inputMarried.value = tr.querySelector('#inputMarried').textContent;
        inputCountry.value = tr.querySelector('#inputCountry').textContent;
        inputTown.value = tr.querySelector('#inputTown').textContent;

        editBtn.addEventListener('click', () => {
            fetch(`${url}/${id}`, {
                method: 'PUT',
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
                .then(getRequest())
                .then(popap.style.display = 'none');
        })
    }
})

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
    }).then(getRequest())
        .then(popap.style.display = 'none');
})

searchInput.addEventListener('keyup', () => {
    if (searchInput.value.length === 0) {
        getRequest();
    } else {
        fetch(url)
            .then(res => res.json())
            .then((data) => { renderTable(data.filter(el => el.name.search(searchInput.value) != -1)) });
    }
})

closeBtn.addEventListener('click', () => {
    popap.style.display = 'none';
})

createBtn.addEventListener('click', () => {
    const popupInput = document.querySelectorAll('.popap-input');
    addBtn.style.display = 'block';
    editBtn.style.display = 'none';
    popap.style.display = 'block';
    popupInput.forEach((item) => {
        item.value = '';
    })
})