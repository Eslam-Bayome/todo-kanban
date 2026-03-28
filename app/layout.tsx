import { AntdRegistry } from "@ant-design/nextjs-registry";
import type { Metadata } from "next";

import AppProviders from "./AppProviders";
import "./global.css";
import { AppLayout } from "../components/AppLayout";

export const metadata: Metadata = {
  title: "KanbanFlow — Todo Task Board",
  description:
    "A Kanban-style todo board built with Next.js, React Query, Redux, and Ant Design",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <AppProviders>
            <AppLayout>{children}</AppLayout>
          </AppProviders>
        </AntdRegistry>
      </body>
    </html>
  );
}
