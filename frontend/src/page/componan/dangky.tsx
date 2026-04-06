import { useRef, useState } from "react";
import { auth, RecaptchaVerifier, signInWithPhoneNumber } from "../../firebase"; // Đường dẫn tới file bạn vừa tạo
import { em } from "framer-motion/client";
import DangNhap from "../DanhNhap";
import { number } from "framer-motion";
interface DangKyProp {
  tat: () => void;
  dangNhap: (Email: string, mk: string) => void;
}
export default function DangKy({ tat, dangNhap }: DangKyProp) {
  const [Chon, setChon] = useState("1");

  const [alEmail, setalEmail] = useState("vao");
  const [alMK, setalMK] = useState("vao");
  const [alOTP, setalOTP] = useState("vao");

  const [AlHoTen, setAlHoTen] = useState(false);
  const [AlSdt, setAlSdt] = useState("ddd");

  const [luuEmail, setluuEmail] = useState("");
  const [luuMK, setluuMK] = useState("");
  const [inputNgheNghiep, setinputNgheNghiep] = useState(
    "Học sinh & Sinh Viên",
  );
  const inEmail = useRef<HTMLInputElement>(null);
  const inOTP = useRef<HTMLInputElement>(null);
  const inMK = useRef<HTMLInputElement>(null);

  const inputTen = useRef<HTMLInputElement>(null);
  const inputSdt = useRef<HTMLInputElement>(null);
  const iputNamSinh = useRef<HTMLInputElement>(null);

  const checTonTaiSDT = async () => {
    try {
      const email2 = inEmail.current?.value || "";
      console.log(email2);
      const guiEmail = {
        Email: email2,
      };
      const check = await fetch("http://localhost:3000/dangnhap/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Báo cho Server biết hàng được đóng gói bằng JSON
        },
        body: JSON.stringify(guiEmail),
      });
      const check2 = await check.json();
      if (check2.trangThai === "T") {
        setalEmail("EmailDaTonTai");
      } else if (check2.trangThai === "F") {
        setChon("2");
        setluuEmail(email2);
        guiMa(email2);
      }
    } catch (err) {
      console.log("loi trong qua trinh goi api check");
    }
  };

  const checkDinhDangEmail = () => {
    const check = inEmail.current?.value || "";
    const check2 = check.split("@");
    if (check2.length > 1 && check2[1] !== "") {
      setalEmail("vao");
      return true;
    } else {
      setalEmail("sdinhDang");
      return false;
    }
  };

  const guiMa = async (text: string) => {
    try {
      const email = {
        email: text,
      };
      console.log(text);
      const api = await fetch(`http://localhost:3000/dangnhap/gui-otp-email`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Báo cho Server biết hàng được đóng gói bằng JSON
        },
        body: JSON.stringify(email),
      });
      console.log("1");
      const respone = await api.json();
      console.log("2");
      console.log(respone.trangThai);
    } catch (err) {
      console.log("loi trong qua trinh goi api gui otp");
    }
  };

  const xacnhan = async (OTP: string) => {
    try {
      console.log(luuEmail);

      const ma = {
        email: luuEmail,
        otp: OTP,
      };

      const api = await fetch("http://localhost:3000/dangnhap/xac-nhan-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(ma),
      });
      const respone = await api.json();
      if (respone.trangThai === true) {
        setChon("3");
      } else {
        setalOTP("s");
      }
    } catch (err) {
      console.log("qua trinh gui xac nhan that bai :" + err);
    }
  };

  const ktmk = (text: string) => {
    console.log(luuEmail);
    const check = {
      vietHoa: /[A-Z]/.test(text),
      hasNumber: /\d/.test(text),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(text),
      isLongEnough: text.length >= 8,
    };

    if (
      check.vietHoa &&
      check.hasNumber &&
      check.hasSpecialChar &&
      check.isLongEnough
    )
      return true;
    return false;
  };

  const KtTT = () => {
    let i = 0;
    if (inputTen.current?.value || null) {
      setAlHoTen(false);
      i++;
    } else setAlHoTen(true);
    if (inputSdt.current?.value || null) {
      const checkSDT = inputSdt.current?.value || "";
      if (checkSDT?.length === 10) {
        setAlSdt("ddd");
        i++;
      } else setAlSdt("dd");
    } else setAlSdt("d");
    if (i === 2) return true;
    else return false;
  };

  const DangKy = async () => {
    try {
      const TTTK = {
        sdt: inputSdt.current?.value || "",
        mk: luuMK,
        HoTen: inputTen.current?.value || "",
        NamSinh: Number(iputNamSinh.current?.value) || "",
        Email: luuEmail,
        NgheNghiep: inputNgheNghiep,
      };
      console.log(TTTK);
      const api = await fetch("http://localhost:3000/dangky", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(TTTK),
      });

      const respone = await api.json();
      if (respone.trangThai) {
        tat();
        dangNhap(luuEmail, luuMK);
      } else {
        alert("dang ky that bai");
        console.log(respone.mess);
      }
    } catch (err) {
      console.error("loi trong qua trinh gui api dang ky");
    }
  };
  return (
    <>
      {/* ///////////////////// NHẬP EMAIL //////////////////////////// */}
      {Chon === "1" && (
        <div className=" relative flex-col gap-[10px] w-[350px] h-[280px] bg-white rounded-[20px] px-[50px] py-[20px] flex justify-center items-center">
          <img
            onClick={tat}
            className="absolute w-[20px] top-[20px] left-[310px] cursor-pointer"
            src="https://img.icons8.com/?size=100&id=Emle2kcE82Fp&format=png&color=000000"
            alt="tat"
          />
          <h2 className="text-[#114A53] font-extrabold text-[20px]">ĐĂNG KÝ</h2>
          <p className="text-center w-full text-start text-[13px]">Email</p>

          <input
            type="text"
            ref={inEmail}
            placeholder="Nhập Email của bạn"
            className={`w-full h-[40px] p-[10px] border ${alEmail === "vao" ? ` border-black/25 rounded-[10px]  text-[13px]` : `border-red-500 rounded-[10px]  text-[13px]`}
              `}
          />

          {alEmail === "sdinhDang" && (
            <p className="w-full ml-2 text-start text-red-400 text-[13px]">
              Email sai định dạng
            </p>
          )}

          {alEmail === "EmailDaTonTai" && (
            <p className="w-full ml-2 text-start text-red-400 text-[13px]">
              Email đã tồn tại
            </p>
          )}

          <button
            onClick={() => {
              if (checkDinhDangEmail()) {
                checTonTaiSDT();
              }
            }}
            className="font-extrabold text-white bg-[#287678] w-full h-[43px] rounded-[10px] flex justify-center items-center"
          >
            Tiếp Tục
          </button>
        </div>
      )}

      {/* /////////////////// XÁC NHẬN OTP /////////////////////// */}
      {Chon === "2" && (
        <div className=" relative flex-col gap-[10px] w-[350px] h-[280px] bg-white rounded-[20px] px-[50px] py-[20px] flex justify-center items-center">
          <img
            onClick={tat}
            className="absolute w-[20px] top-[20px] left-[310px] cursor-pointer"
            src="https://img.icons8.com/?size=100&id=Emle2kcE82Fp&format=png&color=000000"
            alt="tat"
          />
          <h2 className="text-[#114A53] font-extrabold text-[20px]">ĐĂNG KÝ</h2>
          <p className="text-start w-full  text-[13px]">
            Mã OPT đã được gửi về Email của bạn
          </p>
          <input
            type="text"
            ref={inOTP}
            placeholder="Nhập mã OTP của bạn"
            className={`w-full h-[40px] p-[10px] border  ${alOTP === "vao" ? `border-black/25 rounded-[10px]  text-[13px]` : `border-red-500 rounded-[10px]  text-[13px]`}`}
          />
          {alOTP === "s" && (
            <p className="w-full ml-2 text-start text-red-400 text-[13px]">
              Mã sai hoặc hết hạn
            </p>
          )}
          <button
            onClick={() => {
              xacnhan(inOTP.current?.value || "");
            }}
            className="font-extrabold text-white bg-[#287678] w-full h-[43px] rounded-[10px] flex justify-center items-center"
          >
            xác nhận
          </button>
        </div>
      )}

      {/* /////////////////////////// NHẬP MẬT KHẨU ////////////////////////// */}
      {Chon === "3" && (
        <div className=" relative flex-col gap-[10px] w-[350px] h-[280px] bg-white rounded-[20px] px-[50px] py-[20px] flex justify-center items-center">
          <img
            onClick={tat}
            className="absolute w-[20px] top-[20px] left-[310px] cursor-pointer"
            src="https://img.icons8.com/?size=100&id=Emle2kcE82Fp&format=png&color=000000"
            alt="tat"
          />
          <h2 className="text-[#114A53] font-extrabold text-[20px]">ĐĂNG KÝ</h2>
          <p className="text-center w-full text-start text-[13px]">
            Mật Khẩu: (mật khẩu phải có ký tự đặc biệt,tối thiểu 8 ký tự, số và
            chữ cái viết hoa)
          </p>

          <input
            type="password"
            ref={inMK}
            placeholder="Nhập mật khẩu của bạn"
            className={`w-full h-[40px] p-[10px] border  ${alMK === "vao" ? `border-black/25 rounded-[10px]  text-[13px]` : `border-red-500 rounded-[10px]  text-[13px]`}`}
          />
          {alMK === "s" && (
            <p className="w-full ml-2 text-start text-red-400 text-[13px]">
              mật khẩu không đủ mạnh
            </p>
          )}

          <button
            onClick={() => {
              if (ktmk(inMK.current?.value || "")) {
                setluuMK(inMK.current?.value || "");
                setChon("4");
              } else setalMK("s");
            }}
            className="font-extrabold text-white bg-[#287678] w-full h-[43px] rounded-[10px] flex justify-center items-center"
          >
            Tiếp Tục
          </button>
        </div>
      )}

      {Chon === "4" && (
        <div className="relative w-[450px] px-[50px] py-[30px] bg-white rounded-[20px] flex justify-center flex-col gap-[10px]">
          <img
            onClick={tat}
            className="absolute w-[20px] top-[20px] left-[405px] cursor-pointer"
            src="https://img.icons8.com/?size=100&id=Emle2kcE82Fp&format=png&color=000000"
            alt="tat"
          />
          <h2 className="text-[#114A53] font-extrabold text-[20px] w-full text-center">
            Bổ Sung Thông Tin
          </h2>
          <p className="text-center w-full text-start text-[13px]">
            Họ Và Tên (*)
          </p>
          <input
            type="text"
            ref={inputTen}
            placeholder="Nhập họ tên của bạn"
            className={`w-full h-[40px] p-[10px] border  border-black/25 rounded-[10px]  text-[13px] ${!AlHoTen ? `border-black/25 rounded-[10px]  text-[13px]` : `border-red-500 rounded-[10px]  text-[13px]`}`}
          />
          {AlHoTen && (
            <p className="w-full ml-2 text-start text-red-400 text-[13px]">
              ô này không được để trống
            </p>
          )}

          <p className="text-center w-full text-start text-[13px]">
            Số Điên Thoại (*)
          </p>
          <input
            type="text"
            ref={inputSdt}
            placeholder="Nhập số điện thoại của bạn"
            className={`w-full h-[40px] p-[10px] border  ${AlSdt === "ddd" ? `border-black/25 rounded-[10px]  text-[13px]` : `border-red-500 rounded-[10px]  text-[13px]`}`}
          />
          {AlSdt === "dd" && (
            <p className="w-full ml-2 text-start text-red-400 text-[13px]">
              số điện thoại sai định dạng
            </p>
          )}
          {AlSdt === "d" && (
            <p className="w-full ml-2 text-start text-red-400 text-[13px]">
              ô này không được để trống
            </p>
          )}

          <div className="flex gap-3">
            <div className="flex flex-col gap-[10px]">
              <p className="text-center w-full text-start text-[13px]">
                Năm Sinh
              </p>
              <input
                type="number"
                ref={iputNamSinh}
                placeholder="Nhập năm sinh của bạn"
                className={`w-full h-[40px] p-[10px] border  border-black/25 rounded-[10px]  text-[13px]`}
              />
            </div>
            <div className="flex flex-col gap-[10px]">
              <p className="text-center w-full text-start text-[13px]">
                Bạn Là
              </p>
              <div className="w-full h-[40px] p-[10px] border  border-black/25 rounded-[10px]  text-[13px]">
                <select
                  onChange={(e) => {
                    setinputNgheNghiep(e.target.value);
                  }}
                  className=" w-full  text-black text-[13px] focus:outline-none flex items-center"
                >
                  <option value="Học sinh & Sinh Viên">
                    Học sinh & Sinh Viên
                  </option>
                  <option value="Đã đi làm">Đã đi làm</option>
                  <option value="Khác">Khác</option>
                </select>
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              if (KtTT()) {
                DangKy();
              }
            }}
            className="font-extrabold text-white bg-[#287678] w-full h-[43px] rounded-[10px] flex justify-center items-center"
          >
            Đăng Ký
          </button>
        </div>
      )}
    </>
  );
}
