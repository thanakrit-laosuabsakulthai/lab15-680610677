import type { Course, Student } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import { cn } from "@/lib/utils";

import { Badge } from "@/components/ui/badge";
import { Trash2 } from "lucide-react";
type CourseCardProps = {
  course: Course;
  student: Student;
  enrolledAt?: string;
  onDelete: (courseId: string) => void;
};


export function CourseCard({ course, student, enrolledAt, onDelete }: CourseCardProps) {
  return (
    <Card className="relative">
      <Badge
        variant="secondary"
        // className="absolute right-2 top-2 text-xs font-normal m-2"
        // className={
        //   enrolledAt ? "bg-amber-200 text-amber-700 dark:bg-purple-800 dark:text-purple-200"
        //   : "bg-green-200 text-green-700 dark:bg-green-800 dark:text-green-200"
        // }
        className={cn(
          "absolute right-2 top-2 text-xs font-normal m-2",
          enrolledAt ? "bg-amber-100 text-amber-700 dark:bg-purple-800 dark:text-purple-200"
          : "bg-purple-200 text-purple-700 dark:bg-amber-700 dark:text-amber-100"
        )}
      >
        {enrolledAt ? "ลงทะเบียนแล้ว" : "เปิดรับ"}
      </Badge>
      
      {
        // delete button
        enrolledAt && (
          <Button
            variant="outline"
            size="sm"
            className="absolute right-4 bottom-4"
            onClick={() => {
              if (onDelete) {
                onDelete(course.courseId);
              }
            }}
          >
            <Trash2 className="text-destructive" />
            
          </Button>
        )
      }
      
      <CardHeader>
        <CardTitle className="text-base">{course.courseTitle}</CardTitle>
        <CardDescription>
          รหัสวิชา: {course.courseId} · ผู้สอน: {course.instructors.join(", ")}
        </CardDescription>
      </CardHeader>
      {/* <CardContent className="flex items-end justify-between">
        <div className="text-xs text-muted-foreground">
          <p>
            ชื่อ นศ.: {student.firstName} {student.lastName}
          </p>
          <p>โปรแกรม: {student.program}</p>
          <p>ลงทะเบียนเมื่อ: {enrolledAt}</p>
        </div>
      </CardContent> */}
      {
        enrolledAt && (
          <CardContent className="flex items-end justify-between">
            <div className="text-xs text-muted-foreground">
              <p>
                ชื่อ นศ.: {student.firstName} {student.lastName}
              </p>
              <p>โปรแกรม: {student.program}</p>
              <p>ลงทะเบียนเมื่อ: {new Date(enrolledAt).toLocaleString("th-TH", {
                year: "numeric",
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}</p>
            </div>
          </CardContent>
        )
      }
      
      
      
      
      
      
      
      
    </Card>
  );
}
