// Base class
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  greet() {
    return `Hi, I'm ${this.name} and I'm ${this.age} years old.`;
  }
}

// Subclass Student
class Student extends Person {
  constructor(name, age, grade) {
    super(name, age); // calling Person constructor
    this.grade = grade;
  }

  greet() {
    return `${super.greet()} I'm a student in grade ${this.grade}.`;
  }

  study() {
    return `${this.name} is studying.`;
  }
}

// Subclass Teacher
class Teacher extends Person {
  constructor(name, age, subject) {
    super(name, age);
    this.subject = subject;
  }

  greet() {
    return `${super.greet()} I teach ${this.subject}.`;
  }

  teach() {
    return `${this.name} is teaching ${this.subject}.`;
  }
}

// Demonstration
const person = new Person("Alex", 30);
const student = new Student("Emily", 20, "12th");
const teacher = new Teacher("Mr. Smith", 45, "Mathematics");

let output = "";

output += person.greet() + "\n";
output += student.greet() + "\n";
output += student.study() + "\n";
output += teacher.greet() + "\n";
output += teacher.teach() + "\n";

// instanceof checks
output += "\ninstanceof checks:\n";
output += `student instanceof Person: ${student instanceof Person}\n`;
output += `teacher instanceof Student: ${teacher instanceof Student}\n`;

document.getElementById("result").textContent = output;
