import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "@/reset.css";
import "@/index.css";

import queryClient from "@/lib/query.config.ts";
import { QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "@/router.ts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);
