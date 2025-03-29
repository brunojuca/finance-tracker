import {
  AppBar,
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import type { Metadata } from "next";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { Locale } from "../../../utils/i18n";
import MenuIcon from "@mui/icons-material/Menu";
import { getTranslations } from "../dictionary";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Finance Tracker",
  description: "A finance tracker app",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: Locale }>;
}>) {
  const { locale } = await params;

  const t = await getTranslations(locale);

  return (
    <html lang={locale}>
      <body>
        <AppRouterCacheProvider>
          <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
              <Toolbar>
                <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                >
                  <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  {t("Home.title")}
                </Typography>
                <Button
                  href={`/${locale}/about`}
                  color="inherit"
                  LinkComponent={Link}
                >
                  {t("About.title")}
                </Button>
              </Toolbar>
            </AppBar>
          </Box>
          {children}
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
