"use client";

import { DeleteOutlined, DragOutlined, EditOutlined } from "@ant-design/icons";
import { COLUMNS, Task } from "@appTypes/Task";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useDeleteTask } from "@services/tasks/useDeleteTask";
import { App, Button, Card, Popconfirm, Tag, Tooltip, Typography } from "antd";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState } from "react";

import { TaskFormModal } from "../TaskFormModal";

dayjs.extend(relativeTime);

interface TaskCardProps {
  task: Task;
  isDragOverlay?: boolean;
}

const TaskCard = ({ task, isDragOverlay = false }: TaskCardProps) => {
  const { message } = App.useApp();
  const [editOpen, setEditOpen] = useState(false);

  const { mutate: deleteTask, isPending: isDeleting } = useDeleteTask();

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: task.id,
      data: { task },
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging && !isDragOverlay ? 0.4 : 1,
    cursor: isDragging ? "grabbing" : "grab",
  };

  const column = COLUMNS.find((c) => c.id === task.column);

  const handleDelete = () => {
    deleteTask(task.id, {
      onSuccess: () => message.success("Task deleted"),
      onError: () => message.error("Failed to delete task"),
    });
  };

  return (
    <>
      <div ref={setNodeRef} style={style} className="mb-3">
        <Card
          size="small"
          className="shadow-sm hover:shadow-md transition-shadow"
          styles={{
            body: { padding: "12px" },
          }}
          actions={[
            <Tooltip key="drag" title="Drag to move">
              <DragOutlined
                {...listeners}
                {...attributes}
                className="text-gray-400 cursor-grab active:cursor-grabbing"
              />
            </Tooltip>,
            <Tooltip key="edit" title="Edit task">
              <EditOutlined
                onClick={() => setEditOpen(true)}
                className="text-blue-500 hover:text-blue-700"
              />
            </Tooltip>,
            <Popconfirm
              key="delete"
              title="Delete this task?"
              description="This action cannot be undone."
              onConfirm={handleDelete}
              okText="Delete"
              okButtonProps={{ danger: true }}
              cancelText="Cancel"
            >
              <Tooltip title="Delete task">
                <Button
                  type="text"
                  size="small"
                  danger
                  loading={isDeleting}
                  icon={<DeleteOutlined />}
                  className="border-none shadow-none"
                />
              </Tooltip>
            </Popconfirm>,
          ]}
        >
          <div className="mb-2">
            <Tag color={column?.tagColor} className="mb-2 text-xs">
              {column?.label}
            </Tag>
            <Typography.Text
              strong
              className="block text-sm leading-tight"
              ellipsis={{ tooltip: task.title }}
            >
              {task.title}
            </Typography.Text>
          </div>

          <Typography.Paragraph
            type="secondary"
            className="text-xs mb-2"
            ellipsis={{ rows: 2, tooltip: task.description }}
            style={{ marginBottom: 4 }}
          >
            {task.description}
          </Typography.Paragraph>

          <Typography.Text type="secondary" className="text-xs">
            {dayjs(task.updatedAt).fromNow()}
          </Typography.Text>
        </Card>
      </div>

      <TaskFormModal
        open={editOpen}
        onClose={() => setEditOpen(false)}
        editTask={task}
      />
    </>
  );
};

export { TaskCard };
