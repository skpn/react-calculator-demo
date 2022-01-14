import * as React from 'react';
import { useRouter } from 'next/router';

export default function ComponentsPage() {
  const router = useRouter();
  console.log(router.query);
  const pokemonId = router.query.pokemonId;
  return <p>pokemonId: {pokemonId}</p>;
}
