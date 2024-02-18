import { useState, useEffect } from 'react';
import Head from 'next/head';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { AccountProfileDetails } from 'src/sections/account/account-profile-details';
import { OverviewLatestProducts } from 'src/sections/overview/overview-latest-products';
import { v4 as uuidv4 } from 'uuid'; 

const Page = () => {
  const now = new Date();
  const [products, setProducts] = useState([]);
  const [forceRender, setForceRender] = useState(false); 

  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      const parsedProducts = JSON.parse(storedProducts);
      setProducts(parsedProducts);
    }
  }, []);

  const saveProductsToLocalStorage = (newProducts) => {
    localStorage.setItem('products', JSON.stringify(newProducts));
  };

  const handleProfileDetailsSubmit = (values) => {
    const index = products.length; // Calcula o índice com base no comprimento da lista de produtos
    debugger
    const newProduct = {
      id: uuidv4(),
      image: `/assets/products/product-${index + 1}.png`, // Adiciona +1 pois os índices começam em 0
      name: values.firstName,
      description: values.lastName,
      updatedAt: now.getTime()
    };
  
    const newProducts = [...products, newProduct];
    setProducts(newProducts);
    saveProductsToLocalStorage(newProducts);
    setForceRender(prevState => !prevState); 
  };
  
  

  return (
    <>
      <Head>
        <title>Cursos | Twygo Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={3}>
            <div>
              <Typography variant="h4">
                Cursos
              </Typography>
            </div>
            <div>
              <Grid container spacing={3}>
                <Grid xs={12} md={6} lg={8}>
                  <AccountProfileDetails onSubmit={handleProfileDetailsSubmit} />
                </Grid>
              </Grid>
              <Grid xs={12} lg={8}>
                <OverviewLatestProducts products={products} setProducts={setProducts} sx={{ height: '100%' }} key={forceRender} />
              </Grid>
            </div>
          </Stack>
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Page;
