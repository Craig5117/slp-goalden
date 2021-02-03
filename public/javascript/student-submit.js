async function studentSubmitHandler(event) {
  event.preventDefault();
  // const username =
  const elements = document.getElementById("stud-submit").elements;
  console.log(elements);
  const userId = document
    .getElementById("stud-submit")
    .getAttribute("data-userID");
  let postArr = [];
  
  function getStudentPostArr() {
    for (let i = 0; i < elements.last_name.length; ++i) {
      let studentNameObj = {
        last_name: elements.last_name[i].value,
        first_name: elements.first_name[i].value,
        user_id: parseInt(userId),
      };
      if (elements.last_name[i].value) {
        postArr.push(studentNameObj);
      }
    }
  }
 async function multiPost(postArr) {
      for (let i = 0; i < postArr.length; ++i) {
          let payload = postArr[i];
          console.log(JSON.stringify(payload));
        const response = await fetch(`/api/students`, {
                method: "POST",
                body: JSON.stringify({
                  last_name: payload.last_name,
                  first_name: payload.first_name,
                  user_id: payload.user_id
                }),
                headers: {
                  "Content-Type": "application/json",
                },
              });
              if (response.ok) {
               console.log("Ok");
              } else {
                alert(response.statusText);
              }
      }
      await document.location.replace('/students');
  }
  await getStudentPostArr();
  await multiPost(postArr);
  
  
}

document
  .querySelector("#stud-submit")
  .addEventListener("submit", studentSubmitHandler);
