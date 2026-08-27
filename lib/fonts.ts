import {
  Poppins,
  Space_Grotesk,
  Noto_Sans_Arabic,
  Noto_Nastaliq_Urdu,
  Vazirmatn,
} from "next/font/google";
import localFont from "next/font/local";

export const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const notoSansArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
  display: "swap",
});

// export const notoNastaliqUrdu = Noto_Nastaliq_Urdu({
//   subsets: ["arabic"],
//   weight: ["400", "500", "600", "700"],
//   variable: "--font-urdu",
//   display: "swap",
// });

// export const vazirmatn = Vazirmatn({
//   subsets: ["arabic", "latin"],
//   weight: ["400", "500", "600", "700"],
//   variable: "--font-persian",
//   display: "swap",
// });

export const parastoo = localFont({
  src: [
    {
      path: "../public/fonts/Parastoo-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Parastoo-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../public/fonts/Parastoo-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../public/fonts/Parastoo-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-persian",
  display: "swap",
});



// export const nafeesWebNaskh = localFont({
//   src: "../public/fonts/Nafees-Web-Naskh.ttf",
//   variable: "--font-urdu",
//   display: "swap",
// });

export const pakTypeNaskh = localFont({
  src: "../public/fonts/PakType-Naskh.ttf",
  variable: "--font-urdu",
  display: "swap",
});


export const fontVariables = [
  poppins.variable,
  spaceGrotesk.variable,
  notoSansArabic.variable,
  pakTypeNaskh.variable,
  // notoNastaliqUrdu.variable,
  // vazirmatn.variable,
  parastoo.variable,
].join(" ");
