// console.log(axios)
//khai báo service
var svService = new SinhVienService();

//Tạo ra 1 object chứa các thông tin backend cung cấp
// var objectGetSinhVien = {
//     url: 'http://svcy.myclass.vn/api/SinhVienApi/LayDanhSachSinhVien', //Đường dẫn backend cung cấp để lấy hoặc thêm dữ liệu
//     method: 'GET' //Giao thức backend cung cấp
// }
//Dùng thư viện axios gửi yêu cầu đến server 


var layThongTinSinhVien = function () { //Hàm xử lý khi kết quả trả về thành công
    var promise = svService.layDanhSachSinhVien();
    promise.then(function (result) {
        var content = '';
        //Từ dữ liệu table 
        for (var i = 0; i < result.data.length; i++) {
            //Lấy ra từng sinh viên từ kết quả server trả về
            var sv = result.data[i];
            //tạo đối tượng chứa dữ liệu đó
            var sinhvien = new SinhVien();
            sinhvien.maSinhVien = sv.maSinhVien;
            sinhvien.tenSinhVien = sv.tenSinhVien;
            sinhvien.email = sv.email;
            sinhvien.diemToan = sv.diemToan;
            sinhvien.diemLy = sv.diemLy;
            sinhvien.diemHoa = sv.diemHoa;
            sinhvien.loaiSinhVien = sv.loaiSinhVien;
            sinhvien.diemRenLuyen = sv.diemRenLuyen;

            content += `<tr>
            <td>${sv.maSinhVien}</td>
            <td>${sv.tenSinhVien}</td>
            <td>${sv.email}</td>
            <td>${sv.loaiSinhVien}</td>
            <td></td>
            <td>${sv.diemRenLuyen}</td>
            <td>
            <button class="btn btn-danger" onclick="xoaSinhVien('${sinhvien.maSinhVien}')">Xóa</button>

            <button class="btn btn-primary mr-1" onclick="chinhSua('${sinhvien.maSinhVien}')">Chỉnh sửa</button>            
            
            </td>


        </tr>`
        }
        document.getElementById('tblSinhVien').innerHTML = content;
    })
}
layThongTinSinhVien();


//Phương thức .then(callback): nhận vào 1 hàm có 1 tham số là kết quả trả về thành công từ phía server (Trã về dữ liệu)
//Phương thức .catch(callback): nhận vào 1 hàm có 1 tham số là kết quả trả về từ phía server thất bại (Trả lỗi)


///////----------POST: CHỨC NĂNG THÊM SINH VIEN
document.getElementById('btnThemSinhVien').onclick = function () {
    //lấy thông tin người dùng nhập vào từ giao diện
    var sv = new SinhVien();
    sv.maSinhVien = document.getElementById('maSinhVien').value;
    sv.tenSinhVien = document.getElementById('tenSinhVien').value;
    sv.email = document.getElementById('email').value;
    sv.diemToan = document.getElementById('diemToan').value
    sv.diemLy = document.getElementById('diemLy').value
    sv.diemHoa = document.getElementById('diemHoa').value
    sv.diemRenLuyen = document.getElementById('diemRenLuyen').value
    console.log('sinhvien', sv)

    axios({
        url: 'http://svcy.myclass.vn/api/SinhVienApi/ThemSinhVien',
        method: 'POST',
        data: sv
    }).then(function (result) {
        console.log("kết quả", result.data)

    }).catch(function (err) {
        console.log("kết quả", err.response.data)
    })

}

document.getElementById('btnCapNhatSinhVien').onclick=function(){
    //lấy thông tin người dùng cập nhật
    var sinhVienUpdate = new SinhVien();
    sinhVienUpdate.maSinhVien=document.getElementById('maSinhVien').value;
    sinhVienUpdate.tenSinhVien = document.getElementById('tenSinhVien').value;
    sinhVienUpdate.email = document.getElementById('email').value;
    sinhVienUpdate.diemToan = document.getElementById('diemToan').value
    sinhVienUpdate.diemLy = document.getElementById('diemLy').value
    sinhVienUpdate.diemHoa = document.getElementById('diemHoa').value
    sinhVienUpdate.diemRenLuyen = document.getElementById('diemRenLuyen').value
        //gọi api cập nhật

        var promise= svService.capNhatThongTinSinhVien(sinhVienUpdate.maSinhVien,sinhVienUpdate);
        
        promise.then(function (result) {
            console.log(result.data);
            //load lại api thấy thông tin sinh vien
            layThongTinSinhVien();
        }).catch(function (err) {
            console.log(err.response.data)
        })
}

var xoaSinhVien = function (maSinhVien) {
    //alert(maSinhVien)
    var promise = svService.xoaSinhVien(maSinhVien);
    promise.then(function (result) {
        console.log(result.data);
        //load lại api thấy thông tin sinh vien
        layThongTinSinhVien();
    }).catch(function (err) {
        console.log(err.response.data)
    })
}

var chinhSua = function (maSinhVien) {
    //alert(maSinhVien)
    var promise = svService.layThongTinSinhVien(maSinhVien);
    promise.then(function (result) {
        //lấy về thành công > gán dl lên thẻ
        var sinhVien = result.data;
        document.getElementById('maSinhVien').value = sinhVien.maSinhVien;
        document.getElementById('tenSinhVien').value = sinhVien.tenSinhVien;
        document.getElementById('email').value = sinhVien.email;
        document.getElementById('diemToan').value = sinhVien.diemToan;
        document.getElementById('diemLy').value = sinhVien.diemLy;
        document.getElementById('diemHoa').value = sinhVien.diemHoa;
        document.getElementById('diemRenLuyen').value = sinhVien.diemRenLuyen;
        document.getElementById('loaiSinhVien').value = sinhVien.loaiSinhVien;




    }).catch(function (err) {

        console.log(err.response.data)
    })
}