
const editButtons = document.querySelectorAll(".button-edit");
const editModal = document.getElementById("editModal");
const closeModal = document.getElementById("close-modal");
const editForm = document.getElementById("edit-form");
const submitButton = document.getElementById("save-edit");
const submitForm = document.getElementById("edit-form");
function convertDateFormat(dateStr) {
    const [date,month,year] = dateStr.split('-');
    return `${year}-${month}-${date}`;
}
// Hiển thị modal khi nhấn nút "Chỉnh sửa"
editButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        const row = e.target.closest("tr");
        if (row) {
            // Lấy thông tin từ hàng được chọn
            const newsID = row.id;
            const scoutId = row.querySelector("td:nth-child(1)").id;
            const job = row.querySelector("td:nth-child(2)").id;
            const jobPosition = row.querySelector("td:nth-child(2)").textContent.trim();
            const location = row.querySelector("td:nth-child(3)").textContent.trim();
            const salary = row.querySelector("td:nth-child(4)").textContent.trim();
            const postDate = row.querySelector("td:nth-child(5)").textContent.trim();
            const deadline = row.querySelector("td:nth-child(6)").textContent.trim();
            const jobDescription = row.querySelector("td:nth-child(7)").textContent.trim();
            const benefits = row.querySelector("td:nth-child(8)").textContent.trim();
            const formattedPostDate = convertDateFormat(postDate);
            // Điền thông tin vào form
            document.getElementById("ID").value = newsID;
            document.getElementById("Scout_ID").value = scoutId;
            document.getElementById("Job_Position").placeholder = jobPosition;
            document.getElementById("Job").value = job;
            document.getElementById("Location").placeholder = location;
            document.getElementById("Salary").placeholder = salary;
            document.getElementById("Post_Date").value = formattedPostDate;
            document.getElementById("Deadline").value = deadline;
            document.getElementById("Job_Description").placeholder = jobDescription;
            document.getElementById("Benefits").placeholder = benefits;

            // Hiển thị modal
            editModal.style.display = "block";
        }
    });
});

// Đóng modal khi nhấn nút "X"
closeModal.addEventListener("click", () => {
    editModal.style.display = "none";
});

// Đóng modal khi nhấn bên ngoài modal
window.addEventListener("click", (e) => {
    if (e.target === editModal) {
        editModal.style.display = "none";
    }
});
submitButton.addEventListener("click",(event)=> {
    event.preventDefault();
    const isConfirm = confirm(`Ban co chac khong`);
    if(isConfirm){
        submitForm.submit();
    }
})
