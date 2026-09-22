import { CourseCard } from "@/components/course-card";
import { RegisterDialog } from "@/components/register-dialog";
import { courses, currentStudent, enrollments } from "@/lib/mock-data";

import { useState } from "react";

export default function Enrollent() {
  
  const [ enroll, setEnroll ] = useState(enrollments);
  
  const onRegister = (courseId: string, enrollTime: string) => {
    
    let enrolledDate = new Date();
    enrolledDate.setHours(parseInt(enrollTime.split(":")[0]));
    enrolledDate.setMinutes(parseInt(enrollTime.split(":")[1]));
    
    setEnroll((prevEnrollments) => [
      ...prevEnrollments,
      {
        studentId: currentStudent.studentId,
        courseId: courseId,
        enrolledAt: enrolledDate.toISOString(),
      },
    ]);
  }
  
  const onDelete = (courseId: string) => {
    setEnroll((prevEnrollments) => 
      prevEnrollments.filter(
        (enrollment) => !(enrollment.studentId === currentStudent.studentId && enrollment.courseId === courseId)
      )
    );
  }

  
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-xl font-semibold">รายวิชาทั้งหมด</h1>
          <RegisterDialog 
            enrolledCourses={enroll.filter(e => e.studentId === currentStudent.studentId).map(e => e.courseId)}
            onRegister={onRegister}
          />
        </div>
      </div>
        <div className="flex flex-col gap-4">
          {courses.map((course) => (
            <CourseCard
              key={course.courseId}
              course={course}
              student={currentStudent}
              enrolledAt={enroll.find(
                (e) =>
                  e.courseId === course.courseId &&
                  e.studentId === currentStudent.studentId
              )?.enrolledAt}
              onDelete={onDelete}
            />
          ))}
        </div>
        
    </div>
  );
}
