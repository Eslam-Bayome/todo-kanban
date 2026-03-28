"use client";

import { ColumnType, Task } from "@appTypes/Task";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCreateTask } from "@services/tasks/useCreateTask";
import { useUpdateTask } from "@services/tasks/useUpdateTask";
import { App, Form, Input, Modal, Select } from "antd";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

import { taskFormSchema, TaskFormValues } from "./task-form-schema";

const COLUMN_OPTIONS = [
  { label: "Backlog", value: "backlog" },
  { label: "In Progress", value: "in_progress" },
  { label: "Review", value: "review" },
  { label: "Done", value: "done" },
];

interface TaskFormModalProps {
  open: boolean;
  onClose: () => void;
  defaultColumn?: ColumnType;
  editTask?: Task | null;
  lockColumn?: boolean;
}

const TaskFormModal = ({
  open,
  onClose,
  defaultColumn = "backlog",
  editTask,
  lockColumn = false,
}: TaskFormModalProps) => {
  const { message } = App.useApp();
  const isEditing = !!editTask;

  const { mutate: createTask, isPending: isCreating } = useCreateTask();
  const { mutate: updateTask, isPending: isUpdating } = useUpdateTask();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues: {
      title: "",
      description: "",
      column: defaultColumn,
    },
  });

  useEffect(() => {
    if (open) {
      if (editTask) {
        reset({
          title: editTask.title,
          description: editTask.description,
          column: editTask.column,
        });
      } else {
        reset({ title: "", description: "", column: defaultColumn });
      }
    }
  }, [open, editTask, defaultColumn, reset]);

  const onSubmit = (values: TaskFormValues) => {
    if (isEditing && editTask) {
      updateTask(
        { id: editTask.id, ...values },
        {
          onSuccess: () => {
            message.success("Task updated successfully");
            onClose();
          },
          onError: () => message.error("Failed to update task"),
        },
      );
    } else {
      createTask(values, {
        onSuccess: () => {
          message.success("Task created successfully");
          onClose();
        },
        onError: () => message.error("Failed to create task"),
      });
    }
  };

  return (
    <Modal
      title={isEditing ? "Edit Task" : "Create New Task"}
      open={open}
      onCancel={onClose}
      onOk={handleSubmit(onSubmit)}
      okText={isEditing ? "Save Changes" : "Create Task"}
      confirmLoading={isCreating || isUpdating}
      destroyOnHidden={true}
      width={520}
    >
      <Form layout="vertical" className="mt-4">
        <Form.Item
          label="Title"
          required
          validateStatus={errors.title ? "error" : ""}
          help={errors.title?.message}
        >
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Enter task title"
                count={{ show: true, max: 100 }}
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Description"
          required
          validateStatus={errors.description ? "error" : ""}
          help={errors.description?.message}
        >
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <Input.TextArea
                {...field}
                placeholder="Enter task description"
                rows={4}
                count={{ show: true, max: 500 }}
              />
            )}
          />
        </Form.Item>

        <Form.Item
          label="Column"
          required
          validateStatus={errors.column ? "error" : ""}
          help={errors.column?.message}
        >
          <Controller
            name="column"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={COLUMN_OPTIONS}
                placeholder="Select column"
                disabled={lockColumn}
              />
            )}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export { TaskFormModal };
