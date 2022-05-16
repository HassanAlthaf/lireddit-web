import React from "react";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../../../utils/createUrqlClient";
import Layout from "../../../components/Layout";
import { Box, Button } from "@chakra-ui/react";
import { Formik, Form } from "formik";
import { useRouter } from "next/router";
import InputField from "../../../components/InputField";
import TextareaField from "../../../components/TextareaField";
import {
  usePostQuery,
  useUpdatePostMutation,
} from "../../../generated/graphql";

interface EditPostProps {}

const EditPost: React.FC<EditPostProps> = ({}) => {
  const router = useRouter();
  const [, updatePost] = useUpdatePostMutation();

  const intId =
    typeof router.query.id === "string" ? parseInt(router?.query?.id) : -1;

  const [{ data, fetching }] = usePostQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });

  if (fetching) {
    return (
      <Layout>
        <div>loading...</div>
      </Layout>
    );
  }

  if (!data?.post) {
    return (
      <Layout>
        <Box>Could not find the post.</Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Formik
        initialValues={{ title: data.post.title, text: data.post.text }}
        onSubmit={async (values) => {
          await updatePost({
            id: data.post?.id || -1,
            ...values,
          });
          router.back();
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <InputField name="title" placeholder="Title" label="Title" />
            <Box mt={4}>
              <TextareaField name="text" placeholder="Text..." label="Body" />
            </Box>
            <Box mt={4}>
              <Button
                type="submit"
                mt={4}
                colorScheme={"teal"}
                isLoading={isSubmitting}
              >
                Update Post
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Layout>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: false })(EditPost);
