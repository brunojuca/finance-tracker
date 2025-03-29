import { getTranslations } from "@/app/dictionary";
import { Locale } from "../../../../utils/i18n";

export default async function About({
  params,
}: Readonly<{ params: Promise<{ locale: Locale }> }>) {
  const { locale } = await params;

  const t = await getTranslations(locale);

  return (
    <div>
      <h1>{t("About.title")}</h1>
    </div>
  );
}
