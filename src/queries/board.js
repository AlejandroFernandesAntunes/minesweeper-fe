import gql from 'graphql-tag';

const query = gql`
  query fetchBoard($cols: Int!, $rows: Int!, $difficulty: Int!) {
    fetchBoard(cols: $cols, rows: $rows, difficulty: $difficulty)
  }
`;

export default function fetchBoard({ apollo, cols, rows, difficulty }) {
  return apollo.query({
    query,
    variables: {
      cols,
      rows,
      difficulty
    }
  });
}