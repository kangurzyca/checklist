const checklistDiv = document.getElementById("checklist");
const statusBar = document.getElementById("completion");

const questions = [
    "Are there MAMALS detected?",
    "Are there Sitting Returns detected?",
    "Are there Casual Issues detected?",
    "Are there Securities detected?",
    "Are there PONG communications detected?",
    "Is opening verified?",
    "Is entry idea change required?",
    "Is sort code covered by ProjectName?",
    "Is sort code covered by PorjectName?",
    "Have you added opening comment?",
    "Have you added ABC waivers screenshots?",
    "Has the products tab been updated?",
];

let completion = 0;

questions.forEach((question, index) => {
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question-container");
    questionDiv.innerHTML = `
        <p>${question}</p>
        <div class="answersContainer">
        <input type="radio" id="question${index}yes" name="question${index}" value="yes"><label for="question${index}yes">yes</label>
        <input type="radio" id="question${index}no" name="question${index}" value="no"><label for="question${index}no">no</label>
        <input type="radio" id="question${index}n/a" name="question${index}" value="n/a"><label for="question${index}n/a">n/a</label>
        <div>
      `;
    checklistDiv.appendChild(questionDiv);
});

document.addEventListener("change", updateStatusBar);

// document.querySelectorAll('input[type="radio"]').forEach(el=>{

//     el.addEventListener("dblclick", (event)=>{
//         event.target.checked = false
//         updateStatusBar()
//     })

// })

function updateStatusBar() {
    const answeredQuestions = document.querySelectorAll(
        'input[type="radio"]:checked'
    ).length;
    completion = (answeredQuestions / questions.length) * 100;
    statusBar.textContent = `${completion.toFixed(0)}%`;
    document.getElementById(
        "status-bar-background"
    ).style.background = `linear-gradient(90deg, #d4ffd6 ${completion.toFixed(
        0
    )}%, hsla(0, 0%, 100%, 1) ${completion.toFixed(0)}%)`;
}

function generatePDF() {
    // Define options for html2pdf
    const options = {
        margin: 10,
        filename: `${getCurrentDate()}ChecklistExecutionHR.pdf`,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    };

    // Use html2pdf to generate PDF
    html2pdf(checklistDiv, options);
}

function getCurrentDate() {
    const currentDate = new Date();

    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
}
