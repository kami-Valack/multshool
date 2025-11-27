"use client";

import styled from "styled-components";
import BackgroundVectors from "@/components/Bg_vectors";
import Header from "@/components/ui/HeaderWelcome";
import Icon from "@/components/ui/IconLogo";
import TipsBg from "@/assets/backgrounds/tip_steps.svg";
import Button from "@/components/ui/Button";

const ImageTips = styled.div`
  width: 90%;
  height: 30vh;
  background: url(${TipsBg.src}) no-repeat center center;
  background-size: contain;
  margin-top: 1rem;
  flex-shrink: 0;
`;
const Cab = styled.div`
width: 90%;
display: flex;
justify-content; center;
align-items: center;
`;

const Content = styled.div`
  width: 85%;
  height: 
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 1.2rem 0 0 0;
  padding-bottom: 2rem;
`;

const Text = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-weight: ${(props) => props.theme.fonts.weight.regular};
  font-size: 1.7rem;
`;

const Description = styled.p`
  color: ${(props) => props.theme.colors.foreground};
  font-weight: ${(props) => props.theme.fonts.weight.regular};
  font-size: 0.85rem;
  line-height: 1.5;
  text-align: justify;
`;

const Btn = styled.div`
  width: 100%;
  flex-shrink: 0;
  margin-top: 1rem;
`;

export default function Tips() {
  return (
    <>
      <BackgroundVectors>
        {/* background separado, atrás de tudo */}
        <Cab>
          <Header
            variant="logo"
            logoComponent={<Icon width={40} height={50} />}
            onBackClick={() => console.log("Voltar clicado")}
          />
        </Cab>
        <ImageTips/>
        <Content>
          <Text>
            <Title>Deixe-nos explicar:</Title>
            <Description> 
              Para criar uma conta, é necessário inscrever-se numa instituição
              de ensino médio ou superior. Assim, os próximos passos serão
              explorar e escolher uma instituição de ensino e, em seguida,
              realizar a inscrição tanto na instituição escolhida quanto na
              plataforma. Vamos começar?
            </Description>
          </Text>
          <Btn>
            <Button
              bgColor="primary"
              textColor="#FFFFFF"
              text="Percebido!"
              hasBorder={false}
              href="/explore"
            />
          </Btn>
        </Content>
      </BackgroundVectors>
    </>
  );
}
