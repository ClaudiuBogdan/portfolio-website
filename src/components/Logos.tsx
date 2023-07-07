import { StaticImageData } from "next/image"
import logoCarrefour from "@/images/logos/carrefour.png"
import logoClinchd from "@/images/logos/clinchd.jpeg"
import logoCodeForRomania from "@/images/logos/code-for-romania.png"
import logoDevostack from "@/images/logos/devostack.png"
import logoFreelance from "@/images/logos/freelance.png"
import logoSmurd from "@/images/logos/fundatie-smurd.png"
import logoMTS from "@/images/logos/mts.jpeg"
import logoPersidius from "@/images/logos/persidius.svg"

const LogoMapper: Record<string, string | StaticImageData> = {
  devostack: logoDevostack,
  clinchd: logoClinchd,
  persidius: logoPersidius,
  c4r: logoCodeForRomania,
  carrefour: logoCarrefour,
  smurd: logoSmurd,
  mts: logoMTS,
  freelance: logoFreelance,
}

export const mapLogo = (logoName: string): string | StaticImageData => {
  const logo = LogoMapper[logoName]

  if (!logo) throw new Error(`No logo for logoName: ${logoName}`)

  return logo
}
