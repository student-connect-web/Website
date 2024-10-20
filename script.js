document.addEventListener('DOMContentLoaded', () => {
    showSection('home');
    setupMenuToggle();
});

function setupMenuToggle() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });
}

function showSection(id) {
    document.querySelectorAll('main').forEach((section) => {
        section.style.display = 'none';
    });
    document.getElementById(id).style.display = 'block';
}

function startVideoCall(roomName) {
    const domain = "meet.jit.si";
    const options = {
        roomName: roomName,
        parentNode: document.querySelector('#jitsi-container'),
        width: '100%',
        height: '100%'
    };
    const api = new JitsiMeetExternalAPI(domain, options);
}

function postQuestion() {
    const question = document.getElementById('random-question').value;
    if (question.trim() !== "") {
        const announcementsList = document.getElementById('announcements-list');
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question';
        questionDiv.innerText = question;
        questionDiv.onclick = () => joinMeeting(question);
        announcementsList.insertBefore(questionDiv, announcementsList.firstChild);
        document.getElementById('random-question').value = "";
        showSection('announcements');
    } else {
        alert("Please enter a question.");
    }
}

function joinMeeting(question) {
    const answer = prompt("You are joining the meeting for: \"" + question + "\". Please write a bit about your knowledge on this topic:");
    if (answer && answer.trim() !== "") {
        alert("Thank you! Your response has been sent to the user.");
        showSection('video-call');
        startVideoCall(question.replace(/\s+/g, ''));
    } else {
        alert("Please provide some information about your knowledge.");
    }
}

function generateInviteMeeting() {
    const emails = document.getElementById('invite-email').value;
    if (emails.trim() !== "") {
        alert(`Meeting invite sent to: ${emails}`);
        showSection('video-call');
        startVideoCall("InviteMeeting" + Date.now());
    } else {
        alert("Please enter email addresses.");
    }
}