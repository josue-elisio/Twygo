import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ArrowRightIcon from '@heroicons/react/24/solid/ArrowRightIcon';
import EllipsisVerticalIcon from '@heroicons/react/24/solid/EllipsisVerticalIcon';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardHeader,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Menu,
  MenuItem,
  SvgIcon,
  TextField,
  Typography
} from '@mui/material';
import EditProductModal from 'src/sections/product/alertdialogslide.js'; // Importe o componente do modal de edição
import { formatDistanceToNow } from 'date-fns';
import { v4 as uuidv4 } from 'uuid';

export const OverviewLatestProducts = ({ products: initialProducts = [], sx, setProducts }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [products, setLocalProducts] = useState(() => {
    const storedProducts = localStorage.getItem('products');
    return storedProducts ? JSON.parse(storedProducts) : initialProducts;
  });
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, [setProducts]);

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products));
  }, [products]);

  const handleSaveEdit = (title, description) => {
    const updatedProducts = products.map((product) => {
      if (product.id === selectedProduct.id) {
        return {
          ...product,
          id: uuidv4(),
          name: title,
          description: description
        };
      }
      return product;
    });
    setProducts(updatedProducts);
    setEditModalOpen(false);
    setLocalProducts(updatedProducts);
  };

  const handleDelete = (productId) => {
    const updatedProducts = products.filter((product) => product.id !== productId);
    setProducts(updatedProducts);
    setLocalProducts(updatedProducts);
    handleClose();
  };

  const handleClick = (event, product) => {
    setAnchorEl(event.currentTarget);
    setSelectedProduct(product);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    setEditModalOpen(true);
    handleClose();
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

const filteredProducts = products.filter((product) => {
  return product.name.toLowerCase().includes(searchTerm.toLowerCase());
});
  return (
    <>
      <Card sx={sx}>
        <CardHeader
          title={
            <Typography variant="h5">
              Produtos Mais recentes {`(${products.length})`}
            </Typography>
          }
          action={
            <TextField
              placeholder="Pesquisar produto..."
              value={searchTerm}
              onChange={handleSearchChange}
              variant="outlined"
              size="small"
            />
          }
        />
        <List>
          {filteredProducts.map((product) => {
            const ago = formatDistanceToNow(product.updatedAt);

            return (
              <ListItem key={product.id}>
                <ListItemAvatar>
                  {product.image ? (
                    <Box
                      component="img"
                      src={product.image}
                      sx={{
                        borderRadius: 1,
                        height: 48,
                        width: 48
                      }}
                    />
                  ) : (
                    <Box
                      sx={{
                        borderRadius: 1,
                        backgroundColor: 'neutral.200',
                        height: 48,
                        width: 48
                      }}
                    />
                  )}
                </ListItemAvatar>
                <ListItemText
                  primary={`${product.name} - ${product.description ? product.description : ''}`}
                  primaryTypographyProps={{ variant: 'subtitle1' }}
                  secondary={`Atualizado ${ago} ago`}
                  secondaryTypographyProps={{ variant: 'body2' }}
                />

                <IconButton edge="end" onClick={(event) => handleClick(event, product)}>
                  <SvgIcon>
                    <EllipsisVerticalIcon />
                  </SvgIcon>
                </IconButton>
              </ListItem>
            );
          })}
        </List>
        <Divider />
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleEdit}>Editar</MenuItem>
          <MenuItem onClick={() => handleDelete(selectedProduct.id)}>Excluir</MenuItem>
        </Menu>
      </Card>
      <EditProductModal
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        initialTitle={selectedProduct ? selectedProduct.name : ''}
        initialDescription={selectedProduct ? selectedProduct.description : ''}
        onSave={handleSaveEdit}
      />
    </>
  );
};

OverviewLatestProducts.propTypes = {
  products: PropTypes.array,
  sx: PropTypes.object,
  setProducts: PropTypes.func.isRequired
};
