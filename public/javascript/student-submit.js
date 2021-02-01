const elements = document.getElementById("stud-submit").elements;

document.querySelector("#stud-submit").addEventListener("submit", function(event) {
    event.preventDefault();
    let postArr= [];
    for (let i = 0; i < elements.last_name.length; ++i) {
        let studentNameObj = { last_name: elements.last_name[i].value, first_name: elements.first_name[i].value, user_id: 2 };
        postArr.push(studentNameObj);
        console.log(postArr);
    }
})

