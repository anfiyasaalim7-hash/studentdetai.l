// 1. Unga Firebase Configuration (Identity Card)
const firebaseConfig = {
  apiKey: "AIzaSyDTj0YPBuGawzSa_rv4urkuD49HHRD3XNE",
  authDomain: "student-c9edf.firebaseapp.com",
  projectId: "student-c9edf",
  storageBucket: "student-c9edf.firebasestorage.app",
  messagingSenderId: "608489904489",
  appId: "1:608489904489:web:aa9f0f607e3ded1fb685f8",
  measurementId: "G-RPH4MYEF8N"
};

// 2. Firebase-ah start pannunga
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

const studentForm = document.getElementById('studentForm');
const tableBody = document.getElementById('tableBody');

// 3. Cloud-la irundhu data-ah real-time-ah fetch panna
database.ref('students').on('value', (snapshot) => {
    const data = snapshot.val();
    tableBody.innerHTML = ""; // Refresh table
    
    if(data) {
        for (let id in data) {
            let s = data[id];
            const row = `
                <tr>
                    <td>${s.rollno}</td>
                    <td>${s.name}</td>
                    <td>${s.email}</td>
                    <td>${s.phone}</td>
                    <td><button class="delete-btn" onclick="deleteData('${id}')">Delete</button></td>
                </tr>
            `;
            tableBody.innerHTML += row;
        }
    }
});

// 4. Form Submit - Cloud-kku data anupa
studentForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const studentData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        rollno: document.getElementById('rollno').value
    };

    // Firebase-la 'students' nu oru list kulla idhai save pannum
    database.ref('students').push(studentData);
    
    studentForm.reset(); // Clear form
});

// 5. Delete Function
function deleteData(id) {
    if(confirm("Are you sure you want to delete this record?")) {
        database.ref('students/' + id).remove();
    }
}