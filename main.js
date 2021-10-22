// ************************** fatch note from local storage **************************

function fetchNotes() {
    let Notes = localStorage.getItem("Notes");
    if (Notes == null) {
        NoteObj = [];
    } else {
        NoteObj = JSON.parse(Notes);
    }
    return NoteObj;
}

// ************************** Add note in screen & local storage **************************

function addNotes() {

    document.querySelector('#sectionTitle').innerHTML = 'Add new Note';
    let Title = document.getElementById("Title");
    let Content = document.getElementById("Content");

    if (Title.value === '' || Content.value === '') {
        showAlert(1);
    } else {
        // create one object to add local storage
        let newNote = {
            title: Title.value,
            content: Content.value
        }

        // fetch notes from local storage
        NoteObj = fetchNotes();

        // add our new note in local storage
        NoteObj.push(newNote);
        localStorage.setItem("Notes", JSON.stringify(NoteObj));
        Title.value = '';
        Content.value = '';

        // to calling function to display Notes
        displayNotes();

        // to hide input section
        removeNoteSection();

        // show success Alert
        showAlert(3);

    }

}

// ************************** function delete a notes **************************

function deleteNote(index) {

    // fetch notes from local storage
    NoteObj = fetchNotes();

    // delete note
    NoteObj.splice(index, 1);
    localStorage.setItem("Notes", JSON.stringify(NoteObj));

    // to calling function to display Notes
    displayNotes();

    // show delete Alert
    showAlert(2);
}


// ************************** edit notes **************************

function editNotes(id) {

    addNoteSection();
    document.querySelector('#saveBtn').style = "display:none;";
    document.querySelector('#closeBtn').style = "display:none;";
    document.querySelector('#updateBtn').style = "display:block;";
    document.querySelector('#sectionTitle').innerHTML = 'Update your Note';

    let Title = document.getElementById("Title");
    let Content = document.getElementById("Content");

    if (Title.value !== '' || Content.value !== '') {
        Title.value = '';
        Content.value = '';
    }

    // fetch notes from local storage
    NoteObj = fetchNotes();

    // Set title & content in InputBox
    Title.value = NoteObj[id].title;
    Content.value = NoteObj[id].content;

    // To Store ID in local storage
    localStorage.setItem('ID', id);

    displayNotes();

}

// ************************** update note **************************

function updateNotes() {
    // fetch saved ID from local storage
    let id = localStorage.getItem('ID');

    // ID= id, note deleted
    NoteObj.splice(id, 1);
    localStorage.setItem("Notes", JSON.stringify(NoteObj));

    let Title = document.getElementById("Title");
    let Content = document.getElementById("Content");

    // create one object to add local storage
    let newNote = {
        title: Title.value,
        content: Content.value
    }

    // fetch notes from local storage
    NoteObj = fetchNotes();

    // add our new note in local storage
    NoteObj.push(newNote);
    localStorage.setItem("Notes", JSON.stringify(NoteObj));

    Title.value = '';
    Content.value = '';

    // to calling function to display Notes
    displayNotes();

    // to hide input section
    removeNoteSection();

    // show success Alert
    showAlert(4);

}

// ************************** display elements from local storage to screen **************************

function displayNotes() {

    // fetch notes from local storage
    NoteObj = fetchNotes();

    let defaultHtml = `
                    <h5 class="m-2"><i class="bi bi-journal-text mr-2"></i>You don't have any Note</h5>
                    <h6 class="m-2">Please, Add Note...</h6>
                        `;
    let noteHtml = "";

    // itarate Note of Notes
    NoteObj.forEach(function (element, index) {

        noteHtml += `
                <div class="card-body card m-3 shadow-sm bg-white rounded">
                    <h5>${element.title}</h5>
                    <p class="mb-0">${element.content}</p>
                    <hr>
                    <div class="btn-container d-flex flex-row-reverse">
                        <button id="${index}" onclick="deleteNote(this.id)" class="btn-sm btn-danger ml-3"><i
                        class="bi bi-trash"></i></button>
                        <button id="${index}" onclick="editNotes(this.id)" class="btn-sm btn-primary"><i
                        class="bi bi-pencil-fill"></i></button>
                    </div>
                </div>
                `;

    });

    // adding in to dislay box
    let notesElement = document.querySelector("#notes");
    // console.log(NoteObj.length)
    if (NoteObj.length == 0) {
        notesElement.innerHTML = defaultHtml;
    } else {
        notesElement.innerHTML = noteHtml;
    }

}

// ************************** reloded event to show all notes **************************

document.addEventListener('DOMContentLoaded', displayNotes())

// ************************** Alert function **************************

function showAlert(count) {

    switch (count) {
        case 1:
            document.getElementById('alertFill').style = "display:block;";
            setTimeout(() => document.getElementById('alertFill').style = "display:none;", 2000);
            break;
        case 2:
            document.getElementById('alertDelete').style = "display:block;";
            setTimeout(() => document.getElementById('alertDelete').style = "display:none;", 2000);
            break;
        case 3:
            document.getElementById('alertSuccess').style = "display:block;";
            setTimeout(() => document.getElementById('alertSuccess').style = "display:none;", 2000);
            break;
        case 4:
            document.getElementById('alertprimary').style = "display:block;";
            setTimeout(() => document.getElementById('alertprimary').style = "display:none;", 2000);
            break;
    }

}


// ************************** function for Hide & show section **************************

function addNoteSection() {
    document.querySelector('#first-container').style = "display:block;";
    document.querySelector('#addNoteBtn').style = "display:none;";
    document.querySelector('#saveBtn').style = "display:block;";
    document.querySelector('#closeBtn').style = "display:block;";
    document.querySelector('#updateBtn').style = "display:none;";
}

function removeNoteSection() {
    document.querySelector('#first-container').style = "display:none;";
    document.querySelector('#addNoteBtn').style = "display:block;";
    document.getElementById("Title").value = '';
    document.getElementById("Content").value = '';
}
