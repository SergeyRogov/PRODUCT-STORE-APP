import {
  HStack,
  Box,
  Image,
  Heading,
  Text,
  IconButton,
  useColorModeValue,
  useToast,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  Input,
  Button,
  ModalFooter,
} from "@chakra-ui/react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { useProductStore } from "../store/product";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const { deleteProduct, updateProduct } = useProductStore();
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [updating, setUpdating] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const textColor = useColorModeValue("gray.500", "red.500");
  const bgColor = useColorModeValue("white", "gray.900");

  const toast = useToast();

  const handleDelete = async (productId) => {
    const { success, message } = await deleteProduct(productId);
    if (!success) {
      toast({
        title: "Error!",
        description: message,
        status: "error",
        duration: 3000,
        position: "top",
      });
    } else {
      toast({
        title: "Success!",
        description: message,
        status: "success",
        duration: 3000,
        position: "top",
      });
    }
  };

  const handleUpdateProduct = async (e, productId, updatedPoduct) => {
    e.preventDefault();
    setUpdating(true);

    const { success, message } = await updateProduct(productId, updatedPoduct);
    if (!success) {
      toast({
        title: "Error!",
        description: message,
        status: "error",
        duration: 3000,
        position: "top",
      });
    } else {
      toast({
        title: "Success!",
        description: message,
        status: "success",
        duration: 3000,
        position: "top",
      });
      onClose();
    }
    setUpdating(false);
  };

  return (
    <Box
      bg={bgColor}
      shadow={"lg"}
      rounded={"lg"}
      overflow={"hidden"}
      transition={"all 0.3s"}
      _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
    >
      <Image
        src={product.image}
        alt={product.name}
        h={48}
        w={"full"}
        objectFit={"cover"}
      />
      <Box p={4}>
        <Heading as={"h3"} size={"md"} mb={2}>
          {product.name}
        </Heading>
        <Text fontWeight={"bold"} fontSize={"xl"} color={textColor} mb={4}>
          ${product.price}
        </Text>
        <HStack spacing={2}>
          <IconButton
            icon={<FaRegEdit />}
            fontSize={"25px"}
            colorScheme="red"
            onClick={onOpen}
          />
          <IconButton
            icon={<MdDelete />}
            onClick={() => handleDelete(product._id)}
            fontSize={"25px"}
            colorScheme="red"
          />
        </HStack>
      </Box>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Product</ModalHeader>
          <ModalCloseButton />
          <ModalBody m={8} mt={2} mb={4}>
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
                value={updatedProduct.name}
                focusBorderColor="red.900"
                placeholder="Product Name"
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    name: e.target.value,
                  })
                }
              />
              <Input
                name="price"
                value={updatedProduct.price}
                type="number"
                focusBorderColor="red.900"
                placeholder="Price"
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    price: e.target.value,
                  })
                }
              />
              <Input
                name="image"
                value={updatedProduct.image}
                focusBorderColor="red.900"
                placeholder="Image URL"
                onChange={(e) =>
                  setUpdatedProduct({
                    ...updatedProduct,
                    image: e.target.value,
                  })
                }
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button
              mr={4}
              _hover={{ bgGradient: "linear(to-r, #555555, #FF0000)" }}
              _active={{ bg: "red.900" }}
              bgGradient={"linear(to-r, #555555, #FF0000)"}
              disabled={updating}
              onClick={(e) =>
                handleUpdateProduct(e, product._id, updatedProduct)
              }
            >
              Update
            </Button>
            <Button colorScheme="red" mr={3} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default ProductCard;
