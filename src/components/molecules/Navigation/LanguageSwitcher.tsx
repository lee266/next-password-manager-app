import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
// MUI
import Button from '@mui/material/Button'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpSharpIcon from '@mui/icons-material/KeyboardArrowUpSharp';
import PublicSharpIcon from '@mui/icons-material/PublicSharp';
import CustomMenuItem from "components/atoms/Menu/CustomMenuItem";
import CustomMenu from "components/atoms/Menu/CustomMenu";

export default function LanguageSwitcher() {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const languageOpen = Boolean(anchorEl)
  
  const handleClick = useCallback((
    event: React.MouseEvent<HTMLElement>
    ) => {
      setAnchorEl(event.currentTarget);
    }, []
  );
  const handleClose = useCallback((
    ) => {
      setAnchorEl(null);
    }, []
  );

  const { locales, locale: activeLocale } = router;
  // Get languages not currently selected
  const otherLocales = locales?.filter(
    (locale) => locale !== activeLocale
  );

  return (
    <div className="language_switcher_button">
      <Button
        className="dark:hover:bg-back-dark"
        id="language_button"
        aria-controls={languageOpen ? 'basic-menu' : undefined}
        variant="contained"
        aria-expanded={languageOpen ? 'true' : undefined}
        onClick={handleClick}
        startIcon={<PublicSharpIcon/>}
        endIcon={languageOpen ? <KeyboardArrowUpSharpIcon/> :<KeyboardArrowDownIcon/>}
      >
        {activeLocale === "ja" ? "japan" : activeLocale === "en" ? "English" : "Language"}
      </Button>
      <CustomMenu
        open={languageOpen}
        anchorEl={anchorEl}
        onClose={handleClose}
        showArrow={false}
      >
        {otherLocales?.map((locale) => {
          const { pathname, query, asPath } = router;
          return (
            <CustomMenuItem key={"locale-" + locale}>
              <Link href={{ pathname, query }} as={asPath} locale={locale}>
                {locale === "ja" ? "japan" : locale === "en" ? "English": "unable"}
              </Link>
            </CustomMenuItem>
          );
        })}
      </CustomMenu>
    </div>
  );
}
