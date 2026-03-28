"use client";

import { CheckSquareOutlined, GithubOutlined } from "@ant-design/icons";
import { Layout, Typography } from "antd";

const { Header, Content } = Layout;

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout = ({ children }: AppLayoutProps) => {
  return (
    <Layout style={{ minHeight: "100vh", backgroundColor: "#f0f2f5" }}>
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingInline: 24,
          backgroundColor: "#001529",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        }}
      >
        <div className="flex items-center gap-3">
          <CheckSquareOutlined style={{ color: "#1677ff", fontSize: 22 }} />
          <Typography.Title
            level={4}
            style={{ color: "white", margin: 0, fontWeight: 600 }}
          >
            KanbanFlow
          </Typography.Title>
        </div>

        <div className="flex items-center gap-3">
          <Typography.Text style={{ color: "rgba(255,255,255,0.65)", fontSize: 13 }}>
            Next.js · React Query · Redux · Ant Design
          </Typography.Text>
          <GithubOutlined style={{ color: "rgba(255,255,255,0.65)", fontSize: 18 }} />
        </div>
      </Header>

      <Content style={{ padding: "24px", overflow: "auto" }}>
        {children}
      </Content>
    </Layout>
  );
};

export { AppLayout };
