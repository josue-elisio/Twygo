// ParentComponent.js
import React, { useState } from 'react';
import { OverviewLatestProducts } from 'src/sections/overview/overview-latest-products'; // Importe o componente correto

function ParentComponent() {
  const [products, setProducts] = useState([]); // Defina o estado dos produtos corretamente

  // Outras lógicas para carregar e atualizar produtos

  const handleDelete = (productId) => {
    // Implemente a lógica para deletar um produto
    const updatedProducts = products.filter((product) => product.id !== productId);
    setProducts(updatedProducts);
  };

  return (
    <OverviewLatestProducts
      products={products}
      setProducts={setProducts}
      sx={{ height: '100%' }}
      onDelete={handleDelete} // Passe a função de exclusão para o componente filho
    />
  );
}

export default ParentComponent;
