import { prisma } from "@/src/lib/prisma";
import Link from "next/link";
import {
  FeatureItem,
  MainTitleObject,
} from "@/src/feature/page-editor/features/types/feature.types";

import PersonIcon from "@mui/icons-material/Person";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FlightIcon from "@mui/icons-material/Flight";
import ExploreIcon from "@mui/icons-material/Explore";
import MapIcon from "@mui/icons-material/Map";
import LanguageIcon from "@mui/icons-material/Language";
import DiamondIcon from "@mui/icons-material/Diamond";
import CelebrationIcon from "@mui/icons-material/Celebration";
import GroupsIcon from "@mui/icons-material/Groups";
import WorkIcon from "@mui/icons-material/Work";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import WineBarIcon from "@mui/icons-material/WineBar";
import WifiIcon from "@mui/icons-material/Wifi";
import LuggageIcon from "@mui/icons-material/Luggage";
import SupportAgentIcon from "@mui/icons-material/SupportAgent";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import NotificationsActiveIcon from "@mui/icons-material/NotificationsActive";
import SecurityIcon from "@mui/icons-material/Security";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import LocalTaxiIcon from "@mui/icons-material/LocalTaxi";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";

export const dynamic = "force-dynamic";

export default async function WhyChooseUsSection() {
  const features = await prisma.feature.findMany({
    orderBy: { createdAt: "asc" },
    take: 6,
  });

  // Default fallback link if one isn't provided in DB
  const FALLBACK_LINK =
    "https://portail.driverconnect.fr/vtc-fils/template?DS=1&tkn=00001_3739617_-1157023572_1769256160266";

  const latestWithHeading = [...features].reverse().find((f) => f.mainTitle);
  let displayHeading = "Why Choose Us";
  if (latestWithHeading?.mainTitle) {
    const mt = latestWithHeading.mainTitle as unknown as MainTitleObject;
    displayHeading = mt.text || "Why Choose Us";
  }

  const renderIcon = (type: string) => {
    const style = { fontSize: 40, color: "#D4AF6A" };
    switch (type) {
      case "DirectionsCarIcon":
        return <DirectionsCarIcon sx={style} />;

      case "PersonIcon":
        return <PersonIcon sx={style} />;

      case "AccessTimeIcon":
        return <AccessTimeIcon sx={style} />;
      case "FlightIcon":
        return <FlightIcon sx={style} />;
      case "ExploreIcon":
        return <ExploreIcon sx={style} />;
      case "MapIcon":
        return <MapIcon sx={style} />;
      case "LanguageIcon":
        return <LanguageIcon sx={style} />;
      case "DiamondIcon":
        return <DiamondIcon sx={style} />;
      case "CelebrationIcon":
        return <CelebrationIcon sx={style} />;
      case "GroupsIcon":
        return <GroupsIcon sx={style} />;
      case "WorkIcon":
        return <WorkIcon sx={style} />;
      case "VerifiedUserIcon":
        return <VerifiedUserIcon sx={style} />;
      case "WineBarIcon":
        return <WineBarIcon sx={style} />;
      case "WifiIcon":
        return <WifiIcon sx={style} />;
      case "LuggageIcon":
        return <LuggageIcon sx={style} />;
      case "SupportAgentIcon":
        return <SupportAgentIcon sx={style} />;
      case "CreditCardIcon":
        return <CreditCardIcon sx={style} />;
      case "NotificationsActiveIcon":
        return <NotificationsActiveIcon sx={style} />;
      case "SecurityIcon":
        return <SecurityIcon sx={style} />;
      case "BusinessCenterIcon":
        return <BusinessCenterIcon sx={style} />;
      case "LocalTaxiIcon":
        return <LocalTaxiIcon sx={style} />;
      default:
        return <DirectionsCarIcon sx={style} />;
    }
  };

  return (
    <section className="py-24">
      {" "}
      {/* Added dark bg for your transparent cards */}
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-serif text-center mb-20 font-semibold tracking-wide bg-gradient-to-r from-[#D4AF6A] via-[#F5E6C4] to-[#D4AF6A] bg-clip-text text-transparent">
          {displayHeading}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((item: FeatureItem) => (
            <div
              key={item.id}
              className="bg-white/5 backdrop-blur-lg p-10 rounded-2xl text-center border border-[#D4AF6A]/20 shadow-[0_15px_40px_rgba(0,0,0,0.6)] flex flex-col h-full transition-all duration-500 hover:-translate-y-2 hover:border-[#D4AF6A]"
            >
              <div className="w-20 h-20 bg-[#D4AF6A]/10 border border-[#D4AF6A]/30 rounded-full flex items-center justify-center mx-auto mb-8">
                {renderIcon(item.iconType)}
              </div>
              <h3 className="text-2xl font-semibold mb-4 text-white">
                {item.title}
              </h3>
              <p className="text-gray-300 leading-relaxed mb-8 flex-grow">
                {item.description}
              </p>

              {/* <Link
                href={item.buttonLink || FALLBACK_LINK} // DYNAMIC LINK USED HERE
                className="inline-block w-full py-3 rounded-lg font-semibold tracking-wide text-black bg-gradient-to-r from-[#D4AF6A] to-[#B8964F] hover:from-[#E6C27A] hover:to-[#C9A45D] transition-all duration-300 uppercase text-sm shadow-lg"
              >
                {item.buttonText || "Book Now"}
              </Link> */}

              <Link
                href={item.buttonLink || FALLBACK_LINK}
                target={item.openInNewTab ? "_blank" : "_self"}
                rel={item.openInNewTab ? "noopener noreferrer" : undefined}
                className="inline-block w-full py-3 rounded-lg font-semibold tracking-wide text-black bg-gradient-to-r from-[#D4AF6A] to-[#B8964F] hover:from-[#E6C27A] hover:to-[#C9A45D] transition-all duration-300 uppercase text-sm shadow-lg"
              >
                {item.buttonText || "Book Now"}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
