import { a, tr } from "framer-motion/client";
import { useEffect, useRef, useState } from "react";
import DangKy from "./componan/dangky";

interface DangNhapProp {
  tat: () => void;
  dangnhap1: (text: any) => void;
}

export default function DangNhap({ tat, dangnhap1 }: DangNhapProp) {
  const [Chon, setChon] = useState("1");
  const [alEmail, setalEmail] = useState("vao"); //sdinhDang//SokTonTai;
  const [alMK, setalMK] = useState("vao"); //sMK
  const [luuEmail, setluuEmail] = useState("");

  const inEmail = useRef<HTMLInputElement>(null);
  const inMK = useRef<HTMLInputElement>(null);

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

  const checTonTaiSDT = async () => {
    try {
      const guiEmail = {
        Email: inEmail.current?.value || "",
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
        setluuEmail(inEmail.current?.value || "");
        setChon("3");
      } else if (check2.trangThai === "F") setalEmail("EmailKTonTai");
    } catch (err) {
      console.log("loi trong qua trinh goi api");
    }
  };

  const DangNhap = async (Email: string, mk: string) => {
    try {
      const gui = {
        Email: Email,
        mk: mk,
      };
      const DN = await fetch("http://localhost:3000/dangnhap/dn", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(gui),
      });

      const DN2 = await DN.json();
      if (DN2.trangThai === "thanhCong") {
        tat();
        console.log(DN2.trangThai);
        console.log(DN2.Token);
        console.log(DN2);
        dangnhap1(DN2.Token);
      }
      return setalMK("sMK");
    } catch (err) {
      console.log("loi khi dang nhap");
    }
  };

  return (
    <section className="w-[100vw] h-[100vh] bg-black/50 fixed z-[100] top-0 flex justify-center items-center ">
      {/* /////////////////////// LỰA CHỌN ////////////////////////// */}
      {Chon === "1" && (
        <div className=" relative flex-col gap-[20px] w-[350px] h-[280px] bg-white rounded-[20px] px-[50px] py-[20px] flex justify-center items-center">
          <img
            onClick={tat}
            className="absolute w-[20px] top-[20px] left-[310px] cursor-pointer"
            src="https://img.icons8.com/?size=100&id=Emle2kcE82Fp&format=png&color=000000"
            alt="tat"
          />
          <img src="/logo.svg" alt="LOGO" />
          <p className="text-center text-[13px]">
            Khám phá E-learning – Nền tảng học và luyện thi thông minh dành cho
            bạn
          </p>
          <button
            onClick={() => {
              setChon("2");
            }}
            className="font-extrabold text-white bg-[#287678] w-full h-[43px] rounded-[10px] flex justify-center items-center"
          >
            ĐĂNG NHẬP
          </button>

          <button
            onClick={() => {
              setChon("dk");
            }}
            className="font-extrabold border border-[#287678]  text-[#287678]  w-full h-[43px] rounded-[10px] flex justify-center items-center"
          >
            ĐĂNG KÝ
          </button>
        </div>
      )}

      {/* ////////////// NHẬP SỐ ĐIỆN THOẠI ////////////////////////// */}

      {Chon === "2" && (
        <div className=" relative flex-col gap-[20px] w-[350px] h-[280px] bg-white rounded-[20px] px-[50px] py-[20px] flex justify-center items-center">
          <img
            onClick={tat}
            className="absolute w-[20px] top-[20px] left-[310px] cursor-pointer"
            src="https://img.icons8.com/?size=100&id=Emle2kcE82Fp&format=png&color=000000"
            alt="tat"
          />
          <h2 className="text-[#114A53] font-extrabold text-[20px]">
            ĐĂNG NHẬP
          </h2>
          <p className="text-center w-full text-start text-[13px]">Email</p>

          {alEmail === "vao" && (
            <input
              type="text"
              ref={inEmail}
              placeholder="Nhập Email của bạn"
              className="w-full h-[40px] p-[10px] border border-black/25 rounded-[10px]  text-[13px]"
            />
          )}

          {alEmail === "sdinhDang" && (
            <div className="w-full">
              <input
                type="text"
                ref={inEmail}
                placeholder="Nhập email của bạn"
                className="w-full h-[40px] p-[10px] border border-red-500 rounded-[10px]  text-[13px]"
              />
              <p className="ml-2 mt-1 mb-0 text-red-400 text-[13px]">
                email sai định dạng
              </p>
            </div>
          )}
          {alEmail === "EmailKTonTai" && (
            <div className="w-full">
              <input
                type="text"
                ref={inEmail}
                placeholder="Nhập số điện thoại của bạn"
                className="w-full h-[40px] p-[10px] border border-red-500 rounded-[10px]  text-[13px]"
              />
              <p className="ml-2 mt-1 mb-0 text-red-400 text-[13px]">
                Email không tồn tại
              </p>
            </div>
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

      {/* //////////////// NHẬP MẬT KHẨU /////////////////////////// */}
      {Chon === "3" && (
        <div className=" relative flex-col gap-[20px] w-[350px] h-[280px] bg-white rounded-[20px] px-[50px] py-[20px] flex justify-center items-center">
          <img
            onClick={tat}
            className="absolute w-[20px] top-[20px] left-[310px] cursor-pointer"
            src="https://img.icons8.com/?size=100&id=Emle2kcE82Fp&format=png&color=000000"
            alt="tat"
          />
          <h2 className="text-[#114A53] font-extrabold text-[20px]">
            ĐĂNG NHẬP
          </h2>
          <p className="text-center w-full text-start text-[13px]">Mật Khẩu</p>

          {alMK === "vao" && (
            <input
              type="password"
              ref={inMK}
              placeholder="Nhập mật khẩu của bạn"
              className="w-full h-[40px] p-[10px] border border-black/25 rounded-[10px]  text-[13px]"
            />
          )}

          {alMK === "sMK" && (
            <div className="w-full">
              <input
                type="password"
                ref={inMK}
                placeholder="Nhập mật khẩu của bạn"
                className="w-full h-[40px] p-[10px] border border-red-500 rounded-[10px]  text-[13px]"
              />
              <p className="ml-2 mt-1 mb-0 text-red-400 text-[13px]">
                sai mật khẩu
              </p>
            </div>
          )}

          <button
            onClick={() => {
              DangNhap(luuEmail, inMK.current?.value || "");
            }}
            className="font-extrabold text-white bg-[#287678] w-full h-[43px] rounded-[10px] flex justify-center items-center"
          >
            Tiếp Tục
          </button>
        </div>
      )}

      {Chon === "dk" && <DangKy dangNhap={DangNhap} tat={tat} />}
    </section>
  );
}
