import Head from 'next/head';
import { subDays, subHours } from 'date-fns';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { Layout as DashboardLayout } from 'src/layouts/dashboard/layout';
import { OverviewBudget } from 'src/sections/overview/overview-budget';
import { OverviewLatestOrders } from 'src/sections/overview/overview-latest-orders';
import { OverviewLatestProducts } from 'src/sections/overview/overview-latest-products';
import { OverviewSales } from 'src/sections/overview/overview-sales';
import { OverviewTasksProgress } from 'src/sections/overview/overview-tasks-progress';
import { OverviewTotalCustomers } from 'src/sections/overview/overview-total-customers';
import { OverviewTotalProfit } from 'src/sections/overview/overview-total-profit';
import { OverviewTraffic } from 'src/sections/overview/overview-traffic';
import { v4 as uuidv4 } from 'uuid'; // Importe a função v4 da biblioteca uuid
import { ProductsSearch } from 'src/sections/product/products-search';

import { AccountProfileDetails } from 'src/sections/account/account-profile-details'; // Importe o componente AccountProfileDetails
import { useState } from 'react';
const now = new Date();

const Page = () => {
  const [productsCurse, setProductsCurse] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const handleProfileDetailsSubmit = (values) => {
    console.log('Valores do AccountProfileDetails:', values);

    const newProduct = {
      id: uuidv4(), 
      image: '/assets/products/product-1.png', 
      name: values.firstName, 
      updatedAt: now.getTime()
    };
    
    setProductsCurse((prevProducts) => [...prevProducts, newProduct]);
  };
  const handleDelete = (productId) => {
    const updatedProducts = productsCurse.filter((product) => product.id !== productId);
    setProductsCurse(updatedProducts);
    setFilteredProducts(updatedProducts);
  };

  const totalCourses = productsCurse.length;
  const chartSeriesRounded = productsCurse.map(() => Math.round(100 / totalCourses));
  
  return (
  <>
    <Head>
      <title>
        Visão Geral | Twygo Kit
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      
      <Container maxWidth="xl">
        
        <Grid
          container
          spacing={3}
        >
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewBudget
              difference={12}
              positive
              sx={{ height: '100%' }}
              value="R$ 800,00"
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewTotalCustomers
              difference={16}
              positive={false}
              sx={{ height: '100%' }}
              value="30"
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewTasksProgress
              sx={{ height: '100%' }}
              value={75.5}
            />
          </Grid>
          <Grid
            xs={12}
            sm={6}
            lg={3}
          >
            <OverviewTotalProfit
              sx={{ height: '100%' }}
              value="140 horas"
            />
          </Grid>
           
          <Grid xs={12} lg={8}>
         
          <OverviewLatestProducts 
            products={filteredProducts.length ? filteredProducts : productsCurse}
            setProducts={setProductsCurse} 
            sx={{ height: '100%' }} 
            onDelete={handleDelete}
            filteredProducts={filteredProducts} 
          />
         
          </Grid>
    
          <Grid
            xs={12}
            md={6}
            lg={4}
          >
        <OverviewTraffic
            chartSeries={chartSeriesRounded}
            labels={productsCurse.map(product => product.name)}
            sx={{ height: '100%' }}
        />

          </Grid>
          <Grid
            xs={12}
            md={6}
            lg={4}
          >
         
          </Grid>
        </Grid>
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
