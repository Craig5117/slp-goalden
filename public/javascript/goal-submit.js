async function goalSubmitHandler(event) {
    // this action needs to be authorized by correct user only
    event.preventDefault();
 
  const goalName = document.querySelector('#goal-name').value.trim();
  const goalDesc = document.querySelector('#goal-desc').value.trim();

    // this needs a fetch Get to studentGoal.
    // If studentGoal.user_id = req.sessions.user_id,
    // const studentId = studentGoal.student_id (for the link back to single student)
    if (goalName && goalDesc) {
        
        //       const response = await fetch(`/api/goals`, {
        //         method: "POST",
        //         body: JSON.stringify({
        //           name: goalName,
        //           description: goalDesc,
        //         }),
        //         headers: {
        //           "Content-Type": "application/json",
        //         },
        //       });
        //  !!!!!!!!!!! Redo this logic
        //       if (response.ok) {
        //         document.location.replace(`/student${studentId}`);
        //       } else {
        //         alert(response.statusText);
        //       }
      }
    
  }
  
  document
    .querySelector("#goal-form")
    .addEventListener("submit", goalSubmitHandler);
  