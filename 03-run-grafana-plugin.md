# Hướng dẫn Cài đặt Plugin cho Grafana

Tài liệu này hướng dẫn bạn cách cài đặt và phát triển plugin cho Grafana, bao gồm cả loại Panel và App, với các bước chi tiết để thiết lập môi trường phát triển, cài đặt phụ thuộc, và chạy server phát triển.

---

# ✅ Yêu cầu hệ thống

Node.js phiên bản 23 - đã được cài đặt.  
npm phiên bản 8.11.0 - đã được cài đặt.  
Yarn phiên bản 4.9.2 - đã được cài đặt.  
Môi trường Linux (WSL) với quyền Administrator (sử dụng sudo).  
Docker và Docker Compose - đã được cài đặt để chạy server phát triển Grafana.  
Kết nối Internet để tải các gói và mã nguồn.  

# 🛠️ Chuẩn bị môi trường

Trước khi bắt đầu, đảm bảo bạn đã cài đặt các công cụ cần thiết:


### 1. Kiểm tra phiên bản Node.js, npm, và Yarn
```bash
node -v
npm -v
yarn -v
```
##### Kết quả mong đợi:  
node -v: Hiển thị v23.x.x.  
npm -v: Hiển thị 8.11.0.  
yarn -v: Hiển thị 4.9.2.  

Nếu chưa đúng phiên bản, hãy cài đặt lại theo hướng dẫn trước đó.

# 🔧 Cài đặt và Tạo Plugin

Sử dụng công cụ @grafana/create-plugin để tạo plugin mới.

### 1. Chạy lệnh tạo plugin
```bash
npx @grafana/create-plugin@latest
```

# 🌟 Tạo Plugin Loại Panel
### 1. Chọn loại plugin

Chọn `Panel (add a visualization for dât or a widget)` - dòng số 3 khi được hỏi.

### 2. Cấu hình thông tin plugin

Nhập name_plugin (tên plugin của bạn).  
Nhập organization_name (tên tổ chức hoặc cá nhân).  

### 3. Thực hiện các bước tiếp theo

Sau khi tạo, bạn sẽ thấy thông báo từ create-plugin@5.25.4 với các bước sau:

##### a. Di chuyển vào thư mục plugin
Nếu bạn tự cài đặt sẽ di chuyển vào thư mục vừa tạo theo hướng dẫn
```bash
cd ./phunghong-reactwebmap-panel
```
##### b. Cài đặt phụ thuộc frontend
```bash
npm install
```
##### c. Cài đặt phụ thuộc kiểm thử e2e (Playwright)
```bash
npm exec playwright install chromium
```
Lưu ý: Nếu thiếu thư viện phụ thuộc, cài thêm:
```bash
sudo npx playwright install-deps
```
##### d. Xây dựng và theo dõi mã nguồn frontend
```bash
npm run dev
```
##### e. Khởi động server phát triển Grafana


# 🌐 Tạo Plugin Loại App
### 1. Chọn loại plugin
Chọn `App (add custom pages, UI extensions and bundle other plugins)` - dòng số 1 khi được hỏi.  
Chọn `Yes (true)` khi được hỏi về API.  

### 2. Cấu hình thông tin plugin

Nhập name_plugin (tên plugin của bạn).  
Nhập organization_name (tên tổ chức hoặc cá nhân).  

### 3. Thực hiện các bước tiếp theo

Sau khi tạo, bạn sẽ thấy thông báo từ create-plugin@5.25.4 với các bước sau:

##### a. Di chuyển vào thư mục plugin
Nếu bạn tự cài đặt sẽ di chuyển vào thư mục vừa tạo theo hướng dẫn
```bash
cd ./phunghong-webmap-app
```
##### b. Cài đặt phụ thuộc frontend
```bash
npm install
```
##### c. Cài đặt phụ thuộc kiểm thử e2e (Playwright)
```bash
npm exec playwright install chromium
```
Lưu ý: Nếu thiếu thư viện phụ thuộc, cài thêm:
```bash
sudo npx playwright install-deps
```
##### d. Xây dựng và theo dõi mã nguồn frontend
```bash
npm run dev
```
##### e. Cài đặt Mage (nếu chưa có)

Mage được sử dụng để biên dịch mã backend. Cài đặt như sau:
```bash
go install github.com/magefile/mage@latest
```
Cấu hình PATH:
```bash
nano ~/.bashrc
```
Thêm dòng sau vào cuối file:
```bash
export PATH="$HOME/go/bin:$PATH"
```
Áp dụng thay đổi:
```bash
source ~/.bashrc
```
##### f. Biên dịch mã backend
```bash
mage -v build:linux
```
Lưu ý: Chạy lại lệnh này mỗi khi chỉnh sửa file backend.

##### g. Khởi động server phát triển Grafana


# 📦 Cài đặt thêm thư viện hỗ trợ

### 1. Cài đặt Webpack Dev Server
```bash
npm install --save-dev webpack-dev-server
```
### 2. Cài đặt @grafana/data
```bash
npm install @grafana/data
```
Giải thích:  
webpack-dev-server: Hỗ trợ phát triển frontend với tính năng reload tự động.  
@grafana/data: Cung cấp các tiện ích dữ liệu của Grafana để tích hợp plugin.

---

# 🚀 Truy cập plugin vừa cài đặt
### 1. Đăng ký plugin với Grafana
Copy plugin vừa tạo tạo và đường dẫn sau
```bash
grafana/data/plugins
```
### 2. Khai báo với Grafana cho phép các plugin chưa đăng ký
Vào `grafana/confdefaults.ini`, copy đoạn sau vào cuối file
```bash
[plugins]
enable_alpha = true
plugin_dirs = data/plugins
allow_loading_unsigned_plugins = phunghong-webmap-panel,phunghong-webmap-app
actions_allow_post_url = localhost:3333

[plugin.phunghong-webmap-panel]
[plugin.phunghong-webmap-app]

```
Chạy lại grafana server

##### Plugin dạng panel
Sau khi đăng nhập ==> vào `Administration` --> chọn `Plugins and data` --> chọn `Plugins` --> Tìm kiếm bằng tên plugin mình vừa tạo (có thể xem lại trong file `plugin.json` trong thư mục chứa plugin)  



Plugin đã đăng ký ở Task 5 là `Webmap   `

##### Plugin dạng panel
Sau khi đăng nhập ==> vào `Administration` --> chọn `Plugins and data` --> chọn `Plugins` --> Tìm kiếm bằng tên plugin mình vừa tạo (có thể xem lại trong file `plugin.json` trong thư mục chứa plugin)  
Plugin đã đăng ký ở Task 5 là `Webmap-App` 



Nhấn  `Enable` để hiển thị plugin
Vào `More apps`  
##### Để vào xem trang webmap, chỉnh sửa đường dẫn lại thành
```bash
a/phunghong-webmap-app/map
```

##### Để vào xem trang liên kết tài khoản với Arcgis, chỉnh sửa đường dẫn lại thành
```bash
a/phunghong-webmap-app/link
```

---

# ⚠️ Khắc phục sự cố
Lỗi thiếu phụ thuộc Playwright: Chạy sudo npx playwright install-deps để cài đặt thêm.  
Docker không khởi động: Đảm bảo Docker đang chạy và bạn có quyền truy cập.  
Lỗi biên dịch backend: Kiểm tra cài đặt Go và Mage bằng go version và mage -v.  

---

# 📝 Lưu ý quan trọng
Đảm bảo thư mục làm việc không có khoảng trắng hoặc ký tự đặc biệt để tránh lỗi đường dẫn.



Kiểm tra phiên bản Node.js, npm, và Yarn trước khi chạy các lệnh.



Nếu gặp lỗi, hãy tham khảo tài liệu chính thức của Grafana tại https://grafana.com/docs/grafana/latest/developers/plugins/.
