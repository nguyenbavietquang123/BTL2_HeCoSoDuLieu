
    const filterButton = document.getElementById("filter-button");
    const filterForm = document.getElementById("filterForm");
    const closeFilterButton = document.getElementById("close-filter-button");

    // Hiển thị form filter khi nhấn nút filter
    filterButton.addEventListener("click", () => {
        filterForm.style.display = "block";
    });

    // Đóng form filter khi nhấn nút đóng
    closeFilterButton.addEventListener("click", () => {
        filterForm.style.display = "none";
    });
