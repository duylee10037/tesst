export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false });
  }

  const { keyword } = req.body;

  if (!keyword) {
    return res.json({ success: false, error: "Thiếu từ khóa" });
  }

  try {
    // 🔹 Bước 1: POST lấy ID
    const postRes = await fetch(
      "https://c3thachban.edu.vn/index.php?language=vi&nv=tracuu&op=postkw",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent": "Mozilla/5.0"
        },
        body: new URLSearchParams({
          language: "vi",
          nv: "tracuu",
          op: "postkw",
          keywords: keyword
        })
      }
    );

    const postText = await postRes.text();

    // Làm sạch khoảng trắng
    const cleaned = postText.replace(/\s/g, "");

    const idMatch = cleaned.match(/OK_(\d+)/);

    if (!idMatch) {
      return res.json({
        success: false,
        error: "Không tìm thấy ID"
      });
    }

    const id = idMatch[1];

    // 🔹 Bước 2: GET trang chi tiết
    const detailRes = await fetch(
      `https://c3thachban.edu.vn/index.php?language=vi&nv=tracuu&op=show_kqs&id=${id}`,
      {
        headers: {
          "User-Agent": "Mozilla/5.0"
        }
      }
    );

    const html = await detailRes.text();

    // 🔹 Parse dữ liệu từ HTML

    const name = html.match(/Họ và tên:.*?>(.*?)</i)?.[1] || "";
    const sbd = html.match(/Số báo danh:\s*(\d+)/i)?.[1] || "";
    const lop = html.match(/Học sinh lớp:\s*(.*?)</i)?.[1] || "";
    const ngaysinh = html.match(/Ngày sinh:\s*(.*?)</i)?.[1] || "";

    const phongMatch = html.match(/<td>\s*(\d+)\s*<\/td>\s*<td>\s*(\d+)/);
    const phong = phongMatch?.[1] || "";
    const stt = phongMatch?.[2] || "";

    return res.json({
      success: true,
      data: {
        name,
        sbd,
        lop,
        ngaysinh,
        phong,
        stt
      }
    });

  } catch (err) {
    return res.json({
      success: false,
      error: "Lỗi hệ thống"
    });
  }
}
