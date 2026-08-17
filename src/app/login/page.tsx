"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSignIn() {
    await authClient.signIn.email({ email, password });
  }

  async function handleSignUp() {
    await authClient.signUp.email({ email, password, name: email });
  }

  return (
    <div className="p-8 max-w-sm mx-auto">
      <h1 className="text-2xl font-bold mb-6">Login</h1>
      <div className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div>
          <Label htmlFor="password">Password</Label>
          <Input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className="flex gap-2">
          <Button onClick={handleSignIn}>Sign in</Button>
          <Button variant="outline" onClick={handleSignUp}>Sign up</Button>
        </div>
      </div>
    </div>
  );
}