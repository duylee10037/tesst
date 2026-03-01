<!DOCTYPE html>
<html lang="vi">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Tra cứu số báo danh</title>

<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@600;700;800&family=Inter:wght@400;500&display=swap" rel="stylesheet">

<style>
:root{
  --green:#2E7D32;
  --green-light:#E8F5E9;
  --green-dark:#1B5E20;
}

*{margin:0;padding:0;box-sizing:border-box;}

body{
  font-family:'Inter',sans-serif;
  min-height:100vh;
  background:linear-gradient(135deg,#E8F5E9,#ffffff);
  display:flex;
  justify-content:center;
  align-items:center;
  padding:20px;
}

.container{
  width:100%;
  max-width:650px;
}

h1{
  font-family:'Outfit',sans-serif;
  font-size:34px;
  font-weight:800;
  margin-bottom:10px;
  color:var(--green-dark);
}

.subtitle{
  color:#555;
  margin-bottom:30px;
}

.card{
  background:white;
  padding:45px;
  border-radius:25px;
  box-shadow:0 25px 60px rgba(0,0,0,0.1);
  transition:0.3s;
}

.card:hover{
  transform:translateY(-5px);
}

input{
  width:100%;
  padding:16px;
  border-radius:15px;
  border:2px solid #ddd;
  font-size:15px;
  margin-bottom:20px;
  transition:0.3s;
}

input:focus{
  border-color:var(--green);
}

button{
  width:100%;
  padding:16px;
  border:none;
  border-radius:40px;
  font-weight:600;
  background:linear-gradient(45deg,var(--green),#66BB6A);
  color:white;
  cursor:pointer;
  transition:0.3s;
  box-shadow:0 10px 25px rgba(46,125,50,0.3);
}

button:hover{
  transform:translateY(-3px);
  box-shadow:0 15px 35px rgba(46,125,50,0.4);
}

button:disabled{
  opacity:0.6;
}

.loading{
  text-align:center;
  margin-top:15px;
  display:none;
  color:var(--green-dark);
  font-weight:500;
}

.result{
  margin-top:25px;
  padding:20px;
  border-radius:15px;
  display:none;
  animation:fadeIn 0.4s ease;
}

.success{
  background:var(--green-light);
  border-left:5px solid var(--green);
}

.error{
  background:#ffeaea;
  border-left:5px solid red;
}

@keyframes fadeIn{
  from{opacity:0;transform:translateY(20px);}
  to{opacity:1;transform:translateY(0);}
}

.credit{
  position:fixed;
  bottom:20px;
  right:30px;
  font-family:'Outfit',sans-serif;
  font-weight:600;
  background:linear-gradient(90deg,var(--green),#a5d6a7,var(--green));
  background-size:200% 100%;
  -webkit-background-clip:text;
  -webkit-text-fill-color:transparent;
  animation:shimmer 4s linear infinite;
}

@keyframes shimmer{
  0%{background-position:-200% 0;}
  100%{background-position:200% 0;}
}

@media(max-width:600px){
  .card{
    padding:30px;
  }
}
</style>
</head>
<body>

<div class="container">
  <h1>Tra cứu số báo danh</h1>
  <div class="subtitle">Hệ thống đồng bộ dữ liệu từ trường</div>

  <div class="card">
    <input type="text" id="keyword" placeholder="Nhập họ tên học sinh">
    <button id="btn" onclick="search()">Tra cứu</button>

    <div class="loading" id="loading">Đang xử lý...</div>

    <div class="result" id="resultBox"></div>
  </div>
</div>

<div class="credit">Design by KhanhDuy</div>

<script>
async function search(){
  const keyword=document.getElementById("keyword").value.trim();
  const btn=document.getElementById("btn");
  const resultBox=document.getElementById("resultBox");
  const loading=document.getElementById("loading");

  if(!keyword){
    showError("Vui lòng nhập họ tên.");
    return;
  }

  resultBox.style.display="none";
  loading.style.display="block";
  btn.disabled=true;

  try{
    const res=await fetch("/api/tracuu",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({keyword})
    });

    if(!res.ok){
      throw new Error("API lỗi");
    }

    const data=await res.json();

    loading.style.display="none";
    btn.disabled=false;

    if(data.success){
      resultBox.className="result success";
      resultBox.innerHTML=`
        <strong>Họ tên:</strong> ${keyword}<br>
        <strong>Số báo danh:</strong> ${data.id}<br><br>
        <button onclick="window.location.href='${data.url}'">Xem chi tiết</button>
      `;
      resultBox.style.display="block";
    }else{
      showError(data.error || "Không tìm thấy thông tin.");
    }

  }catch(err){
    loading.style.display="none";
    btn.disabled=false;
    showError("Không kết nối được máy chủ.");
  }
}

function showError(msg){
  const resultBox=document.getElementById("resultBox");
  resultBox.className="result error";
  resultBox.innerHTML=msg;
  resultBox.style.display="block";
}
</script>

</body>
</html>
