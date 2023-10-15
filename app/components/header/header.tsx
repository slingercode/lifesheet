import { DatabaseZap } from "lucide-react";

import { Button } from "~/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "~/ui/tooltip";

import { Link } from "../link";
import { ThemeSelector } from "./theme-selector";

type HeaderProps = {
  session: boolean;
  db: boolean;
};

export const Header = ({ session, db }: HeaderProps) => {
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

      <div className="flex items-center">
        {db === false && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="mr-5 h-5 w-5"
              >
                <DatabaseZap />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>DB offline</p>
            </TooltipContent>
          </Tooltip>
        )}
        <ThemeSelector />
      </div>
    </header>
  );
};
