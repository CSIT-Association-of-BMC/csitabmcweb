"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Search, Loader2, AlertCircle } from "lucide-react";

export default function InputForm() {
  const [certificateId, setCertificateId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = certificateId.trim();

    if (!trimmed) {
      setError("Please enter a Certificate ID or UUID.");
      return;
    }

    if (trimmed.length < 3) {
      setError("Certificate ID is too short. Please enter a valid identifier.");
      return;
    }

    setError(null);
    setLoading(true);
    router.push(`/certificate/${encodeURIComponent(trimmed)}`);
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSearch} className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            <Input
              type="text"
              placeholder="e.g. CERT-2026-WD-0104 or UUID"
              value={certificateId}
              onChange={(e) => {
                setCertificateId(e.target.value);
                if (error) setError(null);
              }}
              disabled={loading}
              className="pl-10 pr-4 h-11 text-sm bg-slate-50/50 border-slate-300 focus-visible:bg-white focus-visible:ring-2 focus-visible:ring-primary rounded-xl"
              aria-label="Certificate ID"
            />
          </div>
          <Button
            type="submit"
            disabled={loading}
            className="h-11 px-6 font-semibold rounded-xl bg-primary hover:bg-primary/90 text-white shrink-0 shadow-xs"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                <span>Verifying...</span>
              </>
            ) : (
              <span>Verify ID</span>
            )}
          </Button>
        </div>

        {error && (
          <div className="flex items-center gap-2 text-xs text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200 animate-in fade-in duration-150">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}
      </form>

      <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span>Format: UUID or ID printed on certificate</span>
        <span className="text-slate-400">Official Authenticator</span>
      </div>
    </div>
  );
}
