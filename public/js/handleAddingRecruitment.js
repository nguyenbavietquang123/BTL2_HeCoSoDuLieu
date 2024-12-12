const addButton = document.getElementById("addRecruitmentButton");
const addModal = document.getElementById("addModal");
const closeAddModal = document.getElementById("close-add-modal");
const addForm = document.getElementById("add-form");
const submitAddButton = document.getElementById("save-add");

addButton.addEventListener("click",()=>{
    document.getElementById("add_ID").placeholder = "Mã tin tối đa 9 kí tự (Bắt buộc nhập)";
    document.getElementById("add_Job_Position").placeholder = "Tối đa 50 kí tự";
    document.getElementById("add_Location").placeholder = "Tối đa 50 kí tự";
    document.getElementById("add_Job_Description").placeholder = "Tối đa 255 kí tự";
    document.getElementById("add_Benefits").placeholder = "Tối đa 255 kí tự";
    addModal.style.display = "block";
})
closeAddModal.addEventListener("click", () => {
    addModal.style.display = "none";
});

// Đóng modal khi nhấn bên ngoài modal
window.addEventListener("click", (e) => {
    if (e.target === addModal) {
        addModal.style.display = "none";
    }
});
submitAddButton.addEventListener("click",(event)=> {
    event.preventDefault();
    const isConfirm = confirm(`Ban co chac khong`);
    if(isConfirm){
        addForm.submit();
    }
})