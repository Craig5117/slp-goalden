document.addEventListener("DOMContentLoaded", function () {
  const elems = document.querySelectorAll(".datepicker");
  const instances = M.Datepicker.init(elems);
});

async function trialSubmitHandler(event) {
  // this action needs to be authorized by correct user only
  event.preventDefault();
  const studentGoalId = window.location.toString().split("/")[
    window.location.toString().split("/").length - 1
  ];
  const trialDate = document.querySelector("#date-input").value.trim();
  const trialsAttempted = document
    .querySelector("#trials-attempted")
    .value.trim();
  const trialsSucceeded = document
    .querySelector("#trials-successful")
    .value.trim();
  // this needs a fetch Get to studentGoal.
  // If studentGoal.user_id = req.sessions.user_id,
  // const studentId = studentGoal.student_id (for the link back to single student)
  if (trialsSucceeded > trialsAttempted) {
    return alert(
      "The trials successful trials should not be greater than attempted. Double check that you have entered the correct number in each field."
    );
  } else {
    if (trialDate && trialsAttempted && trialsSucceeded) {
      const scoreRatio = `${trialsSucceeded}/${trialsAttempted}`;
      const scorePercent =
        ((trialsSucceeded / trialsAttempted) * 100).toFixed(2) + "%";
      console.log(trialDate, scoreRatio, scorePercent, studentGoalId);
      //       const response = await fetch(`/api/trials`, {
      //         method: "POST",
      //         body: JSON.stringify({
      //           date: trialDate,
      //           successful: scoreRatio,
      //           percent: scorePercent,
      //           student_goal_id: studentGoalId,
      //         }),
      //         headers: {
      //           "Content-Type": "application/json",
      //         },
      //       });
      //       if (response.ok) {
      //         document.location.replace(`/student${studentId}`);
      //       } else {
      //         alert(response.statusText);
      //       }
    }
  }
}

document
  .querySelector("#trial-form")
  .addEventListener("submit", trialSubmitHandler);
