const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
]

function createCourse(course) {
    const completedClass = course.completed ? 'completed' : 'not-completed';
    const checkmark = course.completed ? '✓' : '';
    return `
        <div class="course ${completedClass}" onclick="showCourseDetails('${course.subject}', ${course.number})">
            <h3>${course.subject} ${course.number} ${checkmark}</h3>
        </div>`;
}

function displayCourses(courses) {
    const container = document.getElementById('courses-array');
    const totalCred = document.getElementById('total-credits');
    container.innerHTML = courses.map(createCourse).join('');
    const totalCredits = courses.reduce((sum, course) => sum + course.credits, 0);
    totalCred.textContent = `The total credits for courses listed above is ${totalCredits}`;
}
displayCourses(courses);

function filterCoursesBySubject(parameter) {
    let filtered;
    switch (parameter) {
        case 'cse':
            filtered = courses.filter(course => {
                const subject = course.subject.toLowerCase();
                return subject === 'cse';
            });
            break;
        case 'wdd':
            filtered = courses.filter(course => {
                const subject = course.subject.toLowerCase();
                return subject === 'wdd';
            });
            break;
        default:
            filtered = courses;
    }
    displayCourses(filtered);
}
function showCourseDetails(subject, number) {
    const course = courses.find(c => c.subject === subject && c.number === number);
    if (course) {
        const courseDetails = document.getElementById('course-details');
        courseDetails.innerHTML = `
            <button id="closeModal">❌</button>
            <h2>${course.subject} ${course.number}</h2>
            <h3>${course.title}</h3>
            <p><strong>Credits</strong>: ${course.credits}</p>
            <p><strong>Certificate</strong>: ${course.certificate}</p>
            <p>${course.description}</p>
            <p><strong>Technologies</strong>: ${course.technology.join(', ')}</p>
        `;
        courseDetails.showModal();

        // Event listener para cerrar el modal
        document.getElementById('closeModal').addEventListener('click', () => {
            courseDetails.close();
        });
    }
}

document.getElementById('all').addEventListener('click', () => filterCoursesBySubject('all'));
document.getElementById('cse').addEventListener('click', () => filterCoursesBySubject('cse'));
document.getElementById('wdd').addEventListener('click', () => filterCoursesBySubject('wdd'));

// Close modal when clicking outside of it
//document.getElementById('course-details').addEventListener('click', (e) => {
//    if (e.target === e.currentTarget) {
//        e.currentTarget.close();
//    }
//});