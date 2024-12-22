const courses = [
    { id: 1, name: "Spanish for Beginners" },
    { id: 2, name: "Advanced French" },
    { id: 3, name: "Conversational Japanese" },
    { id: 4, name: "Basic German" },
];


const quizQuestions = [
    { question: "How do you say 'Hello' in Spanish?", answer: "Hola" },
    { question: "What is 'Thank you' in French?", answer: "Merci" },
    { question: "What is 'Goodbye' in Japanese?", answer: "Sayonara" },
];

let currentQuizIndex = 0;


const courseList = document.getElementById("course-list");
const courseDropdown = document.getElementById("course");
const registrationForm = document.getElementById("registration-form");
const messageDiv = document.getElementById("message");
const quizSection = document.getElementById("quiz-section");
const questionParagraph = document.getElementById("question");
const answerInput = document.getElementById("answer");
const startQuizButton = document.getElementById("start-quiz");
const submitAnswerButton = document.getElementById("submit-answer");


courses.forEach(course => {
   
    const li = document.createElement("li");
    li.textContent = course.name;
    courseList.appendChild(li);

   
    const option = document.createElement("option");
    option.value = course.id;
    option.textContent = course.name;
    courseDropdown.appendChild(option);
});


registrationForm.addEventListener("submit", (e) => {
    e.preventDefault(); 

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const courseId = document.getElementById("course").value;

    if (!name  !email  !courseId) {
        showMessage("Please fill out all the fields correctly!", "error");
        return;
    }


    const selectedCourse = courses.find(course => course.id == courseId).name;
    showMessage(Registration successful! Welcome, ${name}. You've enrolled in ${selectedCourse}., "success");

    registrationForm.reset(); 
});


function showMessage(message, type) {
    messageDiv.textContent = message;
    messageDiv.className = message ${type};
    messageDiv.style.display = "block";

    
    setTimeout(() => {
        messageDiv.style.display = "none";
    }, 3000);
}


startQuizButton.addEventListener("click", () => {
    currentQuizIndex = 0; 
    quizSection.style.display = "block"; 
    loadQuizQuestion(); 
});

submitAnswerButton.addEventListener("click", () => {
    const userAnswer = answerInput.value.trim();

    if (!userAnswer) {
        showMessage("Please enter an answer!", "error");
        return;
    }

   
    const correctAnswer = quizQuestions[currentQuizIndex].answer.toLowerCase();
    if (userAnswer.toLowerCase() === correctAnswer) {
        showMessage("Correct answer!", "success");
    } else {
        showMessage(Wrong answer! The correct answer is "${correctAnswer}"., "error");
    }

    
    answerInput.value = "";
    currentQuizIndex++;

    if (currentQuizIndex < quizQuestions.length) {
        loadQuizQuestion(); 
    } else {
        showMessage("Quiz completed! Great job!", "success");
        quizSection.style.display = "none"; 
});


function loadQuizQuestion() {
    questionParagraph.textContent = quizQuestions[currentQuizIndex].question;
}
