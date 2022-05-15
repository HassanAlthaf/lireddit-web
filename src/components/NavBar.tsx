import { Box, Button, Flex, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery();
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();

  let body = null;

  if (fetching) {
  } else if (!data?.me) {
    body = (
      <>
        <NextLink href="/login" passHref>
          <Link mr={2} color="white">
            Login
          </Link>
        </NextLink>
        <NextLink href="/register" passHref>
          <Link color="white">Register</Link>
        </NextLink>
      </>
    );
  } else {
    body = (
      <>
        <Flex color={"white"}>
          <Box mr={2}>{data.me.username}</Box>
          <Button
            variant={"link"}
            onClick={() => logout()}
            isLoading={logoutFetching}
          >
            Logout
          </Button>
        </Flex>
      </>
    );
  }

  return (
    <Flex bg="tomato" p={4} ml={"auto"}>
      <Box ml={"auto"}>{body}</Box>
    </Flex>
  );
};

export default NavBar;
