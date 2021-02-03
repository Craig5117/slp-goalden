document.addEventListener('DOMContentLoaded', function() {
    const elems = document.querySelectorAll('.modal');
    const instances = M.Modal.init(elems);   
    
    document.querySelector('#number-confirm').addEventListener('click', function() {
         let studNumber = document.querySelector("#stud-number").value.trim();
         if(!studNumber) {
             studNumber = 1;
         } else if (studNumber > 30) {
             studNumber = 30;
         }
         elems[0].M_Modal.close();
        document.location.replace(`/students/submit/${studNumber}`)
     })
    
});



	

