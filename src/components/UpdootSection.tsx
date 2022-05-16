import { ChevronUpIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Flex, IconButton, Icon } from "@chakra-ui/react";
import React, { useState } from "react";
import { PostSnippetFragment, useVoteMutation } from "../generated/graphql";

interface UpdootSectionProps {
  post: PostSnippetFragment;
}

const UpdootSection: React.FC<UpdootSectionProps> = ({ post }) => {
  const [loadingState, setLoadingState] = useState<
    "updoot-loading" | "downdoot-loading" | "not-loading"
  >("not-loading");

  const [, vote] = useVoteMutation();

  return (
    <Flex
      direction={"column"}
      justifyContent={"center"}
      alignItems={"center"}
      mr={4}
    >
      <IconButton
        aria-label="Up vote"
        icon={<Icon as={ChevronUpIcon} w={6} h={6} />}
        bgColor={post.voteStatus === 1 ? "green" : undefined}
        color={post.voteStatus === 1 ? "white" : undefined}
        onClick={async () => {
          if (post.voteStatus === 1) return;
          setLoadingState("updoot-loading");
          await vote({
            value: 1,
            postId: post.id,
          });
          setLoadingState("not-loading");
        }}
        isLoading={loadingState === "updoot-loading"}
      />
      {post.points}
      <IconButton
        aria-label="Down vote"
        icon={<Icon as={ChevronDownIcon} w={6} h={6} />}
        bgColor={post.voteStatus === -1 ? "red" : undefined}
        color={post.voteStatus === -1 ? "white" : undefined}
        onClick={async () => {
          if (post.voteStatus === -1) return;
          setLoadingState("downdoot-loading");
          await vote({
            value: -1,
            postId: post.id,
          });
          setLoadingState("not-loading");
        }}
        isLoading={loadingState === "downdoot-loading"}
      />
    </Flex>
  );
};

export default UpdootSection;
