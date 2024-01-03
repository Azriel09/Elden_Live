import { useEffect, useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Outlet, useNavigate, Link } from "react-router-dom";
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

  const handleToggle = (e) => {
    setToggled(!toggled);
    setSelectedTalent(e.target.innerText);
  };

  const iconsArray = [
    AmeIcon,
    GuraIcon,
    IrysIcon,
    CalliIcon,
    InaIcon,
    KroniiIcon,
  ];

  const names = [
    "Amelia Watson",
    "Gawr Gura",
    "IRyS",
    "Mori Calliope",
    "Ninomae Ina'nis",
    "Ouro Kronii",
  ];

  return (
    <div className="sidebar-container">
      <Sidebar
        onBackdropClick={() => setToggled(false)}
        toggled={toggled}
        breakPoint="always"
        width={window.innerWidth < 391 ? "85%" : "300px"}
        style={{
          borderRightWidth: "0",
        }}
      >
        <Menu
          menuItemStyles={{
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
            {iconsArray.map((Component, i) => (
              <MenuItem
                key={Component}
                onClick={(e) => handleToggle(e)}
                icon={<Component />}
                component={<Link to="/deaths" />}
              >
                {names[i]}
              </MenuItem>
            ))}
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
