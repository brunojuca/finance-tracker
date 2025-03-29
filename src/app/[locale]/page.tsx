import { Typography } from "@mui/material";
import { Locale } from "../../../utils/i18n";
import { getTranslations } from "../dictionary";

export default async function Home({
  params,
}: Readonly<{ params: Promise<{ locale: Locale }> }>) {
  const { locale } = await params;

  const t = await getTranslations(locale);
  return <Typography>{t("Home.title")}</Typography>;
}
