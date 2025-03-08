const employeesList = document.querySelector(".list ul");
const viewDiv = document.querySelector(".view");
let selectedEmployee = {};

// Get full employees
const getEmployees = async () => {
  const res = await fetch("http://localhost:3500/employees", {
    method: "GET",
  });
  const data = await res.json();

  return data;
};

// Get one Employee by ID
const getOneEmployee = async (id) => {
  const res = await fetch(`http://localhost:3500/employees/${id}`, {
    method: "GET",
  });
  if (res.ok) {
    console.log("Get information.");
  } else {
    console.log("Something went wrong");
  }
  const data = await res.json();
  return data;
};

// Showing informations
const renderInformation = async (id) => {
  viewDiv.innerHTML = "";
  const information = await getOneEmployee(id);
  const { firstname, lastname, age, isMarried } = information;
  const viewItem = document.createElement("div");
  viewItem.innerHTML = `
    <dl>
      <dt>First name:</dt><dd>${firstname}</dd><br>
      <dt>Last name:</dt><dd>${lastname}</dd><br>
      <dt>Age:</dt><dd>${age}</dd><br>
      <dt>Married: </dt><dd>${isMarried ? "YES" : "NO"}</dd>
    </dl>
  `;
  viewDiv.appendChild(viewItem);
};

const deleteEmployee = async (id) => {
  const res = await fetch(`http://localhost:3500/employees/${id}`, {
    method: "DELETE",
  });
  if (res.ok) {
    alert("Employee Deleted");
  } else {
    alert("Something went wrong");
  }
  render();
};

const searchEmployee = async (e) => {
  e.preventDefault();
  const searchInput = document.querySelector("#search-input");
  const firstname = searchInput.value;
  console.log(firstname);
  const res = await fetch(
    `http://localhost:3500/employees/search?firstname=${firstname}`,
    {
      method: "GET",
    }
  );
  const data = await res.json();
  data.forEach((info) => {
    renderInformation(info.id);
  });
};
const searchForm = document.querySelector("#search-btn");
searchForm.addEventListener("click", searchEmployee);

const editEmployee = async (ids) => {
  selectedEmployee = await getOneEmployee(ids);
  const { id, firstname, lastname, age, isMarried } = selectedEmployee;
  const editfirstname = document.querySelector("#edit-firstname");
  const editlastname = document.querySelector("#edit-lastname");
  const editage = document.querySelector("#edit-age");
  const editmarried = document.querySelector("#edit-married");

  editfirstname.value = firstname;
  editlastname.value = lastname;
  editage.value = age;
  editmarried.checked = isMarried ? "checked" : "";
};

const editingEmployee = async (e) => {
  e.preventDefault();
  const editForm = document.querySelector("#form-edit");
  const editfirstname = document.querySelector("#edit-firstname");
  const editlastname = document.querySelector("#edit-lastname");
  const editage = document.querySelector("#edit-age");
  const editmarried = document.querySelector("#edit-married");

  const firstname = editfirstname.value;
  const lastname = editlastname.value;
  const age = editage.value;
  const isMarried = editmarried.checked;

  const res = await fetch(
    `http://localhost:3500/employees/${selectedEmployee.id}`,
    {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ firstname, lastname, age, isMarried }),
    }
  );
  editForm.reset();
  render();
};
const editForm = document.querySelector("#form-edit");
editForm.addEventListener("submit", editingEmployee);

const addEmployee = async (info) => {
  const { firstname, lastname, age, isMarried } = info;
  const res = await fetch("http://localhost:3500/employees", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({ firstname, lastname, age, isMarried }),
  });
  render();
};

const addingEmployee = (e) => {
  e.preventDefault();
  const target = e.target;
  const firstname = document.querySelector("#add-firstname");
  const lastname = document.querySelector("#add-lastname");
  const age = document.querySelector("#add-age");
  const married = document.querySelector("#add-married");
  const newEmployee = {
    firstname: firstname.value,
    lastname: lastname.value,
    age: age.value,
    isMarried: married.checked,
  };
  addEmployee(newEmployee);
};
const addForm = document.querySelector("#form-add");
addForm.addEventListener("submit", addingEmployee);

const render = async () => {
  const allEmployees = await getEmployees();
  employeesList.innerHTML = "";

  allEmployees.forEach((employee) => {
    const { id, firstname, lastname, age, isMarried } = employee;
    const li = document.createElement("li");
    const fullName = document.createElement("p");
    const viewBtn = document.createElement("button");
    const deleteBtn = document.createElement("button");
    const editBtn = document.createElement("button");

    fullName.textContent = firstname + lastname;
    viewBtn.textContent = "VIEW";
    deleteBtn.textContent = "DELETE";
    editBtn.textContent = "EDIT";

    viewBtn.addEventListener("click", async () => renderInformation(id));

    deleteBtn.addEventListener("click", async () => deleteEmployee(id));

    editBtn.addEventListener("click", async () => editEmployee(id));

    li.appendChild(fullName);
    li.appendChild(viewBtn);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);
    employeesList.appendChild(li);
  });
};

render();
