const baseURL = "http://localhost:8000";

/* ---------------- USER FUNCTIONS ---------------- */

// Create User
async function createUser() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const age = document.getElementById("age").value;

  await fetch(`${baseURL}/api/users`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, email, age })
  });

  alert("User Created!");

  // Refresh UI
  loadUsers();
  populateUserDropdown();

  document.getElementById("name").value = "";
document.getElementById("email").value = "";
document.getElementById("age").value = "";
}


// Load Users
async function loadUsers() {
  const res = await fetch(`${baseURL}/api/users`);
  const users = await res.json();

  const container = document.getElementById("usersList");
  container.innerHTML = "";

  users.forEach(user => {
    const div = document.createElement("div");
    div.className = "item";

    div.innerHTML = `
      <div>
        <strong>${user.name}</strong><br>
        ${user.email}<br>
        Age: ${user.age}<br>
        ID: ${user.id}
      </div>

      <div class="actions">
        <button onclick="deleteUser('${user.id}')">Delete</button>
      </div>
    `;

    container.appendChild(div);
  });
}


// Delete User
async function deleteUser(id) {
  await fetch(`${baseURL}/api/users/${id}`, {
    method: "DELETE"
  });

  alert("User Deleted");
  loadUsers();
}



/* ---------------- APPLICATION FUNCTIONS ---------------- */


// Create Application
async function createApplication() {
  const userId = document.getElementById("userSelect").value;
  const company = document.getElementById("company").value;
  const role = document.getElementById("role").value;

  await fetch(`${baseURL}/api/applications`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ userId, company, role })
  });

  alert("Application Created!");

  // Refresh applications
  loadApplications();
}

// Load Applications
async function loadApplications() {
  const res = await fetch(`${baseURL}/api/applications`);
  const applications = await res.json();

  const container = document.getElementById("applicationsList");
  container.innerHTML = "";

  applications.forEach(app => {
    const div = document.createElement("div");
    div.className = "item";

    div.innerHTML = `
      <div>
        <strong>${app.company}</strong><br>
        Role: ${app.role}<br>
        UserID: ${app.userId}
      </div>

      <div class="actions">
        <button onclick="deleteApplication('${app.id}')">Delete</button>
      </div>
    `;

    container.appendChild(div);
  });
}



// Delete Application
async function deleteApplication(id) {
  await fetch(`${baseURL}/api/applications/${id}`, {
    method: "DELETE"
  });

  alert("Application Deleted");
  loadApplications();
}

async function populateUserDropdown() {
  const res = await fetch(`${baseURL}/api/users`);
  const users = await res.json();

  const select = document.getElementById("userSelect");
  select.innerHTML = "";

  users.forEach(user => {
    const option = document.createElement("option");
    option.value = user.id;
    option.textContent = `${user.name} (${user.email})`;
    select.appendChild(option);
  });
}
window.onload = () => {
  populateUserDropdown();
};