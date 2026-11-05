"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/navigation";
import Header from "@/components/ui/HeaderGeneral";
import BottomMenu from "@/components/ui/BottomMenu";
import Button from "@/components/ui/Button";
import { SchoolEvent, studentService } from "@/services/studentService";
import { formatLocalDate } from "@/utils/dates";

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: ${(props) => props.theme.fonts.family.poppins};
  padding-bottom: 120px;
`;

const List = styled.div`
  width: 90%;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-top: 16px;
`;

const Card = styled.div`
  background: ${(props) => props.theme.colors.background_2};
  border-radius: 12px;
  padding: 16px;
`;

const Title = styled.p`
  font-weight: ${(props) => props.theme.fonts.weight.semibold};
  margin: 0 0 4px;
`;

const Meta = styled.p`
  font-size: 13px;
  color: ${(props) => props.theme.colors.foreground};
  margin: 0 0 8px;
`;

export default function EventosPage() {
  const router = useRouter();
  const [events, setEvents] = useState<SchoolEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    studentService
      .getEvents()
      .then(setEvents)
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
  }, []);

  const inscrever = async (event: SchoolEvent) => {
    setBusyId(event.id);
    setError(null);
    try {
      await studentService.registerForEvent(event.id);
      load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erro ao inscrever");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <Container>
      <Header variant="withBack" title="Eventos" />
      <List>
        {loading && <p>A carregar...</p>}
        {!loading && events.length === 0 && <p>Ainda não há dados</p>}
        {error && <p>{error}</p>}
        {events.map((event) => (
          <Card key={event.id}>
            <Title>{event.title}</Title>
            <Meta>
              {formatLocalDate(event.starts_at)}
              {event.location ? ` · ${event.location}` : ""}
            </Meta>
            {event.description && <Meta>{event.description}</Meta>}
            <Meta>
              {event.is_free
                ? "Gratuito"
                : `${Number(event.price).toLocaleString("pt-PT")} kz`}
              {event.paid ? " · Inscrito" : ""}
            </Meta>
            {!event.paid && event.is_free && (
              <Button
                bgColor="primary"
                textColor="#FFFFFF"
                text={busyId === event.id ? "A inscrever..." : "Inscrever"}
                onClick={() => inscrever(event)}
              />
            )}
            {!event.paid && !event.is_free && (
              <Button
                bgColor="primary"
                textColor="#FFFFFF"
                text="Pagar"
                onClick={() =>
                  router.push(
                    `/estudante/cartoes/credito/pagamentos/eventos/${event.id}`
                  )
                }
              />
            )}
          </Card>
        ))}
      </List>
      <BottomMenu />
    </Container>
  );
}
