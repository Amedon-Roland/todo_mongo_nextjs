"use client";

import { Toaster } from "sonner";

export const ToastProvider = ({ children }: { children: React.ReactNode }) => (
    <>
        {children}
        <Toaster />
    </>
);
