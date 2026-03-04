import { prisma } from "@/src/lib/prisma";
import Link from "next/link"; // Added missing import
import {
  FeatureItem,
  MainTitleObject,
} from "@/src/feature/page-editor/features/types/feature.types";

// Icons
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
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
export const dynamic = "force-dynamic";

export default async function WhyChooseUsSection() {
  const features = await prisma.feature.findMany({
    orderBy: { createdAt: "asc" },
  });
  const SHARED_LINK =
    "https://portail.driverconnect.fr/vtc-fils/template?DS=1&tkn=00001_3739617_-1157023572_1769256160266";

  const latestWithHeading = [...features].reverse().find((f) => f.mainTitle);
  let displayHeading = "Why Choose Us";
  if (latestWithHeading?.mainTitle) {
    const mt = latestWithHeading.mainTitle as unknown as MainTitleObject;
    displayHeading = mt.text || "Why Choose Us";
  }

  // --- ADDED THIS LINE BELOW ---
  const renderIcon = (type: string) => {
    const style = { fontSize: 40, color: "#ea580c" };

    switch (type) {
      case "PersonIcon":
        return <PersonIcon sx={style} />;
      case "DirectionsCarIcon":
        return <DirectionsCarIcon sx={style} />;
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
    <section className="py-20 ">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-serif text-center mb-16 font-bold text-[#D4AF6A] leading-tight">
          {displayHeading}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((item: FeatureItem) => (
            <div
              key={item.id}
              className="bg-[#fcfcfc] p-10 rounded-2xl text-center border border-gray-100 shadow-sm flex flex-col h-full"
            >
              <div className="w-20 h-20 bg-[#FFF5ED] rounded-full flex items-center justify-center mx-auto mb-8">
                {renderIcon(item.iconType)}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">
                {item.title}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-8 flex-grow">
                {item.description}
              </p>

              <Link
                href={SHARED_LINK}
                className="inline-block w-full bg-[#D4AF6A] text-white font-bold py-3 rounded-lg hover:bg-[#927237] transition-colors uppercase tracking-wide text-sm"
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
