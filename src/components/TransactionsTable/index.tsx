import { Container } from "./styles";

export function TransactionsTable() {
  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Site Impacto Pet</td>
            <td className="deposit">R$ 12.000,00</td>
            <td>Freela</td>
            <td>02/02/2021</td>
          </tr>

          <tr>
            <td>Mercado</td>
            <td className="withdraw">- R$ 1.200,00</td>
            <td>Casa</td>
            <td>02/02/2021</td>
          </tr>
        </tbody>
      </table>
    </Container>
  );
}
