
    // Add click event listener to all delete buttons
    document.querySelectorAll(".button-delete").forEach(function (button) {
        button.addEventListener("click", function () {
            // Find the parent table row
            const row = this.closest("tr");
            if (row) {
                // Extract News_ID and Scout_ID from the row
                const newsId = row.id; // Assuming `id` contains News_ID
                const scoutId = row.querySelector('td:nth-child(1)').id; // Assuming the 2nd column is Scout_ID

                // Confirm deletion
                if (confirm(`Bạn có muốn xóa tin tuyển dụng : ${newsId}, Scout_ID: ${scoutId}?`)) {
                    // Set the href and navigate
                    const href = `/recruitmentNews/delete?News_ID=${newsId}&Scout_ID=${scoutId}`;
                    window.location.href = href;
                }
            }
        });
    });

