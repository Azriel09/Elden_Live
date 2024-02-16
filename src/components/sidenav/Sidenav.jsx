import { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { Outlet, Link, useLocation } from "react-router-dom";
import { IconButton } from "@mui/material";
import {
  GuraIcon,
  AmeIcon,
  CalliIcon,
  InaIcon,
  IrysIcon,
  KroniiIcon,
  BibooIcon,
} from "./icons";
import CoverIcon from "../../assets/cover-icon.png";

import "./sidenav.scss";
import { useTalentState } from "../../context/talent-context";
export default function Sidenav() {
  const pathUrl = useLocation();
  const currentLocation = pathUrl.pathname.split("/")[1];
  const [toggled, setToggled] = useState(false);
  const { selectedTalent, setSelectedTalent } = useTalentState();
  console.log(currentLocation);
  const handleDeathsToggle = (e) => {
    setToggled(!toggled);
    console.log(e.target.innerText);
    setSelectedTalent(e.target.innerText);
  };

  const iconsArray = [
    AmeIcon,
    GuraIcon,
    IrysIcon,
    CalliIcon,
    InaIcon,
    KroniiIcon,
    BibooIcon,
  ];

  const names = [
    "Amelia Watson",
    "Gawr Gura",
    "IRyS",
    "Mori Calliope",
    "Ninomae Ina'nis",
    "Ouro Kronii",
    "Koseki Biboo",
  ];

  return (
    // current location used for deaths page
    // selectedtalent used for background image
    <div
      className={`sidebar-container side-${selectedTalent} side-${currentLocation}`}
    >
      <Sidebar
        onBackdropClick={() => setToggled(false)}
        toggled={toggled}
        breakPoint="all"
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
                onClick={(e) => handleDeathsToggle(e)}
                icon={<Component />}
                component={<Link to="/deaths" />}
              >
                {names[i]}
              </MenuItem>
            ))}
          </SubMenu>
          <MenuItem disabled></MenuItem>
          <div className="nav-section">Statistics</div>
          <MenuItem
            onClick={() => setToggled(!toggled)}
            component={<Link to="/boss" />}
          >
            By Boss
          </MenuItem>
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
