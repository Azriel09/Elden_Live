import { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import {
  GuraIcon,
  AmeIcon,
  CalliIcon,
  InaIcon,
  IrysIcon,
  KroniiIcon,
} from "./icons";
import CoverIcon from "../../assets/cover-icon.png";

import "./sidenav.scss";
import { useTalentState } from "../../context/talent-context";
export default function Sidenav() {
  const [toggled, setToggled] = useState(false);
  const { setSelectedTalent } = useTalentState();
  const navigate = useNavigate();
  const handleToggle = (e) => {
    setToggled(!toggled);
    setSelectedTalent(e.target.innerText);
    navigate("/deaths");
  };

  return (
    <div className="sidebar-container">
      <Sidebar
        onBackdropClick={() => setToggled(false)}
        toggled={toggled}
        breakPoint="all"
        width="350px"
        style={{
          borderRightWidth: "0",
        }}
      >
        <Menu
          menuItemStyles={{
            // eslint-disable-next-line no-unused-vars
            button: ({ level, active, disabled }) => {
              return {
                color: "#b9b9bb",
                backgroundColor: "rgba(28, 29, 33, 1)",
                paddingLeft: "75px",
                fontWeight: "500",
                letterSpacing: "0.5px",
                "&:hover": {
                  backgroundColor: "#2c2d33 !important",
                },
              };
            },
          }}
        >
          <MenuItem disabled></MenuItem>
          <MenuItem disabled></MenuItem>
          <div className="nav-section">Death Timestamps</div>
          <SubMenu label="Hololive EN">
            {" "}
            <MenuItem onClick={(e) => handleToggle(e)} icon={<AmeIcon />}>
              Amelia Watson
            </MenuItem>
            <MenuItem onClick={(e) => handleToggle(e)} icon={<GuraIcon />}>
              Gawr Gura
            </MenuItem>
            <MenuItem onClick={(e) => handleToggle(e)} icon={<IrysIcon />}>
              IRyS
            </MenuItem>
            <MenuItem onClick={(e) => handleToggle(e)} icon={<CalliIcon />}>
              Mori Calliope
            </MenuItem>
            <MenuItem onClick={(e) => handleToggle(e)} icon={<InaIcon />}>
              Ninomae Ina&apos;nis
            </MenuItem>
            <MenuItem onClick={(e) => handleToggle(e)} icon={<KroniiIcon />}>
              Ouro Kronii
            </MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>
      <div className="header">
        <IconButton
          onClick={() => setToggled(!toggled)}
          sx={{ height: "75px" }}
        >
          <img src={CoverIcon} alt="cover-icon" className="toggle-img" />
        </IconButton>
      </div>
      <Outlet />
    </div>
  );
}
