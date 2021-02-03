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
        if (elements.length <= 3) {
          let studentNameObj = {
              last_name: elements.last_name.value,
              first_name: elements.first_name.value,
              user_id: parseInt(userId),
          };
          postArr = studentNameObj;
          console.log(postArr);
        } else {
          for (let i = 0; i < elements.last_name.length; ++i) {
              let studentNameObj = {
                last_name: elements.last_name[i].value,
                first_name: elements.first_name[i].value,
                user_id: parseInt(userId),
              };
              if (elements.last_name[i].value) {
                postArr.push(studentNameObj);
                console.log(postArr);
              }
            }
        }
      
    }
    async function postCall (payload) { 
      const response = await fetch(`/api/students`, {
          method: "post",
          body: JSON.stringify({
            last_name: payload.last_name,
            first_name: payload.first_name,
            user_id: payload.user_id
          }),
          headers: { "Content-Type": "application/json" },
        });
        if (response.ok) {
         console.log("Ok");
         await document.location.replace('/students');
        } else {
          alert(response.statusText);
        }
    }
   async function multiPost(postArr) {
       if (elements.length <= 3) {
          let payload = postArr;
          postCall(payload);
       }
       else {
        for (let i = 0; i < postArr.length; ++i) {
            let payload = postArr[i];
            postCall(payload);
          //   console.log(JSON.stringify(payload));
        }
      }
        
    }
    await getStudentPostArr();
    await multiPost(postArr);    
  }
  
  document
    .querySelector("#stud-submit")
    .addEventListener("submit", studentSubmitHandler);
  