import { Box, Button, Flex, Heading, Link } from "@chakra-ui/react";
import React from "react";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/isServer";

interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(), // Don't run this on SSR.
  });
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
        <Flex alignItems={"center"}>
          <NextLink href="/create-post" passHref>
            <Button as={Link} mr={2} variant={"solid"} color={"black"}>
              Create Post
            </Button>
          </NextLink>
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
    <Flex
      bg="tomato"
      p={4}
      ml={"auto"}
      position={"sticky"}
      top={0}
      zIndex={1}
      color={"white"}
    >
      <Flex maxW={800} alignItems={"center"} flex={1} m={"auto"}>
        <NextLink href={"/"} passHref>
          <Link>
            <Heading color={"white"}>LiReddit</Heading>
          </Link>
        </NextLink>
        <Box ml={"auto"}>{body}</Box>
      </Flex>
    </Flex>
  );
};

export default NavBar;
