export interface FooterData {
  id?: number;
  title: string;
  tagline: string;
  copyrightText: string;
  email: string;
  phone: string;
  address: string;
  navLinks: NavLink[];
  socialLinks: SocialLink[];
  appLinks: AppLink[];
  paymentLinks: PaymentLink[];
}

export interface NavLink {
  label: string;
  url: string;
  showInNav?: boolean;
  type?: "regular" | "category"; // Must be here
  categoryName?: string;
}

export interface SocialLink {
  platform:
    | "facebook"
    | "x"
    | "whatsapp"
    | "linkedin"
    | "pinterest"
    | "email"
    | "instagram"
    | "tiktok"
    | "youtube";
  url: string;
}

export interface AppLink {
  platform: "google_play" | "app_store";
  url: string;
  isVisible: boolean;
}

export interface PaymentLink {
  method: "visa" | "mastercard" | "amex" | "paypal" | "applepay" | "gpay";
  isVisible: boolean;
}
