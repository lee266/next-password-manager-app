import { ThemeProvider } from 'next-themes';

/**
 * NextThemeProvider component.
 *
 * The ThemeProvider from next-themes wraps the application and provides utilities:
 * - defaultTheme: The theme to use if no preference is saved and no system preference is detected.
 * - enableSystem: If true, will use the system theme.
 * - attribute: The attribute on the html tag to set (default is "data-theme").
 *
 * @see https://github.com/pacocoursey/next-themes for more details.
 */

type NextThemeProviderType = {
  children: React.ReactNode;
};

const NextThemeProvider: React.FC<NextThemeProviderType> = ({ children }) => {
  return (
    <ThemeProvider defaultTheme="system" enableSystem attribute="class">
      {children}
    </ThemeProvider>
  );
};

export default NextThemeProvider;
