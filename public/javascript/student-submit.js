async function studentSubmitHandler(event) {
  event.preventDefault();
  // const username =
  const elements = document.getElementById("stud-submit").elements;
  const userId = document
    .getElementById("stud-submit")
    .getAttribute("data-userID");
  let postArr = [];
  function getStudentPostArr() {
    for (let i = 0; i < elements.last_name.length; ++i) {
      let studentNameObj = {
        last_name: elements.last_name[i].value,
        first_name: elements.first_name[i].value,
        user_id: userId,
      };
      if (elements.last_name[i].value) {
        postArr.push(studentNameObj);
      }
    }
  }
  await getStudentPostArr();
  await console.log(postArr);
//   const response = await fetch(`/api/students`, {
//     method: "POST",
//     body: JSON.stringify({
//       postArr,
//     }),
//     headers: {
//       "Content-Type": "application/json",
//     },
//   });
//   if (response.ok) {
//     document.location.replace(`/students`);
//   } else {
//     alert(response.statusText);
//   }
}

document
  .querySelector("#stud-submit")
  .addEventListener("submit", studentSubmitHandler);
