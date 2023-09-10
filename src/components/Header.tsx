import React from "react";
import { useNavigate } from "react-router-dom";
import settingsIcon from "assets/settingIcon.svg";
import notificationIcon from "assets/notificationIcon.svg";
import avatar from "assets/avatar.svg";
import menuIcon from "assets/menuIcon.svg";

const Heeader = () => {
  const navigate = useNavigate();

  return (
    <div className="w-[100%] h-[72px] bg-white shadow-sm flex items-center justify-between md:px-[56px] xs:px-[24px] font-inter fixed top-0 right-0 z-30 ">
      <button onClick={() => navigate("/")} className="font-[700] text-[24px] ">
        ToDo
      </button>
      <div className="md:flex w-[140px] justify-between items-center xs:hidden ">
        <button>
          <img src={settingsIcon} alt="settings icon" />
        </button>
        <button>
          <img src={notificationIcon} alt="notification icon" />
        </button>
        <button>
          <img src={avatar} alt="user" />
        </button>
      </div>
      <div className="xs:flex md:hidden">
        <button>
          <img src={menuIcon} alt="menu" />
        </button>
      </div>
    </div>
  );
};

export default Heeader;
