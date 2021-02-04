async function goalSubmitHandler(event) {
    // this action needs to be authorized by correct user only
    event.preventDefault();
 
  const goalName = document.querySelector('#goal-name').value.trim();
  const goalDesc = document.querySelector('#goal-desc').value.trim();
  const userId = document.querySelector('#username').getAttribute('data-userID');

    // this needs a fetch Get to studentGoal.
    // If studentGoal.user_id = req.sessions.user_id,
    // const studentId = studentGoal.student_id (for the link back to single student)
    // actually that can be done when it is rendered
    if (goalName && goalDesc) {
              console.log(goalName, goalDesc, userId)
              const response = await fetch(`/api/goals`, {
                method: "POST",
                body: JSON.stringify({
                  name: goalName,
                  description: goalDesc,
                  user_id: userId
                }),
                headers: {
                  "Content-Type": "application/json",
                },
              });
              if (response.ok) {
                document.location.replace(`/goals`);
              } else {
                alert(response.statusText);
              }
      }
    
  }
  
  document
    .querySelector("#goal-form")
    .addEventListener("submit", goalSubmitHandler);
  