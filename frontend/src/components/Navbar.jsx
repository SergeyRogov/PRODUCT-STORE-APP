import {
  Button,
  Container,
  Flex,
  HStack,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { MdSunny } from "react-icons/md";
import { IoMdMoon } from "react-icons/io";

const Navbar = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Container maxW={"1140px"} px={4}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{ base: "column", sm: "row" }}
      >
        <Text
          fontSize={{ base: "22", sm: "28" }}
          fontWeight={"bold"}
          textTransform={"uppercase"}
          textAlign={"center"}
          bgGradient={"linear(to-r, #555555, #FF0000)"}
          bgClip={"text"}
        >
          <Link to={"/"}>Product Store</Link>
        </Text>
        <HStack spacing={2} alignItems={"center"}>
          <Link to={"/create"}>
            <Button>
              <FaCartPlus
                color={useColorModeValue("grey", "red")}
                fontSize={20}
              />
            </Button>
          </Link>
          <Button onClick={toggleColorMode}>
            {colorMode == "light" ? (
              <IoMdMoon color={"grey"} fontSize={20} />
            ) : (
              <MdSunny color={"red"} fontSize={20} />
            )}
          </Button>
        </HStack>
      </Flex>
    </Container>
  );
};

export default Navbar;
