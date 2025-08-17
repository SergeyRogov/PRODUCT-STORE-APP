import {
  Container,
  Heading,
  HStack,
  VStack,
  Text,
  SimpleGrid,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaCartShopping } from "react-icons/fa6";
import { useEffect } from "react";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Container maxW="container.xl" py={12}>
      <VStack>
        <HStack mb={"60px"}>
          <Heading bgGradient={"linear(to-r, #555555, #FF0000)"} bgClip="text">
            Available Products
          </Heading>
          <FaCartShopping fontSize={"35px"} color="#FF0000" />
        </HStack>
        {products.length > 0 ? (
          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={10}
            w={"full"}
          >
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </SimpleGrid>
        ) : (
          <Text
            fontSize={"xl"}
            textAlign={"center"}
            fontWeight={"bold"}
            color={"gray.500"}
          >
            Available products not found 😢{" "}
            <Link to={"/create"}>
              <Text
                as={"span"}
                color={"red.500"}
                _hover={{ textDecoration: "underline" }}
              >
                Add a product
              </Text>
            </Link>
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default HomePage;
