"use client";

import styled from "styled-components";
import { useState } from "react";
import BottomMenu from "@/components/ui/BottomMenu";
import Header from "@/components/ui/HeaderGeneral";
import { getEnrollmentDetails } from "@/helper/findStudent";
const enrollment = getEnrollmentDetails("enr-1");
import { mockStudents } from "@/mocks/student";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { AlertModal } from "@/components/AlertModal";

// Styled Components
const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: ${(props) => props.theme.fonts.family.poppins};
`;

const Top = styled.div`
  width: 100%;
`;

const StudentInfo = styled.div`
  width: 90%;
  background: #f5f5f5;
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px 0 30px 0;
`;

const Photo = styled.div`
  width: 90px;
  height: 90px;
  position: relative;
  border-radius: 50%;
  margin: 20px 0 0 0;
`;

const Nome = styled.p`
  font-size: 16px;
  color: ${(props) => props.theme.colors.primary};
  margin: 15px 0 0 0;
  font-weight: 600;
`;

const Class = styled.p`
  font-size: 13px;
  color: #333;
  margin: 4px 0;
`;

const FormSection = styled.div`
  width: 100%;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FormTitle = styled.h2`
  font-size: 18px;
  color: ${(props) => props.theme.colors.primary};
  text-align: center;
  margin-bottom: 15px;
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
`;

const Justification = styled.textarea`
  width: 85%;
  height: 80px;
  background: ${(props) => props.theme.colors.background_2};
  border-radius: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  font-size: 14px;
  font-family: ${(props) => props.theme.fonts.family.poppins};
  color: #333;
  resize: none;

  &:focus {
    outline: none;
    border-color: #bbb;
  }
`;

const SelectMonth = styled.div`
  margin: 20px 0;
  width: 90%;
`;

const CustomSelect = styled.select`
  width: 100%;
  padding: 10px;
  border-radius: 10px;
  border: 1px solid #ddd;
  font-size: 14px;
  font-family: ${(props) => props.theme.fonts.family.poppins};
  color: #333;
  background: #f5f5f5;
  appearance: none;
  &:focus {
    outline: none;
    border-color: #bbb;
  }
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="12" height="6"><path d="M0 0l6 6 6-6z" fill="%23333"/></svg>');
  background-repeat: no-repeat;
  background-position: right 10px center;
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 10px 0 20px 0;
  cursor: pointer;
  width: 90%;
`;

const Checkbox = styled.input`
  margin-right: 10px;
  cursor: pointer;
`;

const CheckboxLabel = styled.label`
  font-size: 14px;
  font-family: ${(props) => props.theme.fonts.family.poppins};
  color: #333;
  cursor: pointer;
`;

const ContinueButton = styled.div`
  width: 90%;
  margin: 20px 0 130px 0;
`;

export default function FormAdiantamento() {
  const student = mockStudents.find((s) => s.id === "stu-1");
  const [justification, setJustification] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("Agosto");
  const [commitment, setCommitment] = useState(false);
  const router = useRouter();
  const [isAlertOpen, setIsAlertOpen] = useState(false);

  const handleConfirmAlert = () => {
    setIsAlertOpen(true);
  };
  const handleCloseAlert = () => {
    setIsAlertOpen(false);
  };

  const handlePage = () => {
    router.push(`/cartoes/credito/instituicao`);
  };

  const handleJustificationChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setJustification(e.target.value.slice(0, 150));
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(e.target.value);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommitment(e.target.checked);
  };

  if (enrollment) {
    return (
      <Container>
        <Top>
          <Header variant="withBack" title="Reportar erro" />
        </Top>

        <StudentInfo>
          <Photo>
            {student?.profilePhoto && (
              <Image
                src={student.profilePhoto}
                alt={student.fullName}
                fill
                style={{ objectFit: "cover", borderRadius: "50%" }}
              />
            )}
          </Photo>
          <Nome>{student?.fullName}</Nome>
          <Class>ano - {enrollment.course?.name}</Class>
        </StudentInfo>

        <FormSection>
          <FormTitle>Conte-nos o que aconteceu</FormTitle>
          <Justification
            value={justification}
            onChange={handleJustificationChange}
            placeholder="Descreva o problema"
          />
          <ContinueButton>
            <Button
              bgColor="primary"
              textColor="#FFFFFF"
              text="Continuar"
              hasBorder={true}
              onClick={handleConfirmAlert}
            />
          </ContinueButton>
        </FormSection>
        <BottomMenu />

        {isAlertOpen && (
          <AlertModal
            isOpen={isAlertOpen}
            title="Obrigado pelo seu feedback"
            message="O seu feedback é muito importante para melhorarmos a sua experiência. A nossa equipa já está a tratar do assunto"
            onClose={handleCloseAlert}
            onConfirm={() => {
              handleCloseAlert();
              router.push("");
            }}
            showCancelButton={false}
          />
        )}
      </Container>
    );
  }
  return null;
}
