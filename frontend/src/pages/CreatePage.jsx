import { Flex, Input, Text, VStack, Button, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product";
import { useNavigate } from "react-router";

const CreatePage = () => {
  const [creating, setCreating] = useState(false);
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const toast = useToast();
  const navigate = useNavigate();

  const { createProduct } = useProductStore();
  const handleNewProduct = async (e) => {
    e.preventDefault();
    setCreating(true);

    const { success, message } = await createProduct(newProduct);
    if (!success) {
      toast({
        title: "Error",
        description: message,
        status: "error",
        position: "top",
        duration: 3000,
      });
      setCreating(false);
    } else {
      toast({
        title: "Success",
        description: message,
        status: "success",
        position: "top",
        duration: 3000,
      });
      navigate("/");
    }
  };

  return (
    <Flex
      direction={"column"}
      align={"center"}
      justify={"space-between"}
      maxW={"container.sm"}
      gap={"50px"}
      mx={"auto"}
      my={10}
    >
      <Text as="b" fontSize={{ base: "4xl", sm: "5xl" }}>
        Create Product
      </Text>
      <VStack
        w={"full"}
        p={5}
        spacing={5}
        shadow={"dark-lg"}
        borderRadius="lg"
        bg={"gray.750"}
      >
        <Input
          name="name"
          value={newProduct.name}
          focusBorderColor="red.900"
          placeholder="Product Name"
          onChange={(e) =>
            setNewProduct({ ...newProduct, name: e.target.value })
          }
        />
        <Input
          name="price"
          value={newProduct.price}
          type="number"
          focusBorderColor="red.900"
          placeholder="Price"
          onChange={(e) =>
            setNewProduct({ ...newProduct, price: e.target.value })
          }
        />
        <Input
          name="image"
          value={newProduct.image}
          focusBorderColor="red.900"
          placeholder="Image URL"
          onChange={(e) =>
            setNewProduct({ ...newProduct, image: e.target.value })
          }
        />
        <Button
          w={"full"}
          _hover={{ bgGradient: "linear(to-r, #555555, #FF0000)" }}
          _active={{ bg: "red.900" }}
          bgGradient={"linear(to-r, #555555, #FF0000)"}
          disabled={creating}
          onClick={handleNewProduct}
        >
          Create
        </Button>
      </VStack>
    </Flex>
  );
};

export default CreatePage;
