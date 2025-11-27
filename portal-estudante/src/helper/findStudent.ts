// HELPER PARA BUSCAR O ESTUDANTE, CURSO E INSCRIÇÃO

import { mockEnrollments } from "@/mocks/inscricao";
import { mockStudents } from "@/mocks/student";
import { mockCourses } from "@/mocks/courses";

export function getEnrollmentDetails(enrollmentId: string) {
  const enrollment = mockEnrollments.find(e => e.id === enrollmentId);
  if (!enrollment) return null;

  const student = mockStudents.find(s => s.id === enrollment.studentId);
  const course = mockCourses.find(c => c.id === enrollment.course);

  return {
    ...enrollment,
    student,
    course,
  };
}
