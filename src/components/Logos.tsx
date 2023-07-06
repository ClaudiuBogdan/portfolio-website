import { StaticImageData } from "next/image"
import logoClinchd from "@/images/logos/clinchd.jpeg"
import logoDevostack from "@/images/logos/devostack.png"
import logoFreelance from "@/images/logos/freelance.png"
import logoMTS from "@/images/logos/mts.jpeg"
import logoPersidius from "@/images/logos/persidius.svg"

export const LogoMapper: Record<string, string | StaticImageData> = {
  devostack: logoDevostack,
  clinchd: logoClinchd,
  persidius: logoPersidius,
  mts: logoMTS,
  freelance: logoFreelance,
}
