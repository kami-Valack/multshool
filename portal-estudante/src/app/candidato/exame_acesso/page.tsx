"use client";

import { useState } from "react";
import { StepLayout } from "@/components/candidato/StepExam";
import { OptionSelect } from "@/components/OptionSelect";
import { AlertModal } from "@/components/AlertModal";
import styled from "styled-components";
import { useRouter } from "next/navigation";

const boldText = styled.span`
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
`;

const ExamForm: React.FC = () => {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showAlert, setShowAlert] = useState(false);



  const courseOptions = [
    { id: "isptec-prep", title: "Curso preparatório ISPTEC + Exame de Acesso" },
    { id: "exam-only", title: "Exame de Acesso" },
    {
      id: "multischool-online",
      title: "Curso Preparatório Multischool (Online) + Exame de Acesso",
    },
    { id: "isptec-prep-only", title: "Curso Preparatório ISPTEC" },
    { id: "multischool-prep", title: "Curso Preparatório Online Multischool" },
  ];

  const dateOptions = [
    {
      id: "aug-02",
      title: "Quarta-feira, 02 de Agosto de 2025",
      subtitle: "08h às 10h30",
    },
    {
      id: "aug-03",
      title: "Quinta-feira, 03 de Agosto de 2025",
      subtitle: "12h30 às 14:30",
    },
    {
      id: "aug-04",
      title: "Sexta-feira, 04 de Agosto de 2025",
      subtitle: "08h às 10h30",
    },
  ];

  const getSelectedDateText = () => {
    const selected = dateOptions.find((option) => option.id === selectedDate);
    return selected ? selected.title.toLowerCase() : "";
  };

  const handleContinue = () => {
    if (currentStep === 1 && selectedCourse) {
      setCurrentStep(2);
    } else if (currentStep === 2 && selectedDate) {
      setShowAlert(true);
    }
  };

  // const handleConfirmAlert = () => {
  //   // Handle form submission
  //   console.log("Form submitted:", {
  //     course: selectedCourse,
  //     date: selectedDate,
  //   });
  //   setShowAlert(false);
  //   // Redirect or show success message
  // };

   const handleConfirmNavigation = () => {
    router.push('pagamento');
  };

  const handleCancelAlert = () => {
    setShowAlert(false);
  };

  const handleBack = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    }
  };

  if (currentStep === 1) {
    return (
      <>
        <StepLayout
          title="O que pretende?"
          subtitle="Selecione uma opção:"
          onContinue={handleContinue}
          onBack={handleBack}
        >
          {courseOptions.map((option) => (
            <OptionSelect
              key={option.id}
              title={option.title}
              selected={selectedCourse === option.id}
              onClick={() => setSelectedCourse(option.id)}
            />
          ))}
        </StepLayout>

        <AlertModal
          isOpen={showAlert}
          title="Atenção!"
          message={`O seu exame de acesso vai ser marcado para ${getSelectedDateText()}`}
          confirmText="Confirmar"
          cancelText="Cancelar"
          onConfirm={handleConfirmNavigation}
          onCancel={handleCancelAlert}
          onClose={handleCancelAlert}
        />
      </>
    );
  }

  return (
    <>
      <StepLayout
        title="Marque o seu exame de acesso"
        subtitle="Selecione uma data:"
        onContinue={handleContinue}
        onBack={handleBack}
        profileName="Nome indefinido"
        profileSubtitle="Instituição de ensino selecionada"
      >
        {dateOptions.map((option) => (
          <OptionSelect
            key={option.id}
            title={option.title}
            subtitle={option.subtitle}
            selected={selectedDate === option.id}
            onClick={() => setSelectedDate(option.id)}
          />
        ))}
      </StepLayout>

      <AlertModal
        isOpen={showAlert}
        title="Atenção!"
        message={`O seu exame de acesso vai ser marcado para ${getSelectedDateText()}`}
        confirmText="Confirmar"
        cancelText="Cancelar"
        onConfirm={handleConfirmNavigation}
        onCancel={handleCancelAlert}
        onClose={handleCancelAlert}
      />
    </>
  );
};

export default ExamForm;
