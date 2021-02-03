document.querySelectorAll(".goal-btn").forEach((el) => {
  el.addEventListener("click", async function () {
    const studentId = window.location.toString().split("/")[
      window.location.toString().split("/").length - 1
    ];
    const goalId = this.getAttribute("data-goalID");
    const userId = document
      .querySelector("#username")
      .getAttribute("data-userID");
    const response = await fetch("/api/student-goals", {
      method: "POST",
      body: JSON.stringify({
        student_id: studentId,
        goal_id: goalId,
        user_id: userId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      document.location.replace(`/students/student/${studentId}`);
    } else {
      alert(response.statusText);
    }
  });
});
