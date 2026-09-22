import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { courses, currentStudent } from "@/lib/mock-data";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from "@/components/ui/select";


interface RegisterDialogProps {
  enrolledCourses: string[];
  onRegister: (courseId: string, enrollTime: string) => void;
}

/* 
 วิชา (Select component) – แสดงเฉพาะวิชาที่ นศ. ยังไม่ได้ลงทะเบียน โดยให้แสดง
ตัวเลือกในรูปแบบ “รหัสวิชา – ชื่อวิชา”, มีplaceholder เป็นข้อความว่า “เลือกวิชา”
• เลือกเวลา (Input component, type=”time”) - กำหนดค่าเริ่มต้นเป็นเวลาปัจจุบัน
• ชื่อ นศ. (Input component) – กำหนดค่าเริ่มต้นเป็นชื่อของผู้ใช้ปัจจุบัน (readOnly)
• โปรแกรม (Input component) - กำหนดค่าเริ่มต้นเป็นชื่อโปรแกรมของผู้ใช้ปัจจุบัน 
(readOnly)
• ปุ่ม "ยืนยันการลง ท ะเ บี ยน " (Button component) - มีเป็นสถานะ disabled 
จนกว่าจะเลือกวิชา, เมื่อกดปุ่มแล้วแล้วฟอร์มจะปิด และการ์ดของวิชานั้นเปลี่ยนสถานะ
isEnrolled = true

*/

export function RegisterDialog(
  { enrolledCourses, onRegister }: RegisterDialogProps
) {
  const [open, setOpen] = useState(false); // true = แสดง Dialog
  const [courseId, setCourseId] = useState("");
  const [time, setTime] = useState(new Date().toTimeString().slice(0, 5));

  function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    onRegister(courseId, time); // เรียก callback ที่ส่งมาจาก parent component
    setCourseId(""); // เคลียร์ฟอร์ม
    setOpen(false); // ปิด Dialog
  }
  
  const availableCourses = courses.filter(
    (course) => !enrolledCourses.includes(course.courseId)
  );
  
  const selectItem = availableCourses.map((course) => { return {
    label: `${course.courseId} - ${course.courseTitle}`,
    value: course.courseId,
    }});
  
  
  
  
  
  

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* ปุ่มที่กดแล้วเปิด Dialog */}
      <DialogTrigger>
        <Button>ลงทะเบียน</Button>
      </DialogTrigger>

      <DialogContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>ลงทะเบียนรายวิชา</DialogTitle>
            <DialogDescription>กรอกข้อมูลเพื่อลงทะเบียน</DialogDescription>
          </DialogHeader>

        <div className="w-full space-y-2">
          <Label htmlFor="fullName">วิชา</Label>
          <Select 
            items={selectItem}
            onValueChange={(value) => {
              setCourseId(value ?? "");
            }}
            value={courseId}
          >
            <SelectTrigger className="w-full h-auto min-h-10 py-3">
              <SelectValue placeholder="เลือกวิชา" 
                className="whitespace-normal text-left"
              />
            </SelectTrigger>
            
            <SelectContent className="w-[var(--radix-select-trigger-width)] max-h-60">
              <SelectGroup>
                <SelectLabel>วิชา</SelectLabel>
                {selectItem.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    <div className="flex flex-col">
                    <span className="block whitespace-normal leading-snug">
                      {item.label}
                    </span>
                    </div>
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>


          <div className="space-y-2">
            <Label htmlFor="fullName">เลือกเวลา</Label>
            <Input id="fullName" type="time" 
                value={time} onChange={(e) => setTime(e.target.value)} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="fullName">ชื่อ-นามสกุล</Label>
            <Input id="fullName" placeholder= {
                `${currentStudent.firstName} ${currentStudent.lastName}`} readOnly />
          
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="fullName">โปรแกรม</Label>
            <Input id="fullName" placeholder={currentStudent.program} readOnly />
          </div>
          

          <DialogFooter>
            <Button type="submit"
              onClick={() => {
                handleSubmit;
              }}
             disabled={!courseId}>
             ยืนยัน</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
