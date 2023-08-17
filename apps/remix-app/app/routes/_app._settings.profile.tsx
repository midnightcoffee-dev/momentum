import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

import { Form } from "@remix-run/react";

export default function ProfileForm() {
  return (
    <Form>
      <div className="space-y-8">
        <Input />

        <Button type="submit">Update profile</Button>
      </div>
    </Form>
  );
}
