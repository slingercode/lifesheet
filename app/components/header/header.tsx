import { Link } from "../link";
import { ThemeSelector } from "./theme-selector";

export const Header = () => {
  return (
    <header className="flex items-center justify-between p-5">
      <nav>
        <Link href="/" className="text-lg">
          lifesheet
        </Link>
      </nav>

      <ThemeSelector />
    </header>
  );
};
