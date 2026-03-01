export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    try {
        const { keyword } = req.body;

        if (!keyword) {
            return res.status(400).json({ error: "Thiếu keyword" });
        }

        const response = await fetch("https://c3thachban.edu.vn/index.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "User-Agent": "Mozilla/5.0",
                "Referer": "https://c3thachban.edu.vn/index.php?language=vi&nv=tracuu"
            },
            body: new URLSearchParams({
                language: "vi",
                nv: "tracuu",
                op: "postkw",
                keywords: keyword
            })
        });

        const text = await response.text();

        const match = text.match(/OK_(\d+)/);

        if (!match) {
            return res.status(404).json({ error: "Không tìm thấy ID" });
        }

        const id = match[1];

        return res.status(200).json({
            success: true,
            id: id,
            url: `https://c3thachban.edu.vn/index.php?language=vi&nv=tracuu&op=show_kqs&id=${id}`
        });

    } catch (err) {
        return res.status(500).json({ error: "Lỗi hệ thống" });
    }
}


async function search() {
    const keyword = document.getElementById("keyword").value.trim();
    const btn = document.getElementById("btn");
    const spinner = document.getElementById("spinner");

    if (!keyword) {
        showToast("Vui lòng nhập họ tên đầy đủ");
        return;
    }

    btn.disabled = true;
    spinner.style.display = "block";

    try {
        // Giả sử endpoint tra cứu là /tracuu hoặc lấy từ tin tức gần nhất
        // Bạn cần kiểm tra thực tế: inspect form trên trang trường xem action là gì
        // Ví dụ phổ biến: https://c3thachban.edu.vn/tracuu hoặc POST đến một path cụ thể
        const formData = new FormData();
        formData.append("keyword", keyword);  // hoặc "hoten", "tenhs" tùy form thật

        const response = await fetch("https://c3thachban.edu.vn/tracuu", {  // ← thay bằng endpoint thật nếu khác
            method: "POST",
            body: formData
        });

        if (!response.ok) throw new Error("Lỗi kết nối");

        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");

        // Parse thông tin - phần này cần điều chỉnh tùy cấu trúc HTML thực tế của trường
        // Thường kết quả nằm trong <table>, <div class="result"> hoặc <p>
        let resultText = "";
        const table = doc.querySelector("table"); // hoặc ".result-table", "tbody"
        if (table) {
            const rows = table.querySelectorAll("tr");
            for (let row of rows) {
                const cells = row.querySelectorAll("td, th");
                if (cells.length >= 2) {
                    const label = cells[0].innerText.trim();
                    const value = cells[1].innerText.trim();
                    if (label && value) {
                        resultText += `<p><strong>${label}:</strong> ${value}</p>`;
                    }
                }
            }
        } else {
            // Nếu không có table, thử lấy text từ div hoặc p chính
            const mainContent = doc.querySelector(".content, .result, body"); // fallback
            resultText = mainContent ? mainContent.innerHTML : "Không tìm thấy dữ liệu";
        }

        if (resultText.includes("không tìm thấy") || !resultText) {
            showToast("Không tìm thấy thông tin học sinh");
        } else {
            document.getElementById("resultContent").innerHTML = resultText;
            document.getElementById("resultModal").style.display = "flex";
            setTimeout(() => {
                document.querySelector(".result-card").classList.add("show");
            }, 100);
            showToast("Tra cứu thành công!");
        }

    } catch (err) {
        console.error(err);
        showToast("Lỗi: " + (err.message || "Không thể kết nối đến hệ thống trường"));
    }

    btn.disabled = false;
    spinner.style.display = "none";
}

function closeModal() {
    const modal = document.getElementById("resultModal");
    const card = document.querySelector(".result-card");
    card.classList.remove("show");
    setTimeout(() => { modal.style.display = "none"; }, 500);
}