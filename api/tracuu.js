export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false });
  }

  const { keyword } = req.body;

  try {
    // 1️⃣ POST tìm ID
    const postRes = await fetch(
      "https://c3thachban.edu.vn/index.php?language=vi&nv=tracuu&op=postkw",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          language: "vi",
          nv: "tracuu",
          op: "postkw",
          keywords: keyword
        })
      }
    );

    const postText = await postRes.text();
    const idMatch = postText.match(/OK_(\d+)/);

    if (!idMatch) {
      return res.json({ success: false, error: "Không tìm thấy ID" });
    }

    const id = idMatch[1];

    // 2️⃣ GET trang chi tiết
    const detailRes = await fetch(
      `https://c3thachban.edu.vn/index.php?language=vi&nv=tracuu&op=show_kqs&id=${id}`
    );

    const html = await detailRes.text();

    // 3️⃣ Parse dữ liệu từ HTML
    const name = html.match(/Họ và tên:\s*<\/b>\s*(.*?)<\/span>/i)?.[1] || "";
    const sbd = html.match(/Số báo danh:\s*(\d+)/i)?.[1] || "";
    const lop = html.match(/Học sinh lớp:\s*(.*?)<\/li>/i)?.[1] || "";
    const ns = html.match(/Ngày sinh:\s*(.*?)<\/li>/i)?.[1] || "";
    const phong = html.match(/<td>\s*(\d+)\s*<\/td>/i)?.[1] || "";
    const stt = html.match(/<td>\s*\d+\s*<\/td>\s*<td>\s*(\d+)/i)?.[1] || "";

    return res.json({
      success: true,
      data: {
        name,
        sbd,
        lop,
        ngaysinh: ns,
        phong,
        stt
      }
    });

  } catch (err) {
    return res.json({ success: false, error: "Lỗi hệ thống" });
  }
}
