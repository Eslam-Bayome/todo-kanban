"use client";

import { PlusOutlined, SearchOutlined } from "@ant-design/icons";
import { COLUMN_IDS, COLUMNS, Task } from "@appTypes/Task";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { AppDispatch } from "@redux/index";
import { setSearchTerm } from "@redux/slices/ui";
import { selectSearchTerm } from "@redux/slices/ui/selectors";
import { useUpdateTask } from "@services/tasks/useUpdateTask";
import { App, Button, Card, Input, Typography } from "antd";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { KanbanColumn } from "../KanbanColumn";
import { TaskCard } from "../TaskCard";
import { TaskFormModal } from "../TaskFormModal";

const KanbanBoard = () => {
  const { message } = App.useApp();
  const dispatch = useDispatch<AppDispatch>();

  const searchTerm = useSelector(selectSearchTerm);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [searchInput, setSearchInput] = useState(searchTerm);

  const { mutate: updateTask } = useUpdateTask();

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    }),
  );

  const handleDragStart = useCallback((event: DragStartEvent) => {
    const task = event.active.data.current?.task as Task | undefined;
    if (task) setActiveTask(task);
  }, []);

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      setActiveTask(null);

      if (!over) return;

      const taskId = active.id as string;
      const overId = over.id as string;
      const draggedTask = active.data.current?.task as Task | undefined;

      if (!draggedTask) return;

      if (
        COLUMN_IDS.includes(overId as (typeof COLUMN_IDS)[number]) &&
        overId !== draggedTask.column
      ) {
        updateTask(
          { id: taskId, column: overId as Task["column"] },
          {
            onSuccess: () =>
              message.success(
                `Task moved to ${COLUMNS.find((c) => c.id === overId)?.label}`,
              ),
            onError: () => message.error("Failed to move task"),
          },
        );
      }
    },
    [updateTask, message],
  );

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchInput(value);
      dispatch(setSearchTerm(value));
    },
    [dispatch],
  );

  return (
    <div className="flex flex-col h-full gap-4">
      {/* Toolbar */}
      <Card
        size="small"
        className="shadow-sm"
        styles={{ body: { padding: "12px 16px" } }}
      >
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
            <Typography.Title level={4} style={{ margin: 0 }}>
              Task Board
            </Typography.Title>
            <Typography.Text type="secondary" className="text-xs">
              Drag and drop tasks between columns to update their status
            </Typography.Text>
          </div>

          <div className="flex items-center gap-3">
            <Input
              value={searchInput}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="Search by title or description..."
              prefix={<SearchOutlined className="text-gray-400" />}
              allowClear
              style={{ width: 300 }}
            />
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => setCreateOpen(true)}
            >
              New Task
            </Button>
          </div>
        </div>
      </Card>

      {/* Board */}
      <DndContext
        sensors={sensors}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div
          className="flex gap-4 overflow-x-auto pb-4"
          style={{ alignItems: "flex-start" }}
        >
          {COLUMNS.map((column) => (
            <KanbanColumn key={column.id} column={column} />
          ))}
        </div>

        <DragOverlay dropAnimation={null}>
          {activeTask ? (
            <div
              style={{
                width: 280,
                opacity: 0.95,
                transform: "rotate(2deg)",
              }}
            >
              <TaskCard task={activeTask} isDragOverlay />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      <TaskFormModal open={createOpen} onClose={() => setCreateOpen(false)} />
    </div>
  );
};

export { KanbanBoard };
