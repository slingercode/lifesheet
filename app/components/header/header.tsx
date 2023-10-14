import { Button } from "~/ui/button";
import { Link } from "../link";
import { ThemeSelector } from "./theme-selector";

type HeaderProps = {
  session: boolean;
};

export const Header = ({ session }: HeaderProps) => {
  return (
    <header className="flex items-center justify-between p-5">
      <nav className="flex items-center gap-5">
        <Link href="/" className="text-lg font-bold">
          lifesheet
        </Link>

        {session && (
          <Button variant="ghost" size="sm">
            <Link href="/capture" className="font-light hover:no-underline">
              capture
            </Link>
          </Button>
        )}
      </nav>

      <ThemeSelector />
    </header>
  );
};
