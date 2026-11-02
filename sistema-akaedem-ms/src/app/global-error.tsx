"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="pt">
      <body
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "2rem",
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
        }}
      >
        <h1 style={{ fontSize: "1.25rem", marginBottom: "0.5rem" }}>
          Erro na aplicação
        </h1>
        <p style={{ color: "#666", maxWidth: 480, marginBottom: "1.5rem" }}>
          {error.message || "Algo correu mal. Recarregue a página."}
        </p>
        <button
          type="button"
          onClick={() => reset()}
          style={{
            padding: "0.75rem 1.25rem",
            borderRadius: 8,
            border: "none",
            background: "#6C5F8D",
            color: "#fff",
            cursor: "pointer",
          }}
        >
          Tentar novamente
        </button>
      </body>
    </html>
  );
}
