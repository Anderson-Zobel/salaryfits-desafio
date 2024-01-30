import React from "react";
import { Button, Container } from "@mui/material";

const NoMatch: React.FC = () => {

    //// => Componente que renderiza caso tentem acessar uma rota que não comporta a aplicação

    return (
        <>
            <title>Página Não Encontrada</title>
            <Container>
                <h2>Página não encontrada</h2>
                <p>
                    <Button href="/">Voltar para página principal</Button>
                </p>
            </Container>
        </>
    );
};

export default NoMatch;
