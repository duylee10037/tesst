export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false });
  }

  const { keyword } = req.body;

  if (!keyword) {
    return res.json({ success: false, error: "Thiếu từ khóa" });
  }

  try {
    // 🔹 POST lấy ID (giữ nguyên cấu trúc cũ)
    const postResponse = await fetch(
      "https://c3thachban.edu.vn/index.php?language=vi&nv=tracuu&op=postkw",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: `language=vi&nv=tracuu&op=postkw&keywords=${encodeURIComponent(keyword)}`
      }
    );

    const postText = await postResponse.text();

    // 🔹 CẤU TRÚC CŨ: tách ID bằng split
    if (!postText.includes("OK_")) {
      return res.json({ success: false, error: "Không tìm thấy ID" });
    }

    const id = postText.split("OK_")[1].trim();

    // 🔹 GET trang chi tiết
    const detailResponse = await fetch(
      `https://c3thachban.edu.vn/index.php?language=vi&nv=tracuu&op=show_kqs&id=${id}`
    );

    const html = await detailResponse.text();

    // 🔹 Parse dữ liệu giống HTML thật

    const nameMatch = html.match(/Họ và tên:\s*<span[^>]*>(.*?)<\/span>/i);
    const sbdMatch = html.match(/Số báo danh:\s*(\d+)/i);
    const lopMatch = html.match(/Học sinh lớp:\s*(.*?)</i);
    const nsMatch = html.match(/Ngày sinh:\s*(.*?)</i);

    const phongSttMatch = html.match(/<td>\s*(\d+)\s*<\/td>\s*<td>\s*(\d+)/);

    return res.json({
      success: true,
      data: {
        name: nameMatch ? nameMatch[1] : "",
        sbd: sbdMatch ? sbdMatch[1] : "",
        lop: lopMatch ? lopMatch[1] : "",
        ngaysinh: nsMatch ? nsMatch[1] : "",
        phong: phongSttMatch ? phongSttMatch[1] : "",
        stt: phongSttMatch ? phongSttMatch[2] : ""
      }
    });

  } catch (err) {
    return res.json({ success: false, error: "Lỗi hệ thống" });
  }
}
