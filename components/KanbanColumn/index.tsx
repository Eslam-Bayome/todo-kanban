"use client";

import { PlusOutlined } from "@ant-design/icons";
import { Column, PAGE_SIZE } from "@appTypes/Task";
import { useDroppable } from "@dnd-kit/core";
import { AppDispatch } from "@redux/index";
import { setColumnPage } from "@redux/slices/ui";
import { selectColumnPage, selectSearchTerm } from "@redux/slices/ui/selectors";
import { useGetTasks } from "@services/tasks/useGetTasks";
import { Badge, Button, Empty, Pagination, Skeleton, Typography } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { TaskCard } from "../TaskCard";
import { TaskFormModal } from "../TaskFormModal";

interface KanbanColumnProps {
  column: Column;
}

const COLUMN_HEADER_COLORS: Record<string, string> = {
  backlog: "#595959",
  in_progress: "#1677ff",
  review: "#fa8c16",
  done: "#52c41a",
};

const KanbanColumn = ({ column }: KanbanColumnProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [createOpen, setCreateOpen] = useState(false);

  const searchTerm = useSelector(selectSearchTerm);
  const page = useSelector(selectColumnPage(column.id));

  const { tasks, total, isLoading, isFetching } = useGetTasks({
    column: column.id,
    page,
    search: searchTerm,
  });

  const { setNodeRef, isOver } = useDroppable({ id: column.id });

  const headerColor = COLUMN_HEADER_COLORS[column.id] ?? "#595959";

  return (
    <>
      <div
        className="flex flex-col rounded-xl overflow-hidden"
        style={{
          minWidth: 280,
          maxWidth: 320,
          width: "100%",
          backgroundColor: "#f8f9fa",
          border: isOver
            ? `2px dashed ${headerColor}`
            : "2px solid transparent",
          transition: "border-color 0.2s ease",
          boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
        }}
      >
        {/* Column header */}
        <div
          className="px-4 py-3 flex items-center justify-between"
          style={{ backgroundColor: headerColor }}
        >
          <div className="flex items-center gap-2">
            <Typography.Text
              strong
              className="text-white text-sm uppercase tracking-wide"
            >
              {column.label}
            </Typography.Text>
            <Badge
              count={total}
              style={{
                backgroundColor: "rgba(255,255,255,0.25)",
                color: "white",
                fontWeight: 600,
                boxShadow: "none",
              }}
              showZero
            />
          </div>
          <Button
            type="text"
            size="small"
            icon={<PlusOutlined />}
            onClick={() => setCreateOpen(true)}
            className="text-white hover:bg-white/20 border-none"
            style={{ color: "white" }}
          />
        </div>

        {/* Task list */}
        <div
          ref={setNodeRef}
          className="flex-1 p-3 overflow-y-auto"
          style={{
            minHeight: 400,
            maxHeight: "calc(100vh - 280px)",
            backgroundColor: isOver ? `${headerColor}10` : "transparent",
            transition: "background-color 0.2s ease",
          }}
        >
          {isLoading || isFetching ? (
            <div className="space-y-3">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton
                  key={i}
                  active
                  paragraph={{ rows: 2 }}
                  className="bg-white rounded-lg p-3"
                />
              ))}
            </div>
          ) : tasks.length === 0 ? (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                searchTerm
                  ? "No tasks match your search"
                  : "No tasks yet. Add one!"
              }
              className="mt-8"
            />
          ) : (
            tasks.map((task) => <TaskCard key={task.id} task={task} />)
          )}
        </div>

        {/* Pagination */}
        {total > PAGE_SIZE && (
          <div className="px-3 py-2 border-t border-gray-200 bg-white flex justify-center">
            <Pagination
              current={page}
              pageSize={PAGE_SIZE}
              total={total}
              size="small"
              simple
              onChange={(newPage) =>
                dispatch(setColumnPage({ column: column.id, page: newPage }))
              }
            />
          </div>
        )}
      </div>

      <TaskFormModal
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        defaultColumn={column.id}
        lockColumn
      />
    </>
  );
};

export { KanbanColumn };
