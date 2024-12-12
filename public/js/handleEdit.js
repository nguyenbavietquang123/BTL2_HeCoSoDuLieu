const editButtons = document.querySelectorAll(".button-edit");
const submitEdit = document.getElementById("submitEdit");
const submitFrom = document.getElementById("edit-form");
let News_ID = "";
let Candidate_ID= "";
let Scout_ID ="";
console.log("1233")
console.log(editButtons);
const modal = document.getElementById("editModal");
const closeButton = document.querySelector("#close-button");
const table = document.getElementById("myTable");
let applicationID = "";
editButtons.forEach(button => {
    button.addEventListener("click", (event) => {
        event.preventDefault();
        modal.style.display = "block";
        applicationID =  button.id;
        console.log(applicationID);
        Candidate_ID=table.rows.item(parseInt(applicationID)).id;
        var cell = table.rows.item(parseInt(applicationID)).cells;
        var cellVar = cell.item(2).innerHTML;
        News_ID = cell.item(0).innerHTML;
        Scout_ID = cell.item(1).id;
        console.log(News_ID);
        console.log(Candidate_ID);
        document.getElementById("ID").value=News_ID;
        document.getElementById("Candidate_ID").value=Candidate_ID;
        document.getElementById("Scout_ID").value=Scout_ID;
    });
});

closeButton.addEventListener("click", () => {
    modal.style.display = "none";
});
submitEdit.addEventListener("click", (event)=>{
    event.preventDefault();
    const interviewDate = document.getElementById("Interview_Date").value;
    const applicationStatus= document.getElementById("Application_Status").value;
    const isConfirm = confirm(`Ban co chac khong`);
    if(isConfirm){
        submitFrom.submit();
        alert(`Da cap nhat thanh cong`)
    }
   
})

