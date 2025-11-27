"use client";

import styled from "styled-components";
import { CreditCard as CreditCardType, CardData } from "@/types/contaMS";
import { mockCardData } from "@/mocks/contaMS";
import { formatBalance } from "@/utils/cardMS";
import { getFirstAndLastName } from "@/utils/cutName";
import { useRouter } from "next/navigation";
import ChipNtf from "@/assets/icons/ntf.png";
import Image from "next/image";
import { useEffect, useState } from "react";
import { generateQRCode } from "@/utils/generateQRcode";

// Interfaces para tipagem dos dados da API
interface Activity {
  id: string;
  title: string;
  institution: string;
  status: "pendente" | "em_curso" | "concluido" | "vencida";
  date: string;
  icon?: string;
  description?: string;
}

// Interface para dados do cartão de estudante
interface StudentCardData {
  studentName: string;
  course: string;
  studentNumber: string;
  class: string;
  institutionName: string;
  institutionFullName: string;
  institutionColor: string;
  institutionLogo?: string;
  qrCode?: string;
}

// Styled components para cartão de crédito
const CardContainer = styled.div`
  background: linear-gradient(135deg, #c5a4db 0%, #6c5f8d 100%);
  border-radius: 20px;
  padding: 25px;
  color: white;
  margin-bottom: 25px;
  position: relative;
  overflow: hidden;
`;

const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const SchoolName = styled.h2`
  font-size: 14px;
  font-weight: 500;
  margin: 0;
  opacity: 0.9;
  font-family: ${(props) => props.theme.fonts.family.poppins};
`;

const ChipContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Chip = styled.div<{ $visible?: boolean }>`
  width: 50px;
  height: 22px;
  background: url(${ChipNtf.src});
  background-size: cover;
  background-position: center;
  border-radius: 4px;
  position: relative;
  opacity: ${(props) => (props.$visible ? 1 : 0.5)};
`;

const CardNumber = styled.div`
  font-size: 14px;
  margin-bottom: 25px;
  opacity: 0.9;
  letter-spacing: 1px;
  font-family: ${(props) => props.theme.fonts.family.poppins};
`;

const Balance = styled.div`
  font-size: 25px;
  font-weight: ${(props) => props.theme.fonts.weight.regular};
  margin-bottom: 20px;
  letter-spacing: 1px;
  font-family: "Inconsolata", monospace;
  text-align: center;
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const HolderName = styled.div`
  font-size: 14px;
  opacity: 0.9;
  font-family: ${(props) => props.theme.fonts.family.poppins};
`;

const Provider = styled.div`
  font-size: 12px;
  font-weight: ${(props) => props.theme.fonts.weight.regular};
  opacity: 0.9;
  font-family: "Anta", sans-serif;
`;

// Styled components para cartão de estudante
const StudentCardContainer = styled.div<{ $bgColor: string }>`
  background: ${(props) => props.$bgColor};
  border-radius: 16px;
  padding: 15px 20px;
  color: white;
  margin-bottom: 20px;
  position: relative;
  overflow: hidden;
  min-height: 175px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`;

const StudentCardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 7px;
`;

const InstitutionLogo = styled.div<{ $logo?: string }>`
  width: 50px;
  height: 50px;
  background: ${(props) =>
    props.$logo ? `url(${props.$logo})` : "rgba(255, 255, 255, 0.2)"};
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
`;

const InstitutionInfo = styled.div`
  flex: 1;
`;

const InstitutionFullName = styled.div`
  font-size: 10px;
  opacity: 0.8;
  font-weight: ${(props) => props.theme.fonts.weight.regular};
  font-family: ${(props) => props.theme.fonts.family.poppins};
`;

const StudentInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
`;

const StudentPhoto = styled.div`
  width: 25%;
  height: 90px;
  background: #fff;
  border-radius: 5px;
`;

const StudentInfo = styled.div`
  font-family: ${(props) => props.theme.fonts.family.poppins};
  font-size: 11px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const StudentName = styled.div``;

const CourseInfo = styled.div``;

const StudentNumber = styled.div``;

const ClassInfo = styled.div``;

const Bold = styled.span`
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
`;

const StudentCardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
`;

const MultiSchoolBrand = styled.div`
  font-size: 14px;
  font-weight: 500;
  font-family: ${(props) => props.theme.fonts.family.poppins};
  opacity: 0.9;
`;

const QRCodeContainer = styled.div`
  width: 40px;
  height: 40px;
  background: white;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const QRCodePlaceholder = styled.div`
  width: 40px;
  height: 40px;
  background: #000;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 8px;
  color: white;
  text-align: center;
  line-height: 1.2;
`;

// Interfaces para dados do cartão de estagiário
interface TraineeCardData {
  traineeName: string;
  internshipRole: string;
  traineeNumber: string;
  department: string;
  companyName: string;
  companyFullName: string;
  companyColor: string;
  companyLogo?: string;
  qrCode?: string;
}

// Styled components para cartão de estagiário
const TraineeCardContainer = styled.div<{ $bgColor: string }>`
  background: ${(props) => props.$bgColor};
  border-radius: 16px;
  padding: 35px 20px;
  color: white;
  margin-bottom: 20px;
  position: relative;
  overflow: hidden;
  min-height: 175px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
`;

const TraineeCardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 15px;
  margin-top: -7px;
`;

const TraineeCardLabel = styled.div`
  font-size: 11px;
  font-weight: ${(props) => props.theme.fonts.weight.regular};
  font-family: ${(props) => props.theme.fonts.family.poppins};
  opacity: 0.8;
  text-align: right;
  margin-top: -7px;
`;

const CompanyLogo = styled.div<{ $logo?: string }>`
  width: 50px;
  height: 50px;
  background: ${(props) =>
    props.$logo ? `url(${props.$logo})` : "rgba(255, 255, 255, 0.2)"};
  background-size: cover;
  background-position: center;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 16px;
`;

const CompanyInfo = styled.div`
  flex: 1;
`;

const CompanyFullName = styled.div`
  font-size: 10px;
  opacity: 0.8;
  font-weight: ${(props) => props.theme.fonts.weight.regular};
  font-family: ${(props) => props.theme.fonts.family.poppins};
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
`;

const TraineeInfoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
`;

const TraineePhoto = styled.div`
  width: 25%;
  height: 80px;
  background: #fff;
  border-radius: 5px;
`;

const TraineeInfo = styled.div`
  font-family: ${(props) => props.theme.fonts.family.poppins};
  font-size: 11px;
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const TraineeName = styled.div``;
const InternshipRole = styled.div``;
const TraineeNumber = styled.div``;
const Department = styled.div``;

const TraineeCardFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  position: absolute;
  bottom: 20px;
  left: 20px;
  right: 20px;
`;

const TraineeQRCodeContainer = styled.div`
  width: 60px;
  height: 60px;
  background: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`;

const TraineeQRCodePlaceholder = styled.div`
  width: 50px;
  height: 50px;
  background: #000;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 8px;
  color: white;
  text-align: center;
  line-height: 1.2;
`;

// Props interface
interface TraineeCardProps {
  traineeData: TraineeCardData;
}

// Props interfaces
interface CreditCardProps {
  cardData?: CardData;
}

interface StudentCardProps {
  studentData: StudentCardData;
}

// Componente do cartão de crédito
export function CreditCard({ cardData }: CreditCardProps) {
  // Se não houver cardData, usar dados do usuário autenticado
  const defaultCardData = cardData || mockCardData;
  const { card } = defaultCardData;
  
  // Obter nome do usuário autenticado
  let holderName = card.holderName;
  if (typeof window !== 'undefined') {
    try {
      const userStr = localStorage.getItem('user');
      if (userStr) {
        const user = JSON.parse(userStr);
        if (user?.name) {
          holderName = user.name;
        }
      }
    } catch (e) {
      // Se falhar, usar o nome do cardData
    }
  }
  
  const displayName = getFirstAndLastName(holderName);
  const formattedBalance = formatBalance(card.balance, card.currency);

  return (
    <CardContainer>
      <CardHeader>
        <SchoolName>{card.schoolName}</SchoolName>
        <ChipContainer>
          <Chip $visible={card.hasChip} />
        </ChipContainer>
      </CardHeader>

      <CardNumber>{card.cardNumber}</CardNumber>
      <Balance>{formattedBalance}</Balance>

      <CardFooter>
        <HolderName>{displayName}</HolderName>
        <Provider>{card.provider}</Provider>
      </CardFooter>
    </CardContainer>
  );
}

// Componente do cartão de estudante
export function StudentCard({ studentData }: StudentCardProps) {
  const [qrCode, setQrCode] = useState<string | null>(null);

  useEffect(() => {
    async function createQR() {
      const qr = await generateQRCode(studentData);
      setQrCode(qr);
    }
    createQR();
  }, [studentData]);

  return (
    <StudentCardContainer $bgColor={studentData.institutionColor}>
      <StudentCardHeader>
        <InstitutionLogo $logo={studentData.institutionLogo}>
          {!studentData.institutionLogo &&
            studentData.institutionName.substring(0, 2).toUpperCase()}
        </InstitutionLogo>
        <InstitutionInfo>
          <InstitutionFullName>
            {studentData.institutionFullName} - {studentData.institutionName}
          </InstitutionFullName>
        </InstitutionInfo>
      </StudentCardHeader>

      <StudentInfoContainer>
        <StudentPhoto />
        <StudentInfo>
          <StudentName>
            <Bold>Nome: </Bold> {studentData.studentName}
          </StudentName>
          <CourseInfo>
            <Bold>Curso:</Bold> {studentData.course}
          </CourseInfo>
          <StudentNumber>
            <Bold>Nº matrícula:</Bold> {studentData.studentNumber}
          </StudentNumber>
          <ClassInfo>
            <Bold>Turma: </Bold> {studentData.class}
          </ClassInfo>
        </StudentInfo>
      </StudentInfoContainer>

      <StudentCardFooter>
        <MultiSchoolBrand>multischool Angola</MultiSchoolBrand>
        <QRCodeContainer>
          {qrCode ? (
            <Image src={qrCode} alt="QR Code" width={50} height={50} />
          ) : (
            <QRCodePlaceholder>QR</QRCodePlaceholder>
          )}
        </QRCodeContainer>
      </StudentCardFooter>
    </StudentCardContainer>
  );
}

// Componente do cartão de estagiário
export function TraineeCard({ traineeData }: TraineeCardProps) {
  const [qrCode, setQrCode] = useState<string | null>(null);

  useEffect(() => {
    async function createQR() {
      const qr = await generateQRCode(traineeData);
      setQrCode(qr);
    }
    createQR();
  }, [traineeData]);

  return (
    <TraineeCardContainer $bgColor={traineeData.companyColor}>
      <TraineeCardLabel>Cartão de Estagiário</TraineeCardLabel>
      <TraineeCardHeader>
        <CompanyLogo $logo={traineeData.companyLogo}>
          {!traineeData.companyLogo &&
            traineeData.companyName.substring(0, 2).toUpperCase()}
        </CompanyLogo>
        <CompanyInfo>
          <CompanyFullName>
            {traineeData.companyFullName} - {traineeData.companyName}
          </CompanyFullName>
        </CompanyInfo>
      </TraineeCardHeader>

      <TraineeInfoContainer>
        <TraineePhoto />
        <TraineeInfo>
          <TraineeName>
            <Bold>Nome: </Bold> {traineeData.traineeName}
          </TraineeName>
          <InternshipRole>
            <Bold>Função: </Bold> {traineeData.internshipRole}
          </InternshipRole>
          <TraineeNumber>
            <Bold>ID Estagiário: </Bold> {traineeData.traineeNumber}
          </TraineeNumber>
          <Department>
            <Bold>Departamento: </Bold> {traineeData.department}
          </Department>
        </TraineeInfo>
      </TraineeInfoContainer>

      <TraineeCardFooter>
        <MultiSchoolBrand>multischool Angola</MultiSchoolBrand>
        <TraineeQRCodeContainer>
          <TraineeQRCodePlaceholder>
            {qrCode ? (
              <Image src={qrCode} alt="QR Code" width={50} height={50} />
            ) : (
              "QR"
            )}
          </TraineeQRCodePlaceholder>
        </TraineeQRCodeContainer>
      </TraineeCardFooter>
    </TraineeCardContainer>
  );
}

// Export do componente padrão
export default CreditCard;
