"use client";
import { createSprint } from "@/actions/sprints";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { sprintSchema } from "@/app/lib/validators";
import { addDays, format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DayPicker } from "react-day-picker";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import { CalendarIcon } from "lucide-react";
import "react-day-picker/style.css";
import useFetch from "@/hooks/use-fetch";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const SpringCreationForm = ({
  projectTitle,
  projectKey,
  projectId,
  sprintKey,
}) => {
  const [showForm, setShowForm] = useState(false);
  const [dateRange, setDateRange] = useState({
    from: new Date(),
    to: addDays(new Date(), 14),
  });

  const router = useRouter();

  const { loading: createSprintLoading, fn: createSprintFn } =
    useFetch(createSprint);

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(sprintSchema),
    defaultValues: {
      name: `${projectKey}-${sprintKey}`,
      startDate: dateRange.from,
      endDate: dateRange.to,
    },
  });

  const onSubmit = async (data) => {
    await createSprintFn(projectId, {
      ...data,
      startDate: dateRange.from,
      endDate: dateRange.to,
    });
    setShowForm(false);
    toast.success("Sprint created successfully");
    router.refresh(); // Refresh the page to show updated data
  };

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-5xl font-bold mb-8 gradient-title">
          {projectTitle}
        </h1>
        <Button
          className="mt-2"
          onClick={() => setShowForm(!showForm)}
          variant={showForm ? "destructive" : "default"}
        >
          {showForm ? "Cancel" : "Create New Sprint"}
        </Button>
      </div>
      {showForm && (
        <>
          <Card className="pt-4 mb-4">
            <CardContent>
              <form className="flex gap-4 items-end" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex-1">
                  <label htmlFor="Sprint Name">Sprint Name</label>
                  <Input
                    id="name"
                    readOnly
                    className="bg-slate-950"
                    {...register("name")}
                  />
                  {errors.name && (
                    <span className="text-red-500">{errors.name.message}</span>
                  )}
                </div>

                <div className="flex-1">
                  <label className="block text-sm font-medium mb-1">
                    Sprint Duration
                  </label>
                  <Controller
                    control={control}
                    name="startDate"
                    render={({ field }) => (
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={`w-full justify-start text-left font-normal bg-slate-950 ${
                              !dateRange && "text-muted-foreground"
                            }`}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {dateRange.from && dateRange.to ? (
                              format(dateRange.from, "LLL dd, y") +
                              " - " +
                              format(dateRange.to, "LLL dd, y")
                            ) : (
                              <span>Pick a date</span>
                            )}
                          </Button>
                        </PopoverTrigger>

                        <PopoverContent
                          className="w-fit bg-slate-900"
                          align="start"
                        >
                          <DayPicker
                            classNames={{
                              chevron: "fill-blue-500",
                              range_start: "bg-blue-700",
                              range_end: "bg-blue-700",
                              range_middle: "bg-blue-400",
                              day_button: "border-none",
                              today: "border-2 border-blue-700",
                            }}
                            mode="range"
                            disabled={[{ before: new Date() }]}
                            selected={dateRange}
                            onSelect={(range) => {
                              if (range?.from && range?.to) {
                                setDateRange(range);
                                field.onChange(range);
                              }
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    )}
                  />
                </div>

                <Button type="submit" disabled={createSprintLoading}>
                  {createSprintLoading ? "Creating..." : "Create Sprint"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </>
      )}
    </>
  );
};

export default SpringCreationForm;
