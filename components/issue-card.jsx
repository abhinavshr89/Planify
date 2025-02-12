import React, { useState } from "react";

const priorityColor = {
  LOW: "border-green-600",
  MEDIUM: "border-yellow-300",
  HIGH: "border-orange-400",
  URGENT: "border-red-400",
};

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "./ui/badge";
import UserAvatar from "./user-avatar";
import { formatDistance, formatDistanceToNow } from "date-fns";
import { useRouter } from "next/navigation";
import IssueDetailsDialog from "./issue-details-dialog";

const IssueCard = ({
  issue,
  showStatus = false,
  onDelete = () => {},
  onUpdate = () => {},
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const router = useRouter();

  const onDeleteHandler = (...params) => {
    router.refresh();
    onDelete(...params);
  };

  const onUpdateHandler = (...params) => {
    router.refresh();
    onUpdate(...params);
  };

  const created = formatDistanceToNow(new Date(issue.createdAt), {
    addSuffix: true,
  });

  return (
    <>
      <Card
        className="cursor-pointer hover:shadow-md  transition-shadow"
        onClick={() => setIsDialogOpen(true)}
      >
        <CardHeader
          className={`border-t-2 ${priorityColor[issue.priority]} rounded-lg`}
        >
          <CardTitle>{issue.title}</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-2 mt-3">
          {true && <Badge>{issue.status}</Badge>}
          <Badge variant="outline" className="ml-1">
            {issue.priority}
          </Badge>
        </CardContent>
        <CardFooter className="flex flex-col gap-5">
          <UserAvatar user={issue.assignee} />
          <div className="text-xs text-gray-400 w-full">Created {created}</div>
        </CardFooter>
      </Card>
      {isDialogOpen && (
        <>
          <IssueDetailsDialog
            isOpen={isDialogOpen}
            onClose={() => setIsDialogOpen(false)}
            issue={issue}
            onDelete={onDeleteHandler}
            onUpdate={onUpdateHandler}
            borderCol={priorityColor[issue.priority]}
          />
        </>
      )}
    </>
  );
};

export default IssueCard;
