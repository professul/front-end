import React from "react";
import { Menubar } from "primereact/menubar";
import { InputText } from "primereact/inputtext";
import { Badge } from "primereact/badge";
import { Avatar } from "primereact/avatar";
import style from "./MainNavigation.module.css";
export default function MainHeader() {
  const itemRenderer = (item) => (
    // <a className="flex align-items-center p-menuitem-link">
    <a className={style["card2"]}>
      <span className={item.icon} />
      <span className={style["custom-label"]}>{item.label}</span>
      {item.badge && (
        <Badge className={style["custom-badge"]} value={item.badge} />
      )}
      {item.shortcut && (
        <span className={style["custom-span"]}>{item.shortcut}</span>
      )}
    </a>
  );
  const items = [
    {
      label: "Home",
      icon: "pi pi-home",
    },
    {
      label: "Features",
      icon: "pi pi-star",
    },
    {
      label: "Projects",
      icon: "pi pi-search",
      items: [
        {
          label: "Core",
          icon: "pi pi-bolt",
          shortcut: "⌘+S",
          template: itemRenderer,
        },
        {
          label: "Blocks",
          icon: "pi pi-server",
          shortcut: "⌘+B",
          template: itemRenderer,
        },
        {
          label: "UI Kit",
          icon: "pi pi-pencil",
          shortcut: "⌘+U",
          template: itemRenderer,
        },
        {
          separator: true,
        },
        {
          label: "Templates",
          icon: "pi pi-palette",
          items: [
            {
              label: "Apollo",
              icon: "pi pi-palette",
              badge: 2,
              template: itemRenderer,
            },
            {
              label: "Ultima",
              icon: "pi pi-palette",
              badge: 3,
              template: itemRenderer,
            },
          ],
        },
      ],
    },
    {
      label: "Contact",
      icon: "pi pi-envelope",
      badge: 3,
      template: itemRenderer,
    },
  ];

  const start = (
    <img
      alt="logo"
      src="https://primefaces.org/cdn/primereact/images/logo.png"
      height="40"
      className="mr-2"
    ></img>
  );
  const end = (
    <div className={style["custom-end"]}>
      <InputText
        placeholder="Search"
        type="text"
        className="w-8rem sm:w-auto"
      />
    </div>
  );

  return (
    <div className={style["card"]}>
      <Menubar model={items} start={start} end={end} />
    </div>
  );
}
