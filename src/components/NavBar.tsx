import { Box, Flex, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  return (
    <Flex bg="tomato" p={4} ml={"auto"}>
      <Box ml={"auto"}>
        <NextLink href="/login" passHref>
          <Link mr={2} color="white">
            Login
          </Link>
        </NextLink>
        <NextLink href="/register" passHref>
          <Link color="white">Register</Link>
        </NextLink>
      </Box>
    </Flex>
  );
};

export default NavBar;
