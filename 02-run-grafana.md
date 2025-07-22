Hướng dẫn Cài đặt WSL và Grafana

Tài liệu này hướng dẫn bạn cài đặt Windows Subsystem for Linux (WSL) trên Windows 10 hoặc Windows 11 để chạy hệ điều hành Linux, sau đó cài đặt và chạy Grafana ngay trong môi trường WSL.



# ✅ Yêu cầu hệ thống





Windows 10 phiên bản 2004 trở lên (Build 19041+) hoặc Windows 11.



Quyền Administrator để chạy PowerShell hoặc lệnh sudo.



Kết nối Internet để tải về Linux và các gói cần thiết.



# 🚀 Các bước cài đặt WSL

# 1. Mở PowerShell với quyền Administrator





Nhấn Windows + X → chọn Windows PowerShell (Admin) hoặc Terminal (Admin).

# 2. Chạy lệnh cài đặt WSL

wsl --install

Lưu ý: Sau khi chạy lệnh, bạn cần khởi động lại máy tính nếu được yêu cầu. Sau đó, mở Microsoft Store để cài đặt một bản phân phối Linux (ví dụ: Ubuntu 20.04 hoặc Ubuntu 22.04).



# 🛠️ Cài đặt các công cụ cần thiết cho Grafana

Sau khi WSL và Ubuntu được cài đặt, mở terminal Ubuntu và thực hiện các bước sau:

# 1. Cập nhật hệ thống và cài đặt công cụ cơ bản

sudo apt update
sudo apt install -y git make gcc g++ python3 python3-pip
sudo apt install -y build-essential libssl-dev

Giải thích:





sudo apt update: Cập nhật danh sách gói.



Các công cụ như Git, Make, GCC, Python3, và libssl-dev là cần thiết để xây dựng Grafana.

# 2. Cài đặt Node Version Manager (nvm) và Go

curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
sudo apt install -y golang-go

Lưu ý: Sau khi cài nvm, tải lại terminal hoặc chạy source ~/.bashrc để sử dụng.



# 🌐 Cài đặt Node.js (Phiên bản 23)

# 1. Cài đặt Node.js qua NodeSource

curl -fsSL https://deb.nodesource.com/setup_23.x | sudo -E bash -
sudo apt install -y nodejs

# 2. Cài đặt và sử dụng Node.js phiên bản 23 qua nvm

nvm install 23
nvm use 23

# 3. Kiểm tra phiên bản

node -v

Kết quả: Nên hiển thị phiên bản như v23.x.x.



# 📦 Cài đặt Yarn (Phiên bản 4.9.2)

# 1. Cài đặt Corepack

npm install -g corepack
corepack enable

# 2. Thiết lập Yarn phiên bản 4.9.2

corepack prepare yarn@4.9.2 --activate
yarn set version 4.9.2

# 3. Kiểm tra phiên bản

yarn -v

Kết quả: Nên hiển thị 4.9.2.



# 📥 Clone mã nguồn Grafana

# 1. Sao chép mã nguồn (Chọn một trong hai)





Chỉ commit mới nhất:

git clone --depth=1 https://github.com/grafana/grafana.git





Toàn bộ lịch sử:

git clone https://github.com/grafana/grafana.git

# 2. Vào thư mục Grafana

cd grafana



# 🔧 Cài đặt và Build Grafana

# 1. Cài đặt phụ thuộc frontend

yarn install --immutable

Lưu ý: --immutable đảm bảo khớp với yarn.lock.

# 2. Cấu hình tập lệnh build trong package.json

Mở tệp package.json và thêm dòng sau vào phần "scripts":

{
  "scripts": {
    "build": "NODE_ENV=production NODE_OPTIONS=--max-old-space-size=10240 nx exec --verbose -- webpack --config scripts/webpack/webpack.prod.js"
  }
}

Giải thích: Phân bổ 10GB bộ nhớ để tránh lỗi khi build.

# 3. Thực hiện build

yarn build

Lưu ý: Đảm bảo máy có đủ RAM (tối thiểu 8GB).



# ▶️ Chạy Grafana

# 1. Thiết lập môi trường

go run build.go setup

# 2. Biên dịch backend

go run build.go build

# 3. Tạo và chạy tập lệnh

cd ..
echo './grafana/bin/linux-amd64/grafana-server' > run-grafana.sh
chmod +x run-grafana.sh
./run-grafana.sh



# 🌐 Truy cập Grafana





Mở trình duyệt và vào: http://localhost:3000



Đăng nhập:





Tài khoản: admin



Mật khẩu: admin (yêu cầu đổi mật khẩu lần đầu).



# ⚠️ Khắc phục sự cố





Lỗi bộ nhớ khi build: Tăng --max-old-space-size lên 16384 trong package.json.



Cổng 3000 bị chiếm: Kiểm tra bằng sudo netstat -tuln | grep 3000 và thay đổi cổng nếu cần.



Go/Node.js không chạy: Kiểm tra bằng go version hoặc node -v, đảm bảo biến môi trường được thiết lập.



# 📝 Lưu ý quan trọng





Hướng dẫn áp dụng cho Ubuntu trên WSL. Với bản phân phối khác, thay apt bằng yum hoặc dnf.



Đảm bảo hệ thống có RAM ≥ 8GB và ổ cứng trống ≥ 20GB.
