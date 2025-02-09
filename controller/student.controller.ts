import { Request, Response } from "express";

let studentPoints: Record<string, number> = {};

const Student = (studentId: string) => {
  if (!studentPoints[studentId]) {
    studentPoints[studentId] = 1000;
  }
};

export const studentscore = (req: Request, res: Response) => {
  try {
    console.log("Request Body:", req.body);

    const { studentId, amountPaid } = req.body; 

    if (!studentId || typeof studentId !== "string") {
      throw new Error("กรุณากรอกรหัสนักศึกษาให้ถูกต้อง");
    }

    if (typeof amountPaid !== "number" || amountPaid <= 0) {  
      throw new Error("จำนวนเงินต้องเป็นตัวเลขที่มากกว่า 0");
    }

    Student(studentId);

    const points = Math.floor(amountPaid / 100) * 10;
    studentPoints[studentId] += points;

    res.status(200).json({
      success: true,
      message: "สะสมแต้มสำเร็จ",
      studentID: studentId,
      points: points,
      totalPoint: studentPoints[studentId],
    });

  } catch (error) {
    console.error("Error:", (error as Error).message); 
    res.status(400).json({
      success: false,
      message: (error as Error).message,
    });
  }
};
