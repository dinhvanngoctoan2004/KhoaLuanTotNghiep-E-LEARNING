import { motion } from "framer-motion";
import { div } from "framer-motion/client";
import { useEffect, useRef, useState } from "react";
export default function TuVan() {
  const inputTen = useRef<HTMLInputElement>(null);
  const inputSdt = useRef<HTMLInputElement>(null);
  const iputNamSinh = useRef<HTMLInputElement>(null);
  const inputEmail = useRef<HTMLInputElement>(null);
  const inputNoiDung = useRef<HTMLTextAreaElement>(null);
  const [inputNgheNghiep, setinputNgheNghiep] = useState(
    "Học sinh & Sinh Viên",
  );
  const [inputQuanTam, setinputQuanTam] = useState("TOIC nền tảng");

  const [AlHoTen, setAlHoTen] = useState(false);
  const [AlSdt, setAlSdt] = useState("ddd");
  const [AlNamSinh, setAlNamSinh] = useState(false);
  const [AlEmail, setAlEmail] = useState("ddd");
  const [AlQuanTam, setAlQuanTam] = useState(false);

  const check = () => {
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

    if (iputNamSinh.current?.value || null) {
      setAlNamSinh(false);
      i++;
    } else setAlNamSinh(true);

    if (inputEmail.current?.value || null) {
      const checkEmal = inputEmail.current?.value || "";
      const checkEmal2 = checkEmal.split("@");
      if (checkEmal2.length > 1 && checkEmal2[1] !== "") {
        setAlEmail("ddd");
        console.log(checkEmal2);
        i++;
      } else setAlEmail("dd");
    } else setAlEmail("d");

    if (inputQuanTam !== "null") {
      setAlQuanTam(false);
      i++;
    } else {
      setAlQuanTam(true);
      console.log(inputQuanTam);
    }

    return i;
  };
  const gui = async () => {
    console.log("da nhan lenh gui");
    try {
      const YeuCau = {
        HoTen: inputTen.current?.value || "",
        Sdt: inputSdt.current?.value || "",
        NamSinh: iputNamSinh.current?.value || "",
        Email: inputEmail.current?.value || "",
        NgheNghiep: inputNgheNghiep,
        QuanTam: inputQuanTam,
        NoiDung: inputNoiDung.current?.value || "",
      };
      console.log(YeuCau);
      const them = await fetch(`http://localhost:3000/tuvan/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json", // Báo cho Server biết hàng được đóng gói bằng JSON
        },
        body: JSON.stringify(YeuCau),
      });
      const tb = await them.json();
      alert(tb.trangThai);
    } catch (err) {
      console.log("gui tu van that bai !" + err);
    }
  };
  return (
    <section className="mx-[10px] flex justify-center gap-[100px]">
      <div className="w-[303px]">
        <div className="flex flex-row items-center ">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
              hidden: {},
            }}
            className=" flex gap-2 font-extrabold text-[40px]  whitespace-normal"
          >
            {["Bạn", "còn", "câu"].map((word, i) => (
              <motion.span
                key={i}
                variants={{
                  visible: { opacity: 1, y: 0 },
                  hidden: { opacity: 0, y: 20 },
                }}
                // Đưa Gradient vào đây để từng từ đều có màu đẹp
                className="bg-gradient-to-b from-[#287678] to-[#4ADADE] bg-clip-text text-transparent"
              >
                {word}
              </motion.span>
            ))}
          </motion.div>
        </div>

        <div className="flex flex-row items-center ">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
            variants={{
              visible: { transition: { staggerChildren: 0.1 } },
              hidden: {},
            }}
            className=" flex gap-2 font-extrabold text-[40px]  whitespace-normal"
          >
            {["hỏi", "nào", "khác ?"].map((word, i) => (
              <motion.span
                key={i}
                variants={{
                  visible: { opacity: 1, y: 0 },
                  hidden: { opacity: 0, y: 20 },
                }}
                // Đưa Gradient vào đây để từng từ đều có màu đẹp
                className="bg-gradient-to-b from-[#287678] to-[#4ADADE] bg-clip-text text-transparent"
              >
                {word}
              </motion.span>
            ))}
          </motion.div>
        </div>

        <p className="text-[23px] mt-5">
          để lại thông tin,
          <span className="font-extrabold text-[#287678]"> E-Learning</span> sẽ
          liên hệ và hỗ trợ xử lý mọi vướng mắc của bạn
        </p>

        <p className="text-[23px] mt-5">
          Hoặc bạn có thể sử dụng
          <span className="font-extrabold text-[#287678]"> AI Chatbot</span> để
          được tư vấn và giải đáp mọi thắc mắc ngay lập tức.
        </p>

        <button
          onClick={() => {
            if (check() === 5) {
              gui();
            }
          }}
          className="text-[20px] font-extrabold bg-gradient-to-t from-[#4ADADE] to-[#287678] text-white px-[20px] py-[10px] rounded-[20px] mt-[20px] transition-all duration-300 hover:scale-[1.05]"
        >
          Gửi câu hỏi
        </button>
      </div>

      <div className="w-[650px] bg-gradient-to-t from-[#29646D] to-[#4FC2D3] px-[50px] py-[30px] rounded-[20px] flex gap-[15px] flex-col text-white text-[15px]">
        <div className="w-full flex gap-1 flex-col">
          <p>Họ Và Tên (*)</p>
          {!AlHoTen ? (
            <input
              type="text"
              ref={inputTen}
              placeholder="Nhập Họ Tên Của Bạn"
              className="w-full  p-[10px] rounded-[10px] text-black text-[15px] focus:outline-none"
            />
          ) : (
            <div>
              <input
                type="text"
                ref={inputTen}
                placeholder="Nhập Họ Tên Của Bạn"
                className="w-full  p-[10px] rounded-[10px] text-black text-[15px] focus:outline-none border border-red-600 border-[2px]"
              />
              <p className="ml-2 mt-1 mb-0 text-red-400">
                ô này không được để trống
              </p>
            </div>
          )}
        </div>

        <div className="w-full flex gap-1 flex-col">
          <p>Số Điện Thoại (*)</p>
          {AlSdt === "ddd" && (
            <input
              type="text"
              ref={inputSdt}
              placeholder="Nhập Số Điện Thoại Của Bạn"
              className="w-full  p-[10px] rounded-[10px] text-black text-[15px] focus:outline-none"
            />
          )}

          {AlSdt === "dd" && (
            <div>
              <input
                type="text"
                ref={inputSdt}
                placeholder="Nhập Số Điện Thoại Của Bạn"
                className="w-full  p-[10px] rounded-[10px] text-black text-[15px] focus:outline-none border border-red-600 border-[2px]"
              />
              <p className="ml-2 mt-1 mb-0 text-red-400">
                số điện thoại sai định dạng
              </p>
            </div>
          )}

          {AlSdt === "d" && (
            <div>
              <input
                type="text"
                ref={inputSdt}
                placeholder="Nhập Số Điện Thoại Của Bạn"
                className="w-full  p-[10px] rounded-[10px] text-black text-[15px] focus:outline-none border border-red-600 border-[2px]"
              />
              <p className="ml-2 mt-1 mb-0 text-red-400">
                ô này không được để trống
              </p>
            </div>
          )}
        </div>

        <div className="flex w-full gap-[10px]">
          <div className="w-full flex gap-1 flex-col">
            <p>Năm Sinh (*)</p>
            {!AlNamSinh ? (
              <input
                type="text"
                ref={iputNamSinh}
                placeholder="Nhập Năm Sinh Của Bạn"
                className="w-full  p-[10px] rounded-[10px] text-black text-[15px] focus:outline-none"
              />
            ) : (
              <div>
                <input
                  type="text"
                  ref={iputNamSinh}
                  placeholder="Nhập Năm Sinh Của Bạn"
                  className="w-full  p-[10px] rounded-[10px] text-black text-[15px] focus:outline-none border border-red-600 border-[2px]"
                />
                <p className="ml-2 mt-1 mb-0 text-red-400">
                  ô này không được để trống
                </p>
              </div>
            )}
          </div>

          <div className="w-full flex gap-1 flex-col">
            <p>Email (*)</p>
            {AlEmail === "ddd" && (
              <input
                type="email"
                ref={inputEmail}
                placeholder="Nhập Email Của Bạn"
                className="w-full  p-[10px] rounded-[10px] text-black text-[15px] focus:outline-none"
              />
            )}

            {AlEmail === "dd" && (
              <div>
                <input
                  type="email"
                  ref={inputEmail}
                  placeholder="Nhập Email Của Bạn"
                  className="w-full  p-[10px] rounded-[10px] text-black text-[15px] focus:outline-none border border-red-600 border-[2px]"
                />
                <p className="ml-2 mt-1 mb-0 text-red-400">
                  Email sai định dạng
                </p>
              </div>
            )}

            {AlEmail === "d" && (
              <div>
                <input
                  type="email"
                  ref={inputEmail}
                  placeholder="Nhập Email Của Bạn"
                  className="w-full  p-[10px] rounded-[10px] text-black text-[15px] focus:outline-none border border-red-600 border-[2px]"
                />
                <p className="ml-2 mt-1 mb-0 text-red-400">
                  ô này không được để trống
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="w-full flex gap-1 flex-col">
          <p>Bạn Là</p>

          <div className="w-full bg-white  p-[10px] rounded-[10px] flex items-center justify-center">
            <select
              onChange={(e) => {
                setinputNgheNghiep(e.target.value);
              }}
              className=" w-full  text-black text-[15px] focus:outline-none"
            >
              <option value="Học sinh & Sinh Viên">Học sinh & Sinh Viên</option>
              <option value="Đã đi làm">Đã đi làm</option>
              <option value="Khác">Khác</option>
            </select>
          </div>
        </div>

        <div className="w-full flex gap-1 flex-col">
          <p>Khóa học mà bạn quan tâm (*)</p>
          {!AlQuanTam ? (
            <div className="w-full bg-white  p-[10px] rounded-[10px] flex items-center justify-center">
              <select
                onChange={(e) => {
                  setinputQuanTam(e.target.value);
                }}
                className=" w-full  text-black text-[15px] focus:outline-none "
              >
                <option value="TOIC nền tảng">TOIC nền tảng</option>
                <option value="w">Listening & Reading trung cấp</option>
                <option value="ot">Speaking & Writing trung cấp</option>
                <option value="ot">TOIC Master</option>
              </select>
            </div>
          ) : (
            <div>
              <div className="w-full bg-white  p-[10px] rounded-[10px] flex items-center justify-center border border-red-600 border-[2px]">
                <select
                  onChange={(e) => {
                    setinputQuanTam(e.target.value);
                  }}
                  className=" w-full  text-black text-[15px] focus:outline-none "
                >
                  <option value="TOIC nền tảng">TOIC nền tảng</option>
                  <option value="Listening & Reading trung cấp">
                    Listening & Reading trung cấp
                  </option>
                  <option value="Speaking & Writing trung cấp">
                    Speaking & Writing trung cấp
                  </option>
                  <option value="TOIC Master">TOIC Master</option>
                </select>
              </div>
              <p className="ml-2 mt-1 mb-0 text-red-400">
                ô này không được để trống
              </p>
            </div>
          )}
        </div>

        <div className="w-full flex gap-1 flex-col text-[15px]">
          <p>Nội Dung</p>
          <textarea
            placeholder="Bạn có câu hỏi gì ?"
            ref={inputNoiDung}
            className="h-[81px] p-[10px] rounded-[10px] text-black text-[15px]"
          ></textarea>
        </div>
      </div>
    </section>
  );
}
