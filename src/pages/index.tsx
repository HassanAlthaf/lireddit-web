import { DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  IconButton,
  Link,
  Stack,
  Text,
} from "@chakra-ui/react";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import { useState } from "react";
import Layout from "../components/Layout";
import UpdootSection from "../components/UpdootSection";
import { useDeletePostMutation, usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/createUrqlClient";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string,
  });

  const [{ data, fetching }] = usePostsQuery({
    variables,
  });

  const [, deletePost] = useDeletePostMutation();

  if (!fetching && !data) {
    return <div>No posts were found!</div>;
  }

  return (
    <Layout>
      {fetching && !data ? (
        <div>loading...</div>
      ) : (
        <Stack spacing={8}>
          {data?.posts.posts.map((post) =>
            !post ? null : (
              <Flex p={5} key={post.id} shadow={"md"} borderWidth={"1px"}>
                <UpdootSection post={post} />
                <Box flex={1}>
                  <NextLink href={`/posts/${post.id}`} passHref>
                    <Link>
                      <Heading fontSize="xl">{post.title}</Heading>
                    </Link>
                  </NextLink>

                  <Text>Posted by {post.creator.username}</Text>
                  <Flex>
                    <Text mt={4} flex={1}>
                      {post.textSnippet}
                    </Text>
                    <IconButton
                      ml={"auto"}
                      aria-label="Delete Post"
                      icon={<Icon as={DeleteIcon} w={6} h={6} />}
                      bgColor={"white"}
                      color={"red"}
                      variant={"ghost"}
                      onClick={() => {
                        deletePost({
                          id: post.id,
                        });
                      }}
                    />
                  </Flex>
                </Box>
              </Flex>
            )
          )}
        </Stack>
      )}
      {data && data.posts.hasMore && (
        <Flex>
          <Button
            m="auto"
            my={8}
            isLoading={fetching}
            onClick={() => {
              setVariables({
                limit: variables.limit,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              });
            }}
          >
            Load more
          </Button>
        </Flex>
      )}
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
