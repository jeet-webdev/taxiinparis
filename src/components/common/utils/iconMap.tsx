import React from "react";
// 1. Import Types from @mui/material
import { SvgIconProps } from "@mui/material";
// 2. Import Icons from @mui/icons-material
import {
  Lock,
  HeadsetMic,
  AddRoad,
  PriceChange,
  AirportShuttle,
  VerifiedUser,
  AutoGraph,
  ContactSupport,
} from "@mui/icons-material";


type MuiIconType = React.ComponentType<SvgIconProps>;

export const ICON_OPTIONS = [
  { label: "Lock (Secure)", value: "lock", icon: <Lock /> },
  { label: "Support (Headset)", value: "support", icon: <HeadsetMic /> },
  { label: "Road (Fleet)", value: "road", icon: <AddRoad /> },
  { label: "Price (Tag)", value: "price", icon: <PriceChange /> },
  { label: "Shuttle (Transport)", value: "shuttle", icon: <AirportShuttle /> },
  { label: "Verified (Shield)", value: "verified", icon: <VerifiedUser /> },
  { label: "Stats (Growth)", value: "stats", icon: <AutoGraph /> },
  { label: "Help (Support)", value: "help", icon: <ContactSupport /> },
];

export const getIconComponent = (
  iconName: string | undefined | null,
): MuiIconType => {
  const map: Record<string, MuiIconType> = {
    lock: Lock,
    support: HeadsetMic,
    road: AddRoad,
    price: PriceChange,
    shuttle: AirportShuttle,
    verified: VerifiedUser,
    stats: AutoGraph,
    help: ContactSupport,
  };

  return iconName && map[iconName] ? map[iconName] : Lock;
};
