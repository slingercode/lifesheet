import { Form } from "@remix-run/react";
import { ChevronsUpDown } from "lucide-react";

import { Input } from "~/ui/input";
import { Label } from "~/ui/label";
import { Button } from "~/ui/button";
import { Checkbox } from "~/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/ui/collapsible";

export { action, loader } from "~/server/capture";

export default function Capture() {
  return (
    <Form method="POST" className="grid gap-8 px-10 py-5">
      {/* Health */}
      <div className="grid gap-5">
        <h2 className="text-center text-2xl">Health</h2>

        <div>
          <Label htmlFor="hoursOfSleep" className="">
            Hours of sleep
          </Label>
          <Input
            autoFocus
            type="number"
            step="0.01"
            id="hoursOfSleep"
            name="hoursOfSleep"
            placeholder="..."
          />
        </div>

        <div>
          <Label htmlFor="steps">Steps</Label>
          <Input type="number" step="0.01" name="steps" placeholder="..." />
        </div>

        <div>
          <Label htmlFor="steps">Water 💧</Label>
          <Input type="number" step="0.01" name="water" placeholder="..." />
        </div>

        <div>
          <Label htmlFor="poop">💩</Label>
          <Input type="number" step="0.01" name="poop" placeholder="..." />
        </div>
      </div>

      {/* Mental health */}
      <div className="grid gap-5">
        <h2 className="text-center text-2xl">Mental Health</h2>

        <div>
          <Label htmlFor="mood">Mood</Label>
          <Select name="mood">
            <SelectTrigger>
              <SelectValue placeholder="..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="excited">Excited</SelectItem>
              <SelectItem value="happy">Happy</SelectItem>
              <SelectItem value="anxious">Anxious</SelectItem>
              <SelectItem value="meeh">Meeh</SelectItem>
              <SelectItem value="sad">Sad</SelectItem>
              <SelectItem value="overwhelmed">Overwhelmed</SelectItem>
              <SelectItem value="sick">Sick</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Work */}
      <div className="grid gap-5">
        <h2 className="text-center text-2xl">Work</h2>

        <div>
          <Label htmlFor="work">Work time</Label>
          <Input type="number" step="0.01" name="work" placeholder="..." />
        </div>

        <div>
          <Label htmlFor="productive">Productive time</Label>
          <Input
            type="number"
            step="0.01"
            name="productive"
            placeholder="..."
          />
        </div>
      </div>

      {/* Misc */}
      <div className="grid gap-5">
        <h2 className="text-center text-2xl">Misc</h2>

        <div>
          <Label htmlFor="todayWas">Weather, today was?</Label>
          <Select name="todayWas">
            <SelectTrigger>
              <SelectValue placeholder="..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sunny">Sunny</SelectItem>
              <SelectItem value="cloudy">Cloudy</SelectItem>
              <SelectItem value="rainy">Rainy</SelectItem>
              <SelectItem value="mixed">Mixed (cloudy / sunny)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* LOL */}
      <Collapsible>
        <CollapsibleTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            className="flex w-full items-center justify-between md:justify-center"
          >
            League of legends
            <ChevronsUpDown className="ml-3 h-4 w-4" />
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="grid gap-5 pt-5">
          <div>
            <Label htmlFor="lolGames">Games</Label>
            <Input type="work" name="lolGames" placeholder="..." />
          </div>

          <div>
            <Label htmlFor="lolWins">Wins</Label>
            <Input type="work" name="lolWins" placeholder="..." />
          </div>

          <div className="flex h-28 flex-col items-center justify-center">
            <div>
              <div className="flex items-center pb-5">
                <Checkbox name="lolPanas" />
                <Label htmlFor="lolPanas" className="pl-2">
                  Panas?
                </Label>
              </div>

              <div className="flex items-center">
                <Checkbox name="lolTilt" />
                <Label htmlFor="lolTilt" className="pl-2">
                  Tilt?
                </Label>
              </div>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Button type="submit" className="w-full">
        Submit
      </Button>
    </Form>
  );
}
